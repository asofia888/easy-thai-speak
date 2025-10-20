import React, { useRef, useEffect } from 'react';
import { PitchAnalysis, ThaiTone } from '../services/speechAnalysisService';

interface PitchVisualizationProps {
  pitchData: PitchAnalysis | null;
  expectedTone?: ThaiTone;
  width?: number;
  height?: number;
  className?: string;
}

export const PitchVisualization: React.FC<PitchVisualizationProps> = ({
  pitchData,
  expectedTone,
  width = 400,
  height = 200,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!pitchData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawPitchContour(ctx, pitchData, width, height, expectedTone);
  }, [pitchData, expectedTone, width, height]);

  const drawPitchContour = (
    ctx: CanvasRenderingContext2D,
    data: PitchAnalysis,
    w: number,
    h: number,
    expected?: ThaiTone
  ) => {
    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    if (data.frequency.length === 0) return;

    const { frequency, timestamps } = data;
    const minFreq = Math.min(...frequency) - 20;
    const maxFreq = Math.max(...frequency) + 20;
    const freqRange = maxFreq - minFreq;

    // Draw grid
    drawGrid(ctx, w, h);

    // Draw expected tone pattern if provided
    if (expected) {
      drawExpectedTonePattern(ctx, expected, w, h, minFreq, maxFreq);
    }

    // Draw actual pitch contour
    drawActualPitchContour(ctx, frequency, timestamps, w, h, minFreq, freqRange);

    // Draw frequency labels
    drawFrequencyLabels(ctx, minFreq, maxFreq, h);

    // Draw time labels
    drawTimeLabels(ctx, timestamps, w, h);

    // Draw tone classification result
    drawToneResult(ctx, data, w, h);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (i * h) / 4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 8; i++) {
      const x = (i * w) / 8;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
  };

  const drawExpectedTonePattern = (
    ctx: CanvasRenderingContext2D,
    tone: ThaiTone,
    w: number,
    h: number,
    minFreq: number,
    maxFreq: number
  ) => {
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    const midFreq = (minFreq + maxFreq) / 2;
    const freqRange = maxFreq - minFreq;

    ctx.beginPath();
    switch (tone) {
      case ThaiTone.MIDDLE:
        // Flat line in the middle
        const midY = h / 2;
        ctx.moveTo(0, midY);
        ctx.lineTo(w, midY);
        break;

      case ThaiTone.LOW:
        // Low flat with slight fall
        const lowY = h * 0.7;
        const lowEndY = h * 0.8;
        ctx.moveTo(0, lowY);
        ctx.lineTo(w * 0.7, lowY);
        ctx.lineTo(w, lowEndY);
        break;

      case ThaiTone.FALLING:
        // High to low fall
        const highStartY = h * 0.2;
        const fallEndY = h * 0.8;
        ctx.moveTo(0, highStartY);
        ctx.lineTo(w, fallEndY);
        break;

      case ThaiTone.HIGH:
        // High flat
        const highY = h * 0.3;
        ctx.moveTo(0, highY);
        ctx.lineTo(w, highY);
        break;

      case ThaiTone.RISING:
        // Low to high rise
        const riseStartY = h * 0.7;
        const riseEndY = h * 0.3;
        ctx.moveTo(0, riseStartY);
        ctx.lineTo(w, riseEndY);
        break;
    }
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawActualPitchContour = (
    ctx: CanvasRenderingContext2D,
    frequency: number[],
    timestamps: number[],
    w: number,
    h: number,
    minFreq: number,
    freqRange: number
  ) => {
    if (frequency.length === 0) return;

    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const maxTime = Math.max(...timestamps);
    
    ctx.beginPath();
    for (let i = 0; i < frequency.length; i++) {
      const x = (timestamps[i] / maxTime) * w;
      const y = h - ((frequency[i] - minFreq) / freqRange) * h;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#22c55e';
    for (let i = 0; i < frequency.length; i++) {
      const x = (timestamps[i] / maxTime) * w;
      const y = h - ((frequency[i] - minFreq) / freqRange) * h;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const drawFrequencyLabels = (
    ctx: CanvasRenderingContext2D,
    minFreq: number,
    maxFreq: number,
    h: number
  ) => {
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';

    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const freq = minFreq + (i * (maxFreq - minFreq)) / steps;
      const y = h - (i * h) / steps;
      ctx.fillText(`${Math.round(freq)}Hz`, 5, y - 5);
    }
  };

  const drawTimeLabels = (
    ctx: CanvasRenderingContext2D,
    timestamps: number[],
    w: number,
    h: number
  ) => {
    if (timestamps.length === 0) return;

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';

    const maxTime = Math.max(...timestamps);
    const steps = 4;
    
    for (let i = 0; i <= steps; i++) {
      const time = (i * maxTime) / steps;
      const x = (i * w) / steps;
      ctx.fillText(`${time.toFixed(1)}s`, x, h - 5);
    }
  };

  const drawToneResult = (
    ctx: CanvasRenderingContext2D,
    data: PitchAnalysis,
    w: number,
    h: number
  ) => {
    const toneNames = {
      [ThaiTone.MIDDLE]: '中調',
      [ThaiTone.LOW]: '低調',
      [ThaiTone.FALLING]: '下降調',
      [ThaiTone.HIGH]: '高調',
      [ThaiTone.RISING]: '上昇調'
    };

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'right';
    
    const resultText = `検出: ${toneNames[data.tonePattern]} (${Math.round(data.confidence * 100)}%)`;
    ctx.fillText(resultText, w - 10, 20);

    // Draw confidence bar
    const barWidth = 100;
    const barHeight = 6;
    const barX = w - barWidth - 10;
    const barY = 25;

    // Background
    ctx.fillStyle = '#374151';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Confidence fill
    const confidenceWidth = barWidth * data.confidence;
    ctx.fillStyle = data.confidence > 0.7 ? '#22c55e' : data.confidence > 0.4 ? '#eab308' : '#ef4444';
    ctx.fillRect(barX, barY, confidenceWidth, barHeight);
  };

  const getToneColorClass = (tone: ThaiTone): string => {
    switch (tone) {
      case ThaiTone.MIDDLE: return 'text-blue-400';
      case ThaiTone.LOW: return 'text-indigo-400';
      case ThaiTone.FALLING: return 'text-red-400';
      case ThaiTone.HIGH: return 'text-yellow-400';
      case ThaiTone.RISING: return 'text-green-400';
    }
  };

  const getToneDescription = (tone: ThaiTone): string => {
    switch (tone) {
      case ThaiTone.MIDDLE: return '平坦な音程を保つ';
      case ThaiTone.LOW: return '低い音程から少し下がる';
      case ThaiTone.FALLING: return '高い音程から低い音程に下がる';
      case ThaiTone.HIGH: return '高い音程を保つ';
      case ThaiTone.RISING: return '低い音程から高い音程に上がる';
    }
  };

  return (
    <div className={`bg-slate-900 rounded-lg p-4 ${className}`}>
      <div className="mb-4">
        <h4 className="text-white font-medium mb-2">ピッチ分析</h4>
        {expectedTone && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">期待される声調:</span>
            <span className={`font-medium ${getToneColorClass(expectedTone)}`}>
              {getToneDescription(expectedTone)}
            </span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="w-full border border-slate-600 rounded"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {pitchData && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">平均周波数:</span>
            <span className="text-white ml-2">{Math.round(pitchData.averageFrequency)}Hz</span>
          </div>
          <div>
            <span className="text-slate-400">周波数範囲:</span>
            <span className="text-white ml-2">
              {Math.round(pitchData.pitchRange.max - pitchData.pitchRange.min)}Hz
            </span>
          </div>
          <div>
            <span className="text-slate-400">検出された声調:</span>
            <span className={`ml-2 font-medium ${getToneColorClass(pitchData.tonePattern)}`}>
              {getToneDescription(pitchData.tonePattern)}
            </span>
          </div>
          <div>
            <span className="text-slate-400">信頼度:</span>
            <span className="text-white ml-2">{Math.round(pitchData.confidence * 100)}%</span>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-slate-500">
        <p>緑の実線: 実際の発音 | 灰色の点線: 期待される声調パターン</p>
      </div>
    </div>
  );
};