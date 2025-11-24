
import React, { useState, useEffect } from 'react';
import LinkIcon from '../icons/LinkIcon';
import type { Language } from '../../translations';

interface MycoNewsPageProps {
  t: any;
  language: Language;
}

const sources = [
    { title: 'NASA — Mycotecture / NIAC', url: 'https://www.nasa.gov/directorates/spacetech/niac/2018_Phase_I_Phase_II/Myco-architecture_off_planet_structures_grown_from_fungal_mycelium/', descKey: 'myco_news_src_1_desc' },
    { title: 'NASA News Release', url: 'https://www.nasa.gov/press-release/nasa-invests-in-tech-concepts-aimed-at-exploring-mars', descKey: 'myco_news_src_2_desc' },
    { title: 'Ecovative Design', url: 'https://ecovative.com', descKey: 'myco_news_src_3_desc' },
    { title: 'MycoWorks', url: 'https://www.mycoworks.com', descKey: 'myco_news_src_4_desc' },
    { title: 'MOGU (Italy)', url: 'https://mogu.bio', descKey: 'myco_news_src_5_desc' },
    { title: 'Biohm (UK)', url: 'https://www.biohm.co.uk', descKey: 'myco_news_src_6_desc' },
    { title: 'Loop Biotech', url: 'https://loop-biotech.com', descKey: 'myco_news_src_7_desc' },
    { title: 'MycoTile', url: 'https://mycotile.co.ke', descKey: 'myco_news_src_8_desc' },
    { title: 'The Living — Hy-Fi', url: 'http://www.thelivingnewyork.com/project/hy-fi', descKey: 'myco_news_src_9_desc' },
    { title: 'Phil Ross', url: 'https://www.mycoworks.com/team/phil-ross', descKey: 'myco_news_src_10_desc' },
    { title: 'Paul Stamets', url: 'https://paulstamets.com', descKey: 'myco_news_src_11_desc' },
    { title: 'FUNGAR (H2020)', url: 'http://www.fungar.eu', descKey: 'myco_news_src_12_desc' },
    { title: 'FUNGATERIA', url: 'https://fungateria.eu', descKey: 'myco_news_src_13_desc' },
    { title: 'Frontiers in Built Environment', url: 'https://www.frontiersin.org/journals/built-environment', descKey: 'myco_news_src_14_desc' },
    { title: 'MDPI / Mycelium Composites', url: 'https://www.mdpi.com', descKey: 'myco_news_src_15_desc' },
    { title: 'IJDesign', url: 'https://www.ijdesign.org', descKey: 'myco_news_src_16_desc' },
    { title: 'MOGU Press', url: 'https://mogu.bio/press/', descKey: 'myco_news_src_17_desc' },
    { title: 'Biofabricate', url: 'https://www.biofabricate.co', descKey: 'myco_news_src_18_desc' },
    { title: 'ArchDaily — Mushroom Buildings', url: 'https://www.archdaily.com', descKey: 'myco_news_src_19_desc' },
    { title: 'Architectural Digest', url: 'https://www.architecturaldigest.com', descKey: 'myco_news_src_20_desc' },
    { title: 'Wageningen / Utrecht University', url: 'https://www.uu.nl/en/research/microbiology', descKey: 'myco_news_src_21_desc' },
    { title: 'TU/e / Eindhoven', url: 'https://www.tue.nl/en/', descKey: 'myco_news_src_22_desc' },
    { title: 'CORDIS / EU FUNGAR', url: 'https://cordis.europa.eu/project/id/858132', descKey: 'myco_news_src_23_desc' },
    { title: 'Loop / YES!Delft', url: 'https://www.yesdelft.com', descKey: 'myco_news_src_24_desc' },
    { title: 'MycoStories', url: 'https://mycostories.com', descKey: 'myco_news_src_25_desc' },
    { title: 'Research: Pure Mycelium Materials', url: 'https://pubmed.ncbi.nlm.nih.gov', descKey: 'myco_news_src_26_desc' },
    { title: 'EU EIC / ELMs Portfolio', url: 'https://eic.ec.europa.eu', descKey: 'myco_news_src_27_desc' },
    { title: 'Wired / Hy-Fi', url: 'https://www.wired.com', descKey: 'myco_news_src_28_desc' },
    { title: 'Ecovative Blog', url: 'https://ecovative.com/blog', descKey: 'myco_news_src_29_desc' },
    { title: 'DesignBoom on NASA', url: 'https://www.designboom.com', descKey: 'myco_news_src_30_desc' },
];

const MycoNewsPage: React.FC<MycoNewsPageProps> = ({ t, language }) => {
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

  const nasaVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/NASA%20Mushroom%20Houses.mp4";

  return (
    <div className={`animate-fade-in pb-24 text-slate-100 ${language === 'fa' ? 'font-reishi-body' : ''}`}>
       <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            .src-card:hover {
                border-color: #a78bfa;
                box-shadow: 0 10px 30px -10px rgba(167, 139, 250, 0.3);
            }
        `}</style>

      {/* Parallax Hero Section with NASA Video */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden bg-stone-950">
        <div 
          className="absolute top-0 left-0 w-full h-[120%] pointer-events-none will-change-transform"
          style={{ transform: `translateY(${offset * 0.5}px)` }} 
        >
             <video 
                src={nasaVideoUrl} 
                className="w-full h-full object-cover opacity-70"
                autoPlay 
                loop 
                muted 
                playsInline 
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-stone-950 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-purple-600/30 border border-purple-400/50 backdrop-blur-md">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Featured: NASA Mycotecture</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-2xl mb-6">
                Myco News
            </h1>
            <p className="text-xl sm:text-2xl text-stone-200 font-light tracking-wide drop-shadow-md">
                The Latest Frontiers in Mycelium Innovation
            </p>
        </div>
      </section>

      {/* Source List Section */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Top 30 Global Sources</h2>
                <p className="text-stone-400">Curated intelligence on Mycotecture, Materials Science, and Bio-Design.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sources.map((source, index) => (
                    <a 
                        key={index} 
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col p-6 rounded-xl bg-stone-800/50 border border-stone-700 transition-all duration-300 src-card group hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Ref {String(index + 1).padStart(2, '0')}</span>
                            <LinkIcon className="w-5 h-5 text-stone-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-purple-300 transition-colors">{source.title}</h3>
                        <div className="mt-auto pt-4 border-t border-stone-700/50">
                            <span className="text-xs text-stone-500 truncate block">{source.url.replace('https://', '').replace('www.', '').split('/')[0]}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
};

export default MycoNewsPage;
