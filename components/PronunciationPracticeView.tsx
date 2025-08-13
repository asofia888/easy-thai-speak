import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VoiceFeedback } from './VoiceFeedback';
import { PitchVisualization } from './PitchVisualization';
import { useAdvancedSpeechRecognition } from '../hooks/useAdvancedSpeechRecognition';
import { useGoogleCloudTTS } from '../hooks/useGoogleCloudTTS';
import { getEnvConfig } from '../utils/envConfig';
import { PronunciationScore, ThaiTone, PitchAnalysis, speechAnalysisService } from '../services/speechAnalysisService';
import ArrowRightIcon from './icons/ArrowRightIcon';
import PlayIcon from './icons/PlayIcon';
import MicIcon from './icons/MicIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface PracticeWord {
  thai: string;
  paiboon: string;
  english: string;
  tone: ThaiTone;
  category: string;
}

const practiceWords: PracticeWord[] = [
  // 基本的な声調練習用語彙
  { thai: 'กา', paiboon: 'gaa', english: 'crow', tone: ThaiTone.MIDDLE, category: '基本' },
  { thai: 'ก่า', paiboon: 'gàa', english: 'to kill', tone: ThaiTone.LOW, category: '基本' },
  { thai: 'ก้า', paiboon: 'gâa', english: 'to step', tone: ThaiTone.FALLING, category: '基本' },
  { thai: 'ก๊า', paiboon: 'gáa', english: 'gas', tone: ThaiTone.HIGH, category: '基本' },
  { thai: 'ก๋า', paiboon: 'gǎa', english: 'galangal', tone: ThaiTone.RISING, category: '基本' },
  
  // 実用的な単語
  { thai: 'สวัสดี', paiboon: 'sà-wàt-dii', english: 'hello', tone: ThaiTone.MIDDLE, category: '挨拶' },
  { thai: 'ขอบคุณ', paiboon: 'kɔ̀ɔp-kun', english: 'thank you', tone: ThaiTone.LOW, category: '挨拶' },
  { thai: 'ไม่', paiboon: 'mâi', english: 'no/not', tone: ThaiTone.FALLING, category: '基本' },
  { thai: 'ใช่', paiboon: 'châi', english: 'yes', tone: ThaiTone.FALLING, category: '基本' },
  { thai: 'น้ำ', paiboon: 'náam', english: 'water', tone: ThaiTone.HIGH, category: '食べ物' },
  { thai: 'ข้าว', paiboon: 'kâao', english: 'rice', tone: ThaiTone.FALLING, category: '食べ物' },
  { thai: 'หมู', paiboon: 'mǔu', english: 'pig/pork', tone: ThaiTone.RISING, category: '食べ物' },
  { thai: 'ไก่', paiboon: 'gài', english: 'chicken', tone: ThaiTone.LOW, category: '食べ物' }
];

