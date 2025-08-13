import { SpeechAnalysisService, ThaiTone } from '../speechAnalysisService';

// Mock Web Audio API
const mockAnalyser = {
  fftSize: 2048,
  frequencyBinCount: 1024,
  connect: jest.fn(),
  disconnect: jest.fn(),
  getFloatFrequencyData: jest.fn(),
  getByteTimeDomainData: jest.fn()
};

const mockAudioContext = {
  createAnalyser: jest.fn(() => mockAnalyser),
  createMediaStreamSource: jest.fn(() => ({
    connect: jest.fn(),
    disconnect: jest.fn()
  })),
  decodeAudioData: jest.fn(),
  close: jest.fn(),
  state: 'running',
  sampleRate: 44100
};

const mockMediaRecorder = {
  start: jest.fn(),
  stop: jest.fn(),
  state: 'inactive',
  ondataavailable: null,
  onstop: null
};

const mockMediaStream = {
  getTracks: jest.fn(() => [{ stop: jest.fn() }])
};

// Mock global APIs
global.AudioContext = jest.fn(() => mockAudioContext);
global.webkitAudioContext = jest.fn(() => mockAudioContext);
global.MediaRecorder = jest.fn(() => mockMediaRecorder);

Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: jest.fn(() => Promise.resolve(mockMediaStream))
  }
});

