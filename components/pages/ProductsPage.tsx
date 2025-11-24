
import React, { useState, useEffect } from 'react';
import type { Page } from '../../types';
import type { Language } from '../../translations';
import HealthRecommender from '../HealthRecommender';

interface ProductsPageProps {
  t: any;
  language: Language;
  navigate: (page: Page, anchor?: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ t, language, navigate }) => {
  
  const products = [
    {
        id: 'powder',
        title: t.prod_powder_title,
        desc: t.prod_powder_desc,
        price: t.prod_powder_price,
        imageUrl: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Screenshot%202025-11-18%20192909.png",
        type: 'immune' // Gold/Purple aura
    },
    {
        id: 'tincture',
        title: t.prod_tincture_title,
        desc: t.prod_tincture_desc,
        price: t.prod_tincture_price,
        imageUrl: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Screenshot%202025-11-18%20193006.png",
        type: 'energy' // Blue/Cyan aura
    },
    {
        id: 'night-cream',
        title: t.prod_night_title,
        desc: t.prod_night_desc,
        price: t.prod_night_price,
        imageUrl: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Screenshot%202025-11-18%20193103.png",
        type: 'restore' // Purple aura
    },
    {
        id: 'day-gel',
        title: t.prod_day_title,
        desc: t.prod_day_desc,
        price: t.prod_day_price,
        imageUrl: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Screenshot%202025-11-18%20193120.png",
        type: 'protect' // Gold aura
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    { user: t.prod_review_1_user, text: t.prod_review_1_text, video: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Science.mp4" },
    { user: t.prod_review_2_user, text: t.prod_review_2_text, video: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Nutripet.mp4" },
    { user: t.prod_review_3_user, text: t.prod_review_3_text, video: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Night%20Cream.mp4" },
  ];

  useEffect(() => {
      const interval = setInterval(() => {
          setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(interval);
  }, []);

  const StarRating = () => (
    <div className="flex text-amber-400 gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
             <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 drop-shadow-md">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
        ))}
    </div>
  );

  return (
    <div className="animate-fade-in py-16 sm:py-24 text-slate-800 dark:text-inherit">
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 dark:from-amber-200 dark:to-amber-500 electric-underline pb-2">
          {t.products_title}
        </h1>
        <p className="mt-8 text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto">
          {t.products_text}
        </p>
        
        {/* Product Grid with Holographic Neon Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
            {products.map((product) => (
                <div key={product.id} className="flex flex-col items-center p-4 rounded-2xl border transition-all hover:scale-105 group bg-white/5 backdrop-blur-sm holo-card" style={{borderColor: 'var(--border-primary)'}}>
                    <div className="w-full aspect-square overflow-hidden rounded-xl mb-4 bg-white relative plasma-lens">
                        <img 
                            src={product.imageUrl} 
                            alt={product.title} 
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 relative z-10"
                        />
                         <div className="absolute top-2 right-2 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
                             New
                         </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 h-14 flex items-center justify-center leading-tight z-10">{product.title}</h3>
                    <p className="text-sm mb-4 flex-grow px-2 text-slate-500 dark:text-slate-400 z-10">{product.desc}</p>
                    <div className="mt-auto w-full z-10">
                         <div className="text-amber-600 dark:text-amber-400 font-semibold text-lg mb-3">{product.price}</div>
                         <button 
                            onClick={() => navigate('sales')}
                            className="w-full py-2 px-4 rounded-lg font-medium plasma-btn"
                         >
                             {t.prod_btn_shop}
                         </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Dynamic Testimonials Section */}
        <section className="my-24 border-t border-b py-16 bg-stone-900/50 rounded-3xl overflow-hidden relative living-border" style={{borderColor: 'var(--border-secondary)'}}>
            <div className="absolute top-4 left-4 flex gap-2 z-10">
                 <span className="px-3 py-1 bg-green-900/80 text-green-400 rounded-full text-xs font-bold border border-green-700/50">Verified Purchase</span>
                 <span className="px-3 py-1 bg-blue-900/80 text-blue-400 rounded-full text-xs font-bold border border-blue-700/50">G2 5.0 Stars</span>
            </div>
            <h2 className="text-3xl font-bold mb-12 relative z-10" style={{color: 'var(--text-heading-from)'}}>{t.prod_reviews_title}</h2>
            
            <div className="max-w-4xl mx-auto relative min-h-[400px] flex items-center justify-center">
                {testimonials.map((item, idx) => (
                    <div 
                        key={idx}
                        className={`absolute inset-0 flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ease-in-out ${idx === activeTestimonial ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-95 pointer-events-none'}`}
                    >
                        <div className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-stone-700 relative group">
                             <video 
                                src={item.video} 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                             />
                             <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">Watching now</div>
                        </div>
                        <div className="w-full md:w-1/2 text-left p-6">
                            <StarRating />
                            <p className="text-xl italic font-medium text-stone-200 mb-6 leading-relaxed">"{item.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center font-bold text-white">
                                    {item.user.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.user}</div>
                                    <div className="text-xs text-stone-400">Verified Customer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${idx === activeTestimonial ? 'bg-amber-500' : 'bg-stone-700 hover:bg-stone-600'}`}
                    />
                ))}
            </div>
        </section>

        <section className="py-16 rounded-3xl bg-stone-900 text-white dark:bg-stone-800 shadow-2xl overflow-hidden relative group holo-card">
             <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent pointer-events-none"></div>
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-12">
                
                <div className="flex flex-col items-center text-center transform transition-transform hover:scale-105 duration-300">
                     <h3 className="text-2xl font-serif italic text-amber-200 mb-4">Reishi Decor</h3>
                     <p className="mb-6 text-stone-300">{t.prod_cross_decor_text}</p>
                     <button
                        onClick={() => navigate('reishi-decor')}
                        className="py-3 px-8 rounded-full font-bold text-black transition-transform hover:scale-105 shadow-lg shadow-yellow-500/20"
                        style={{backgroundColor: '#FFD700'}}
                     >
                         {t.prod_cross_decor_btn}
                     </button>
                </div>

                <div className="flex flex-col items-center text-center border-t md:border-t-0 md:border-l border-stone-700 pt-12 md:pt-0 md:pl-12 transform transition-transform hover:scale-105 duration-300">
                     <h3 className="text-2xl font-serif italic text-amber-200 mb-4">Reishi Biome</h3>
                     <p className="mb-6 text-stone-300">{t.prod_cross_biome_text}</p>
                     <button
                        onClick={() => navigate('reishi-biome')}
                        className="py-3 px-8 rounded-full font-bold text-black transition-transform hover:scale-105 shadow-lg shadow-yellow-500/20"
                        style={{backgroundColor: '#FFD700'}}
                     >
                         {t.prod_cross_biome_btn}
                     </button>
                </div>
             </div>

             <div className="relative z-10 mt-16 pt-8 border-t border-stone-700 max-w-2xl mx-auto">
                 <p className="text-stone-400 text-sm mb-4">{t.prod_contact_note}</p>
                 <button
                    onClick={() => navigate('contact')}
                    className="text-sm font-semibold text-white border border-stone-500 hover:bg-stone-700 py-2 px-6 rounded-lg transition-colors"
                 >
                     {t.prod_contact_btn}
                 </button>
             </div>
        </section>

        <div className="mt-20 mb-12">
            <HealthRecommender t={t} language={language} />
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
