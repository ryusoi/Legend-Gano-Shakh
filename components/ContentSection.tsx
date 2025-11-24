
import React from 'react';

interface ContentSectionProps {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  reverse?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({ id, title, text, imageUrl, reverse = false }) => {
  const flexDirection = reverse ? 'lg:flex-row-reverse' : 'lg:flex-row';

  return (
    <section id={id} className="py-16 sm:py-24 bg-stone-950/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${flexDirection} items-center gap-12 lg:gap-16`}>
          <div className="lg:w-1/2">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-2xl shadow-black/40"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              {title}
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
