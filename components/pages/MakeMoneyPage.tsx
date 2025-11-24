
import React, { useEffect, useState } from 'react';
import type { Language } from '../../translations';
import WhatsappIcon from '../icons/WhatsappIcon';

interface MakeMoneyPageProps {
  t: any;
  language: Language;
}

const MakeMoneyPage: React.FC<MakeMoneyPageProps> = ({ t, language }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.pageYOffset);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRtl = language === 'fa';
  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/MAke%20Money.mp4"; 

  return (
    <div className={`animate-fade-in pb-24 text-slate-100 bg-black ${isRtl ? 'font-reishi-body text-right' : 'text-left'}`}>
       <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes neon-pulse {
                0%, 100% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #ff00de, 0 0 70px #ff00de; }
                50% { text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6; }
            }
            @keyframes border-flow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            .btn-neon-green {
                background-color: rgba(37, 211, 102, 0.1);
                border: 2px solid #25D366;
                color: #25D366;
                box-shadow: 0 0 15px rgba(37, 211, 102, 0.4), inset 0 0 10px rgba(37, 211, 102, 0.2);
                transition: all 0.3s ease;
            }
            .btn-neon-green:hover {
                background-color: #25D366;
                color: black;
                box-shadow: 0 0 40px rgba(37, 211, 102, 0.8);
                transform: translateY(-2px) scale(1.05);
            }
            .living-border-container {
                position: relative;
                background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
                background-size: 300% 300%;
                animation: border-flow 4s ease infinite;
                border-radius: 1.5rem;
                padding: 2px;
            }
            .living-content {
                background: rgba(10, 10, 10, 0.95);
                border-radius: 1.4rem;
                height: 100%;
                backdrop-filter: blur(10px);
            }
            .particle-line {
                position: absolute;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.8), transparent);
                animation: scan-down 3s linear infinite;
            }
            @keyframes scan-down {
                0% { top: -10%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 110%; opacity: 0; }
            }
            .step-connector {
                position: absolute;
                top: 50%;
                width: 100px;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00f3ff, transparent);
                z-index: 0;
            }
        `}</style>

      {/* 1. HERO SECTION: High Impact */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
         <div 
          className="absolute top-[-30%] left-0 w-full h-[160%] pointer-events-none will-change-transform"
          style={{ transform: `translateY(${offset * 0.4}px)` }}
        >
             <video 
                src={heroVideoUrl} 
                className="w-full h-full object-cover opacity-50"
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{ filter: 'contrast(1.2) brightness(0.8)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-900/20 backdrop-blur-md mb-8 animate-pulse">
                <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f3ff]"></span>
                <span className="text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase">Elite Opportunity</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-500 drop-shadow-[0_0_30px_rgba(0,243,255,0.5)] mb-6 leading-tight">
                {t.mm_hero_title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-stone-300 font-light tracking-wide drop-shadow-md max-w-3xl mx-auto leading-relaxed">
                {t.mm_hero_subtitle}
            </p>
            
             <a 
                href="https://wa.me/989196214129"
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-12 inline-flex items-center gap-4 btn-neon-green font-bold py-5 px-12 rounded-full text-xl transition-all z-50 relative overflow-hidden group"
            >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></span>
                <WhatsappIcon className="w-8 h-8" />
                {t.mm_cta}
            </a>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY: "Not Selling, Uplifting" */}
      <section className="py-24 bg-black relative overflow-hidden">
          {/* Background FX */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
              <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Text Content */}
                  <div className={`${isRtl ? 'text-right order-2' : 'text-left order-1'}`}>
                      <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 leading-tight">
                          {t.mm_movement_title}
                      </h2>
                      <p className="text-lg text-stone-300 leading-loose mb-8 border-l-2 border-purple-500/50 pl-6">
                          {t.mm_movement_desc}
                      </p>
                      
                      <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                              <span className="text-3xl group-hover:scale-110 transition-transform">🕯️</span>
                              <span className="text-white font-medium">{t.mm_emotional_1}</span>
                          </div>
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                              <span className="text-3xl group-hover:scale-110 transition-transform">🤝</span>
                              <span className="text-white font-medium">{t.mm_emotional_2}</span>
                          </div>
                      </div>
                  </div>

                  {/* Floating Visual Card */}
                  <div className={`relative perspective-1000 ${isRtl ? 'order-1' : 'order-2'}`}>
                      <div className="living-border-container shadow-[0_0_50px_rgba(128,90,213,0.3)] transform hover:rotate-y-6 hover:rotate-x-6 transition-transform duration-500">
                          <div className="living-content p-8 flex flex-col items-center text-center justify-center h-96">
                               <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.6)] animate-pulse">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                   </svg>
                               </div>
                               <h3 className="text-2xl font-bold text-white mb-2">Health = Wealth</h3>
                               <p className="text-sm text-stone-400">Join the cycle of giving.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. THE MECHANISM: Steps */}
      <section className="py-20 bg-stone-950 relative">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative">
                  {/* Connecting Line (Desktop) */}
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

                  {[
                      { icon: '📣', title: t.mm_step_1, color: 'border-cyan-500' },
                      { icon: '❤️', title: t.mm_step_2, color: 'border-pink-500' },
                      { icon: '💰', title: t.mm_step_3, color: 'border-green-500' },
                      { icon: '🙏', title: t.mm_step_4, color: 'border-purple-500' },
                  ].map((step, idx) => (
                      <div key={idx} className={`relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-stone-900 border ${step.color} shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-transform duration-300`}>
                          <div className="text-4xl mb-4">{step.icon}</div>
                          <h4 className="font-bold text-white text-lg">{step.title}</h4>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 4. THE PRODUCT AUTHORITY */}
      <section className="py-24 bg-black relative">
          <div className="absolute inset-0 bg-[url('https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoderma%20Science.mp4')] bg-cover opacity-10 pointer-events-none mix-blend-overlay"></div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <div className="inline-block mb-6">
                  <svg className="w-16 h-16 text-amber-500 mx-auto drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
                  </svg>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-amber-400 mb-6 tracking-tight">{t.mm_purity_title}</h2>
              <p className="text-xl text-stone-300 leading-relaxed">{t.mm_purity_desc}</p>
          </div>
      </section>

      {/* 5. FINANCIAL BREAKDOWN (The Calculator) */}
      <section className="py-24 bg-stone-900 relative overflow-hidden">
          <div className="particle-line"></div>
          
          <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{t.mm_opp_title}</h2>
                  <p className="text-lg text-stone-400 max-w-2xl mx-auto">{t.mm_opp_desc}</p>
              </div>

              {/* Dashboard Card */}
              <div className="bg-stone-800/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-stone-700 shadow-2xl relative group hover:border-cyan-500/30 transition-colors duration-500">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-cyan-900/10 to-transparent pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center mb-10 border-b border-stone-700 pb-4">
                      <h3 className="text-xl font-mono font-bold text-cyan-400 tracking-widest">{t.mm_calc_title}</h3>
                      <div className="flex gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500"></span>
                          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
                      <div className="text-center p-6 bg-black/40 rounded-xl border border-stone-600">
                          <div className="text-stone-500 text-xs uppercase tracking-widest mb-2">{t.mm_calc_cost_label}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{t.mm_calc_cost_val}</div>
                      </div>
                      
                      <div className="hidden md:flex justify-center text-stone-600 animate-pulse">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-8 h-8 ${isRtl ? 'rotate-180' : ''}`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                      </div>

                       <div className="text-center p-6 bg-black/40 rounded-xl border border-stone-600">
                          <div className="text-stone-500 text-xs uppercase tracking-widest mb-2">{t.mm_calc_rev_label}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono">{t.mm_calc_rev_val}</div>
                      </div>
                  </div>

                  <div className="mt-10 p-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl border border-green-500/30 text-center relative z-10 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                       <div className="text-emerald-400 text-sm uppercase tracking-[0.3em] mb-3">{t.mm_calc_profit_label}</div>
                       <div className="text-5xl sm:text-6xl font-black text-white drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">{t.mm_calc_profit_val}</div>
                  </div>
              </div>
          </div>
      </section>

      {/* 6. EXCLUSIVE BENEFITS */}
      <section className="py-24 bg-stone-950 border-t border-stone-800">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 mb-8 shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                    <span className="text-4xl text-black">👑</span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-200 mb-6">
                    {t.mm_exclusive_title}
                </h2>
                <p className="text-xl text-stone-400 mb-16 max-w-3xl mx-auto">
                    {t.mm_exclusive_desc}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: '💎', title: t.mm_benefit_1 },
                        { icon: '📈', title: t.mm_benefit_2 },
                        { icon: '🚀', title: t.mm_benefit_3 }
                    ].map((ben, i) => (
                        <div key={i} className="p-1 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 hover:from-amber-500 hover:to-orange-600 transition-all duration-500 group">
                            <div className="bg-stone-950 h-full w-full rounded-xl p-8 flex flex-col items-center justify-center group-hover:bg-stone-900 transition-colors">
                                <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-300">{ben.icon}</div>
                                <h3 className="text-lg font-bold text-white">{ben.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-32 bg-black text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent opacity-50"></div>
          <div className="max-w-3xl mx-auto px-6 relative z-10">
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 tracking-tight">{t.mm_final_title}</h2>
              <p className="text-xl text-stone-400 mb-12">{t.mm_final_text}</p>
               <a 
                href="https://wa.me/989196214129"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 btn-neon-green font-bold py-6 px-16 rounded-full text-2xl shadow-[0_0_50px_rgba(37,211,102,0.3)]"
            >
                <WhatsappIcon className="w-8 h-8" />
                {t.mm_cta}
            </a>
          </div>
      </section>

    </div>
  );
};

export default MakeMoneyPage;