describe('SpeechAnalysisService', () => {
  let service: SpeechAnalysisService;

  beforeEach(() => {
    service = new SpeechAnalysisService();
    jest.clearAllMocks();
  });

  afterEach(() => {
    service.cleanup();
  });

  describe('initialization', () => {
    it('initializes audio context successfully', async () => {
      await service.initializeAudioContext();
      
      expect(global.AudioContext).toHaveBeenCalled();
      expect(mockAudioContext.createAnalyser).toHaveBeenCalled();
    });

    it('throws error when audio context initialization fails', async () => {
      global.AudioContext = jest.fn(() => {
        throw new Error('AudioContext not supported');
      });

      await expect(service.initializeAudioContext()).rejects.toThrow(
        'Audio context initialization failed'
      );
    });
  });

  describe('recording', () => {
    beforeEach(async () => {
      await service.initializeAudioContext();
    });

    it('starts recording successfully', async () => {
      const stream = await service.startRecording();
      
      expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
        audio: {
          sampleRate: 44100,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      expect(stream).toBe(mockMediaStream);
      expect(global.MediaRecorder).toHaveBeenCalled();
    });

    it('throws error when getUserMedia fails', async () => {
      navigator.mediaDevices.getUserMedia = jest.fn(() => 
        Promise.reject(new Error('Permission denied'))
      );

      await expect(service.startRecording()).rejects.toThrow(
        'Recording initialization failed'
      );
    });

    it('stops recording and returns blob', async () => {
      await service.startRecording();
      
      // Simulate successful recording stop
      const mockBlob = new Blob(['mock audio data'], { type: 'audio/webm' });
      
      // Setup mock for stop recording
      const stopPromise = service.stopRecording();
      
      // Simulate MediaRecorder stop event
      if (mockMediaRecorder.onstop) {
        // Mock recorded chunks
        (service as any).recordedChunks = [mockBlob];
        mockMediaRecorder.onstop();
      }

      const blob = await stopPromise;
      expect(blob).toBeInstanceOf(Blob);
    });
  });

  describe('frequency analysis', () => {
    beforeEach(async () => {
      await service.initializeAudioContext();
    });

    it('returns frequency data when analyser is available', () => {
      const mockData = new Float32Array([1, 2, 3, 4]);
      mockAnalyser.getFloatFrequencyData.mockImplementation((array) => {
        array.set(mockData);
      });

      const data = service.getFrequencyData();
      
      expect(data).toBeInstanceOf(Float32Array);
      expect(mockAnalyser.getFloatFrequencyData).toHaveBeenCalled();
    });

    it('returns null when analyser is not available', () => {
      const serviceWithoutInit = new SpeechAnalysisService();
      const data = serviceWithoutInit.getFrequencyData();
      
      expect(data).toBeNull();
    });

    it('returns time domain data when analyser is available', () => {
      const mockData = new Uint8Array([128, 130, 125, 135]);
      mockAnalyser.getByteTimeDomainData.mockImplementation((array) => {
        array.set(mockData);
      });

      const data = service.getTimeDomainData();
      
      expect(data).toBeInstanceOf(Uint8Array);
      expect(mockAnalyser.getByteTimeDomainData).toHaveBeenCalled();
    });
  });

  describe('pitch analysis', () => {
    beforeEach(async () => {
      await service.initializeAudioContext();
    });

    it('analyzes pitch from audio blob', async () => {
      const mockAudioBuffer = {
        sampleRate: 44100,
        getChannelData: jest.fn(() => new Float32Array(1024).fill(0.5))
      };
      
      mockAudioContext.decodeAudioData.mockResolvedValue(mockAudioBuffer);
      
      const audioBlob = new Blob(['mock audio'], { type: 'audio/webm' });
      const analysis = await service.analyzePitch(audioBlob);
      
      expect(analysis).toHaveProperty('frequency');
      expect(analysis).toHaveProperty('timestamps');
      expect(analysis).toHaveProperty('averageFrequency');
      expect(analysis).toHaveProperty('pitchRange');
      expect(analysis).toHaveProperty('tonePattern');
      expect(analysis).toHaveProperty('confidence');
      expect(Object.values(ThaiTone)).toContain(analysis.tonePattern);
    });

    it('throws error when audio decoding fails', async () => {
      mockAudioContext.decodeAudioData.mockRejectedValue(new Error('Decode failed'));
      
      const audioBlob = new Blob(['invalid audio'], { type: 'audio/webm' });
      
      await expect(service.analyzePitch(audioBlob)).rejects.toThrow(
        'Pitch analysis failed'
      );
    });
  });

  describe('tone classification', () => {
    it('classifies middle tone for flat frequency pattern', () => {
      const frequencies = Array(10).fill(200); // Flat at 200Hz
      const tonePattern = (service as any).classifyThaiTone(frequencies);
      
      expect(tonePattern).toBe(ThaiTone.MIDDLE);
    });

    it('classifies rising tone for ascending frequency pattern', () => {
      const frequencies = [150, 160, 170, 180, 190, 200, 210, 220, 230, 240];
      const tonePattern = (service as any).classifyThaiTone(frequencies);
      
      expect(tonePattern).toBe(ThaiTone.RISING);
    });

    it('classifies falling tone for descending frequency pattern', () => {
      const frequencies = [240, 230, 220, 210, 200, 190, 180, 170, 160, 150];
      const tonePattern = (service as any).classifyThaiTone(frequencies);
      
      expect(tonePattern).toBe(ThaiTone.FALLING);
    });

    it('handles edge cases for tone classification', () => {
      // Test with insufficient data
      const shortFrequencies = [200, 210];
      const tonePattern = (service as any).classifyThaiTone(shortFrequencies);
      
      expect(tonePattern).toBe(ThaiTone.MIDDLE);
    });
  });

  describe('pronunciation evaluation', () => {
    beforeEach(async () => {
      await service.initializeAudioContext();
    });

    it('evaluates pronunciation and returns score', async () => {
      const mockAudioBuffer = {
        sampleRate: 44100,
        getChannelData: jest.fn(() => new Float32Array(1024).fill(0.5))
      };
      
      mockAudioContext.decodeAudioData.mockResolvedValue(mockAudioBuffer);
      
      const audioBlob = new Blob(['mock audio'], { type: 'audio/webm' });
      const score = await service.evaluatePronunciation(
        audioBlob, 
        'กา', 
        ThaiTone.MIDDLE
      );
      
      expect(score).toHaveProperty('overall');
      expect(score).toHaveProperty('toneAccuracy');
      expect(score).toHaveProperty('clarityScore');
      expect(score).toHaveProperty('timingScore');
      expect(score).toHaveProperty('feedback');
      
      expect(score.overall).toBeGreaterThanOrEqual(0);
      expect(score.overall).toBeLessThanOrEqual(100);
      expect(Array.isArray(score.feedback)).toBe(true);
    });

    it('returns error score when evaluation fails', async () => {
      mockAudioContext.decodeAudioData.mockRejectedValue(new Error('Decode failed'));
      
      const audioBlob = new Blob(['invalid audio'], { type: 'audio/webm' });
      const score = await service.evaluatePronunciation(audioBlob, 'กา');
      
      expect(score.overall).toBe(0);
      expect(score.feedback).toContain('音声分析に失敗しました。もう一度お試しください。');
    });

    it('provides different feedback based on score levels', () => {
      const highAccuracyFeedback = (service as any).generateFeedback(
        { tonePattern: ThaiTone.MIDDLE, confidence: 0.9 },
        0.9, 0.8, 0.8,
        ThaiTone.MIDDLE
      );
      
      const lowAccuracyFeedback = (service as any).generateFeedback(
        { tonePattern: ThaiTone.FALLING, confidence: 0.4 },
        0.4, 0.5, 0.6,
        ThaiTone.MIDDLE
      );
      
      expect(highAccuracyFeedback).toContain('素晴らしい');
      expect(lowAccuracyFeedback.length).toBeGreaterThan(0);
    });
  });

  describe('autocorrelation pitch detection', () => {
    it('detects pitch from audio buffer using autocorrelation', () => {
      // Create a simple sine wave at 220Hz
      const sampleRate = 44100;
      const frequency = 220;
      const bufferSize = 2048;
      const buffer = new Float32Array(bufferSize);
      
      for (let i = 0; i < bufferSize; i++) {
        buffer[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.5;
      }
      
      const detectedPitch = (service as any).autocorrelationPitch(buffer, sampleRate);
      
      // Should detect something close to 220Hz (within 10% tolerance)
      expect(detectedPitch).toBeGreaterThan(frequency * 0.9);
      expect(detectedPitch).toBeLessThan(frequency * 1.1);
    });

    it('returns -1 for noise or silence', () => {
      const buffer = new Float32Array(2048).fill(0.001); // Very quiet signal
      const detectedPitch = (service as any).autocorrelationPitch(buffer, 44100);
      
      expect(detectedPitch).toBe(-1);
    });
  });

  describe('confidence calculation', () => {
    it('calculates confidence based on tone consistency', () => {
      const stableFrequencies = Array(20).fill(200); // Very stable
      const confidence = (service as any).calculateToneConfidence(
        stableFrequencies, 
        ThaiTone.MIDDLE
      );
      
      expect(confidence).toBeGreaterThan(0.5);
      expect(confidence).toBeLessThanOrEqual(1.0);
    });

    it('returns lower confidence for inconsistent frequencies', () => {
      const inconsistentFrequencies = [100, 200, 150, 300, 180, 250];
      const confidence = (service as any).calculateToneConfidence(
        inconsistentFrequencies, 
        ThaiTone.MIDDLE
      );
      
      expect(confidence).toBeLessThan(0.8);
    });
  });

  describe('cleanup', () => {
    it('properly cleans up resources', async () => {
      await service.initializeAudioContext();
      await service.startRecording();
      
      service.cleanup();
      
      expect(mockAudioContext.close).toHaveBeenCalled();
    });

    it('handles cleanup when not initialized', () => {
      const cleanService = new SpeechAnalysisService();
      expect(() => cleanService.cleanup()).not.toThrow();
    });
  });
});