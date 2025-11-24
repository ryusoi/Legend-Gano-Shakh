
import React, { useState, useEffect } from 'react';
import type { Page } from '../../types';
import type { Language } from '../../translations';

interface ReishiDecorPageProps {
  t: any;
  language: Language;
  navigate: (page: Page, anchor?: string) => void;
}

const ReishiDecorPage: React.FC<ReishiDecorPageProps> = ({ t, language, navigate }) => {
    const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useState(false);
    const [offset, setOffset] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setOffset(window.pageYOffset);
                setIsFloatingButtonVisible(window.pageYOffset > 500);
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
  const indoorVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%20Immortality.mp4";
  const outdoorVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%20Natural%20Sculpture.mp4";
  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%202.mp4";
  const fragileDoseVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/REISHI%20DECOR%20A%20Fragile%20Dose%20of%20Health.mp4";

  return (
    <div className={`font-reishi-body animate-fade-in ${language === 'fa' ? 'text-center' : ''}`}>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        `}</style>
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Video Background with Parallax */}
        <div 
          className="absolute top-[-10%] left-0 w-full h-[120%] pointer-events-none will-change-transform"
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
        
        {/* Content */}
        <div className="relative z-10 p-4 max-w-4xl mx-auto drop-shadow-2xl">
          <h1 className="font-reishi-title text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-200" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            {t.reishi_decor_hero_title}
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-amber-100 font-reishi-title italic font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            {t.reishi_decor_hero_subtitle}
          </p>
          <p className="mt-6 text-base sm:text-lg text-white font-bold tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t.reishi_decor_hero_caption}
          </p>
        </div>
      </section>

      {/* Main Introduction */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-reishi-title text-3xl sm:text-4xl italic">{t.reishi_decor_intro_title}</h2>
            <p className="mt-8 text-lg sm:text-xl leading-relaxed" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_intro_p1}</p>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed font-bold">{t.reishi_decor_intro_p2}</p>
            
            <div className="mt-12 space-y-6 border-t border-b py-12 text-center" style={{ borderColor: 'var(--border-secondary)'}}>
                <p className="text-base sm:text-lg leading-loose" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_intro_p3}</p>
                <p className="text-base sm:text-lg leading-loose" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_intro_p4}</p>
            </div>
        </div>
      </section>

       {/* Science & Energy Section */}
      <section className="py-20 sm:py-28" style={{backgroundColor: 'var(--bg-secondary)'}}>
        <div className="max-w-4xl mx-auto px-6 space-y-6 text-center">
            <p className="text-base sm:text-lg leading-loose" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_science_p1}</p>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed italic" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_science_p2}</p>
            <p className="text-base sm:text-lg leading-loose" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_science_p3}</p>
        </div>
      </section>

      {/* Placement Ideas Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className={`${language === 'fa' ? 'text-center' : 'text-left md:text-center'}`}>
                <video 
                    src={fragileDoseVideoUrl} 
                    className="rounded-lg shadow-lg dark:shadow-2xl dark:shadow-black/50 w-full object-cover mb-8"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                 />
                <h3 className="font-reishi-title text-3xl sm:text-4xl text-center">{t.reishi_decor_indoor_title}</h3>
                <p className="mt-6 text-base sm:text-lg leading-loose whitespace-pre-wrap text-center" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_indoor_text}</p>
            </div>
            <div className="flex flex-col items-center">
                 <video 
                    src={indoorVideoUrl} 
                    className="rounded-lg shadow-lg dark:shadow-2xl dark:shadow-black/50 w-full object-cover mb-6"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                 />
                 <a 
                    href="https://www.youtube.com/@Reishidecor/shorts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: '#FFD700', color: '#000000' }}
                 >
                     {t.reishi_decor_video_btn}
                 </a>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20 md:mt-28">
            <div className="order-last md:order-first flex justify-center">
                 <video 
                    src={outdoorVideoUrl} 
                    className="rounded-lg shadow-lg dark:shadow-2xl dark:shadow-black/50 w-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                 />
            </div>
            <div className="text-center">
                <h3 className="font-reishi-title text-3xl sm:text-4xl">{t.reishi_decor_outdoor_title}</h3>
                <p className="mt-6 text-base sm:text-lg leading-loose whitespace-pre-wrap" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_outdoor_text}</p>
            </div>
        </div>
      </section>

      {/* Instagram Community Section */}
      {/* FIX: Casted the style object to React.CSSProperties to allow for CSS custom properties used by Tailwind CSS. */}
      <section className="py-20 sm:py-28 bg-gradient-to-t" style={{'--tw-gradient-from': 'var(--bg-secondary)', '--tw-gradient-to': 'transparent'} as React.CSSProperties}>
        <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="font-reishi-title text-3xl sm:text-4xl">{t.reishi_decor_instagram_title}</h3>
            <p className="mt-6 text-base sm:text-lg leading-loose" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_instagram_p1}</p>
            <p className="mt-4 text-base sm:text-lg leading-loose" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_instagram_p2}</p>
            <a 
                href="https://www.instagram.com/reishidecor/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-block btn-gold font-bold py-4 px-10 rounded-full text-lg"
            >
                {t.reishi_decor_instagram_cta}
            </a>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="font-reishi-title text-xl sm:text-2xl italic leading-relaxed" style={{color: 'var(--text-secondary)'}}>{t.reishi_decor_final_cta_p1}</p>
            <p className="mt-8 text-lg sm:text-xl font-bold">{t.reishi_decor_final_cta_p2}</p>
             <button
                onClick={() => navigate('contact')}
                className="mt-10 inline-block btn-gold font-bold py-4 px-10 rounded-full text-lg"
            >
                {t.reishi_decor_final_cta_button}
            </button>
        </div>
      </section>
      
      {/* Floating Instagram Button */}
      <a
        href="https://www.instagram.com/reishidecor/"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 btn-gold font-bold py-3 px-6 rounded-full text-base shadow-lg transition-all duration-300 ${isFloatingButtonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        aria-label="Follow us on Instagram"
      >
        @reishidecor
      </a>

    </div>
  );
};

export default ReishiDecorPage;