export const PronunciationPracticeView: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category?: string }>();
  
  const [selectedCategory, setSelectedCategory] = useState(category || '基本');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState<Map<string, PronunciationScore>>(new Map());
  const [pitchAnalysisData, setPitchAnalysisData] = useState<PitchAnalysis | null>(null);
  const [sessionStats, setSessionStats] = useState({
    total: 0,
    excellent: 0,
    good: 0,
    needsWork: 0
  });

  const ENV_CONFIG = getEnvConfig();
  const [ttsState, ttsControls] = useGoogleCloudTTS({
    voice: ENV_CONFIG.googleCloud.defaultVoice,
    quality: ENV_CONFIG.googleCloud.defaultQuality,
    autoPlay: true,
    enableMetrics: false
  });
  const {
    isListening,
    isAnalyzing,
    transcript,
    pronunciationScore,
    startPronunciationAnalysis,
    stopPronunciationAnalysis
  } = useAdvancedSpeechRecognition();

  const filteredWords = practiceWords.filter(word => word.category === selectedCategory);
  const currentWord = filteredWords[currentWordIndex];
  const categories = [...new Set(practiceWords.map(word => word.category))];

  useEffect(() => {
    setCurrentWordIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    if (pronunciationScore) {
      setPracticeHistory(prev => new Map(prev).set(currentWord.thai, pronunciationScore));
      updateSessionStats(pronunciationScore);
      setShowResults(true);
    }
  }, [pronunciationScore, currentWord]);

  const updateSessionStats = (score: PronunciationScore) => {
    setSessionStats(prev => {
      const newStats = { ...prev, total: prev.total + 1 };
      if (score.overall >= 80) newStats.excellent++;
      else if (score.overall >= 60) newStats.good++;
      else newStats.needsWork++;
      return newStats;
    });
  };

  const handlePractice = async () => {
    if (isListening) {
      await stopPronunciationAnalysis();
    } else {
      setShowResults(false);
      setPitchAnalysisData(null);
      await startPronunciationAnalysis(currentWord.thai, currentWord.tone);
    }
  };

  const handlePlayExample = async () => {
    await ttsControls.synthesize({ thaiText: currentWord.thai });
  };

  const nextWord = () => {
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowResults(false);
      setPitchAnalysisData(null);
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
      setShowResults(false);
      setPitchAnalysisData(null);
    }
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

  const getToneSymbol = (tone: ThaiTone): string => {
    switch (tone) {
      case ThaiTone.MIDDLE: return '—';
      case ThaiTone.LOW: return '\\';
      case ThaiTone.FALLING: return '\\';
      case ThaiTone.HIGH: return '/';
      case ThaiTone.RISING: return '/';
    }
  };

  const getScoreLevel = (score: number): string => {
    if (score >= 80) return '優秀';
    if (score >= 60) return '良好';
    return '要練習';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white"
          >
            ← ホームに戻る
          </button>
          <h1 className="text-2xl font-bold text-white">発音練習</h1>
          <div className="w-20"></div>
        </div>

        {/* Session Stats */}
        <div className="bg-slate-800 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{sessionStats.total}</div>
              <div className="text-slate-400 text-sm">練習回数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{sessionStats.excellent}</div>
              <div className="text-slate-400 text-sm">優秀</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-500">{sessionStats.good}</div>
              <div className="text-slate-400 text-sm">良好</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-500">{sessionStats.needsWork}</div>
              <div className="text-slate-400 text-sm">要練習</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Practice Panel */}
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">カテゴリー選択</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Word Display */}
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-white mb-2">{currentWord.thai}</div>
                <div className="text-xl text-slate-300 mb-1">{currentWord.paiboon}</div>
                <div className="text-slate-400">{currentWord.english}</div>
                <div className={`text-lg font-medium mt-2 ${getToneColorClass(currentWord.tone)}`}>
                  声調: {getToneSymbol(currentWord.tone)} ({currentWord.tone})
                </div>
              </div>

              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={handlePlayExample}
                  disabled={ttsState.isLoading || ttsState.isPlaying}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <PlayIcon className="w-4 h-4" />
                  お手本を聞く
                </button>

                <button
                  onClick={handlePractice}
                  disabled={isAnalyzing}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                    isListening
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <LoadingSpinner className="w-4 h-4" />
                      分析中...
                    </>
                  ) : isListening ? (
                    <>
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                      録音停止
                    </>
                  ) : (
                    <>
                      <MicIcon className="w-4 h-4" />
                      発音練習
                    </>
                  )}
                </button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={previousWord}
                  disabled={currentWordIndex === 0}
                  className="px-3 py-1 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← 前の単語
                </button>
                
                <span className="text-slate-400 text-sm">
                  {currentWordIndex + 1} / {filteredWords.length}
                </span>
                
                <button
                  onClick={nextWord}
                  disabled={currentWordIndex === filteredWords.length - 1}
                  className="px-3 py-1 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  次の単語 →
                </button>
              </div>
            </div>

            {/* Transcript */}
            {transcript && (
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">認識された音声</h4>
                <div className="text-slate-300 bg-slate-700 rounded p-3">
                  {transcript}
                </div>
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Voice Feedback Component */}
            <VoiceFeedback
              targetText={currentWord.thai}
              expectedTone={currentWord.tone}
              onScoreUpdate={(score) => {
                // Handle score updates if needed for additional functionality
                speechAnalysisService.analyzePitch(new Blob()).then(setPitchAnalysisData).catch(console.error);
              }}
            />

            {/* Pitch Visualization */}
            {pitchAnalysisData && (
              <PitchVisualization
                pitchData={pitchAnalysisData}
                expectedTone={currentWord.tone}
              />
            )}

            {/* Results Summary */}
            {showResults && pronunciationScore && (
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">今回の結果</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">総合評価</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(pronunciationScore.overall)}`}>
                        {pronunciationScore.overall}点
                      </span>
                      <span className={`text-sm ${getScoreColor(pronunciationScore.overall)}`}>
                        ({getScoreLevel(pronunciationScore.overall)})
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className={`font-medium ${getScoreColor(pronunciationScore.toneAccuracy)}`}>
                        {pronunciationScore.toneAccuracy}点
                      </div>
                      <div className="text-slate-400">声調</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${getScoreColor(pronunciationScore.clarityScore)}`}>
                        {pronunciationScore.clarityScore}点
                      </div>
                      <div className="text-slate-400">明瞭度</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${getScoreColor(pronunciationScore.timingScore)}`}>
                        {pronunciationScore.timingScore}点
                      </div>
                      <div className="text-slate-400">タイミング</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Practice History */}
            {practiceHistory.size > 0 && (
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">練習履歴</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {Array.from(practiceHistory.entries()).reverse().slice(0, 5).map(([word, score], index) => (
                    <div key={`${word}-${index}`} className="flex justify-between items-center text-sm">
                      <span className="text-slate-300">{word}</span>
                      <span className={`font-medium ${getScoreColor(score.overall)}`}>
                        {score.overall}点
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};