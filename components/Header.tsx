
import React, { useState, useEffect, useRef } from 'react';
import type { Language } from '../translations';
import ThemeSwitcher from './ThemeSwitcher';
import type { User } from '@supabase/supabase-js';
import type { Page, Theme } from '../types';
import InstagramIcon from './icons/InstagramIcon';
import WhatsappIcon from './icons/WhatsappIcon';
import HamburgerIcon from './icons/HamburgerIcon';
import CloseIcon from './icons/CloseIcon';
import MailIcon from './icons/MailIcon';
import TelegramIcon from './icons/TelegramIcon';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: any; // translations object
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isSupabaseReady: boolean;
  navigate: (page: Page, anchor?: string) => void;
  currentPage: Page;
}

// --- Neon Spore Curtain Component ---
const NeonCurtain = () => {
    const [spores, setSpores] = useState<any[]>([]);

    useEffect(() => {
        // Create static set of falling lines to avoid re-renders
        const count = 15;
        const newSpores = [];
        for (let i = 0; i < count; i++) {
            newSpores.push({
                left: Math.random() * 100,
                delay: Math.random() * 5,
                duration: Math.random() * 3 + 4, // 4-7s
                color: Math.random() > 0.6 ? '#ffd700' : Math.random() > 0.3 ? '#bc13fe' : '#00f3ff',
                height: Math.random() * 50 + 50 // 50-100px
            });
        }
        setSpores(newSpores);
    }, []);

    return (
        <div className="spore-curtain">
            {spores.map((s, i) => (
                <div 
                    key={i} 
                    className="spore-line"
                    style={{
                        left: `${s.left}%`,
                        height: `${s.height}px`,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                        '--color': s.color
                    } as any}
                ></div>
            ))}
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ language, setLanguage, theme, setTheme, t, user, onLogin, onLogout, isSupabaseReady, navigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- Autonomous Mycelium Growth Simulator ---
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animationFrameId: number;
      
      const resize = () => {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
      };
      window.addEventListener('resize', resize);
      resize();

      interface Branch {
          x: number;
          y: number;
          angle: number;
          length: number;
          width: number;
          growthRate: number;
          color: string;
      }

      const branches: Branch[] = [];
      const maxBranches = 50;

      // Initialize starting branches
      const init = () => {
          branches.length = 0;
          // Start from random points at the bottom of header
          for(let i=0; i<5; i++) {
              branches.push({
                  x: Math.random() * canvas.width,
                  y: canvas.height,
                  angle: -Math.PI / 2 + (Math.random() - 0.5), // Upwards
                  length: 0,
                  width: Math.random() * 1.5 + 0.5,
                  growthRate: Math.random() * 0.5 + 0.2,
                  color: `rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1})`
              });
          }
      };
      init();

      const animate = () => {
          ctx.fillStyle = 'rgba(10, 25, 47, 0.05)'; // Trail effect fade
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          if (Math.random() < 0.02 && branches.length < maxBranches) {
               branches.push({
                  x: Math.random() * canvas.width,
                  y: canvas.height,
                  angle: -Math.PI / 2 + (Math.random() - 0.5),
                  length: 0,
                  width: Math.random() * 1 + 0.5,
                  growthRate: Math.random() * 0.5 + 0.2,
                  color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`
              });
          }

          branches.forEach(b => {
              ctx.beginPath();
              ctx.moveTo(b.x, b.y);
              
              // Grow
              b.x += Math.cos(b.angle) * b.growthRate;
              b.y += Math.sin(b.angle) * b.growthRate;
              
              // Meander
              b.angle += (Math.random() - 0.5) * 0.1;

              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = b.color;
              ctx.lineWidth = b.width;
              ctx.stroke();

              // Reset if out of bounds
              if (b.y < 0 || b.x < 0 || b.x > canvas.width) {
                  b.y = canvas.height;
                  b.x = Math.random() * canvas.width;
                  b.length = 0;
              }
          });

          animationFrameId = requestAnimationFrame(animate);
      };
      animate();

      return () => {
          window.removeEventListener('resize', resize);
          cancelAnimationFrame(animationFrameId);
      };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinksRow1 = [
    { pageId: 'home', label: t.nav_home },
    { pageId: 'about', label: t.nav_about },
    { pageId: 'cultivation', label: t.nav_cultivation },
    { pageId: 'science', label: t.nav_science },
    { pageId: 'products', label: t.nav_products },
    { pageId: 'reishi-decor', label: t.nav_reishi_decor },
    { pageId: 'reishi-biome', label: t.nav_reishi_biome },
    { pageId: 'gano-game', label: t.nav_gano_game },
  ];
  
  const navLinksRow2 = [
    { pageId: 'iran-mushrooms', label: t.nav_iran_mushrooms },
    { pageId: 'reishi-cream', label: t.nav_reishi_cream },
    { pageId: 'reishi-extract', label: t.nav_reishi_extract },
    { pageId: 'investment', label: t.nav_investment },
    { pageId: 'sales', label: t.nav_sales },
    { pageId: 'make-money', label: t.nav_make_money },
    { pageId: 'health-tips', label: t.nav_health_tips },
    { pageId: 'myco-news', label: t.nav_myco_news },
    { pageId: 'blogs', label: t.nav_blogs },
    { pageId: 'contact', label: t.nav_contact },
  ];

  const getDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.display_name || user.email?.split('@')[0] || '';
  }

  const isCurrent = (pageId: Page) => currentPage === pageId;

  const getLogoText = () => {
      if (language === 'fa') return 'گانوشاخ'; 
      return 'GANO SHAKH';
  };
  
  const AnimatedLogo = () => (
    <div className="relative group cursor-pointer px-2 py-1">
        <span className="relative z-10 text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-widest whitespace-nowrap chrome-gold-text block drop-shadow-xl">
            {getLogoText()}
        </span>
        <span className="absolute top-0 left-0 w-full h-full px-2 py-1 text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-widest whitespace-nowrap text-scan block z-20" aria-hidden="true">
            {getLogoText()}
        </span>
    </div>
  );

  const LogoImage = ({ className }: { className?: string }) => {
      const logoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Untitled-1.png";
      return (
      <div 
        className={`scan-effect flex-shrink-0 ${className || 'h-20 w-20 lg:h-24 lg:w-24'}`}
        style={{
            maskImage: `url("${logoUrl}")`,
            WebkitMaskImage: `url("${logoUrl}")`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat'
        }}
      >
          <img 
            src={logoUrl} 
            alt="Gano Shakh Emblem" 
            className="h-full w-full object-contain" 
          />
      </div>
      );
  };

  const renderNavButtons = (links: {pageId: string, label: string}[]) => (
    <div className="flex items-center justify-center gap-1 md:gap-1.5 flex-wrap relative z-10">
        {links.map(link => (
          <div key={link.pageId} className="relative group">
             <button
                onClick={() => navigate(link.pageId as Page)}
                className={`nav-button ${isCurrent(link.pageId as Page) ? 'active' : ''}`}
                aria-current={isCurrent(link.pageId as Page) ? 'page' : undefined}
              >
                {link.label}
              </button>
              {/* Mega Menu Preview */}
              {['products', 'reishi-decor', 'reishi-biome'].includes(link.pageId) && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:translate-y-0 translate-y-4 w-64 pointer-events-none group-hover:pointer-events-auto">
                      <div className="bg-stone-900/95 backdrop-blur-xl border border-amber-500/30 rounded-xl p-4 shadow-2xl overflow-hidden text-center">
                          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">{t.mega_menu_featured}</div>
                          <div className="h-24 bg-stone-800 rounded-lg mb-2 overflow-hidden relative">
                               <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent"></div>
                               <img 
                                 src={link.pageId === 'products' ? "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Screenshot%202025-11-18%20193006.png" : 
                                      link.pageId === 'reishi-decor' ? "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Decor%20Natural%20Sculpture.mp4" :
                                      "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Reishi%20Nutripet.mp4"
                                     }
                                 className="w-full h-full object-cover opacity-80"
                                 alt="Preview"
                               />
                          </div>
                          <div className="text-[10px] text-stone-400">Explore the premium collection.</div>
                      </div>
                  </div>
              )}
          </div>
      ))}
    </div>
  );
  
  const allNavLinks = [...navLinksRow1, ...navLinksRow2];

  return (
    <>
    <header className="sticky top-0 z-50 w-full shadow-md transition-all duration-300 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary-translucent, var(--bg-primary))', backdropFilter: 'blur(15px)', borderBottom: '1px solid var(--border-primary)' }}>
       <style>{`
        html.light { --bg-primary-translucent: rgba(255,255,255,0.85); }
        html:not(.light) { --bg-primary-translucent: rgba(10, 25, 47, 0.9); }
      `}</style>
      
      {/* Neon Rainfall Curtain */}
      <NeonCurtain />

      {/* Mycelium Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* --- Desktop Header --- */}
      <nav className="w-full hidden md:flex items-center justify-between px-4 py-2 gap-2 lg:gap-4 min-h-[90px] relative z-10">
        
        <div className="flex-shrink-0 flex items-center gap-3 group">
            <a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="flex items-center gap-3">
                <LogoImage className="h-20 w-20 lg:h-24 lg:w-24 transition-all duration-300" />
                <div className="hidden xl:block transition-opacity duration-300">
                    <AnimatedLogo />
                </div>
            </a>
        </div>

        <div className={`flex flex-col items-center justify-center gap-1.5 flex-1 mx-2 ${language === 'en' || language === 'es' ? 'lang-compact' : ''}`}>
            {renderNavButtons(navLinksRow1)}
            {renderNavButtons(navLinksRow2)}
        </div>

        <div className="flex-shrink-0 flex items-center justify-end gap-2 w-auto">
          <div className="flex items-center gap-1 lg:gap-2 border-l border-r border-white/10 px-2 mx-1">
            <a href="mailto:ganoshakh@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="hover:opacity-75 transition-opacity p-1"><MailIcon className="w-4 h-4" style={{ color: 'var(--text-secondary)'}} /></a>
            <a href="https://www.instagram.com/ganoshakh/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-75 transition-opacity p-1"><InstagramIcon className="w-4 h-4" style={{ color: 'var(--text-secondary)'}} /></a>
            <a href="https://wa.me/989363797018" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:opacity-75 transition-opacity p-1"><WhatsappIcon className="w-4 h-4" style={{ color: 'var(--text-secondary)'}} /></a>
            <a href="https://t.me/+8ETRinn0OhdiNDZk" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:opacity-75 transition-opacity p-1"><TelegramIcon className="w-4 h-4" style={{ color: 'var(--text-secondary)'}} /></a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-1 items-center">
              <LanguageSwitcher selectedLang={language} onSelectLang={setLanguage} />
              <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </div>

          <div className="w-px h-6 bg-white/10 mx-1"></div>
          
          {user ? (
            <div className="flex items-center gap-2"><span className="text-xs lg:text-sm font-medium text-amber-200 max-w-[80px] truncate">{getDisplayName()}</span><button onClick={onLogout} className="text-xs lg:text-sm font-medium hover:opacity-80 transition-colors whitespace-nowrap">{t.nav_logout}</button></div>
          ) : ( isSupabaseReady ? ( <button onClick={onLogin} className="text-xs lg:text-sm font-medium hover:opacity-80 transition-colors whitespace-nowrap bg-amber-600/80 px-3 py-1 rounded-md text-white shadow-sm">{t.nav_login}</button> ) : <div className="h-5 w-12 bg-gray-600 animate-pulse rounded"></div> )}
        </div>
      </nav>

      {/* --- Mobile Header --- */}
      <div className="md:hidden flex items-center justify-between h-20 px-4 relative z-10">
        <a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="flex items-center gap-2 group overflow-hidden">
          <LogoImage className="h-16 w-16" />
          <div className="relative px-1 rounded">
             <span className="chrome-gold-text text-2xl font-extrabold tracking-wide whitespace-nowrap relative z-10">{getLogoText()}</span>
             <span className="absolute top-0 left-0 w-full h-full px-1 text-2xl font-extrabold tracking-wide whitespace-nowrap text-scan z-20" aria-hidden="true">{getLogoText()}</span>
          </div>
        </a>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2" aria-label="Open menu">
          {isMobileMenuOpen ? <CloseIcon className="w-8 h-8" /> : <HamburgerIcon className="w-8 h-8" />}
        </button>
      </div>
    </header>

    {/* --- Mobile Menu --- */}
    <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} >
         <style>{`
            .mobile-menu-sidebar {
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            [dir="ltr"] .mobile-menu-sidebar { right: 0; transform: translateX(100%); }
            [dir="ltr"] .mobile-menu-sidebar.open { transform: translateX(0); }
            [dir="rtl"] .mobile-menu-sidebar { left: 0; transform: translateX(-100%); }
            [dir="rtl"] .mobile-menu-sidebar.open { transform: translateX(0); }

            .mobile-nav-button {
                position: relative;
                transition: all 0.2s ease-in-out;
            }
            html[dir="ltr"] .mobile-nav-button { text-align: left; }
            html[dir="rtl"] .mobile-nav-button { text-align: right; }

            .mobile-nav-button:hover {
                background-color: var(--bg-card);
                color: var(--text-primary);
            }
            html[dir="ltr"] .mobile-nav-button:hover { transform: translateX(8px); }
            html[dir="rtl"] .mobile-nav-button:hover { transform: translateX(-8px); }

            .mobile-nav-button.active {
                font-weight: 700;
                color: var(--text-primary);
            }
            .mobile-nav-button.active::before {
                content: '';
                position: absolute;
                top: 25%;
                bottom: 25%;
                width: 4px;
                background: linear-gradient(to bottom, var(--text-heading-from), var(--text-heading-to));
                border-radius: 2px;
            }
            [dir="ltr"] .mobile-nav-button.active::before {
                left: 4px; /* Explicitly position indicator on the left for LTR languages */
            }
            [dir="rtl"] .mobile-nav-button.active::before {
                right: 4px; /* Explicitly position indicator on the right for RTL languages */
            }
        `}</style>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
        {/* Sidebar */}
        <div
            className={`mobile-menu-sidebar absolute top-0 h-full w-4/5 max-w-xs shadow-xl flex flex-col ${isMobileMenuOpen ? 'open' : ''}`}
            style={{ backgroundColor: 'var(--bg-primary)' }}
            onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-primary)'}}>
            <a href="#home" onClick={(e) => { e.preventDefault(); navigate('home'); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 group">
                <LogoImage className="h-14 w-14" />
                <span className="chrome-gold-text text-xl font-bold">{getLogoText()}</span>
            </a>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2" aria-label="Close menu"><CloseIcon className="w-6 h-6" /></button>
          </div>
          
          <nav className="flex-grow p-4 overflow-y-auto">
              <div className="flex flex-col gap-1">
              {allNavLinks.map(link => (
                 <button
                    key={link.pageId}
                    onClick={() => { navigate(link.pageId as Page); setIsMobileMenuOpen(false); }}
                    className={`mobile-nav-button py-3 px-4 rounded-md text-base ${isCurrent(link.pageId as Page) ? 'active' : ''}`}
                    style={{ color: isCurrent(link.pageId as Page) ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    aria-current={isCurrent(link.pageId as Page) ? 'page' : undefined}
                >
                    {link.label}
                </button>
              ))}
              </div>
          </nav>

          <div className="p-4 border-t" style={{ borderColor: 'var(--border-primary)'}}>
             <div className="p-2 border rounded-lg mb-4" style={{backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-secondary)'}}>
                <div className="flex items-center justify-around">
                    <LanguageSwitcher selectedLang={language} onSelectLang={setLanguage} />
                    <div className="w-px h-8 bg-[var(--border-secondary)]"></div>
                    <ThemeSwitcher theme={theme} setTheme={setTheme} />
                </div>
            </div>
            <div>
                {user ? (
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-base truncate font-medium">{getDisplayName()}</span>
                        <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="font-medium hover:opacity-80 transition-colors p-2 text-red-400">{t.nav_logout}</button>
                    </div>
                ) : (
                    isSupabaseReady ? (
                        <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full py-3 px-4 rounded-md text-base transition-colors font-semibold shadow-md" style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)'}}>{t.nav_login}</button>
                    ) : <div className="h-12 w-full bg-gray-600 animate-pulse rounded-md"></div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;