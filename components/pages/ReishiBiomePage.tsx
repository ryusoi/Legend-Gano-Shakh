
import React, { useState, useEffect } from 'react';
import type { Page } from '../../types';
import type { Language } from '../../translations';
import LinkIcon from '../icons/LinkIcon';

interface ReishiBiomePageProps {
  t: any;
  language: Language;
  navigate: (page: Page, anchor?: string) => void;
}

const ReishiBiomePage: React.FC<ReishiBiomePageProps> = ({ t, language, navigate }) => {
    const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useState(false);
    const [offset, setOffset] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setOffset(window.pageYOffset);
                if (window.scrollY > 500) {
                    setIsFloatingButtonVisible(true);
                } else {
                    setIsFloatingButtonVisible(false);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Biome%20(2).mp4";
  const nutripetVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Nutripet.mp4";
  const chamelionVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Biome%20Chamelion.mp4";
  const birdsVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/REISHI%20BIOME%20BIRDS.mp4";
  const nutripetUsageVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Nutripet%20Gano.mp4";
  const preventedDiseasesVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Nutripet%20Gano%20Shakh.mp4";
  const nutripetPromoVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Nutripet.mp4";

  const commercialLinks = [
    { name: 'MycoDog', url: 'https://mycodog.com', descKey: 'reishi_biome_link_desc_mycodog' },
    { name: 'Real Mushrooms', url: 'https://www.realmushrooms.com/pets', descKey: 'reishi_biome_link_desc_real_mushrooms' },
    { name: 'Host Defense', url: 'https://hostdefense.com', descKey: 'reishi_biome_link_desc_host_defense' },
    { name: 'GOBA', url: 'https://goba.eu', descKey: 'reishi_biome_link_desc_goba' },
    { name: 'Mushrooms 4 Pets', url: 'https://healthfulpets.co.uk', descKey: 'reishi_biome_link_desc_mushrooms4pets' },
    { name: 'Pet Wellbeing', url: 'https://petwellbeing.co.uk', descKey: 'reishi_biome_link_desc_pet_wellbeing' },
    { name: 'Buddy & Lola', url: 'https://www.petsathome.com', descKey: 'reishi_biome_link_desc_buddy_lola' },
    { name: 'NaturVet', url: 'https://www.iherb.com', descKey: 'reishi_biome_link_desc_naturvet' },
    { name: 'Hemp Heros', url: 'https://brownsnaturalpetstore.co.uk', descKey: 'reishi_biome_link_desc_hemp_heros' },
    { name: 'All Natural Pet', url: 'https://allnaturalpet.co.uk', descKey: 'reishi_biome_link_desc_all_natural_pet' },
    { name: 'EarthBuddyPet', url: 'https://earthbuddypet.com', descKey: 'reishi_biome_link_desc_earth_buddy' },
    { name: 'Retailers / Marketplaces', url: 'https://www.amazon.co.uk/s?k=reishi+for+dogs', descKey: 'reishi_biome_link_desc_marketplaces' },
  ];

  const scienceLinks = [
    { name: 'Functional properties study (2024)', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Ganoderma+lucidum+dogs+functional', descKey: 'reishi_biome_link_desc_study_functional' },
    { name: 'Clinical evidence & reviews', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Ganoderma+lucidum+review+2024', descKey: 'reishi_biome_link_desc_study_clinical' },
    { name: 'Veterinary trial listings', url: 'https://veterinaryclinicaltrials.org', descKey: 'reishi_biome_link_desc_vet_trials' },
    { name: 'Authoritative veterinary summaries', url: 'https://www.petmd.com/', descKey: 'reishi_biome_link_desc_vet_summaries' },
    { name: 'Foundational Pharmacology', url: 'https://pubmed.ncbi.nlm.nih.gov/', descKey: 'reishi_biome_link_desc_pharmacology' },
  ];

  const healthProblems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const preventionPoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className={`animate-fade-in ${language === 'fa' ? 'text-center' : ''}`}>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        `}</style>
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center text-center text-white overflow-hidden bg-black">
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
        
        <div className="relative z-10 p-4 max-w-5xl mx-auto">
          <h1 className="font-reishi-title text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.9)' }}>
            {t.reishi_biome_hero_title}
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-amber-100 font-semibold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
            {t.reishi_biome_hero_subtitle}
          </p>
          <p className="mt-6 text-base sm:text-lg text-white font-medium max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {t.reishi_biome_hero_caption}
          </p>
        </div>
      </section>

      {/* Critical Emphasis Section (The Miracle / Crisis) */}
      <section className="py-20 sm:py-28" style={{backgroundColor: 'var(--bg-secondary)'}}>
        <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Header: A Miracle */}
            <h2 className="text-3xl sm:text-5xl font-bold mb-12 text-white">{t.reishi_biome_miracle_title}</h2>
            
            {/* The Video */}
            <div className="max-w-6xl mx-auto mb-16">
                 <video 
                    src={nutripetVideoUrl} 
                    className="w-full rounded-2xl shadow-2xl dark:shadow-black/50"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                />
            </div>
            
            {/* Subtitle: The Silent Crisis */}
            <h3 className="text-2xl sm:text-3xl font-bold mb-12 text-slate-400">{t.reishi_biome_crisis_subtitle}</h3>

            {/* Grid of 17 Problems/Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {healthProblems.map((num) => (
                    <div key={num} className="p-6 rounded-2xl border transition-transform hover:-translate-y-2 hover:shadow-xl text-left" style={{backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)'}}>
                        <h4 className={`text-xl font-bold mb-4 text-amber-500 ${language === 'fa' ? 'text-right' : ''}`}>{t[`reishi_biome_prob_${num}_title`]}</h4>
                        <p className={`text-sm leading-relaxed opacity-90 ${language === 'fa' ? 'text-right' : ''}`} style={{color: 'var(--text-secondary)'}}>
                            {t[`reishi_biome_prob_${num}_text`]}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Bee Salvation & Pet Houses Sections */}
      <section className="py-20 sm:py-28">
         {/* Bee Salvation */}
         <div className="max-w-6xl mx-auto px-6 text-center mb-20 md:mb-28">
            <h3 className="font-reishi-title text-3xl sm:text-4xl mb-8">{t.reishi_biome_bees_title}</h3>
             <video 
                src={chamelionVideoUrl} 
                className="w-full rounded-2xl shadow-2xl dark:shadow-black/50 mb-8"
                autoPlay 
                loop 
                muted 
                playsInline 
            />
            <p className="mt-6 text-base sm:text-lg leading-loose max-w-4xl mx-auto" style={{color: 'var(--text-secondary)'}}>{t.reishi_biome_bees_p1}</p>
        </div>

         {/* Pet Houses */}
         <div className="max-w-6xl mx-auto px-6 text-center mt-20 md:mt-28">
            <h3 className="font-reishi-title text-3xl sm:text-4xl mb-8">{t.reishi_biome_houses_title}</h3>
            <video 
                src={birdsVideoUrl} 
                className="w-full rounded-2xl shadow-2xl dark:shadow-black/50 mb-8"
                autoPlay 
                loop 
                muted 
                playsInline 
            />
            <div className="max-w-4xl mx-auto">
                <p className="mt-6 text-base sm:text-lg leading-loose" style={{color: 'var(--text-secondary)'}}>{t.reishi_biome_houses_p1}</p>
                <p className="mt-4 text-base sm:text-lg leading-loose font-semibold">{t.reishi_biome_houses_p2}</p>
                <p className="mt-4 text-base sm:text-lg leading-loose whitespace-pre-wrap" style={{color: 'var(--text-secondary)'}}>{t.reishi_biome_houses_p3}</p>
            </div>
        </div>
      </section>

      {/* Nutripet Gano Usage Section */}
      <section className="py-20 sm:py-28" style={{backgroundColor: 'var(--bg-secondary)'}}>
        <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="font-reishi-title text-3xl sm:text-4xl mb-8">{t.reishi_biome_nutripet_usage_title}</h3>
             <video 
                src={nutripetUsageVideoUrl} 
                className="w-full rounded-2xl shadow-2xl dark:shadow-black/50 mb-8"
                autoPlay 
                loop 
                muted 
                playsInline 
            />
            <p className="mt-6 text-base sm:text-lg leading-loose max-w-4xl mx-auto whitespace-pre-wrap" style={{color: 'var(--text-secondary)'}}>
                {t.reishi_biome_nutripet_usage_text}
            </p>
        </div>
      </section>

      {/* Prevention & Clinical Record Section */}
      <section className="py-20 sm:py-28" style={{backgroundColor: 'var(--bg-primary)'}}>
        <div className="max-w-6xl mx-auto px-6 text-center">
             <h3 className="font-reishi-title text-3xl sm:text-4xl mb-8">{t.reishi_biome_prevention_title}</h3>
             <video
                src={preventedDiseasesVideoUrl}
                className="w-full rounded-2xl shadow-2xl dark:shadow-black/50 mb-8"
                autoPlay 
                loop 
                muted 
                playsInline 
            />
            <p className="mt-6 text-lg leading-loose max-w-4xl mx-auto mb-12 font-semibold">
                {t.reishi_biome_prevention_intro}
            </p>
            
            {/* NEW SECTION: Nutripet Promo Video */}
            <div className="my-12">
                <video
                    src={nutripetPromoVideoUrl}
                    className="w-full rounded-2xl shadow-2xl dark:shadow-black/50 mb-6"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                />
                <h4 className="text-2xl font-bold mt-6 mb-4 text-amber-400">{t.reishi_biome_nutripet_promo_title}</h4>
                <p className="text-lg leading-relaxed max-w-4xl mx-auto" style={{color: 'var(--text-secondary)'}}>{t.reishi_biome_nutripet_promo_text}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {preventionPoints.map(i => (
                    <div key={i} className="p-6 rounded-xl border transition-transform hover:-translate-y-1" style={{backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)'}}>
                        <h4 className={`text-xl font-bold mb-2 text-amber-500 ${language === 'fa' ? 'text-right' : ''}`}>{t[`reishi_biome_prev_${i}_title`]}</h4>
                        <p className={`text-sm opacity-90 ${language === 'fa' ? 'text-right' : ''}`} style={{color: 'var(--text-secondary)'}}>{t[`reishi_biome_prev_${i}_text`]}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-20 sm:py-28">
         <div className="max-w-7xl mx-auto px-6 text-center">
             <h3 className="font-reishi-title text-3xl sm:text-4xl mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                 {t.reishi_biome_links_title}
             </h3>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 {/* Commercial Links */}
                 <div>
                     <h4 className="text-2xl font-bold mb-6 text-amber-300">{t.reishi_biome_links_commercial_title}</h4>
                     <div className="space-y-4">
                        {commercialLinks.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border transition-transform hover:-translate-y-1 hover:shadow-lg" style={{backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)'}}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-lg">{link.name}</span>
                                    <LinkIcon className="w-5 h-5 text-amber-400" />
                                </div>
                                <p className={`text-sm opacity-80 ${language === 'fa' ? 'text-right' : 'text-left'}`} style={{color: 'var(--text-secondary)'}}>{t[link.descKey]}</p>
                            </a>
                        ))}
                     </div>
                 </div>

                 {/* Science Links */}
                 <div>
                     <h4 className="text-2xl font-bold mb-6 text-amber-300">{t.reishi_biome_links_science_title}</h4>
                     <div className="space-y-4">
                        {scienceLinks.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border transition-transform hover:-translate-y-1 hover:shadow-lg" style={{backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)'}}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-lg">{link.name}</span>
                                    <LinkIcon className="w-5 h-5 text-amber-400" />
                                </div>
                                <p className={`text-sm opacity-80 ${language === 'fa' ? 'text-right' : 'text-left'}`} style={{color: 'var(--text-secondary)'}}>{t[link.descKey]}</p>
                            </a>
                        ))}
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Instagram Community Section */}
      {/* FIX: Casted the style object to React.CSSProperties to allow for CSS custom properties used by Tailwind CSS. */}
      <section className="py-20 sm:py-28 bg-gradient-to-t" style={{'--tw-gradient-from': 'var(--bg-secondary)', '--tw-gradient-to': 'transparent'} as React.CSSProperties}>
        <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="font-reishi-title text-3xl sm:text-4xl">{t.reishi_biome_instagram_title}</h3>
            <p className="mt-6 text-base sm:text-lg leading-loose" style={{color: 'var(--text-secondary)'}}>{t.reishi_biome_instagram_p1}</p>
            <p className="mt-4 text-base sm:text-lg leading-loose" style={{color: 'var(--text-secondary)'}}>{t.reishi_biome_instagram_p2}</p>
            <a 
                href="https://www.instagram.com/reishibiome/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-block btn-glowing-gold font-bold py-4 px-10 rounded-full text-lg"
            >
                {t.reishi_biome_instagram_cta}
            </a>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-xl sm:text-2xl leading-relaxed font-bold">{t.reishi_biome_final_cta_p1}</p>
            <p className="mt-8 text-lg sm:text-xl" style={{color: 'var(--text-secondary)'}}>{t.reishi_biome_final_cta_p2}</p>
             <button
                onClick={() => navigate('contact')}
                className="mt-10 inline-block btn-glowing-gold font-bold py-4 px-10 rounded-full text-lg"
            >
                {t.reishi_biome_final_cta_button}
            </button>
        </div>
      </section>
      
      {/* Floating Instagram Button */}
      <a
        href="https://www.instagram.com/reishibiome/"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 btn-glowing-gold font-bold py-3 px-6 rounded-full text-base shadow-lg transition-all duration-300 ${isFloatingButtonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        aria-label="Follow the Reishi Biome Movement"
      >
        @reishibiome
      </a>
    </div>
  );
};

export default ReishiBiomePage;
