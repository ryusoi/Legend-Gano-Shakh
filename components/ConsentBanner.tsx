
import React, { useState, useEffect } from 'react';

const ConsentBanner: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setTimeout(() => setVisible(true), 2000);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 p-4 flex justify-center pointer-events-none">
            <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-700 p-6 rounded-2xl shadow-2xl max-w-lg w-full pointer-events-auto animate-fade-in-up flex flex-col sm:flex-row items-center gap-4">
                <div className="text-sm text-stone-300">
                    <strong className="text-white block mb-1">We respect your privacy.</strong>
                    We use cookies to enhance your experience and analyze traffic. No personal data is sold.
                </div>
                <div className="flex gap-2 shrink-0">
                    <button onClick={() => setVisible(false)} className="px-4 py-2 text-xs font-bold text-stone-400 hover:text-white transition-colors">
                        Decline
                    </button>
                    <button onClick={accept} className="px-6 py-2 text-xs font-bold bg-white text-black rounded-full hover:bg-amber-400 transition-colors shadow-lg">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentBanner;
