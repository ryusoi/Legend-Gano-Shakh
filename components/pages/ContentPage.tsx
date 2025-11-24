
import React from 'react';

interface ContentPageProps {
  title: string;
  text: string;
  imageUrls: string[];
  children?: React.ReactNode;
}

const ContentPage: React.FC<ContentPageProps> = ({ title, text, imageUrls, children }) => {
  return (
    <div className="animate-fade-in py-16 sm:py-24 text-slate-800 dark:text-inherit">
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 dark:from-amber-200 dark:to-amber-500">
          {title}
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 sm:my-12">
            {imageUrls.map((url, index) => (
                <div key={index} className={`rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden ${index === 0 && imageUrls.length % 2 !== 0 ? 'sm:col-span-2' : ''}`}>
                    <img 
                        src={url} 
                        alt={`${title} - image ${index + 1}`}
                        className="w-full h-80 object-cover"
                    />
                </div>
            ))}
        </div>

        <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto text-left whitespace-pre-wrap">
          {text}
        </p>
        {children}
      </div>
    </div>
  );
};

export default ContentPage;