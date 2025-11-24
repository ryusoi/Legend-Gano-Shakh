
import React, { useEffect, useState } from 'react';

interface HeroProps {
  t: any;
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20(2).mp4";
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

  const handleScrollToChat = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const chatSection = document.getElementById('chat');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
      // After scrolling, try to focus the input. A small delay helps ensure the scroll has completed.
      setTimeout(() => {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
          chatInput.focus();
        }
      }, 500);
    }
  };

  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      {/* Video Background */}
      <video
        src={heroVideoUrl}
        className="absolute top-[-10%] left-0 w-full h-[120%] object-cover will-change-transform opacity-95"
        autoPlay
        loop
        muted
        playsInline
        style={{ 
            transform: `translateY(${offset * 0.4}px)` // Sharp subtle parallax
        }}
      />
      
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          {t.hero_headline}
        </h1>
        <div className="mt-6 inline-block p-6 rounded-2xl backdrop-blur-md bg-black/30 border border-white/10 shadow-2xl transform transition-transform hover:scale-105 duration-500">
            <p className="text-base sm:text-lg font-medium text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] antialiased leading-relaxed">
            {t.hero_subheadline}
            </p>
        </div>
        <br/>
        <a 
          href="#chat"
          onClick={handleScrollToChat}
          className="mt-10 inline-block bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-xl border border-white/20"
        >
          {t.hero_cta}
        </a>
      </div>
    </section>
  );
};

export default Hero;
