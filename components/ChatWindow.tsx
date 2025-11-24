import React, { useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: ChatMessage[];
  onDelete: (id: string) => void;
  t: any; // translations object
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onDelete, t }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col">
        {/* --- High Definition Transparent Background: Centered Health Cross --- */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
            {/* CSS-drawn Bold White Health Cross for maximum sharpness */}
            {/* Updated: Smaller size (w-32) and higher opacity for visibility */}
            <div className="relative w-32 h-32 animate-pulse-slow">
                {/* Horizontal Bar */}
                <div className="absolute top-1/2 left-0 w-full h-10 -mt-5 bg-white rounded-md shadow-[0_0_20px_rgba(255,255,255,0.6)] backdrop-blur-sm"></div>
                {/* Vertical Bar */}
                <div className="absolute top-0 left-1/2 h-full w-10 -ml-5 bg-white rounded-md shadow-[0_0_20px_rgba(255,255,255,0.6)] backdrop-blur-sm"></div>
            </div>
        </div>

        {/* Chat Header */}
        <div className="bg-stone-900/80 backdrop-blur-md border-b border-blue-500/20 p-4 flex items-center gap-3 z-10">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
            <span className="text-blue-300 font-mono text-sm uppercase tracking-widest font-bold">Myco Doctor AI v2.5</span>
            <div className="flex-1"></div>
            <span className="text-[10px] text-stone-500 uppercase border border-stone-700 px-2 py-0.5 rounded">Secure Connection</span>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-10 custom-scrollbar">
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} onDelete={onDelete} t={t} />
            ))}
        </div>
        
        <style>{`
            @keyframes pulse-slow {
                /* Increased opacity values to be "less transparent" as requested */
                0%, 100% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 0.4; transform: scale(1.05); }
            }
            .animate-pulse-slow {
                animation: pulse-slow 4s ease-in-out infinite;
            }
        `}</style>
    </div>
  );
};

export default ChatWindow;