
import React, { useState } from 'react';
import type { ChatMessage } from '../types';
import LinkIcon from './icons/LinkIcon';

interface MessageBubbleProps {
  message: ChatMessage;
  onDelete: (id: string) => void;
  t: any; // translations object
}

const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onDelete, t }) => {
  const isModel = message.role === 'model';
  const hasHtml = /<[a-z][\s\S]*>/i.test(message.text);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
      try {
          const textToCopy = message.text.replace(/<[^>]*>?/gm, ''); 
          await navigator.clipboard.writeText(textToCopy);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      } catch (err) {
          console.error('Failed to copy text', err);
      }
  };

  return (
    <div className={`flex items-start gap-3 sm:gap-4 ${isModel ? '' : 'flex-row-reverse'} group`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center overflow-hidden ${isModel ? 'bg-amber-900/20 border border-amber-500/50' : 'bg-stone-700'}`}>
        {isModel ? (
            <img 
                src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Myco%20Doctor.png" 
                alt="Myco Doctor" 
                className="w-full h-full object-cover"
            />
        ) : (
            <span className="text-lg">👤</span>
        )}
      </div>

      {/* Bubble Content */}
      <div className={`max-w-lg xl:max-w-2xl rounded-2xl p-3 sm:p-4 text-sm sm:text-base relative ${isModel ? 'bg-stone-800/70 border border-stone-700/50' : 'bg-blue-600/90'}`}>
        {hasHtml ? (
          <div className="text-slate-100 mb-2" dangerouslySetInnerHTML={{ __html: message.text }}></div>
        ) : (
          <p className="whitespace-pre-wrap text-slate-100 mb-2">{message.text}</p>
        )}
        
        {/* Message Actions: Copy & Delete */}
        <div className={`flex items-center justify-end gap-3 mt-3 pt-2 ${isModel ? 'border-t border-stone-700/30' : 'border-t border-blue-500/30'}`}>
            <button 
                onClick={handleCopy}
                className="p-1.5 rounded-full transition-all duration-300 hover:bg-white/10 group/btn"
                title="Copy text"
            >
                {copied ? (
                    <CheckIcon className="w-4 h-4 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]" />
                ) : (
                    <CopyIcon className="w-4 h-4 text-slate-400 group-hover/btn:text-[#39ff14] group-hover/btn:drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] transition-all" />
                )}
            </button>
            <button 
                onClick={() => onDelete(message.id)}
                className="p-1.5 rounded-full transition-all duration-300 hover:bg-red-500/10 group/btn"
                title="Delete message"
            >
                <TrashIcon className="w-4 h-4 text-slate-400 group-hover/btn:text-[#ff073a] group-hover/btn:drop-shadow-[0_0_8px_rgba(255,7,58,0.8)] transition-all" />
            </button>
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-stone-600/50">
            <h4 className="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              {t.sources}
            </h4>
            <ul className="space-y-1">
              {message.sources.map((source, index) => {
                const web = source.web;
                if (web?.uri) {
                  return (
                    <li key={index}>
                      <a
                        href={web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 hover:underline truncate block"
                        title={web.title || ''}
                      >
                        {index + 1}. {web.title || web.uri}
                      </a>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
