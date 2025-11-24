import React, { useState } from 'react';

const chartData = [
  { name: 'Polysaccharides', logGrown: 45, sawdustGrown: 22 },
  { name: 'Triterpenoids', logGrown: 35, sawdustGrown: 15 },
  { name: 'Beta-Glucans', logGrown: 28, sawdustGrown: 18 },
  { name: 'Ganoderic Acids', logGrown: 22, sawdustGrown: 8 },
];

const BioactiveChart: React.FC = () => {
    const [hoveredBar, setHoveredBar] = useState<{ group: string; value: number } | null>(null);

    const maxValue = Math.max(...chartData.map(d => Math.max(d.logGrown, d.sawdustGrown)));
    const scale = 100 / maxValue;

    return (
        <div className="border rounded-xl p-4 sm:p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)'}}>
            <style>{`
                @keyframes grow {
                    from { transform: scaleY(0); }
                    to { transform: scaleY(1); }
                }
                .bar-animate {
                    animation: grow 0.7s ease-out forwards;
                    transform-origin: bottom;
                }
            `}</style>
            <div className="flex justify-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-amber-500"></div>
                    <span className="text-sm" style={{color: 'var(--text-secondary)'}}>Log-Grown (Gano Shakh)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-stone-500"></div>
                    <span className="text-sm" style={{color: 'var(--text-secondary)'}}>Container/Sawdust-Grown</span>
                </div>
            </div>
            <div className="flex justify-around items-end h-72 border-b border-l p-2" style={{ borderColor: 'var(--border-secondary)'}}>
                {chartData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div className="flex items-end justify-center gap-2 w-full h-full">
                            <div className="relative w-1/3 h-full flex items-end justify-center" onMouseOver={() => setHoveredBar({ group: `${data.name}-log`, value: data.logGrown })} onMouseOut={() => setHoveredBar(null)}>
                                {hoveredBar?.group === `${data.name}-log` && (
                                    <div className="absolute -top-8 bg-black text-white text-xs rounded py-1 px-2 pointer-events-none">
                                        {data.logGrown}%
                                    </div>
                                )}
                                <div className="w-full bg-amber-500 hover:bg-amber-400 rounded-t-md bar-animate" style={{ height: `${data.logGrown * scale}%`, animationDelay: `${index * 100}ms` }}></div>
                            </div>
                            <div className="relative w-1/3 h-full flex items-end justify-center" onMouseOver={() => setHoveredBar({ group: `${data.name}-sawdust`, value: data.sawdustGrown })} onMouseOut={() => setHoveredBar(null)}>
                                {hoveredBar?.group === `${data.name}-sawdust` && (
                                    <div className="absolute -top-8 bg-black text-white text-xs rounded py-1 px-2 pointer-events-none">
                                        {data.sawdustGrown}%
                                    </div>
                                )}
                                <div className="w-full bg-stone-500 hover:bg-stone-400 rounded-t-md bar-animate" style={{ height: `${data.sawdustGrown * scale}%`, animationDelay: `${index * 100 + 50}ms`}}></div>
                            </div>
                        </div>
                        <span className="text-xs mt-2 text-center" style={{color: 'var(--text-secondary)'}}>{data.name}</span>
                    </div>
                ))}
            </div>
            <p className="text-xs mt-2 text-center opacity-70" style={{color: 'var(--text-secondary)'}}>*Relative potency percentages for illustrative purposes based on typical lab findings.</p>
        </div>
    );
};

export default BioactiveChart;