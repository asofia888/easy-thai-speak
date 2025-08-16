import React from 'react';
import { useAudio } from '../contexts/AudioContext';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
    const { 
        voices, 
        selectedVoice, 
        setSelectedVoice, 
        rate, 
        setRate,
        testAudio
    } = useAudio();

    const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const voice = voices.find(v => v.name === event.target.value) || null;
        setSelectedVoice(voice);
    };

    // タイ語音声を表示
    const thaiVoices = voices.filter(v => v.lang.startsWith('th'));
    const availableVoices = thaiVoices;

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300" 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col gap-6 transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800">🎵 音声設定</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="閉じる">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* コンテンツ */}
                <div className="flex-1">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            ブラウザ標準のSpeechSynthesis APIを使用してタイ語音声を再生します。
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="voice-select" className="block text-sm font-medium text-slate-700">
                                音声の選択
                            </label>
                            <select
                                id="voice-select"
                                value={selectedVoice?.name || ''}
                                onChange={handleVoiceChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                {availableVoices.length > 0 ? (
                                    Array.isArray(availableVoices) && availableVoices.map(voice => (
                                        <option key={voice.name} value={voice.name}>
                                            {voice.name} ({voice.lang})
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>タイ語音声がありません</option>
                                )}
                            </select>
                            <p className="text-xs text-slate-500 mt-1">
                                利用可能なタイ語音声を選択してください。
                                {thaiVoices.length === 0 && (
                                    <span className="text-orange-600">
                                        <br />⚠️ ブラウザにタイ語音声がありません。デバイスによってはタイ語音声が利用できない場合があります。
                                    </span>
                                )}
                            </p>
                            
                            {/* 音声テストボタン */}
                            <button
                                onClick={() => testAudio?.()}
                                className="mt-2 w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                🧪 音声テスト
                            </button>
                            <p className="text-xs text-slate-500 mt-1">
                                音声が聞こえない場合は、このボタンでテストしてください。
                            </p>
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="rate-slider" className="block text-sm font-medium text-slate-700">
                                読み上げ速度: <span className="font-bold">{rate.toFixed(1)}x</span>
                            </label>
                            <input
                                id="rate-slider"
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={rate}
                                onChange={(e) => setRate(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;