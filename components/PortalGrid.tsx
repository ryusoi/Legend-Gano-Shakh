
import React from 'react';
import type { Page } from '../types';

interface PortalGridProps {
  t: any;
  navigate: (page: Page) => void;
}

interface PortalItem {
  id: Page;
  titleKey: string;
  videoUrl: string;
}

const PortalGrid: React.FC<PortalGridProps> = ({ t, navigate }) => {
  // Configuration for all 18 portals
  const portals: PortalItem[] = [
    { id: 'home', titleKey: 'nav_home', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20(2).mp4' },
    { id: 'about', titleKey: 'nav_about', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/SIna%20Mushroom%20and%20Gano%20Shakh.mp4' },
    { id: 'cultivation', titleKey: 'nav_cultivation', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Medicinal%20Mushroom%206.mp4' },
    { id: 'science', titleKey: 'nav_science', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoderma%20Science.mp4' },
    { id: 'products', titleKey: 'nav_products', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Nutripet%20Gano%20Shakh.mp4' },
    { id: 'contact', titleKey: 'nav_contact', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/INFOCONTACTS.mp4' },
    { id: 'reishi-decor', titleKey: 'nav_reishi_decor', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%202.mp4' },
    { id: 'reishi-biome', titleKey: 'nav_reishi_biome', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Biome%20(2).mp4' },
    { id: 'reishi-cream', titleKey: 'nav_reishi_cream', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Night%20Cream.mp4' },
    { id: 'reishi-extract', titleKey: 'nav_reishi_extract', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoderma%20Extract.mp4' },
    { id: 'investment', titleKey: 'nav_investment', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Investment%20Mushrooms.mp4' },
    { id: 'sales', titleKey: 'nav_sales', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Team%20Sales.mp4' },
    { id: 'health-tips', titleKey: 'nav_health_tips', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Health.mp4' },
    { id: 'myco-news', titleKey: 'nav_myco_news', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/NASA%20Mushroom%20Houses.mp4' },
    { id: 'blogs', titleKey: 'nav_blogs', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Mushroom%20Blogs.mp4' },
    { id: 'make-money', titleKey: 'nav_make_money', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/MAke%20Money.mp4' },
    { id: 'gano-game', titleKey: 'nav_gano_game', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%20Immortality.mp4' },
    { id: 'iran-mushrooms', titleKey: 'nav_iran_mushrooms', videoUrl: 'https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoshakh%20NEW.mp4' },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-stone-950 relative overflow-hidden">
        {/* Atmospheric Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        
        <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-4xl font-bold chrome-gold-text mb-2 tracking-tight drop-shadow-lg">
                    EXPLORE THE GANOVERSE
                </h2>
                <p className="text-stone-400 text-xs sm:text-sm max-w-2xl mx-auto font-light tracking-wide">
                    Access our complete ecosystem of health, science, and innovation.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {portals.map((item) => (
                    <div 
                        key={item.id} 
                        className="portal-card group aspect-[4/5] cursor-pointer rounded-lg"
                        onClick={() => navigate(item.id)}
                    >
                        <div className="portal-content rounded-lg">
                            {/* Video Background */}
                            <video
                                src={item.videoUrl}
                                className="portal-video"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            
                            {/* Dark Overlay Gradient */}
                            <div className="portal-overlay"></div>

                            {/* Title */}
                            <div className="portal-title px-2 pb-2">
                                <h3 className="text-xs sm:text-sm font-bold chrome-gold-text tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
                                    {t[item.titleKey]}
                                </h3>
                                <div className="h-px w-0 bg-cyan-400 mx-auto mt-1 transition-all duration-500 group-hover:w-1/2 shadow-[0_0_5px_#00f3ff]"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default PortalGrid;
