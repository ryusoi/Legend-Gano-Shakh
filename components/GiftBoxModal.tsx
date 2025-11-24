
import React, { useEffect, useRef, useState } from 'react';
import MushroomIcon from './icons/MushroomIcon';

interface GiftBoxModalProps {
    t: any;
    onClose: () => void;
}

const GiftBoxModal: React.FC<GiftBoxModalProps> = ({ t, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate open after mount
        const timer = setTimeout(() => setIsOpen(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <style>{`
                .gift-box-container {
                    perspective: 800px;
                }
                .gift-box {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    transform-style: preserve-3d;
                    transition: transform 1s;
                    animation: float 3s ease-in-out infinite;
                }
                .gift-face {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(45deg, #ff00ff, #00f3ff);
                    border: 1px solid #fff;
                    opacity: 0.9;
                    box-shadow: 0 0 15px rgba(255,0,255,0.4);
                }
                /* 40px is half of 80px width */
                .face-front  { transform: rotateY(  0deg) translateZ(40px); }
                .face-back   { transform: rotateY(180deg) translateZ(40px); }
                .face-right  { transform: rotateY( 90deg) translateZ(40px); }
                .face-left   { transform: rotateY(-90deg) translateZ(40px); }
                .face-top    { transform: rotateX( 90deg) translateZ(40px); transform-origin: bottom; transition: transform 0.5s; }
                .face-bottom { transform: rotateX(-90deg) translateZ(40px); }
                
                .gift-open .face-top {
                    transform: rotateX(180deg) translateZ(40px);
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotateY(0deg); }
                    50% { transform: translateY(-10px) rotateY(10deg); }
                }
                
                @keyframes pop-out {
                    0% { transform: scale(0) translateY(0); opacity: 0; }
                    50% { transform: scale(1.2) translateY(-60px); opacity: 1; }
                    100% { transform: scale(1) translateY(-50px); opacity: 1; }
                }
                
                .mush-pop {
                    animation: pop-out 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    animation-delay: 0.5s;
                }
            `}</style>

            <div className="relative flex flex-col items-center p-5 w-full max-w-sm border border-amber-500/50 rounded-2xl bg-stone-900/90 shadow-[0_0_50px_rgba(255,0,255,0.15)] text-center overflow-hidden">
                
                {/* Neon Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/20 to-black pointer-events-none"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-[60px] animate-pulse"></div>

                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-1 tracking-tighter drop-shadow-md z-10 relative">
                    {t.gift_title}
                </h2>
                <p className="text-xs text-white font-bold tracking-[0.2em] mb-6 text-neon-glow z-10 relative uppercase opacity-90">{t.gift_subtitle}</p>

                {/* 3D Gift Box */}
                <div className="gift-box-container h-32 w-full flex items-center justify-center mb-4 perspective-800 relative z-10">
                    <div className={`gift-box ${isOpen ? 'gift-open' : ''}`} ref={boxRef}>
                        <div className="gift-face face-front flex items-center justify-center text-2xl font-bold text-white">🎁</div>
                        <div className="gift-face face-back"></div>
                        <div className="gift-face face-right"></div>
                        <div className="gift-face face-left"></div>
                        <div className="gift-face face-top flex items-center justify-center text-white text-[8px]">OPEN</div>
                        <div className="gift-face face-bottom"></div>
                        
                        {/* Popping Content */}
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                            <div className={`mush-pop absolute top-[-30px] opacity-0`}>
                                <MushroomIcon className="w-16 h-16 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
                            </div>
                            <div className="absolute top-[-60px] left-2 animate-bounce delay-100 opacity-0 transition-opacity duration-1000" style={{opacity: isOpen ? 1 : 0}}>
                                <span className="text-2xl">✨</span>
                            </div>
                            <div className="absolute top-[-50px] right-2 animate-bounce delay-300 opacity-0 transition-opacity duration-1000" style={{opacity: isOpen ? 1 : 0}}>
                                <span className="text-2xl">🍄</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coupon Info */}
                <div className={`transition-all duration-1000 delay-700 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} z-10 relative w-full`}>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl mb-4 inline-block w-full">
                        <p className="text-amber-300 text-xs font-bold mb-1 tracking-widest">{t.gift_code_label}</p>
                        <div className="text-2xl font-mono font-bold text-white tracking-wider border border-dashed border-white/30 p-2 rounded-lg bg-black/40 shadow-inner neon-text">
                            {t.gift_code}
                        </div>
                        <p className="text-green-400 font-bold mt-2 text-lg">{t.gift_discount}</p>
                        <p className="text-stone-300 text-xs mt-1">{t.gift_desc}</p>
                    </div>

                    <div className="flex flex-col gap-2 justify-center w-full">
                        <button 
                            onClick={onClose}
                            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all transform hover:scale-105 text-sm w-full"
                        >
                            {t.gift_btn_claim}
                        </button>
                        <button onClick={onClose} className="text-stone-500 hover:text-white text-xs underline py-1">
                            {t.gift_btn_close}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftBoxModal;
