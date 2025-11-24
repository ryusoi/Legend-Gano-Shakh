
import React, { useState, useEffect } from 'react';
import Hero from '../Hero';
import ChatWindow from '../ChatWindow';
import ChatInput from '../ChatInput';
import BloodworkAnalyzer from '../BloodworkAnalyzer';
import ImmunityWidget from '../ImmunityWidget';
import KineticTypography from '../KineticTypography';
import PortalGrid from '../PortalGrid';
import type { ChatMessage, Page } from '../../types';
import type { Language } from '../../translations';

interface HomePageProps {
  t: any;
  language: Language;
  messages: ChatMessage[];
  onSendMessage: (text: string, attachment?: { data: string, mimeType: string }) => void;
  onStop?: () => void;
  onDeleteMessage: (id: string) => void;
  isLoading: boolean;
  error: string | null;
  navigate: (page: Page, anchor?: string) => void;
  isAiReady: boolean;
}

// --- Personalized Dashboard Component ---
const PersonalizedDashboard = ({ t }: { t: any }) => {
    const [greeting, setGreeting] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('Tehran (Est.)');
    const [isReturning, setIsReturning] = useState(false);

    useEffect(() => {
        const date = new Date();
        const hour = date.getHours();
        if (hour < 12) setGreeting(t.dash_greeting_morning);
        else if (hour < 18) setGreeting(t.dash_greeting_afternoon);
        else setGreeting(t.dash_greeting_evening);

        setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        
        const visited = localStorage.getItem('last_visit');
        if (visited) setIsReturning(true);
        localStorage.setItem('last_visit', new Date().toISOString());
    }, [t]);

    return (
        <div className="hidden md:flex items-center gap-6 px-6 py-3 bg-stone-900/80 backdrop-blur-md border border-stone-800 rounded-2xl shadow-lg animate-fade-in-down mb-8 mx-4 sm:mx-8 mt-4 justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-inner">
                    AI
                </div>
                <div>
                    <h3 className="text-stone-100 font-bold text-sm">
                        {greeting}, <span className="text-amber-400">{isReturning ? t.dash_welcome_back : t.dash_new_visitor}</span>
                    </h3>
                    <p className="text-[10px] text-stone-400 flex items-center gap-2">
                        <span>{time}</span> • <span>{location} {t.dash_location_detect}</span>
                    </p>
                </div>
            </div>
            
            <ImmunityWidget t={t} />

            <div className="flex items-center gap-3 text-[10px] text-stone-500">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {t.dash_status_active}
                </div>
            </div>
        </div>
    );
};

const HomePage: React.FC<HomePageProps> = ({ t, language, messages, onSendMessage, onStop, onDeleteMessage, isLoading, error, navigate, isAiReady }) => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-950 relative">
        {/* Hero component handles the top background video */}
        <Hero t={t} />
        
        <div className="relative z-10 -mt-20 sm:-mt-32 pb-20">
            <div className="max-w-5xl mx-auto w-full px-2 sm:px-4">
                
                <PersonalizedDashboard t={t} />

                <div className="bg-stone-900/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-stone-800 overflow-hidden flex flex-col h-[85vh] min-h-[600px] neon-box-container relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 opacity-50"></div>
                    
                    <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-900/50">
                        <div className="flex flex-col items-center text-center">
                            <KineticTypography 
                                text={t.chat_title} 
                                className="text-2xl sm:text-3xl font-bold text-white mb-2" 
                                isFarsi={language === 'fa'} 
                            />
                            <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto">{t.chat_subtitle}</p>
                        </div>
                    </div>

                    <ChatWindow messages={messages} onDelete={onDeleteMessage} t={t} />
                    
                    {error && (
                        <div className="bg-red-900/20 border-t border-red-500/30 p-2 text-center">
                            <span className="text-red-400 text-xs">{error}</span>
                        </div>
                    )}

                    <ChatInput 
                        onSendMessage={onSendMessage} 
                        onStop={onStop}
                        isLoading={isLoading} 
                        t={t} 
                        isAiReady={isAiReady}
                        language={language}
                        lastAiMessageText={messages.filter(m => m.role === 'model').pop()?.text}
                    />
                </div>

                <BloodworkAnalyzer t={t} language={language} onAnalyze={onSendMessage} />
            </div>
        </div>

        {/* New Portal Grid Section */}
        <PortalGrid t={t} navigate={navigate} />
        
    </div>
  );
};

export default HomePage;
