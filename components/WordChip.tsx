
import React, { useState } from 'react';
import { Word } from '../types';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAudio } from '../contexts/AudioContext';
import PlayIcon from './icons/PlayIcon';
import StarIcon from './icons/StarIcon';
import StarFilledIcon from './icons/StarFilledIcon';
import LoadingSpinner from './icons/LoadingSpinner';

const WordChip = ({ word }: { word: Word }) => {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const { speak, isSpeaking, cancel } = useAudio();
    const [isThisWordSpeaking, setIsThisWordSpeaking] = useState(false);
    
    const isWordFavorite = isFavorite(word.thai);

    const toggleFavorite = () => {
        if (isWordFavorite) {
            removeFavorite(word.thai);
        } else {
            addFavorite(word);
        }
    };

    const handlePlay = () => {
        if (isSpeaking) {
            cancel();
            setIsThisWordSpeaking(false);
        } else {
            setIsThisWordSpeaking(true);
            speak(word.thai, 'th-TH');
        }
    };
    
    React.useEffect(() => {
        if (!isSpeaking) {
            setIsThisWordSpeaking(false);
        }
    }, [isSpeaking]);


    return (
        <div className="group relative bg-slate-100 p-3 rounded-lg flex items-center gap-3 transition-colors hover:bg-slate-200">
            <div>
                <p className="font-thai font-medium text-slate-900" lang="th">{word.thai}</p>
                <p className="text-xs text-slate-500 italic">{word.pronunciation}</p>
                <p className="text-xs text-slate-600">{word.japanese}</p>
            </div>
            <div className="flex items-center gap-1 ml-auto">
                 <button 
                    onClick={handlePlay} 
                    className="h-8 w-8 flex items-center justify-center rounded-full text-blue-500 hover:bg-blue-100 transition-colors"
                    aria-label={`単語「${word.thai}」を再生`}
                >
                    {isSpeaking && isThisWordSpeaking ? <LoadingSpinner className="h-5 w-5"/> : <PlayIcon className="h-5 w-5" />}
                </button>
                <button 
                    onClick={toggleFavorite}
                    className="h-8 w-8 flex items-center justify-center rounded-full text-yellow-500 hover:bg-yellow-100 transition-colors"
                    aria-label={`単語「${word.thai}」をお気に入り${isWordFavorite ? 'から削除' : 'に追加'}`}
                >
                    {isWordFavorite ? <StarFilledIcon className="h-5 w-5" /> : <StarIcon className="h-5 w-5" />}
                </button>
            </div>
        </div>
    );
};

export default WordChip;