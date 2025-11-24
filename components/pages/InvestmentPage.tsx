
import React, { useState, useEffect, useRef } from 'react';
import WhatsappIcon from '../icons/WhatsappIcon';

interface InvestmentPageProps {
  t: any;
  language: 'en' | 'fa' | 'es';
}

// --- Reusable Intersection Observer Hook ---
const useOnScreen = (options: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
            }
        }, options);
        if (ref.current) observer.observe(ref.current);
        return () => { if(ref.current) observer.unobserve(ref.current); }
    }, [ref, options]);
    return [ref, visible] as const;
}

const FadeInSection: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className, delay = 0 }) => {
    const [ref, visible] = useOnScreen({ threshold: 0.15 });
    return (
        <div ref={ref} className={`transition-all duration-1000 ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

// --- SVG Charts Components ---
const LineChartSVG = () => (
    <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
        {/* Grid Lines */}
        <line x1="0" y1="180" x2="500" y2="180" stroke="#444" strokeWidth="1" />
        <line x1="0" y1="120" x2="500" y2="120" stroke="#444" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="0" y1="60" x2="500" y2="60" stroke="#444" strokeWidth="0.5" strokeDasharray="4 4" />
        
        {/* The Rocket Trajectory Line */}
        <path 
            d="M0,180 C100,170 200,160 300,80 C400,20 450,10 500,5" 
            fill="none" 
            stroke="#FFD700" 
            strokeWidth="4" 
            strokeLinecap="round"
            className="animate-draw-path"
        />
        {/* Area under curve */}
        <path 
            d="M0,180 C100,170 200,160 300,80 C400,20 450,10 500,5 V200 H0 Z" 
            fill="url(#gradientGold)" 
            opacity="0.3" 
        />
        <defs>
            <linearGradient id="gradientGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD700"/>
                <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
        </defs>
        
        {/* Points */}
        <circle cx="0" cy="180" r="4" fill="#fff" />
        <circle cx="250" cy="110" r="4" fill="#fff" />
        <circle cx="500" cy="5" r="4" fill="#fff" />
        
        {/* Labels */}
        <text x="10" y="195" fill="#aaa" fontSize="10">2020</text>
        <text x="240" y="195" fill="#aaa" fontSize="10">2028</text>
        <text x="470" y="195" fill="#aaa" fontSize="10">2035</text>
    </svg>
);

const WaterfallChartSVG = () => (
     <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
         {/* Year 1 */}
         <rect x="20" y="140" width="60" height="60" fill="#166534" rx="4" />
         <text x="50" y="130" fill="#FFD700" fontSize="12" textAnchor="middle" fontWeight="bold">60%</text>
         <text x="50" y="215" fill="#ccc" fontSize="10" textAnchor="middle">Year 1</text>
         
         {/* Year 2 */}
         <rect x="110" y="80" width="60" height="120" fill="#15803d" rx="4" />
         <text x="140" y="70" fill="#FFD700" fontSize="12" textAnchor="middle" fontWeight="bold">150%</text>
         <text x="140" y="215" fill="#ccc" fontSize="10" textAnchor="middle">Year 2</text>

         {/* Year 3 */}
         <rect x="200" y="40" width="60" height="160" fill="#16a34a" rx="4" />
         <text x="230" y="30" fill="#FFD700" fontSize="12" textAnchor="middle" fontWeight="bold">400%</text>
         <text x="230" y="215" fill="#ccc" fontSize="10" textAnchor="middle">Year 3</text>
         
         {/* Year 5 (Cumulative) */}
         <rect x="300" y="0" width="80" height="200" fill="url(#goldBar)" rx="4" />
         <text x="340" y="-10" fill="#FFD700" fontSize="14" textAnchor="middle" fontWeight="bold">1200%</text>
         <text x="340" y="215" fill="#ccc" fontSize="10" textAnchor="middle">Year 5</text>
         
         <defs>
            <linearGradient id="goldBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBBF24"/>
                <stop offset="100%" stopColor="#B45309"/>
            </linearGradient>
         </defs>
     </svg>
);


const InvestmentPage: React.FC<InvestmentPageProps> = ({ t, language }) => {
  const [offset, setOffset] = useState(0);
  const isRtl = language === 'fa';

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setOffset(window.pageYOffset));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const videoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Investment%20Mushrooms.mp4";

  return (
    <div className={`bg-stone-950 text-stone-100 font-sans ${isRtl ? 'font-reishi-body' : ''}`}>
      <style>{`
        .animate-draw-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: dash 3s linear forwards;
        }
        @keyframes dash {
            to { stroke-dashoffset: 0; }
        }
        .gold-text {
            background: linear-gradient(to right, #fef08a, #d97706, #fef08a);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: shine 3s linear infinite;
        }
        @keyframes shine {
            to { background-position: 200% center; }
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-10%] left-0 w-full h-[120%] z-0 pointer-events-none" style={{ transform: `translateY(${offset * 0.5}px)` }}>
          <video src={videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-stone-950 z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 gold-text drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                {t.invest_hero_title}
            </h1>
            <p className="text-xl sm:text-2xl text-stone-200 font-light mb-10 max-w-3xl mx-auto drop-shadow-md">
                {t.invest_hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-transform transform hover:scale-105 text-lg">
                    {t.invest_cta_consulting}
                </button>
                <button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-transform transform hover:scale-105 text-lg border border-yellow-400/50">
                    {t.invest_cta_franchise}
                </button>
            </div>
        </div>
      </section>

      {/* 2. MARKET EXPLOSION */}
      <section className="py-24 bg-stone-950 relative">
          <div className="max-w-6xl mx-auto px-6">
              <FadeInSection>
                  <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                      {t.invest_market_title}
                  </h2>
              </FadeInSection>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <FadeInSection delay={200}>
                      <div className="space-y-8">
                          {[
                              { label: t.invest_market_stat_1, val: '$73.8B', sub: 'Projected 2032' },
                              { label: t.invest_market_stat_2, val: '13.1%', sub: 'Compound Annual Growth' },
                              { label: t.invest_market_stat_3, val: '+41%', sub: 'Regional Spike (2023)' }
                          ].map((stat, idx) => (
                              <div key={idx} className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800 flex items-center justify-between hover:border-emerald-500/30 transition-colors">
                                  <div>
                                      <p className="text-stone-400 text-sm uppercase tracking-widest">{stat.label}</p>
                                      <p className="text-stone-500 text-xs">{stat.sub}</p>
                                  </div>
                                  <div className="text-4xl font-bold text-emerald-400">{stat.val}</div>
                              </div>
                          ))}
                      </div>
                  </FadeInSection>
                  
                  <FadeInSection delay={400}>
                      <div className="h-80 bg-stone-900/80 p-6 rounded-2xl border border-stone-800 shadow-2xl">
                          <LineChartSVG />
                      </div>
                  </FadeInSection>
              </div>
          </div>
      </section>

      {/* 3. HISTORY & DOMINANCE (Timeline) */}
      <section className="py-24 bg-stone-900">
          <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-serif text-amber-200 text-center mb-12">{t.invest_history_title}</h2>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-8">
                  {/* Timeline Line */}
                  <div className="absolute top-4 left-4 md:left-0 md:top-1/2 w-1 md:w-full h-full md:h-1 bg-stone-700 z-0"></div>
                  
                  {[
                      { year: '1984', text: t.invest_timeline_1984 },
                      { year: '2015', text: t.invest_timeline_2015 },
                      { year: '2020', text: t.invest_timeline_2020 },
                      { year: '2025', text: t.invest_timeline_2025 },
                  ].map((item, idx) => (
                      <div key={idx} className="relative z-10 flex md:flex-col items-center gap-4 bg-stone-900 p-4 md:p-0 rounded-lg md:bg-transparent w-full md:w-auto">
                          <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
                          <div className="md:text-center">
                              <span className="block text-2xl font-bold text-white">{item.year}</span>
                              <span className="text-sm text-stone-400">{item.text}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 4. OPTION 1: CONSULTING */}
      <section className="py-24 bg-stone-950">
          <div className="max-w-6xl mx-auto px-6">
              <FadeInSection>
                <div className="bg-gradient-to-br from-stone-900 to-black border border-emerald-900/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="text-center mb-12">
                        <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Option 1: Turnkey Consulting</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{t.invest_opt1_title}</h2>
                        <p className="text-stone-400 mt-2">{t.invest_opt1_subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <ul className="space-y-4">
                            {[1, 2, 3, 4, 5].map(n => (
                                <li key={n} className="flex items-start gap-3 text-stone-300">
                                    <span className="text-emerald-500 mt-1">✓</span>
                                    <span>{t[`invest_opt1_benefit_${n}`]}</span>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="bg-stone-800/50 rounded-xl p-6 border border-stone-700">
                            <h4 className="font-bold text-white mb-4">Cost & Time Efficiency</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-red-400">DIY / Local Contractor</span>
                                        <span className="text-red-400 font-bold">$1.5M Avg</span>
                                    </div>
                                    <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-900 w-[90%]"></div>
                                    </div>
                                    <p className="text-xs text-stone-500 mt-1 text-right">{t.invest_opt1_comparison_diy}</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-emerald-400">Gano Shakh System</span>
                                        <span className="text-emerald-400 font-bold">$500K Avg</span>
                                    </div>
                                    <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[33%]"></div>
                                    </div>
                                    <p className="text-xs text-stone-500 mt-1 text-right">{t.invest_opt1_comparison_us}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-lg text-center">
                        <p className="text-emerald-300 font-bold text-lg">{t.invest_opt1_profit_claim}</p>
                    </div>
                </div>
              </FadeInSection>
          </div>
      </section>

      {/* 5. OPTION 2: FRANCHISE */}
      <section className="py-24 bg-stone-900">
          <div className="max-w-6xl mx-auto px-6">
              <FadeInSection>
                <div className="bg-gradient-to-br from-stone-900 to-black border border-amber-600/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

                     <div className="text-center mb-12">
                        <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">Option 2: Co-Investment Franchise</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{t.invest_opt2_title}</h2>
                        <p className="text-amber-100/80 mt-2 font-serif italic">{t.invest_opt2_subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-stone-300 leading-relaxed mb-8 border-l-4 border-amber-500 pl-4">
                                {t.invest_opt2_desc}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-stone-800 rounded-lg border border-stone-700">
                                    <div className="text-3xl">🤝</div>
                                    <div className="font-bold text-white mt-2">Joint Venture</div>
                                </div>
                                <div className="p-4 bg-stone-800 rounded-lg border border-stone-700">
                                    <div className="text-3xl">🚀</div>
                                    <div className="font-bold text-white mt-2">Turnkey Ops</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-black/40 p-6 rounded-2xl border border-white/5 h-64 relative">
                             <h4 className="absolute top-4 left-6 text-xs text-stone-500 uppercase tracking-widest">Projected ROI Waterfall</h4>
                             <div className="mt-8 h-full">
                                 <WaterfallChartSVG />
                             </div>
                        </div>
                    </div>
                </div>
              </FadeInSection>
          </div>
      </section>

      {/* 6. PROOF */}
      <section className="py-24 bg-stone-950">
          <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{t.invest_proof_title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <img src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-19-19-16-43-725.jpg" className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500" alt="Facility 1" />
                  <img src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Grow%20room.jpg" className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500" alt="Facility 2" />
                  <img src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-23-11-24-01-235.jpg" className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500" alt="Facility 3" />
              </div>
              
              <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-full py-4 px-8 inline-block mb-16">
                  <span className="text-2xl font-bold text-emerald-400">{t.invest_proof_yield_claim}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-stone-900 rounded-xl border border-stone-800 italic text-stone-400">
                      {t.invest_testimonial_1}
                      <div className="mt-4 not-italic font-bold text-white text-sm">— Ahmed K., Dubai Partner</div>
                  </div>
                  <div className="p-6 bg-stone-900 rounded-xl border border-stone-800 italic text-stone-400">
                      {t.invest_testimonial_2}
                       <div className="mt-4 not-italic font-bold text-white text-sm">— Dr. Sergey V., Almaty Partner</div>
                  </div>
              </div>
          </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 bg-gradient-to-t from-black to-stone-900 text-center">
          <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-200 mb-6">
                  {t.invest_final_title}
              </h2>
              <p className="text-stone-400 mb-12 text-lg">{t.invest_final_subtitle}</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-lg shadow-lg transform transition hover:-translate-y-1">
                      Start Consulting
                  </button>
                  <button className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 px-10 rounded-lg shadow-lg transform transition hover:-translate-y-1">
                      Apply for Franchise
                  </button>
              </div>
          </div>
      </section>

      {/* Floating Whatsapp */}
      <a 
        href="https://wa.me/989196214129" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
          <WhatsappIcon className="w-8 h-8" />
      </a>

    </div>
  );
};

export default InvestmentPage;
