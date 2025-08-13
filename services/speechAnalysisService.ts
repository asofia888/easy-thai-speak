export interface PitchAnalysis {
  frequency: number[];
  timestamps: number[];
  averageFrequency: number;
  pitchRange: { min: number; max: number };
  tonePattern: ThaiTone;
  confidence: number;
}

export interface PronunciationScore {
  overall: number;
  toneAccuracy: number;
  clarityScore: number;
  timingScore: number;
  feedback: string[];
}

export enum ThaiTone {
  MIDDLE = 'middle',      // กา (mid tone)
  LOW = 'low',           // ก่า (low tone)  
  FALLING = 'falling',   // ก้า (falling tone)
  HIGH = 'high',         // ก๊า (high tone)
  RISING = 'rising'      // ก๋า (rising tone)
}

export class SpeechAnalysisService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  async initializeAudioContext(): Promise<void> {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      throw new Error('Audio context initialization failed');
    }
  }

  async startRecording(): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });

      if (this.audioContext && this.analyser) {
        const source = this.audioContext.createMediaStreamSource(stream);
        source.connect(this.analyser);
      }

      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(100); // Record in 100ms chunks
      return stream;
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw new Error('Recording initialization failed');
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No active recording'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  getFrequencyData(): Float32Array | null {
    if (!this.analyser) return null;
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    this.analyser.getFloatFrequencyData(dataArray);
    return dataArray;
  }

  getTimeDomainData(): Uint8Array | null {
    if (!this.analyser) return null;
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  async analyzePitch(audioBlob: Blob): Promise<PitchAnalysis> {
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
      
      const channelData = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;
      
      // Pitch detection using autocorrelation
      const pitchData = this.extractPitchFromAudio(channelData, sampleRate);
      const tonePattern = this.classifyThaiTone(pitchData.frequency);
      
      return {
        frequency: pitchData.frequency,
        timestamps: pitchData.timestamps,
        averageFrequency: pitchData.frequency.reduce((a, b) => a + b, 0) / pitchData.frequency.length,
        pitchRange: {
          min: Math.min(...pitchData.frequency),
          max: Math.max(...pitchData.frequency)
        },
        tonePattern,
        confidence: this.calculateToneConfidence(pitchData.frequency, tonePattern)
      };
    } catch (error) {
      console.error('Pitch analysis failed:', error);
      throw new Error('Pitch analysis failed');
    }
  }

  private extractPitchFromAudio(channelData: Float32Array, sampleRate: number) {
    const frequency: number[] = [];
    const timestamps: number[] = [];
    const windowSize = 2048;
    const hopSize = 512;
    
    for (let i = 0; i < channelData.length - windowSize; i += hopSize) {
      const window = channelData.slice(i, i + windowSize);
      const pitch = this.autocorrelationPitch(window, sampleRate);
      
      if (pitch > 0) {
        frequency.push(pitch);
        timestamps.push(i / sampleRate);
      }
    }
    
    return { frequency, timestamps };
  }

  private autocorrelationPitch(buffer: Float32Array, sampleRate: number): number {
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    
    if (rms < 0.01) return -1; // Too quiet
    
    let lastCorrelation = 1;
    for (let offset = 1; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;
      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs((buffer[i]) - (buffer[i + offset]));
      }
      correlation = 1 - (correlation / MAX_SAMPLES);
      
      if (correlation > 0.9 && correlation > lastCorrelation) {
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation;
          bestOffset = offset;
        }
      }
      lastCorrelation = correlation;
    }
    
    if (bestOffset === -1) return -1;
    
    return sampleRate / bestOffset;
  }

  private classifyThaiTone(frequencies: number[]): ThaiTone {
    if (frequencies.length < 3) return ThaiTone.MIDDLE;
    
    const start = frequencies.slice(0, Math.floor(frequencies.length / 3));
    const middle = frequencies.slice(Math.floor(frequencies.length / 3), Math.floor(2 * frequencies.length / 3));
    const end = frequencies.slice(Math.floor(2 * frequencies.length / 3));
    
    const startAvg = start.reduce((a, b) => a + b, 0) / start.length;
    const middleAvg = middle.reduce((a, b) => a + b, 0) / middle.length;
    const endAvg = end.reduce((a, b) => a + b, 0) / end.length;
    
    const startToEnd = endAvg - startAvg;
    const range = Math.max(...frequencies) - Math.min(...frequencies);
    
    // Thai tone classification based on pitch contour
    if (range < 20) {
      return ThaiTone.MIDDLE; // Relatively flat
    } else if (startToEnd > 15 && endAvg > middleAvg) {
      return ThaiTone.RISING; // Rising pattern
    } else if (startToEnd < -15 && endAvg < middleAvg) {
      return ThaiTone.FALLING; // Falling pattern
    } else if (middleAvg > startAvg && middleAvg > endAvg) {
      return ThaiTone.HIGH; // High in the middle
    } else if (middleAvg < startAvg && middleAvg < endAvg) {
      return ThaiTone.LOW; // Low in the middle
    }
    
    return ThaiTone.MIDDLE;
  }

  private calculateToneConfidence(frequencies: number[], detectedTone: ThaiTone): number {
    if (frequencies.length < 3) return 0.5;
    
    const variation = this.calculatePitchVariation(frequencies);
    const consistency = this.calculateToneConsistency(frequencies, detectedTone);
    
    return Math.min(1.0, (consistency * 0.7 + (1 - variation) * 0.3));
  }

  private calculatePitchVariation(frequencies: number[]): number {
    const mean = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;
    const variance = frequencies.reduce((sum, freq) => sum + Math.pow(freq - mean, 2), 0) / frequencies.length;
    const standardDeviation = Math.sqrt(variance);
    return Math.min(1, standardDeviation / mean);
  }

  private calculateToneConsistency(frequencies: number[], expectedTone: ThaiTone): number {
    const segments = 5;
    const segmentSize = Math.floor(frequencies.length / segments);
    let consistentSegments = 0;
    
    for (let i = 0; i < segments; i++) {
      const start = i * segmentSize;
      const end = Math.min(start + segmentSize, frequencies.length);
      const segment = frequencies.slice(start, end);
      const segmentTone = this.classifyThaiTone(segment);
      
      if (segmentTone === expectedTone) {
        consistentSegments++;
      }
    }
    
    return consistentSegments / segments;
  }

  async evaluatePronunciation(
    userAudioBlob: Blob, 
    targetText: string, 
    expectedTone?: ThaiTone
  ): Promise<PronunciationScore> {
    try {
      const pitchAnalysis = await this.analyzePitch(userAudioBlob);
      
      let toneAccuracy = 0;
      if (expectedTone) {
        toneAccuracy = pitchAnalysis.tonePattern === expectedTone ? 
          pitchAnalysis.confidence : 
          Math.max(0, pitchAnalysis.confidence - 0.3);
      } else {
        toneAccuracy = pitchAnalysis.confidence;
      }
      
      const clarityScore = this.evaluateClarity(pitchAnalysis);
      const timingScore = this.evaluateTiming(pitchAnalysis);
      
      const overall = (toneAccuracy * 0.5 + clarityScore * 0.3 + timingScore * 0.2);
      
      const feedback = this.generateFeedback(pitchAnalysis, toneAccuracy, clarityScore, timingScore, expectedTone);
      
      return {
        overall: Math.round(overall * 100),
        toneAccuracy: Math.round(toneAccuracy * 100),
        clarityScore: Math.round(clarityScore * 100),
        timingScore: Math.round(timingScore * 100),
        feedback
      };
    } catch (error) {
      console.error('Pronunciation evaluation failed:', error);
      return {
        overall: 0,
        toneAccuracy: 0,
        clarityScore: 0,
        timingScore: 0,
        feedback: ['音声分析に失敗しました。もう一度お試しください。']
      };
    }
  }

  private evaluateClarity(analysis: PitchAnalysis): number {
    const frequencyRange = analysis.pitchRange.max - analysis.pitchRange.min;
    const averageFreq = analysis.averageFrequency;
    
    // Good clarity indicators for Thai
    const optimalRange = averageFreq * 0.3; // 30% range is good
    const rangeScore = Math.min(1, frequencyRange / optimalRange);
    
    return Math.min(1, rangeScore * analysis.confidence);
  }

  private evaluateTiming(analysis: PitchAnalysis): number {
    const duration = analysis.timestamps.length > 0 ? 
      analysis.timestamps[analysis.timestamps.length - 1] - analysis.timestamps[0] : 0;
    
    // Optimal duration for Thai syllables: 0.3-0.8 seconds
    if (duration >= 0.3 && duration <= 0.8) {
      return 1.0;
    } else if (duration < 0.3) {
      return duration / 0.3;
    } else {
      return Math.max(0.3, 1.0 - ((duration - 0.8) * 0.5));
    }
  }

  private generateFeedback(
    analysis: PitchAnalysis, 
    toneAccuracy: number, 
    clarityScore: number, 
    timingScore: number,
    expectedTone?: ThaiTone
  ): string[] {
    const feedback: string[] = [];
    
    if (toneAccuracy < 0.6) {
      if (expectedTone) {
        feedback.push(`声調が${this.getToneNameInJapanese(expectedTone)}になっていません。${this.getToneAdvice(expectedTone)}`);
      } else {
        feedback.push(`声調の精度を向上させましょう。${this.getToneAdvice(analysis.tonePattern)}`);
      }
    } else if (toneAccuracy >= 0.8) {
      feedback.push('声調が正確です！素晴らしい発音ですね。');
    }
    
    if (clarityScore < 0.6) {
      feedback.push('もう少しはっきりと発音してみてください。口の動きを大きくすると効果的です。');
    }
    
    if (timingScore < 0.6) {
      const duration = analysis.timestamps.length > 0 ? 
        analysis.timestamps[analysis.timestamps.length - 1] - analysis.timestamps[0] : 0;
      if (duration < 0.3) {
        feedback.push('もう少しゆっくりと発音してみてください。');
      } else {
        feedback.push('発音が長すぎます。もう少し短く発音してみてください。');
      }
    }
    
    if (feedback.length === 0) {
      feedback.push('とても上手な発音です！この調子で続けてください。');
    }
    
    return feedback;
  }

  private getToneNameInJapanese(tone: ThaiTone): string {
    switch (tone) {
      case ThaiTone.MIDDLE: return '中調';
      case ThaiTone.LOW: return '低調';
      case ThaiTone.FALLING: return '下降調';
      case ThaiTone.HIGH: return '高調';
      case ThaiTone.RISING: return '上昇調';
    }
  }

  private getToneAdvice(tone: ThaiTone): string {
    switch (tone) {
      case ThaiTone.MIDDLE:
        return '声の高さを一定に保ってください。';
      case ThaiTone.LOW:
        return '低く、少し下がり気味に発音してください。';
      case ThaiTone.FALLING:
        return '高い音から低い音へ下げて発音してください。';
      case ThaiTone.HIGH:
        return '高い音程で発音してください。';
      case ThaiTone.RISING:
        return '低い音から高い音へ上げて発音してください。疑問文のような調子で。';
    }
  }

  cleanup(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
  }
}

export const speechAnalysisService = new SpeechAnalysisService();