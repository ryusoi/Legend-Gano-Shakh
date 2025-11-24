
import React, { useState, useEffect } from 'react';
import type { Page } from '../../types';
import type { Language } from '../../translations';
import LinkIcon from '../icons/LinkIcon';

interface ReishiCreamPageProps {
  t: any;
  language: Language;
  navigate: (page: Page, anchor?: string) => void;
}

const IngredientCard: React.FC<{ title: string, desc: string }> = ({ title, desc }) => (
    <div className="p-4 rounded-xl border bg-stone-800/50 border-stone-700 backdrop-blur-sm h-full shadow-lg flex flex-col">
        <span className="text-amber-200 font-bold mb-2">{title.split('—')[0]}</span>
        <span className="text-stone-400 text-sm leading-snug">{desc}</span>
    </div>
);

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-stone-800/30 border border-stone-700/50">
        <span className="text-amber-500 mt-1 text-xl">✦</span>
        <span className="text-stone-200 font-medium leading-relaxed">{text}</span>
    </div>
);

const ReishiCreamPage: React.FC<ReishiCreamPageProps> = ({ t, language, navigate }) => {
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

  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Night%20Cream.mp4";
  const ganoLunaVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Luna.mp4";
  const ganoSolVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Sol.mp4";
  const ganodermaMiracleVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoderma%20Cream%20Miracle.mp4";

  const brandLinks = [
    { name: 'Shiseido — Ultimune', url: 'https://www.shiseido.com', desc: 'Product listings show Reishi / reishi extract in Ultimune' },
    { name: 'L’Oréal (Yuesai brand)', url: 'https://www.loreal.com/en/loreal-luxe/yuesai/', desc: 'Vitalize Ganoderma toner / Yuesai Ganoderma range' },
    { name: 'Origins (Estée Lauder)', url: 'https://www.origins.com', desc: 'Mega-Mushroom range references Reishi' },
    { name: 'Grown Alchemist', url: 'https://grownalchemist.com', desc: 'Anti-Pollution Primer & other products listing Ganoderma' },
    { name: 'EWG Skin Deep Database', url: 'https://www.ewg.org/skindeep/browse/ingredients/726317-GANODERMA_LUCIDUM_REISHI_EXTRACT/', desc: 'Brands indexed by EWG containing Ganoderma lucidum' },
    { name: 'TRI-K — NaturePep®', url: 'https://www.tri-k.com/solutions/p/naturepep-ganoderma', desc: 'Active ingredient peptide built from Ganoderma' },
    { name: 'Rahn Group — Liftonin®-QI', url: 'https://www.rahn-group.com/en/cosmetics/cosmetic-actives/tales-from-plants-and-mushrooms/ganoderma-lucidum/', desc: 'Cosmetic active developed using Ganoderma lucidum' },
  ];

  const scienceLinks = [
    { name: 'Emerging Roles of Ganoderma in Anti-Aging', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5758346/', desc: 'PMC Review of mechanisms and applications' },
    { name: 'Preventive and Therapeutic Effect of Ganoderma', url: 'https://pubmed.ncbi.nlm.nih.gov/31777026/', desc: 'Review covering potential skin benefits' },
    { name: 'Spore Oil in Early Skin Wound Healing', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7425473/', desc: 'Preclinical topical / formulation study' },
    { name: 'Ethanol Extracts Enhance Re-epithelialization', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7557611/', desc: 'In vitro / in vivo study on anti-inflammatory responses' },
    { name: 'Case Report: Cutaneous Sarcoidosis', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4799037/', desc: 'Resolution following topical application of Ganoderma' },
    { name: 'Attenuates UV-induced Skin Tumorigenesis', url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0265615/', desc: 'Study showing protective effects in models' },
    { name: 'Active Constituents & Biological Activities', url: 'https://biomeddermatol.biomedcentral.com/articles/10.1186/s41702-019-0044-0', desc: 'Biomedical Dermatology review' },
  ];

  return (
    <div className={`animate-fade-in font-reishi-body text-slate-100 ${language === 'fa' ? 'text-center' : ''}`}>
       <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            .gold-gradient-text {
                background: linear-gradient(to right, #FDE68A, #D97706, #FDE68A);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-size: 200% auto;
            }
        `}</style>

      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden bg-stone-950">
        {/* Parallax Video Background */}
        <div 
          className="absolute top-0 left-0 w-full h-[120%] pointer-events-none will-change-transform"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        >
            <video 
                src={heroVideoUrl} 
                className="w-full h-full object-cover opacity-80"
                autoPlay 
                loop 
                muted 
                playsInline 
            />
        </div>
        
        {/* Overlay Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-stone-950/90 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 mt-20">
            <h1 className="font-reishi-title text-5xl sm:text-7xl font-bold tracking-tight gold-gradient-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-6">
                {t.reishi_cream_hero_title}
            </h1>
            <p className="text-xl sm:text-2xl text-stone-100 tracking-widest uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {t.reishi_cream_hero_subtitle}
            </p>
        </div>
      </section>

      {/* Gano Luna Detail Section */}
      <section id="gano-luna" className="py-24 bg-stone-900 relative overflow-hidden">
         <div className="max-w-6xl mx-auto px-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                 <div className="order-2 lg:order-1">
                     <h2 className="font-reishi-title text-4xl sm:text-5xl text-amber-200 mb-6">{t.cream_luna_title}</h2>
                     <p className="text-lg text-stone-300 leading-loose mb-8 border-l-4 border-amber-500/50 pl-6">
                         {t.cream_luna_intro}
                     </p>
                     
                     <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{t.cream_luna_ing_title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7].map(n => (
                                <IngredientCard key={n} title={t[`cream_luna_ing_${n}`]} desc={t[`cream_luna_ing_${n}`].split('—')[1] || ''} />
                            ))}
                        </div>
                     </div>
                 </div>
                 <div className="order-1 lg:order-2">
                      <div className="rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20 relative group">
                          <div className="absolute inset-0 bg-amber-500/10 group-hover:opacity-0 transition-opacity pointer-events-none"></div>
                          <video
                            src={ganoLunaVideoUrl}
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                        />
                      </div>
                 </div>
             </div>

             <div className="bg-stone-800/50 rounded-3xl p-8 md:p-12 border border-stone-700">
                 <h3 className="text-2xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">{t.cream_luna_benefits_title}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                     {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                         <BenefitItem key={n} text={t[`cream_luna_benefit_${n}`]} />
                     ))}
                 </div>
                 <div className="text-center border-t border-stone-700 pt-8">
                     <p className="text-lg italic text-amber-100 font-medium">{t.cream_luna_result}</p>
                 </div>
             </div>
         </div>
      </section>

      {/* Gano Sol Detail Section */}
      <section id="gano-sol" className="py-24 bg-stone-950 relative overflow-hidden border-t border-stone-800">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/5 to-transparent pointer-events-none"></div>
         <div className="max-w-6xl mx-auto px-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                 <div className="order-1">
                      <div className="rounded-2xl overflow-hidden shadow-2xl border border-blue-400/20 relative group">
                          <video
                            src={ganoSolVideoUrl}
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                        />
                      </div>
                 </div>
                 <div className="order-2">
                     <h2 className="font-reishi-title text-4xl sm:text-5xl text-amber-200 mb-6">{t.cream_sol_title}</h2>
                     <p className="text-lg text-stone-300 leading-loose mb-8 border-l-4 border-blue-500/50 pl-6">
                         {t.cream_sol_intro}
                     </p>
                     
                     <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{t.cream_sol_ing_title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             {[1, 2, 3, 4, 5, 6, 7].map(n => (
                                <IngredientCard key={n} title={t[`cream_sol_ing_${n}`]} desc={t[`cream_sol_ing_${n}`].split('—')[1] || ''} />
                            ))}
                        </div>
                     </div>
                 </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 <div className="bg-stone-900/80 rounded-3xl p-8 border border-stone-800">
                     <h4 className="text-xl font-bold text-amber-400 mb-6 text-center">{t.cream_sol_skin_title}</h4>
                     <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                             <BenefitItem key={n} text={t[`cream_sol_skin_${n}`]} />
                         ))}
                     </div>
                 </div>
                 <div className="bg-stone-900/80 rounded-3xl p-8 border border-stone-800">
                     <h4 className="text-xl font-bold text-amber-400 mb-6 text-center">{t.cream_sol_hair_title}</h4>
                     <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map(n => (
                             <BenefitItem key={n} text={t[`cream_sol_hair_${n}`]} />
                         ))}
                     </div>
                 </div>
             </div>

             <div className="bg-gradient-to-r from-stone-900 to-black rounded-2xl p-8 border border-stone-700">
                 <h3 className="text-2xl font-bold text-center mb-6 text-white">{t.cream_sol_diff_title}</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-8">
                     {[1, 2, 3, 4].map(n => (
                         <div key={n} className="p-4 bg-stone-800 rounded-lg text-sm text-stone-300">{t[`cream_sol_diff_${n}`]}</div>
                     ))}
                 </div>
                 <p className="text-lg italic text-amber-100 font-medium text-center">{t.cream_sol_result}</p>
             </div>
         </div>
      </section>

      {/* Bio-Active Science Summary */}
      <section className="py-20 bg-stone-950 relative border-t border-stone-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="font-reishi-title text-3xl sm:text-5xl text-amber-200 mb-12">{t.reishi_cream_science_title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-800 transition-colors">
                    <div className="text-4xl mb-4">🧬</div>
                    <p className="text-stone-300">{t.reishi_cream_science_p1}</p>
                </div>
                <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-800 transition-colors">
                    <div className="text-4xl mb-4">🔬</div>
                    <p className="text-stone-300">{t.reishi_cream_science_p2}</p>
                </div>
                <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-800 transition-colors">
                    <div className="text-4xl mb-4">🛡️</div>
                    <p className="text-stone-300">{t.reishi_cream_science_p3}</p>
                </div>
            </div>
        </div>
      </section>

      {/* Usage & Testimonials */}
      <section className="py-20 bg-stone-900 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Usage */}
            <div>
                <h2 className="font-reishi-title text-3xl text-amber-200 mb-8">{t.reishi_cream_usage_title}</h2>
                <p className="text-stone-300 text-lg leading-loose whitespace-pre-wrap mb-8">
                    {t.reishi_cream_usage_text}
                </p>
                
                {/* 3rd Video: The Miracle of Ganoderic Acid */}
                <div className="mt-12">
                    <video
                        src={ganodermaMiracleVideoUrl}
                        className="w-full rounded-2xl border border-white/10 shadow-2xl mb-6"
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                    />
                    <h3 className="text-xl font-bold text-amber-400 mb-2">{t.reishi_cream_video3_title}</h3>
                    <p className="text-stone-300 mb-6">{t.reishi_cream_video3_desc}</p>
                    <button
                        onClick={() => navigate('products')}
                        className="inline-block font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
                        style={{ backgroundColor: '#FFD700', color: '#000000' }}
                    >
                        {t.reishi_cream_price_btn}
                    </button>
                </div>
            </div>

            {/* Testimonials */}
            <div className="flex flex-col justify-center">
                <div className="p-8 rounded-2xl bg-stone-800 border border-stone-700 shadow-xl relative">
                    <span className="text-6xl text-amber-900 absolute top-4 left-4 font-serif opacity-50">“</span>
                    <h3 className="text-xl font-bold text-amber-400 mb-6 text-center uppercase tracking-wider">{t.reishi_cream_test_title}</h3>
                    <p className="text-xl text-stone-200 italic text-center leading-relaxed mb-6">
                        {t.reishi_cream_test_quote}
                    </p>
                    <div className="flex justify-center">
                        <div className="flex text-amber-500 gap-1">
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-serif text-white mb-6">{t.reishi_cream_cta_title}</h3>
                    <button
                        onClick={() => navigate('products')}
                        className="inline-block bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-stone-950 font-bold py-4 px-10 rounded-full text-lg transition-transform hover:scale-105 shadow-lg shadow-amber-900/50"
                    >
                        {t.reishi_cream_cta_btn}
                    </button>
                </div>
            </div>
        </div>
      </section>
      
      {/* External Sources & Brands Section */}
      <section className="py-20 bg-stone-950 border-t border-stone-800">
         <div className="max-w-7xl mx-auto px-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 
                 {/* Brands Column */}
                 <div>
                     <h3 className="font-reishi-title text-3xl text-amber-200 mb-8 text-center">{t.reishi_cream_links_brands_title}</h3>
                     <div className="grid grid-cols-1 gap-6">
                        {brandLinks.map((link, idx) => (
                             <div key={idx} className="p-5 rounded-xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors hover:border-amber-600/50">
                                 <div className="text-center sm:text-left">
                                     <h4 className="font-bold text-lg text-stone-100">{link.name}</h4>
                                     <p className="text-sm text-stone-400 mt-1">{link.desc}</p>
                                 </div>
                                 <a 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 font-bold py-2 px-6 rounded transition-transform transform hover:scale-105 shadow-md whitespace-nowrap"
                                    style={{ backgroundColor: '#FFD700', color: '#000000' }}
                                 >
                                     {t.reishi_cream_links_visit_btn}
                                 </a>
                             </div>
                        ))}
                     </div>
                 </div>

                 {/* Science Column */}
                 <div>
                     <h3 className="font-reishi-title text-3xl text-amber-200 mb-8 text-center">{t.reishi_cream_links_science_title}</h3>
                     <div className="grid grid-cols-1 gap-6">
                        {scienceLinks.map((link, idx) => (
                             <div key={idx} className="p-5 rounded-xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors hover:border-amber-600/50">
                                 <div className="text-center sm:text-left">
                                     <h4 className="font-bold text-lg text-stone-100">{link.name}</h4>
                                     <p className="text-sm text-stone-400 mt-1">{link.desc}</p>
                                 </div>
                                 <a 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-shrink-0 font-bold py-2 px-6 rounded transition-transform transform hover:scale-105 shadow-md whitespace-nowrap"
                                    style={{ backgroundColor: '#FFD700', color: '#000000' }}
                                 >
                                     {t.read_study}
                                 </a>
                             </div>
                        ))}
                     </div>
                 </div>

             </div>
         </div>
      </section>

    </div>
  );
};

export default ReishiCreamPage;