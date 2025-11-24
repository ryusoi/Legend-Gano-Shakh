
import React, { useState, useEffect } from 'react';

const ImmunityWidget: React.FC<{ t: any }> = ({ t }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            const aqi = Math.floor(Math.random() * 80) + 20;
            const humidity = Math.floor(Math.random() * 60) + 30;
            let level = 'High';
            let color = 'text-green-400';
            
            if (aqi > 80) {
                level = 'Moderate';
                color = 'text-yellow-400';
            }
            
            setData({ aqi, humidity, level, color });
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) return (
        <div className="inline-flex items-center gap-1 bg-stone-900/30 border border-white/10 px-2 py-1 rounded-full text-[9px] animate-pulse backdrop-blur-sm">
            <span>analyzing...</span>
        </div>
    );

    return (
        <div className="inline-flex flex-row items-center gap-2 bg-stone-900/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-none transition-all hover:bg-stone-900/50">
            <div className="flex items-center gap-1">
                <span className="text-lg">🛡️</span>
                <div className="leading-tight">
                    <div className="text-[8px] uppercase tracking-widest text-stone-400">Immunity</div>
                    <div className={`font-bold text-[10px] ${data.color}`}>{data.level}</div>
                </div>
            </div>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex gap-2 text-[9px] text-stone-300">
                <div className="text-center">
                    <span className="block font-bold text-white">{data.aqi}</span>
                    <span className="text-[7px] uppercase opacity-60">AQI</span>
                </div>
                <div className="text-center">
                    <span className="block font-bold text-white">{data.humidity}%</span>
                    <span className="text-[7px] uppercase opacity-60">Hum</span>
                </div>
                <div className="text-center">
                    <span className="block font-bold text-white">Low</span>
                    <span className="text-[7px] uppercase opacity-60">Pol</span>
                </div>
            </div>
        </div>
    );
};

export default ImmunityWidget;
