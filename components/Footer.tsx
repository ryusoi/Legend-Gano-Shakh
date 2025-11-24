
import React, { useState, useEffect } from 'react';
import type { Language } from '../translations';
import type { Theme, Page } from '../types';
import { 
    InstagramIcon, 
    WhatsappIcon, 
    TelegramIcon, 
    MailIcon, 
    CalendarIcon, 
    LocationIcon, 
    LeafIcon,
    ChevronDownIcon
} from './icons/SocialIcons';

interface FooterProps {
  t: any;
  language: Language;
  theme: Theme;
  navigate: (page: Page, anchor?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ t, language, theme, navigate }) => {
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [time, setTime] = useState('');
  const [showTechStack, setShowTechStack] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // Digital Clock Logic
  useEffect(() => {
    const updateTime = () => {
        const now = new Date();
        const locale = language === 'fa' ? 'fa-IR' : language === 'es' ? 'es-ES' : 'en-US';
        const timeString = new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(now);
        setTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  // Helper to handle navigation
  const handleNav = (pageId: Page) => (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(pageId);
  };

  const sitemapColumns = [
      {
          title: t.footer_col_company, // Brand: Home, About, Contact
          links: [
              { label: t.nav_home, pageId: 'home' as Page },
              { label: t.nav_about, pageId: 'about' as Page },
              { label: t.nav_contact, pageId: 'contact' as Page },
          ]
      },
      {
          title: t.footer_col_product, // Shop: Products, Decor, Biome, Cream, Extract
          links: [
              { label: t.nav_products, pageId: 'products' as Page },
              { label: t.nav_reishi_decor, pageId: 'reishi-decor' as Page },
              { label: t.nav_reishi_biome, pageId: 'reishi-biome' as Page },
              { label: t.nav_reishi_cream, pageId: 'reishi-cream' as Page },
              { label: t.nav_reishi_extract, pageId: 'reishi-extract' as Page },
          ]
      },
      {
          title: t.footer_col_resources, // Learn: Cultivation, Science, Tips, News, Blogs
          links: [
              { label: t.nav_cultivation, pageId: 'cultivation' as Page },
              { label: t.nav_science, pageId: 'science' as Page },
              { label: t.nav_health_tips, pageId: 'health-tips' as Page },
              { label: t.nav_myco_news, pageId: 'myco-news' as Page },
              { label: t.nav_blogs, pageId: 'blogs' as Page },
              { label: t.nav_iran_mushrooms, pageId: 'iran-mushrooms' as Page },
          ]
      },
      {
          title: t.footer_col_business, // Business: Investment, Sales
          links: [
              { label: t.nav_investment, pageId: 'investment' as Page },
              { label: t.nav_sales, pageId: 'sales' as Page },
          ]
      }
  ];

  const socialDockItems = [
      { id: 'email', icon: MailIcon, href: 'mailto:ganoshakh@gmail.com', label: 'Email', color: '#F59E0B' },
      { id: 'telegram', icon: TelegramIcon, href: 'https://t.me/+8ETRinn0OhdiNDZk', label: 'Telegram', color: '#229ED9' },
      { id: 'whatsapp', icon: WhatsappIcon, href: 'https://wa.me/989363797018', label: 'WhatsApp', color: '#25D366' },
      { id: 'instagram', icon: InstagramIcon, href: 'https://www.instagram.com/ganoshakh/', label: 'Instagram', color: '#E1306C' },
      { id: 'calendar', icon: CalendarIcon, href: 'https://www.time.ir/', label: 'Calendar', color: '#3B82F6', isCalendar: true },
  ];

  return (
    <footer className="relative pt-12 pb-8 bg-stone-950 text-stone-300 border-t border-stone-800 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- 1. Sitemap Toggle --- */}
      <div className="flex justify-center mb-8">
          <button 
            onClick={() => setIsSitemapOpen(!isSitemapOpen)}
            className="group flex items-center gap-2 px-6 py-2 rounded-full bg-stone-900/80 border border-stone-700/50 hover:border-amber-500/50 hover:bg-stone-800 transition-all shadow-lg backdrop-blur-md"
          >
              <span className="text-sm font-medium text-stone-300 group-hover:text-white transition-colors">{t.footer_sitemap_toggle}</span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isSitemapOpen ? 'rotate-180' : ''}`} />
          </button>
      </div>

      {/* --- 2. Expandable Sitemap Grid --- */}
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-700 ease-in-out overflow-hidden ${isSitemapOpen ? 'max-h-[500px] opacity-100 mb-12' : 'max-h-0 opacity-0'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-stone-800/50">
              {sitemapColumns.map((col, idx) => (
                  <div key={idx}>
                      <h4 className="font-bold text-white mb-4 border-l-2 border-amber-500/50 pl-3 uppercase tracking-wider text-xs">{col.title}</h4>
                      <ul className="space-y-2">
                          {col.links.map((link, lIdx) => (
                              <li key={lIdx}>
                                  <a 
                                    href={`#${link.pageId}`} 
                                    onClick={handleNav(link.pageId)}
                                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors hover:translate-x-1 inline-block cursor-pointer"
                                  >
                                      {link.label}
                                  </a>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>
      </div>

      {/* --- 3. Contact Dashboard (The Dock) --- */}
      <div className="mb-12 relative z-10">
          <div className="flex justify-center items-end gap-3 sm:gap-6 px-4 h-20">
              {socialDockItems.map((item) => {
                  const isHovered = hoveredIcon === item.id;
                  // Simple mock for dock scaling effect
                  const scale = isHovered ? 1.2 : 1;
                  const translateY = isHovered ? -10 : 0;

                  return (
                      <div key={item.id} className="relative group flex flex-col items-center">
                           {/* Tooltip */}
                           <div className={`absolute -top-10 px-3 py-1 rounded bg-black/80 text-white text-xs whitespace-nowrap transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                               {item.label}
                           </div>

                           {/* Calendar Popover Logic */}
                           {item.isCalendar && isHovered && (
                               <div className="absolute bottom-full mb-4 p-2 bg-stone-800 rounded-lg border border-stone-700 shadow-2xl animate-fade-in w-40 text-center pointer-events-none">
                                   <div className="text-[10px] text-stone-400 uppercase font-bold mb-1">Today</div>
                                   <div className="text-2xl font-bold text-white">{new Date().getDate()}</div>
                                   <div className="text-xs text-amber-400">{new Date().toLocaleDateString(language === 'fa' ? 'fa-IR' : language === 'es' ? 'es-ES' : 'en-US', { weekday: 'long' })}</div>
                               </div>
                           )}
                           
                           <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onMouseEnter={() => {
                                  setHoveredIcon(item.id);
                                  if(navigator.vibrate) navigator.vibrate(5);
                              }}
                              onMouseLeave={() => setHoveredIcon(null)}
                              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-stone-800 border border-stone-700/50 shadow-lg transition-all duration-300 ease-out crystal-icon"
                              style={{
                                  transform: `scale(${scale}) translateY(${translateY}px)`,
                                  borderColor: isHovered ? item.color : 'rgba(71, 85, 105, 0.5)',
                                  boxShadow: isHovered ? `0 0 20px ${item.color}40` : 'none'
                              }}
                           >
                               <item.icon 
                                  className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300"
                                  style={{ color: isHovered ? item.color : '#9ca3af' }} 
                                />
                           </a>
                      </div>
                  )
              })}
          </div>
      </div>

      {/* --- 4. Bottom Bar --- */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          
          {/* Left: Copyright & Tech Stack Egg */}
          <div 
            className="relative group cursor-help"
            onMouseEnter={() => setShowTechStack(true)}
            onMouseLeave={() => setShowTechStack(false)}
          >
              <div className={`transition-opacity duration-300 ${showTechStack ? 'opacity-0' : 'opacity-100'}`}>
                  <p>{t.footer_text}</p>
              </div>
              <div className={`absolute top-0 left-0 w-full transition-opacity duration-300 whitespace-nowrap text-amber-500 font-mono ${showTechStack ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {t.footer_tech_stack}
              </div>
          </div>

          {/* Center: Carbon Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/50 border border-green-900/30 text-green-400/80 hover:text-green-400 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all cursor-default group">
              <LeafIcon className="w-4 h-4 group-hover:animate-bounce" />
              <span className="text-xs font-medium">{t.footer_carbon_neutral} · {t.footer_offset}</span>
          </div>

          {/* Right: Location & Clock */}
          <div className="flex items-center gap-4 text-stone-500">
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <LocationIcon className="w-4 h-4" />
                  <span>Tehran · Remote</span>
              </div>
              <div className="w-px h-4 bg-stone-800"></div>
              <div className="font-mono text-amber-500/80 tabular-nums">
                  {time}
              </div>
          </div>
      </div>

    </footer>
  );
};

export default Footer;