
import React, { useState, useEffect } from 'react';
import { translations } from '../../translations';
import InstagramIcon from '../icons/InstagramIcon';
import WhatsappIcon from '../icons/WhatsappIcon';

const SalesPage: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'fa' | 'es'>('fa');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
             const lang = document.documentElement.getAttribute('lang') as 'en' | 'fa' | 'es';
             if (lang) setCurrentLang(lang);
        }
      });
    });
    
    const rootDiv = document.querySelector('div[lang]');
    if (rootDiv) {
        const l = rootDiv.getAttribute('lang') as 'en' | 'fa' | 'es';
        if (l) setCurrentLang(l);
        observer.observe(rootDiv, { attributes: true });
    } else {
        const htmlLang = document.documentElement.lang as 'en' | 'fa' | 'es';
        if (htmlLang) setCurrentLang(htmlLang);
    }

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.pageYOffset);
      });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const t = translations[currentLang] as any;
  // Use a professional, business-oriented video background
  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Team%20Sales.mp4"; 

  const teamMembers = [
    { id: 1, name: t.sales_member_1_name, role: t.sales_member_1_role, bio: t.sales_member_1_bio },
    { id: 2, name: t.sales_member_2_name, role: t.sales_member_2_role, bio: t.sales_member_2_bio, whatsapp: 'https://wa.me/989363797018' },
    { id: 3, name: t.sales_member_3_name, role: t.sales_member_3_role, bio: t.sales_member_3_bio, isStar: true },
    { id: 4, name: t.sales_member_4_name, role: t.sales_member_4_role, bio: t.sales_member_4_bio },
    { id: 5, name: t.sales_member_5_name, role: t.sales_member_5_role, bio: t.sales_member_5_bio },
    { id: 6, name: t.sales_member_6_name, role: t.sales_member_6_role, bio: t.sales_member_6_bio },
    { id: 7, name: t.sales_member_7_name, role: t.sales_member_7_role, bio: t.sales_member_7_bio },
    { id: 8, name: t.sales_member_8_name, role: t.sales_member_8_role, bio: t.sales_member_8_bio },
  ];

  // Improved slug generation for reliable anchors
  const getMemberId = (name: string) => {
      if (!name) return '';
      // Replace spaces and special chars with hyphens, remove dots, lower case
      return `sales-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
  };

  return (
    <div className={`animate-fade-in pb-24 text-slate-100 ${currentLang === 'fa' ? 'font-reishi-body' : ''}`}>
         <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            .btn-vivid-yellow {
                background-color: #FFD700;
                color: #000000;
                box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
                transition: all 0.3s ease;
            }
            .btn-vivid-yellow:hover {
                background-color: #FDB931;
                transform: translateY(-2px) scale(1.02);
                box-shadow: 0 8px 25px rgba(255, 215, 0, 0.6);
            }
            .btn-whatsapp {
                background-color: #25D366;
                color: white;
                box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
                transition: all 0.3s ease;
            }
            .btn-whatsapp:hover {
                background-color: #128C7E;
                transform: translateY(-2px) scale(1.05);
                box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
            }
            .star-card {
                border: 2px solid #FFD700;
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.15);
                background: linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(0,0,0,0.8));
            }
            
            /* Firoozeh Parvin Card Special Effect */
            .firoozeh-card {
                position: relative;
                background: transparent;
                z-index: 0;
                overflow: hidden;
            }
            .firoozeh-card::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: conic-gradient(
                    transparent 0deg, 
                    transparent 300deg, 
                    #FFD700 330deg,
                    #FFFFE0 360deg
                );
                animation: rotate-border 4s linear infinite;
                z-index: -2;
            }
            .firoozeh-card::after {
                content: '';
                position: absolute;
                inset: 2px; /* Fine line width */
                background: #292524; /* bg-stone-800 */
                border-radius: 0.9rem; 
                z-index: -1;
            }
            .firoozeh-card:hover::before {
                filter: drop-shadow(0 0 8px #FFD700);
            }
            @keyframes rotate-border {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-stone-950">
        <div 
          className="absolute top-[-10%] left-0 w-full h-[120%] pointer-events-none will-change-transform"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        >
             {/* If specific video not available, fallback to a business/team video or color */}
             <video 
                src={heroVideoUrl} 
                className="w-full h-full object-cover opacity-90"
                autoPlay 
                loop 
                muted 
                playsInline 
                onError={(e) => e.currentTarget.style.display = 'none'}
            />
            <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl mb-6">
                {t.sales_hero_title}
            </h1>
            <p className="text-xl sm:text-2xl text-amber-100 font-light tracking-wide drop-shadow-md">
                {t.sales_hero_subtitle}
            </p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 bg-stone-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <p className="text-lg text-stone-300 leading-loose mb-6">
                  {t.sales_intro_text}
              </p>
              <p className="text-base text-stone-400 leading-relaxed">
                  {t.sales_intro_subtext}
              </p>
          </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-stone-950">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => {
                    const isHeadOfSales = member.id === 2 || member.id === 3;
                    const isFiroozeh = member.id === 2;
                    // Use English fallback logic to ensure stable IDs if translation changes
                    // For now, relying on the name prop which comes from current language translation
                    // This works best if the user is viewing the language they queried about
                    const memberId = getMemberId(member.name); 
                    
                    return (
                        <div 
                            key={member.id}
                            id={memberId}
                            className={`relative p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 scroll-mt-32
                                ${member.isStar ? 'star-card lg:col-span-3' : 
                                  isFiroozeh ? 'firoozeh-card shadow-2xl shadow-amber-900/20' : 
                                  'bg-stone-800 border border-stone-700 hover:shadow-xl'
                                }`}
                        >
                            {/* Star Performer Badge */}
                            {member.isStar && (
                                <div className="absolute top-4 right-4 bg-[#FFD700] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-lg animate-pulse">
                                    Top Performer
                                </div>
                            )}

                            <div className={member.isStar ? 'text-center lg:text-left' : 'text-center'}>
                                <h3 className={`font-bold text-white mb-4 ${member.isStar ? 'text-3xl sm:text-4xl text-[#FFD700]' : 'text-xl'}`}>
                                    {member.name}
                                </h3>
                                
                                <div className="mb-6">
                                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isHeadOfSales ? 'bg-[#FFD700] text-black shadow-lg shadow-yellow-500/20' : 'bg-stone-700 text-stone-300'}`}>
                                        {member.role}
                                    </span>
                                </div>

                                <p className={`text-stone-300 leading-relaxed ${member.isStar ? 'text-lg mb-8 max-w-4xl' : 'text-sm'}`}>
                                    {member.bio}
                                </p>
                                
                                {/* WhatsApp Button for Firoozeh Parvin */}
                                {member.whatsapp && (
                                    <div className={`mt-6 ${member.isStar ? 'flex justify-start' : 'flex justify-center'}`}>
                                        <a 
                                            href={member.whatsapp} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 btn-whatsapp font-bold py-3 px-8 rounded-full text-base relative z-10"
                                        >
                                            <WhatsappIcon className="w-5 h-5" />
                                            {t.contact_social_wa}
                                        </a>
                                    </div>
                                )}

                                {/* Special CTA for Star Performer */}
                                {member.isStar && (
                                    <div className="mt-8">
                                        <a 
                                            href="https://www.instagram.com/shamila_asefi" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 btn-vivid-yellow font-bold py-4 px-8 rounded-full text-lg"
                                        >
                                            <InstagramIcon className="w-6 h-6" />
                                            {t.sales_member_3_cta}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>

      {/* Vision & Commitment */}
      <section className="py-20 bg-gradient-to-b from-stone-900 to-black text-center border-t border-stone-800">
          <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-600 mb-8">
                  {t.sales_vision_title}
              </h2>
              <p className="text-lg sm:text-xl text-stone-300 leading-loose whitespace-pre-wrap">
                  {t.sales_vision_text}
              </p>
          </div>
      </section>

    </div>
  );
};

export default SalesPage;
