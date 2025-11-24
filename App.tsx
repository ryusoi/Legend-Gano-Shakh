
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { Chat } from '@google/genai';
import type { ChatMessage, Page, Theme } from './types';
import type { Language } from './translations';
import { SYSTEM_INSTRUCTION } from './constants';
import { translations } from './translations';
import { getSupabaseClient, signUpWithEmail, signInWithEmail, signOutUser } from './supabaseClient';
import type { User, SupabaseClient } from '@supabase/supabase-js';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import VoiceNavigator from './components/VoiceNavigator';
import ConsentBanner from './components/ConsentBanner';
import RitualBuilder from './components/RitualBuilder';
import GiftBoxModal from './components/GiftBoxModal';
import ImmersiveOverlay from './components/ImmersiveOverlay';

import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import CultivationPage from './components/pages/CultivationPage';
import SciencePage from './components/pages/SciencePage';
import ProductsPage from './components/pages/ProductsPage';
import ContactPage from './components/pages/ContactPage';
import ReishiDecorPage from './components/pages/ReishiDecorPage';
import ReishiBiomePage from './components/pages/ReishiBiomePage';
import ReishiCreamPage from './components/pages/ReishiCreamPage';
import ReishiExtractPage from './components/pages/ReishiExtractPage';
import InvestmentPage from './components/pages/InvestmentPage';
import SalesPage from './components/pages/SalesPage';
import HealthTipsPage from './components/pages/HealthTipsPage';
import MycoNewsPage from './components/pages/MycoNewsPage';
import BlogsPage from './components/pages/BlogsPage';
import MakeMoneyPage from './components/pages/MakeMoneyPage';
import GanoGamePage from './components/pages/GanoGamePage';
import IranMushroomsPage from './components/pages/IranMushroomsPage';

