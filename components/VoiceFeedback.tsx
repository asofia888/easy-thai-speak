import React, { useState, useEffect, useRef, useCallback } from 'react';
import { speechAnalysisService, PronunciationScore, ThaiTone, PitchAnalysis } from '../services/speechAnalysisService';
import MicIcon from './icons/MicIcon';
import LoadingSpinner from './icons/LoadingSpinner';
import PlayIcon from './icons/PlayIcon';

interface VoiceFeedbackProps {
  targetText: string;
  expectedTone?: ThaiTone;
  onScoreUpdate?: (score: PronunciationScore) => void;
  className?: string;
}

export const VoiceFeedback: React.FC<VoiceFeedbackProps> = ({
  targetText,
  expectedTone,
  onScoreUpdate,
  className = ''
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentScore, setCurrentScore] = useState<PronunciationScore | null>(null);
  const [pitchData, setPitchData] = useState<PitchAnalysis | null>(null);
  const [realtimePitch, setRealtimePitch] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string>('');

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initializeService = useCallback(async () => {
    try {
      await speechAnalysisService.initializeAudioContext();
      setIsInitialized(true);
      setError('');
    } catch (err) {
      setError('音声分析の初期化に失敗しました。マイクのアクセスを許可してください。');
      console.error('Failed to initialize speech analysis:', err);
    }
  }, []);

  useEffect(() => {
    initializeService();
    return () => {
      speechAnalysisService.cleanup();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initializeService]);

  const drawRealtimeVisualization = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frequencyData = speechAnalysisService.getFrequencyData();
    const timeDomainData = speechAnalysisService.getTimeDomainData();

    if (!frequencyData || !timeDomainData) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = 'rgb(15, 23, 42)';
    ctx.fillRect(0, 0, width, height);

    // Draw waveform
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(34, 197, 94)';
    ctx.beginPath();

    const sliceWidth = width / timeDomainData.length;
    let x = 0;

    for (let i = 0; i < timeDomainData.length; i++) {
      const v = timeDomainData[i] / 128.0;
      const y = v * height / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.stroke();

    // Draw pitch indicator
    if (realtimePitch > 0) {
      const pitchY = height - (realtimePitch / 500) * height; // Normalize to 500Hz
      ctx.fillStyle = 'rgb(239, 68, 68)';
      ctx.fillRect(width - 20, pitchY - 2, 15, 4);
      
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.font = '12px monospace';
      ctx.fillText(`${Math.round(realtimePitch)}Hz`, width - 60, pitchY - 5);
    }

    if (isRecording) {
      animationFrameRef.current = requestAnimationFrame(drawRealtimeVisualization);
    }
  }, [realtimePitch, isRecording]);

  const startRecording = async () => {
    if (!isInitialized) {
      await initializeService();
    }

    try {
      setIsRecording(true);
      setError('');
      setCurrentScore(null);
      
      const stream = await speechAnalysisService.startRecording();
      mediaStreamRef.current = stream;
      
      // Start real-time pitch detection
      const updatePitch = () => {
        const frequencyData = speechAnalysisService.getFrequencyData();
        if (frequencyData) {
          // Simple pitch detection for real-time feedback
          const maxIndex = frequencyData.indexOf(Math.max(...frequencyData.slice(1, 200)));
          const pitch = maxIndex * 44100 / 2048; // Convert to Hz
          if (pitch > 50 && pitch < 800) { // Reasonable range for human voice
            setRealtimePitch(pitch);
          }
        }
      };

      const pitchInterval = setInterval(updatePitch, 50);
      
      // Start visualization
      if (canvasRef.current) {
        drawRealtimeVisualization();
      }

      // Auto-stop after 3 seconds for better UX
      setTimeout(() => {
        if (isRecording) {
          stopRecording();
          clearInterval(pitchInterval);
        }
      }, 3000);

    } catch (err) {
      setError('録音を開始できませんでした。マイクのアクセスを確認してください。');
      setIsRecording(false);
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setIsAnalyzing(true);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const audioBlob = await speechAnalysisService.stopRecording();
      
      // Stop media stream
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }

      // Analyze the recorded audio
      const [score, pitchAnalysis] = await Promise.all([
        speechAnalysisService.evaluatePronunciation(audioBlob, targetText, expectedTone),
        speechAnalysisService.analyzePitch(audioBlob)
      ]);

      setCurrentScore(score);
      setPitchData(pitchAnalysis);
      setIsAnalyzing(false);

      if (onScoreUpdate) {
        onScoreUpdate(score);
      }
    } catch (err) {
      setError('音声分析に失敗しました。もう一度お試しください。');
      setIsAnalyzing(false);
      console.error('Failed to analyze recording:', err);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getToneDisplay = (tone: ThaiTone): string => {
    switch (tone) {
      case ThaiTone.MIDDLE: return '中調 (-)';
      case ThaiTone.LOW: return '低調 (\\)';
      case ThaiTone.FALLING: return '下降調 (\\)';
      case ThaiTone.HIGH: return '高調 (/)';
      case ThaiTone.RISING: return '上昇調 (/)';
    }
  };

  return (
    <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">発音練習</h3>
        <p className="text-slate-300 text-sm">「{targetText}」を発音してみてください</p>
        {expectedTone && (
          <p className="text-slate-400 text-xs mt-1">
            期待される声調: {getToneDisplay(expectedTone)}
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-600 rounded-md p-3 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Visualization Canvas */}
      <div className="mb-4">
        <canvas
          ref={canvasRef}
          width={300}
          height={100}
          className="w-full h-24 bg-slate-900 rounded border border-slate-600"
        />
        {isRecording && (
          <p className="text-center text-slate-400 text-xs mt-1">
            音声を記録中... リアルタイムピッチ: {Math.round(realtimePitch)}Hz
          </p>
        )}
      </div>

      {/* Recording Controls */}
      <div className="flex justify-center mb-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isAnalyzing}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
            ${isRecording 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
            }
            ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
          `}
        >
          {isAnalyzing ? (
            <>
              <LoadingSpinner className="w-5 h-5" />
              分析中...
            </>
          ) : isRecording ? (
            <>
              <div className="w-5 h-5 bg-white rounded-sm"></div>
              停止
            </>
          ) : (
            <>
              <MicIcon className="w-5 h-5" />
              録音開始
            </>
          )}
        </button>
      </div>

      {/* Results Display */}
      {currentScore && (
        <div className="space-y-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">発音評価結果</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(currentScore.overall)}`}>
                  {currentScore.overall}点
                </div>
                <div className="text-slate-400 text-sm">総合スコア</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300 text-sm">声調</span>
                  <span className={`font-medium ${getScoreColor(currentScore.toneAccuracy)}`}>
                    {currentScore.toneAccuracy}点
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300 text-sm">明瞭度</span>
                  <span className={`font-medium ${getScoreColor(currentScore.clarityScore)}`}>
                    {currentScore.clarityScore}点
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300 text-sm">タイミング</span>
                  <span className={`font-medium ${getScoreColor(currentScore.timingScore)}`}>
                    {currentScore.timingScore}点
                  </span>
                </div>
              </div>
            </div>

            {pitchData && (
              <div className="mb-4">
                <div className="text-slate-300 text-sm mb-2">検出された声調:</div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    {getToneDisplay(pitchData.tonePattern)}
                  </span>
                  <span className="text-slate-400 text-sm">
                    (信頼度: {Math.round(pitchData.confidence * 100)}%)
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h5 className="text-slate-300 text-sm font-medium">フィードバック:</h5>
              {currentScore.feedback.map((feedback, index) => (
                <div key={index} className="text-slate-200 text-sm bg-slate-600 rounded p-2">
                  {feedback}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isInitialized && (
        <div className="text-center">
          <button
            onClick={initializeService}
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            音声分析を初期化する
          </button>
        </div>
      )}
    </div>
  );
};