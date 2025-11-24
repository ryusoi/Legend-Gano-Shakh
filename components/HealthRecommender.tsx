
import React, { useState, useRef } from 'react';

declare global {
    interface Window {
        gsap: any;
    }
}

interface HealthRecommenderProps {
    t: any;
    language: string;
}

const HealthRecommender: React.FC<HealthRecommenderProps> = ({ t, language }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const questions = [
        { 
            id: 'goal', 
            text: t.rec_question_goal, 
            options: [t.rec_opt_goal_1, t.rec_opt_goal_2, t.rec_opt_goal_3, t.rec_opt_goal_4] 
        },
        { 
            id: 'age', 
            text: t.rec_question_age, 
            options: [t.rec_opt_age_1, t.rec_opt_age_2, t.rec_opt_age_3] 
        },
        { 
            id: 'routine', 
            text: t.rec_question_routine, 
            options: [t.rec_opt_routine_1, t.rec_opt_routine_2, t.rec_opt_routine_3] 
        }
    ];

    const handleAnswer = (answer: string) => {
        if (window.gsap) {
            window.gsap.to(containerRef.current, {
                opacity: 0,
                x: -50,
                duration: 0.3,
                onComplete: () => {
                    setAnswers([...answers, answer]);
                    setStep(step + 1);
                    window.gsap.fromTo(containerRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.3 });
                }
            });
        } else {
             setAnswers([...answers, answer]);
             setStep(step + 1);
        }
    };

    const getRecommendation = () => {
        const primaryGoal = answers[0];
        
        // Note: Logic compares translated strings, which is fragile if translations change drastically.
        // Ideally, use IDs. For now, we assume index 0 = Immunity, 1 = Sleep, etc. based on options array order.
        // Since we only stored the answer text, we need to infer index from the original questions array or store index.
        // Let's rely on the fact that the first question answers map to these specific outcomes.
        
        const goalIndex = questions[0].options.indexOf(primaryGoal);

        if (goalIndex === 0) { // Immunity
            return {
                title: t.rec_immune_title,
                text: t.rec_immune_text,
                product: "Reishi Extract"
            };
        } else if (goalIndex === 1) { // Sleep
            return {
                title: t.rec_sleep_title,
                text: t.rec_sleep_text,
                product: "Reishi Night Cream"
            };
        } else if (goalIndex === 2) { // Energy
            return {
                title: t.rec_energy_title,
                text: t.rec_energy_text,
                product: "Cordyceps & Reishi"
            };
        } else { // Anti-Aging
            return {
                title: t.rec_antiaging_title,
                text: t.rec_antiaging_text,
                product: "Reishi Cream Set"
            };
        }
    };

    const rec = step >= questions.length ? getRecommendation() : null;

    return (
        <div className="max-w-2xl mx-auto bg-stone-900/80 backdrop-blur-md border border-amber-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,215,0,0.1)] relative overflow-hidden min-h-[350px] flex flex-col justify-center">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>

            <div ref={containerRef} className="relative z-10">
                {step < questions.length ? (
                    <>
                        <div className="mb-2 text-xs font-mono text-amber-400 uppercase tracking-widest">{t.rec_widget_title}</div>
                        <h3 className="text-2xl font-bold text-white mb-6">{questions[step].text}</h3>
                        <div className="space-y-3">
                            {questions[step].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(opt)}
                                    className="w-full text-left px-6 py-4 rounded-xl bg-stone-800 border border-stone-700 hover:border-amber-500 hover:bg-stone-700 transition-all duration-300 flex justify-between items-center group"
                                >
                                    <span className="text-stone-200 group-hover:text-white font-medium">{opt}</span>
                                    <span className="w-4 h-4 rounded-full border border-stone-500 group-hover:bg-amber-500 transition-colors"></span>
                                </button>
                            ))}
                        </div>
                        <div className="mt-6 w-full bg-stone-800 h-1 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
                        </div>
                    </>
                ) : (
                    <div className="text-center animate-fade-in">
                        <div className="inline-block p-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 mb-6 shadow-lg shadow-amber-500/40">
                            <span className="text-4xl">🧬</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t.rec_result_title}</h3>
                        <h4 className="text-xl text-amber-300 font-bold mb-4">{rec?.title}</h4>
                        <div className="bg-stone-800/50 p-6 rounded-xl border border-stone-700 mb-8 text-left">
                            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">{rec?.text}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform shadow-xl">
                                {t.rec_btn_shop}
                            </button>
                            <button 
                                onClick={() => { setStep(0); setAnswers([]); }}
                                className="text-sm text-stone-500 hover:text-white transition-colors py-3"
                            >
                                {t.rec_btn_restart}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthRecommender;
