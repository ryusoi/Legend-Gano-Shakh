
import React from 'react';
import type { Language } from '../../translations';
import KineticTypography from '../KineticTypography';

interface AboutPageProps {
  t: any;
  language: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ t, language }) => {
  const imageUrls = [
    "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-19-19-43-22-952.jpg",
    "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-19-19-19-19-202.jpg",
  ];
  
  return (
    <div className="animate-fade-in py-16 sm:py-24">
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Video Banner representing heritage */}
        <div className="mb-12 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-black/40 border border-slate-200 dark:border-slate-800/50">
            <video
                src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/SIna%20Mushroom%20and%20Gano%20Shakh.mp4"
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Sina Mushroom and Gano Shakh Heritage"
            >
                Your browser does not support the video tag.
            </video>
        </div>

        <KineticTypography 
            text={t.about_title} 
            className="text-4xl sm:text-5xl font-bold chrome-gold-text" 
            tag="h1"
            isFarsi={language === 'fa'}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 sm:my-12">
            {imageUrls.map((url, index) => (
                <div key={index} className={`rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden ${index === 0 && imageUrls.length % 2 !== 0 ? 'sm:col-span-2' : ''}`}>
                    <img 
                        src={url} 
                        alt={`${t.about_title} - image ${index + 1}`}
                        className="w-full h-80 object-cover"
                    />
                </div>
            ))}
        </div>

        <p className="mt-4 text-lg leading-relaxed max-w-4xl mx-auto whitespace-pre-wrap text-center" style={{ color: 'var(--text-secondary)'}}>
          {t.about_text}
        </p>

        <div className="mt-12">
            <img 
                src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/ezgif-3089521079e7691a.gif" 
                alt="Sina Mushroom transitioning to Gano Shakh logo"
                className="mx-auto rounded-2xl shadow-lg dark:shadow-black/30 max-w-md w-full"
            />
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
