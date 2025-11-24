
import React, { useState } from 'react';

const RitualBuilder: React.FC = () => {
    const [streak, setStreak] = useState(0);
    const [checked, setChecked] = useState(false);

    const handleCheck = () => {
        if (!checked) {
            setChecked(true);
            setStreak(streak + 1);
        }
    };

    return (
        <div className="bg-stone-900/90 border border-stone-700 backdrop-blur-md rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Daily Mushroom Ritual</h4>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <span>🔥</span>
                    <span>{streak} Days</span>
                </div>
            </div>
            
            <div 
                onClick={handleCheck}
                className={`cursor-pointer p-4 rounded-xl border transition-all duration-500 flex items-center gap-4 ${checked ? 'bg-green-900/30 border-green-500/50' : 'bg-stone-800 border-stone-600 hover:border-amber-500'}`}
            >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? 'bg-green-500 border-green-500' : 'border-stone-500'}`}>
                    {checked && <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <div>
                    <p className={`font-medium transition-colors ${checked ? 'text-green-400 line-through' : 'text-white'}`}>Take Reishi Extract</p>
                    <p className="text-xs text-stone-400">Evening • 1ml</p>
                </div>
            </div>
            
            {checked && (
                <p className="text-center text-xs text-green-400 mt-4 animate-pulse font-mono">
                    Great job! Consistency is key to longevity.
                </p>
            )}
        </div>
    );
};

export default RitualBuilder;
