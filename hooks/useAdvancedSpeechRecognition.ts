import { useState, useEffect, useRef, useCallback } from 'react';
import { speechAnalysisService, PronunciationScore, ThaiTone } from '../services/speechAnalysisService';

interface AdvancedSpeechRecognitionHook {
  isSupported: boolean;
  isListening: boolean;
  isAnalyzing: boolean;
  transcript: string;
  pronunciationScore: PronunciationScore | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  startPronunciationAnalysis: (targetText: string, expectedTone?: ThaiTone) => void;
  stopPronunciationAnalysis: () => Promise<void>;
}

const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useAdvancedSpeechRecognition = (): AdvancedSpeechRecognitionHook => {
  const [isSupported, setIsSupported] = useState(!!SpeechRecognitionAPI);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [pronunciationScore, setPronunciationScore] = useState<PronunciationScore | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isAnalysisMode = useRef(false);
  const analysisTargetText = useRef<string>('');
  const analysisExpectedTone = useRef<ThaiTone | undefined>(undefined);

  useEffect(() => {
    if (!isSupported) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.lang = 'th-TH';
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(prev => prev ? `${prev} ${finalTranscript}` : finalTranscript);
      }
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
      // If in analysis mode, trigger pronunciation evaluation
      if (isAnalysisMode.current) {
        handlePronunciationEvaluation();
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setIsAnalyzing(false);
    };

    recognitionRef.current = recognition;

    // Initialize speech analysis service
    speechAnalysisService.initializeAudioContext().catch(console.error);

    return () => {
      recognition.stop();
      speechAnalysisService.cleanup();
    };
  }, [isSupported]);

  const handlePronunciationEvaluation = async () => {
    if (!isAnalysisMode.current) return;

    try {
      setIsAnalyzing(true);
      
      // Stop media stream recording
      if (mediaStreamRef.current) {
        const audioBlob = await speechAnalysisService.stopRecording();
        
        // Evaluate pronunciation
        const score = await speechAnalysisService.evaluatePronunciation(
          audioBlob,
          analysisTargetText.current,
          analysisExpectedTone.current
        );
        
        setPronunciationScore(score);
        
        // Stop media stream
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
    } catch (error) {
      console.error('Pronunciation evaluation failed:', error);
      setPronunciationScore({
        overall: 0,
        toneAccuracy: 0,
        clarityScore: 0,
        timingScore: 0,
        feedback: ['音声分析に失敗しました。もう一度お試しください。']
      });
    } finally {
      setIsAnalyzing(false);
      isAnalysisMode.current = false;
    }
  };

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setPronunciationScore(null);
      isAnalysisMode.current = false;
      recognitionRef.current.start();
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setPronunciationScore(null);
  }, []);

  const startPronunciationAnalysis = useCallback(async (targetText: string, expectedTone?: ThaiTone) => {
    if (recognitionRef.current && !isListening) {
      try {
        setTranscript('');
        setPronunciationScore(null);
        
        // Set analysis mode and target
        isAnalysisMode.current = true;
        analysisTargetText.current = targetText;
        analysisExpectedTone.current = expectedTone;

        // Start recording for pronunciation analysis
        const stream = await speechAnalysisService.startRecording();
        mediaStreamRef.current = stream;

        // Start speech recognition
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start pronunciation analysis:', error);
        isAnalysisMode.current = false;
      }
    }
  }, [isListening]);

  const stopPronunciationAnalysis = useCallback(async () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      // The evaluation will be triggered in the onend event
    }
  }, [isListening]);

  return {
    isSupported,
    isListening,
    isAnalyzing,
    transcript,
    pronunciationScore,
    startListening,
    stopListening,
    resetTranscript,
    startPronunciationAnalysis,
    stopPronunciationAnalysis
  };
};