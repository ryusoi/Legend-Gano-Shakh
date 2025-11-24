
import React, { useState, useEffect } from 'react';
import type { Page } from '../../types';
import type { Language } from '../../translations';

interface ReishiExtractPageProps {
  t: any;
  language: Language;
  navigate: (page: Page, anchor?: string) => void;
}

const ReishiExtractPage: React.FC<ReishiExtractPageProps> = ({ t, language, navigate }) => {
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

    const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoderma%20Extract.mp4";

  return (
    <div className={`animate-fade-in font-reishi-body text-slate-100 ${language === 'fa' ? 'text-center' : ''}`}>
       <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            .amber-gradient-text {
                background: linear-gradient(to right, #fbbf24, #d97706, #fbbf24);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-size: 200% auto;
            }
        `}</style>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-stone-950">
        {/* Parallax Video Background */}
        <div 
          className="absolute top-0 left-0 w-full h-[120%] pointer-events-none will-change-transform"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        >
             <video 
                src={heroVideoUrl} 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline 
            />
        </div>
        
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h1 className="font-reishi-title text-5xl sm:text-7xl font-bold tracking-tight amber-gradient-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-6">
                {t.reishi_extract_hero_title}
            </h1>
            <p className="text-xl sm:text-2xl text-stone-100 tracking-widest uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {t.reishi_extract_hero_subtitle}
            </p>
        </div>
      </section>

      {/* Overview & Potency */}
      <section className="py-20 bg-stone-950">
        <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="font-reishi-title text-3xl sm:text-4xl text-amber-200 mb-6">{t.reishi_extract_overview_title}</h2>
                    <p className="text-lg text-stone-300 leading-relaxed mb-8 whitespace-pre-wrap">
                        {t.reishi_extract_overview_text}
                    </p>
                    
                    <div className="p-6 rounded-2xl bg-stone-900/50 border border-amber-900/30 shadow-inner mb-8">
                        <h3 className="text-xl font-bold text-amber-400 mb-2">{t.reishi_extract_potency_title}</h3>
                        <p className="text-stone-300">{t.reishi_extract_potency_text}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                            <span className="block text-3xl mb-2">⚗️</span>
                            <span className="text-sm text-stone-400">Merck Ethanol (Germany)</span>
                        </div>
                        <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
                            <span className="block text-3xl mb-2">💧</span>
                            <span className="text-sm text-stone-400">Mountain Spring Water</span>
                        </div>
                    </div>
                </div>
                
                {/* Video Section */}
                <div className="flex flex-col gap-6">
                    <video 
                        src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganodrma%20Extract%20Top.mp4" 
                        className="w-full rounded-2xl border border-white/10 shadow-2xl"
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                    />
                    
                    <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-center">
                         <h3 className="text-lg font-bold text-amber-400 mb-2">{t.reishi_extract_packaging_title}</h3>
                         <p className="text-sm text-stone-300">{t.reishi_extract_packaging_text}</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-reishi-title text-3xl sm:text-4xl text-amber-200 mb-12 text-center">{t.reishi_extract_benefits_title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: t.reishi_extract_ben_immune, desc: t.reishi_extract_ben_immune_desc, icon: '🛡️' },
                    { title: t.reishi_extract_ben_longevity, desc: t.reishi_extract_ben_longevity_desc, icon: '♾️' },
                    { title: t.reishi_extract_ben_detox, desc: t.reishi_extract_ben_detox_desc, icon: '🍃' },
                    { title: t.reishi_extract_ben_dna, desc: t.reishi_extract_ben_dna_desc, icon: '🧬' },
                    { title: t.reishi_extract_ben_cardio, desc: t.reishi_extract_ben_cardio_desc, icon: '❤️' },
                    { title: t.reishi_extract_ben_nervous, desc: t.reishi_extract_ben_nervous_desc, icon: '🧠' },
                    { title: t.reishi_extract_ben_cancer, desc: t.reishi_extract_ben_cancer_desc, icon: '🔬' },
                ].map((item, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-stone-800 border border-stone-700 hover:border-amber-600 transition-colors">
                        <div className="text-3xl mb-4">{item.icon}</div>
                        <h3 className="text-lg font-bold text-amber-100 mb-2">{item.title}</h3>
                        <p className="text-sm text-stone-400">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Usage & Taste */}
      <section className="py-20 bg-stone-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-16">
                <h2 className="font-reishi-title text-3xl text-amber-200 mb-6">{t.reishi_extract_taste_title}</h2>
                <p className="text-stone-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    {t.reishi_extract_taste_text}
                </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 shadow-2xl">
                <h3 className="text-2xl font-bold text-amber-400 mb-4">{t.reishi_extract_usage_title}</h3>
                <p className="text-lg text-stone-200 leading-relaxed mb-8">
                    {t.reishi_extract_usage_text}
                </p>
                
                <div className="pt-8 border-t border-stone-700">
                    <h3 className="text-2xl font-serif text-white mb-6">{t.reishi_extract_cta_title}</h3>
                    <button
                        onClick={() => navigate('products')}
                        className="inline-block bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-500 hover:to-yellow-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform hover:scale-105 shadow-lg shadow-amber-900/50"
                    >
                        {t.reishi_extract_cta_btn}
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ReishiExtractPage;
