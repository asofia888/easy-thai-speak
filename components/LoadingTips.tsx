
import React, { useState, useEffect } from 'react';

const tips = [
    'タイの挨拶「サワッディー」は、時間に関係なく使える便利な言葉です。',
    'タイ語には、性別によって変わる丁寧な文末詞があります。男性は「ครับ (khrap)」、女性は「ค่ะ (kha)」を使います。',
    'タイでは、人の頭を触ることは非常に失礼とされています。頭は最も神聖な部位と考えられています。',
    'タイの数字「5」は「ハー」と発音します。笑い声の「ははは」と似ているため、ネットスラングで「555」は「www」の意味で使われます。',
    'タイの伝統的な挨拶「ワイ（合掌）」は、相手への敬意を示す美しい作法です。手の位置が高いほど、より深い敬意を表します。',
    'タイ料理の「辛さを控えめに」とお願いしたい時は、「เผ็ดน้อย (phet noi)」と言いましょう。',
    'バンコクの正式名称は非常に長く、世界で最も長い首都名としてギネス世界記録に認定されています。',
];

const LoadingTips = () => {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTipIndex(prevIndex => (prevIndex + 1) % tips.length);
        }, 4500); // Change tip every 4.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-blue-700 mb-3">タイの豆知識 💡</h3>
            <div
                key={currentTipIndex} // Add key to re-trigger animation
                className="text-slate-600 leading-relaxed animate-fade-in min-h-[48px]"
                aria-live="polite"
            >
                {tips[currentTipIndex]}
            </div>
             <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
            `}</style>
        </div>
    );
};

export default LoadingTips;