// --- Exit Intent Modal Component ---
const ExitIntentModal = ({ t, onClose }: { t: any, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
            <div className="bg-stone-900 border border-amber-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl relative transform transition-all scale-100">
                <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-4">{t.exit_modal_title}</h2>
                <p className="text-stone-300 mb-6 text-lg">{t.exit_modal_text}</p>
                <button onClick={onClose} className="w-full bg-[#FFD700] hover:bg-yellow-400 text-black font-bold py-3 rounded-xl shadow-lg transition-transform hover:scale-105 mb-4">
                    {t.exit_modal_cta}
                </button>
                <button onClick={onClose} className="w-full text-stone-500 text-sm hover:text-stone-300 underline decoration-dotted">
                    {t.exit_modal_close}
                </button>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('fa');
  const [theme, setTheme] = useState<Theme>('dark');
  const [user, setUser] = useState<User | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const t = translations[language];
  const chatRef = useRef<Chat | null>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAiReady, setIsAiReady] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasSeenExitModal, setHasSeenExitModal] = useState(false);
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showRitualBalloon, setShowRitualBalloon] = useState(true);
  
  // Stop generation control
  const abortControllerRef = useRef<AbortController | null>(null);

  // Ritual Balloon Timer
  useEffect(() => {
      const timer = setTimeout(() => {
          setShowRitualBalloon(false);
      }, 5000);
      return () => clearTimeout(timer);
  }, []);

  // Gift Box Timer
  useEffect(() => {
      const timer = setTimeout(() => {
          const seen = sessionStorage.getItem('seen_gift_box');
          if (!seen) {
              setShowGiftBox(true);
              sessionStorage.setItem('seen_gift_box', 'true');
          }
      }, 60000); // 1 minute
      return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Global Haptics & Micro-interactions
  useEffect(() => {
      const handleClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'A' || target.closest('a')) {
              if (navigator.vibrate) {
                  navigator.vibrate(5); // Subtle haptic feedback on mobile
              }
          }
      };
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
  }, []);

  // Exit Intent Logic
  useEffect(() => {
      const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY <= 0 && !hasSeenExitModal && window.scrollY > 300 && !showGiftBox) {
              setShowExitModal(true);
              setHasSeenExitModal(true);
          }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasSeenExitModal, showGiftBox]);
  
  useEffect(() => {
    getSupabaseClient().then(client => {
      if (client) {
        setSupabase(client);
      } else {
        console.error("Supabase initialization failed. Auth features will be disabled.");
      }
    });
  }, []);

  useEffect(() => {
    if (supabase) {
      const getSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          setUser(session?.user ?? null);
      };
      getSession();

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          setUser(session?.user ?? null);
          if (session?.user) {
              setIsLoginModalOpen(false);
              setIsAuthLoading(false);
              // Trigger Gift Box on Registration/Login if not seen
              const seen = sessionStorage.getItem('seen_gift_box');
              if (!seen && event === 'SIGNED_IN') {
                  setShowGiftBox(true);
                  sessionStorage.setItem('seen_gift_box', 'true');
              }
          }
      });

      return () => {
          subscription.unsubscribe();
      };
    }
  }, [supabase]);
  
  useEffect(() => {
    const initializeAi = async () => {
        try {
            const apiKey = process.env.API_KEY || 'AIzaSyDfYnjoFIby_rHJRpdpD0s48B26des68Ts'; 

            if (!apiKey) {
              throw new Error("API_KEY not found.");
            }
            const ai = new GoogleGenAI({ apiKey });
            aiRef.current = ai;
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                },
            });
            setIsAiReady(true);
            setError(null);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.error("Failed to initialize GoogleGenAI:", errorMessage);
            setError('Could not connect to the AI service. The API key may be missing or invalid. Please contact the site administrator.');
            setIsAiReady(false);
        }
    };
    initializeAi();
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: translations.fa.initial_message,
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === '1') {
        return [{ ...prev[0], text: t.initial_message }];
      }
      return prev;
    });
  }, [t]);
  
  const getFriendlyAuthError = (message: string): string => {
    if (message.includes('Invalid login credentials')) {
        return t.error_invalid_credentials;
    }
    if (message.includes('User already registered')) {
        return t.error_email_in_use;
    }
    if (message.includes('Password should be at least 6 characters')) {
        return t.error_weak_password;
    }
    if (message.includes('valid email')) {
        return t.error_invalid_email;
    }
    return t.error_unexpected;
  }

  const handleLogin = async (email: string, pass: string) => {
    setIsAuthLoading(true);
    setAuthError(null);
    const { error } = await signInWithEmail(email, pass);
    if (error) {
        setAuthError(getFriendlyAuthError(error.message));
    }
    setIsAuthLoading(false);
  };

  const handleSignUp = async (email: string, pass: string) => {
    setIsAuthLoading(true);
    setAuthError(null);
    const { error } = await signUpWithEmail(email, pass);
    if (error) {
        setAuthError(getFriendlyAuthError(error.message));
    }
    setIsAuthLoading(false);
  };

  const deleteMessage = (id: string) => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const stopGeneration = () => {
      if (abortControllerRef.current) {
          abortControllerRef.current.abort();
          abortControllerRef.current = null;
          setIsLoading(false);
      }
  };

  const sendMessage = async (inputText: string, attachment?: { data: string, mimeType: string }) => {
    if (!inputText.trim() || isLoading || !isAiReady || !chatRef.current) return;

    setIsLoading(true);
    setError(null);
    
    abortControllerRef.current = new AbortController();

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
    };
    setMessages(prev => [...prev, userMessage]);

    try {
        let responseStream;
        
        let finalInputText = inputText;
        if (language === 'fa') {
            finalInputText = `*** SYSTEM OVERRIDE: RESPOND IN PERSIAN (FARSI) ***\nThe user is using the Persian interface. Regardless of the language of the following message, YOU MUST REPLY IN PERSIAN.\n\nUser Message: ${inputText}`;
        } else if (language === 'es') {
            finalInputText = `*** SYSTEM OVERRIDE: RESPOND IN SPANISH ***\nThe user is using the Spanish interface. Regardless of the language of the following message, YOU MUST REPLY IN SPANISH.\n\nUser Message: ${inputText}`;
        }

        if (attachment && aiRef.current) {
            const contentParts = [
                { text: finalInputText },
                { inlineData: { mimeType: attachment.mimeType, data: attachment.data } }
            ];
            
            responseStream = await chatRef.current.sendMessageStream({
                message: { parts: contentParts } as any
            });

        } else {
            responseStream = await chatRef.current.sendMessageStream({ message: finalInputText });
        }

      let modelResponseText = '';
      const modelMessageId = (Date.now() + 1).toString();

      setMessages(prev => [
        ...prev,
        { id: modelMessageId, role: 'model', text: '...' },
      ]);

      for await (const chunk of responseStream) {
        if (abortControllerRef.current?.signal.aborted) break;

        const cleanChunk = chunk.text ? chunk.text.replace(/\*/g, '') : '';
        modelResponseText += cleanChunk;
        
        setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId ? { ...msg, text: modelResponseText } : msg
          )
        );
      }
      
      setMessages(prev =>
        prev.map(msg =>
          msg.id === modelMessageId
            ? { ...msg, text: modelResponseText }
            : msg
        )
      );

    } catch (e) {
      if (abortControllerRef.current?.signal.aborted) return;
      const errorMessageString = e instanceof Error ? e.message : String(e);
      console.error(e);
      
      if (errorMessageString.includes("status code: 0")) {
           setIsLoading(false);
           return;
      }

      const displayError = t.error_unexpected || 'My apologies, I seem to be having trouble connecting. Please check your connection and API key, then try again.';
      setError(displayError);
      const tempModelMessageId = (Date.now() + 1).toString();
      setMessages(prev => prev.filter(msg => msg.id !== tempModelMessageId));
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 2).toString(), role: 'model', text: displayError },
      ]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const navigate = (page: Page, anchor?: string) => {
    if (currentPage === page && !anchor) return;
    
    setIsTransitioning(true);
    // Wait for 200ms (start of animation), then switch page, then 800ms (finish animation)
    setTimeout(() => {
        setCurrentPage(page);
        window.scrollTo({ top: 0 });
        if (anchor) {
            setTimeout(() => {
                const element = document.getElementById(anchor);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        setTimeout(() => {
            setIsTransitioning(false);
        }, 800); // Completion of exit animation
    }, 200); // Wait for cover
  };
  
  useEffect(() => {
    let pageTitle = 'Gano Shakh';
    switch (currentPage) {
        case 'home': pageTitle = 'Gano Shakh – The Purest Ganoderma on Earth'; break;
        case 'about': pageTitle = 'About Us | Gano Shakh'; break;
        case 'cultivation': pageTitle = 'Cultivation | Gano Shakh'; break;
        case 'science': pageTitle = 'Science | Gano Shakh'; break;
        case 'products': pageTitle = 'Products | Gano Shakh'; break;
        case 'contact': pageTitle = 'Contact | Gano Shakh'; break;
        case 'reishi-decor': pageTitle = 'Reishi Decor − Immortal Longevity Sculptures | Gano Shakh'; break;
        case 'reishi-biome': pageTitle = 'Reishi Biome − Cancer-Preventing Ganoderma for Pets | Gano Shakh'; break;
        case 'reishi-cream': pageTitle = 'Reishi Cream − Natural Agelessness | Gano Shakh'; break;
        case 'reishi-extract': pageTitle = 'Reishi Extract − Pure Potency | Gano Shakh'; break;
        case 'investment': pageTitle = 'Investment Opportunities | Gano Shakh'; break;
        case 'sales': pageTitle = 'Sales | Gano Shakh'; break;
        case 'health-tips': pageTitle = 'Health Tips | Gano Shakh'; break;
        case 'myco-news': pageTitle = 'Myco News | Gano Shakh'; break;
        case 'blogs': pageTitle = 'Blogs | Gano Shakh'; break;
        case 'make-money': pageTitle = 'Make Money | Gano Shakh'; break;
        case 'gano-game': pageTitle = 'Gano Game | Gano Shakh'; break;
        case 'iran-mushrooms': pageTitle = 'Iran Mushrooms Database | Gano Shakh'; break;
    }
    document.title = pageTitle;
  }, [currentPage, language]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage t={t} language={language} messages={messages} onSendMessage={sendMessage} onDeleteMessage={deleteMessage} isLoading={isLoading} onStop={stopGeneration} error={error} navigate={navigate} isAiReady={isAiReady} />;
      case 'about':
        return <AboutPage t={t} language={language} />;
      case 'cultivation':
        return <CultivationPage t={t} language={language} />;
      case 'science':
        return <SciencePage t={t} language={language} />;
      case 'products':
        return <ProductsPage t={t} language={language} navigate={navigate} />;
      case 'contact':
        return <ContactPage />;
      case 'reishi-decor':
        return <ReishiDecorPage t={t} language={language} navigate={navigate} />;
      case 'reishi-biome':
        return <ReishiBiomePage t={t} language={language} navigate={navigate} />;
      case 'reishi-cream':
        return <ReishiCreamPage t={t} language={language} navigate={navigate} />;
      case 'reishi-extract':
        return <ReishiExtractPage t={t} language={language} navigate={navigate} />;
      case 'investment':
        return <InvestmentPage t={t} language={language} />;
      case 'sales':
        return <SalesPage />;
      case 'health-tips':
        return <HealthTipsPage t={t} language={language} />;
      case 'myco-news':
        return <MycoNewsPage t={t} language={language} />;
      case 'blogs':
        return <BlogsPage t={t} language={language} />;
      case 'make-money':
        return <MakeMoneyPage t={t} language={language} />;
      case 'gano-game':
        return <GanoGamePage />;
      case 'iran-mushrooms':
        return <IranMushroomsPage t={t} language={language} />;
      default:
        return <HomePage t={t} language={language} messages={messages} onSendMessage={sendMessage} onDeleteMessage={deleteMessage} isLoading={isLoading} onStop={stopGeneration} error={error} navigate={navigate} isAiReady={isAiReady} />;
    }
  }
  
  return (
    <div dir={language === 'fa' ? 'rtl' : 'ltr'} lang={language}>
      {/* Immersive Overlay containing Breathing BG, Spore Cursor, Localized Facts & Grid */}
      <ImmersiveOverlay language={language} />
      
      {/* Neon Doorway Transition */}
      <div className={`doorway-transition ${isTransitioning ? 'doorway-active' : ''}`}></div>

      <VoiceNavigator navigate={navigate} />
      <ConsentBanner />
      
      {showGiftBox && <GiftBoxModal t={t} onClose={() => setShowGiftBox(false)} />}
      {showExitModal && !showGiftBox && <ExitIntentModal t={t} onClose={() => setShowExitModal(false)} />}
      
      <Header
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        t={t}
        user={user}
        onLogin={() => setIsLoginModalOpen(true)}
        onLogout={signOutUser}
        isSupabaseReady={!!supabase}
        navigate={navigate}
        currentPage={currentPage}
      />
      <main>
        {currentPage === 'home' && showRitualBalloon && (
            <div className="fixed right-4 top-32 z-30 hidden lg:block">
                <RitualBuilder />
            </div>
        )}
        {currentPage === 'science' ? <SciencePage t={t} language={language} /> : renderPage()} 
      </main>
      <Footer t={t} language={language} theme={theme} navigate={navigate} />

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
          t={t}
          error={authError}
          clearError={() => setAuthError(null)}
          isLoading={isAuthLoading}
        />
      )}
    </div>
  );
};

export default App;
