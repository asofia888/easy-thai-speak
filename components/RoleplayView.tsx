
import React, { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConversationLine } from '../types';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useAudio } from '../contexts/AudioContext';
import { useRoleplay } from '../hooks/useRoleplay';
import RoleplayMessage from './RoleplayMessage';
import RoleplayControls from './RoleplayControls';
import RoleSelectionModal from './RoleSelectionModal';


const RoleplayView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { conversation, topicTitle } = (location.state || {}) as { conversation: ConversationLine[], topicTitle: string };
    
    const { 
        status, 
        userRole, 
        messages, 
        currentLineIndex, 
        selectRole, 
        addAiMessage,
        addUserMessage,
        endRoleplay,
        proceedToNextLine
    } = useRoleplay();

    const { isSupported, isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition();
    const { speakThai, isCloudTTSPlaying, isCloudTTSLoading, stopCloudTTS } = useAudio();
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Effect to redirect if conversation data is missing
    useEffect(() => {
        if (!conversation) {
            navigate('/');
        }
    }, [conversation, navigate]);
    
    // Effect to scroll to the latest message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Main conversation flow logic
    useEffect(() => {
        const isAnyTTSActive = isCloudTTSLoading || isCloudTTSPlaying;
        if (status !== 'playing' || isAnyTTSActive || !conversation) {
            return;
        }

        const currentLine = conversation[currentLineIndex];
        if (!currentLine) {
            endRoleplay();
            return;
        }

        // AI's turn
        if (currentLine.speaker !== userRole) {
            speakThai(currentLine.thai, () => {
                addAiMessage(currentLine);
            }).catch(error => {
                console.error('❌ Error in roleplay speech:', error);
                addAiMessage(currentLine); // Continue even if speech fails
            });
        }
        // User's turn is handled by user interaction via RoleplayControls
    }, [status, currentLineIndex, userRole, conversation, speakThai, isCloudTTSLoading, isCloudTTSPlaying, addAiMessage, endRoleplay]);

    // Handle submission of user's speech
    const handleUserSpeechSubmit = useCallback(() => {
        const currentLine = conversation?.[currentLineIndex];
        if (!transcript || status !== 'playing' || !currentLine || currentLine.speaker !== userRole) {
            return;
        }
        addUserMessage(transcript, currentLine);
        resetTranscript();
    }, [currentLineIndex, conversation, transcript, userRole, status, resetTranscript, addUserMessage]);

    // Auto-submit when listening stops
    useEffect(() => {
        if (!isListening && transcript) {
            handleUserSpeechSubmit();
        }
    }, [isListening, transcript, handleUserSpeechSubmit]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopCloudTTS();
            if (isListening) {
                stopListening();
            }
        };
    }, [stopCloudTTS, stopListening, isListening]);


    if (!conversation || !Array.isArray(conversation)) return null;
    if (status === 'selecting_role') {
        const speakers = [...new Set(conversation.map(line => line.speaker))];
        return <RoleSelectionModal speakers={speakers} onSelect={selectRole} />;
    }

    const currentLine = status === 'playing' ? conversation[currentLineIndex] : null;
    const isUserTurn = status === 'playing' && !!currentLine && currentLine.speaker === userRole;
    const isAnyTTSActive = isCloudTTSLoading || isCloudTTSPlaying;

    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    // Check if the last message corresponds to the current turn for the user
    const userHasCompletedTurn = isUserTurn && lastMessage?.isUser && lastMessage.correctPhrase === currentLine.thai;


    return (
        <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-lg shadow-xl">
            <header className="p-4 border-b flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">{topicTitle} - ロールプレイ</h1>
                    <p className="text-sm text-slate-500">あなたは「{userRole}」さんです。</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition text-sm font-semibold"
                    aria-label="ロールプレイを終了してトピック選択に戻る"
                >
                    終了する
                </button>
            </header>

            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50/50">
                {Array.isArray(messages) && messages.map((msg) => (
                    <RoleplayMessage key={msg.id} msg={msg} />
                ))}
                <div ref={chatEndRef} />
            </div>
            
            <RoleplayControls
                status={status}
                isUserTurn={isUserTurn}
                userHasCompletedTurn={userHasCompletedTurn}
                isSpeaking={isAnyTTSActive}
                currentLine={currentLine}
                isMicSupported={isSupported}
                isListening={isListening}
                transcript={transcript}
                onStartListening={startListening}
                onStopListening={stopListening}
                onProceed={proceedToNextLine}
            />
        </div>
    );
};

export default RoleplayView;
