
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import SendIcon from './icons/SendIcon';
import StopIcon from './icons/StopIcon';
import MicIcon from './icons/MicIcon';
import SpeakerIcon from './icons/SpeakerIcon';
import type { Language } from '../translations';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onStop?: () => void;
  isLoading: boolean;
  t: any;
  isAiReady: boolean;
  language: Language;
  lastAiMessageText?: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onStop, isLoading, t, isAiReady, language, lastAiMessageText }) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [rate, setRate] = useState(1.0);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US'; 

        recognitionRef.current.onstart = () => {
            setIsListening(true);
            setPermissionError(null);
        };

        recognitionRef.current.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result: any) => result.transcript)
                .join('');
            setText((prev) => transcript);
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        };

        recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
            if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                setPermissionError("Microphone access denied. Please enable it in browser settings.");
            } else if (event.error === 'no-speech') {
                // Ignore
            } else {
                setPermissionError("Voice input error. Please try again.");
            }
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };
    }

    if ('speechSynthesis' in window) {
        synthesisRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
      return () => {
          if (synthesisRef.current) {
              synthesisRef.current.cancel();
          }
      }
  }, []);

  const toggleListening = () => {
      if (!recognitionRef.current) {
          alert("Speech recognition is not supported in this browser.");
          return;
      }
      if (isListening) {
          recognitionRef.current.stop();
      } else {
          setPermissionError(null);
          const langCode = language === 'fa' ? 'fa-IR' : language === 'es' ? 'es-ES' : 'en-US';
          recognitionRef.current.lang = langCode;
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error("Failed to start recognition:", e);
          }
      }
  };

  const startSpeaking = (targetRate: number = rate) => {
      if (!synthesisRef.current || !lastAiMessageText) return;
      synthesisRef.current.cancel();
      setTimeout(() => {
          if (!synthesisRef.current) return;
          const cleanText = lastAiMessageText.replace(/<[^>]*>?/gm, '');
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.volume = volume;
          utterance.rate = targetRate;
          utterance.pitch = 1.0;
          const voices = synthesisRef.current.getVoices();
          let langCode = 'en-US';
          if (language === 'fa') langCode = 'fa-IR';
          if (language === 'es') langCode = 'es-ES';
          utterance.lang = langCode;
          let preferredVoice = null;
          if (language === 'fa') {
              preferredVoice = voices.find(v => v.lang === 'fa-IR' || v.name.toLowerCase().includes('farsi') || v.name.toLowerCase().includes('persian'));
              if (!preferredVoice) preferredVoice = voices.find(v => v.name.toLowerCase().includes('iran'));
          } else {
              const langVoices = voices.filter(v => v.lang.startsWith(language === 'es' ? 'es' : 'en'));
              preferredVoice = langVoices.find(v => v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('male'));
              if (!preferredVoice && langVoices.length > 0) preferredVoice = langVoices[0];
          }
          if (preferredVoice) utterance.voice = preferredVoice;
          utterance.onend = () => setIsSpeaking(false);
          utterance.onerror = () => setIsSpeaking(false);
          synthesisRef.current.speak(utterance);
          setIsSpeaking(true);
      }, 50);
  }

  const toggleSpeaking = () => {
      if (!synthesisRef.current) return;
      if (isSpeaking) {
          synthesisRef.current.cancel();
          setIsSpeaking(false);
      } else {
          startSpeaking(rate);
      }
  };

  const toggleRate = () => {
      const newRate = rate === 1.0 ? 1.5 : rate === 1.5 ? 2.0 : 1.0;
      setRate(newRate);
      if (isSpeaking) {
          startSpeaking(newRate);
      }
  };

  const handleSend = () => {
    if (isLoading) {
        if (onStop) onStop();
    } else if (text.trim() && isAiReady) {
      onSendMessage(text);
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${e.currentTarget.scrollHeight}px`;
    }
  };

  const isInputDisabled = isLoading || !isAiReady;

  return (
    <div className="p-2 bg-stone-900/90 backdrop-blur-md border-t border-blue-500/20 z-20">
      <div className={`flex items-end gap-1 bg-stone-800/50 border ${isListening ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-stone-600/50'} rounded-xl p-1 transition-all duration-300 relative`}>
        
        {/* Controls Group - Ultra Compact Mode */}
        <div className="flex items-end gap-0.5 pb-0.5 pl-0.5">
            {/* Read Aloud Button & Volume Control */}
            <div className="group relative flex flex-col items-center justify-end">
                {/* Responsive Volume Slider Area - Increased z-index and size */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-stone-900 border border-stone-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-[9999]">
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="h-24 w-4 bg-stone-600 rounded-lg appearance-none cursor-pointer vertical-slider"
                        style={{ writingMode: 'bt-lr' as any, WebkitAppearance: 'slider-vertical' }}
                        title="Volume"
                    />
                </div>

                <button
                    onClick={toggleSpeaking}
                    disabled={!lastAiMessageText}
                    className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 
                        ${isSpeaking 
                            ? 'bg-[#ff00ff] text-white shadow-[0_0_15px_rgba(255,0,255,0.8)] scale-110' 
                            : 'bg-stone-700 hover:bg-pink-600 text-stone-300 hover:text-white'
                        } disabled:opacity-30 disabled:cursor-not-allowed`}
                    title="Read Response Aloud"
                >
                    <SpeakerIcon className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Speed Control Button */}
            <button
                onClick={toggleRate}
                disabled={!lastAiMessageText}
                className="w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center bg-transparent hover:bg-stone-700 text-stone-400 hover:text-white transition-all border border-transparent hover:border-stone-600 text-[9px] font-bold font-mono cursor-pointer"
                title="Toggle Playback Speed"
            >
                {rate}x
            </button>

            {/* Voice Input Button */}
            <button
                onClick={toggleListening}
                disabled={isInputDisabled}
                className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isListening ? 'bg-red-500 animate-voice-pulse text-white' : 'bg-stone-700 hover:bg-blue-600 text-stone-300 hover:text-white'}`}
                title={isListening ? "Stop Listening" : "Voice Input"}
            >
                <MicIcon className="w-3.5 h-3.5" />
            </button>
        </div>

        {/* Text Area - Maximized Space */}
        <textarea
          id="chat-input"
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? (language === 'fa' ? "در حال گوش دادن..." : "Listening...") : (isAiReady ? t.chat_placeholder : 'AI is currently unavailable...')}
          className="flex-1 bg-transparent resize-none outline-none placeholder-stone-500 px-2 max-h-48 text-slate-100 min-h-[32px] py-1 text-sm leading-relaxed"
          rows={1}
          disabled={isInputDisabled}
          dir={language === 'fa' && text ? 'rtl' : 'auto'}
        />
        
        {/* Send / Stop Button - Pushed to edge */}
        <button
          onClick={handleSend}
          disabled={!isLoading && (!text.trim() || !isAiReady)}
          aria-label={isLoading ? "Stop generating" : "Send message"}
          className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center transition-all shadow-lg transform hover:scale-105 mb-0.5 mr-0.5
            ${isLoading 
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-500/50 border border-red-400 animate-pulse' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:bg-none disabled:bg-stone-600 disabled:cursor-not-allowed text-white hover:shadow-blue-500/50'
            }`}
        >
          {isLoading ? (
            <StopIcon className="w-3.5 h-3.5" />
          ) : (
            <SendIcon className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
      
      {permissionError ? (
          <div className="text-red-400 text-[10px] text-center mt-1 font-medium animate-pulse">
              {permissionError}
          </div>
      ) : (
          <div className="text-[10px] text-stone-500 text-center mt-1 font-mono">
              AI can make mistakes. Please verify medical information.
          </div>
      )}
    </div>
  );
};

export default ChatInput;
