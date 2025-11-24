
import React, { useState, useEffect } from 'react';
import LinkIcon from '../icons/LinkIcon';
import type { Language } from '../../translations';

interface BlogsPageProps {
  t: any;
  language: Language;
}

const BlogsPage: React.FC<BlogsPageProps> = ({ t, language }) => {
  const [offset, setOffset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);
    
  useEffect(() => {
      const handleScroll = () => {
          requestAnimationFrame(() => {
              setOffset(window.pageYOffset);
              // Infinite Scroll Simulation logic
              if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                  setVisibleCount(prev => prev + 6);
              }
          });
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Mushroom%20Blogs.mp4";

  // Safely access lists, defaulting to empty arrays if undefined
  const globalList = t.blogs_global_list || [];
  const iranianList = t.blogs_iranian_list || [];

  return (
    <div className={`animate-fade-in pb-24 text-slate-100 ${language === 'fa' ? 'font-reishi-body' : ''}`}>
       <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            .btn-vivid-yellow {
                background-color: #FFD700;
                color: #000000;
                box-shadow: 0 4px 14px 0 rgba(255, 215, 0, 0.39);
                transition: all 0.2s ease-in-out;
            }
            .btn-vivid-yellow:hover {
                background-color: #FDB931;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 215, 0, 0.23);
            }
            .masonry-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;
                align-items: start;
            }
        `}</style>

      {/* Parallax Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden bg-stone-950">
        <div 
          className="absolute top-0 left-0 w-full h-[120%] pointer-events-none will-change-transform"
          style={{ transform: `translateY(${offset * 0.7}px)` }} 
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-stone-950 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-600 drop-shadow-lg mb-6">
                {t.blogs_hero_title}
            </h1>
            <p className="text-xl sm:text-2xl text-stone-200 font-light tracking-wide drop-shadow-md">
                {t.blogs_hero_subtitle}
            </p>
        </div>
      </section>

      {/* Introduction Text */}
      <section className="py-16 bg-stone-950">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <p className="text-lg text-stone-300 leading-relaxed">
                  {t.blogs_intro_text}
              </p>
          </div>
      </section>

      {/* Global Blogs List - Masonry Layout */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12 justify-center flex-wrap">
                <span className="text-4xl">🌍</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-center">
                    {t.blogs_global_title}
                </h2>
            </div>
            
            {/* Smart Filters Mockup */}
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
                 <button className="px-4 py-1 rounded-full border border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white text-sm">All</button>
                 <button className="px-4 py-1 rounded-full border border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white text-sm">Cultivation</button>
                 <button className="px-4 py-1 rounded-full border border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white text-sm">Science</button>
                 <button className="px-4 py-1 rounded-full border border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white text-sm">Recipes</button>
            </div>

            <div className="masonry-grid">
                {globalList.slice(0, visibleCount).map((blog: any, index: number) => (
                    <div key={index} className="flex flex-col p-6 rounded-xl bg-stone-800 border border-stone-700 hover:border-blue-500/50 transition-all group h-full shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 duration-300">
                        <div className="mb-3">
                            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Source {String(index + 1).padStart(2, '0')}</span>
                            <h3 className="text-xl font-bold text-stone-100 mt-1 group-hover:text-blue-300 transition-colors">{blog.title}</h3>
                        </div>
                        <p className="text-sm text-stone-400 mb-6 flex-grow leading-relaxed">
                            {blog.desc}
                        </p>
                        <a 
                            href={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto w-full btn-vivid-yellow font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                        >
                            <span>{t.blogs_visit_btn}</span>
                            <LinkIcon className="w-4 h-4 text-black" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Iranian Sources List - Masonry Layout */}
      <section className="py-20 bg-stone-950">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12 justify-center flex-wrap">
                <span className="text-4xl">🇮🇷</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 text-center">
                    {t.blogs_iranian_title}
                </h2>
            </div>
            <div className="masonry-grid">
                {iranianList.slice(0, visibleCount).map((source: any, index: number) => (
                    <div key={index} className="flex flex-col p-6 rounded-xl bg-stone-900 border border-stone-800 hover:border-green-500/50 transition-all group h-full shadow-lg hover:shadow-green-900/20 hover:-translate-y-1 duration-300">
                        <div className="mb-3">
                            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">Iran Source {String(index + 1).padStart(2, '0')}</span>
                            <h3 className="text-xl font-bold text-stone-100 mt-1 group-hover:text-green-300 transition-colors">{source.title}</h3>
                        </div>
                        <p className="text-sm text-stone-400 mb-6 flex-grow leading-relaxed">
                            {source.desc}
                        </p>
                        <a 
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto w-full btn-vivid-yellow font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                        >
                            <span>{t.blogs_visit_btn}</span>
                            <LinkIcon className="w-4 h-4 text-black" />
                        </a>
                    </div>
                ))}
            </div>
             {visibleCount < (globalList.length + iranianList.length) && (
                 <div className="text-center mt-12 text-stone-500 animate-pulse">
                     Loading more sources...
                 </div>
             )}
        </div>
      </section>

    </div>
  );
};

export default BlogsPage;
