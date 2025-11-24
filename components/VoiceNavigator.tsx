
import React, { useEffect, useState } from 'react';
import type { Page } from '../types';

interface VoiceNavigatorProps {
    navigate: (page: Page) => void;
}

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

const VoiceNavigator: React.FC<VoiceNavigatorProps> = ({ navigate }) => {
    const [isListening, setIsListening] = useState(false);
    
    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
            console.log("Voice Command:", transcript);

            if (transcript.includes("shop") || transcript.includes("products") || transcript.includes("buy")) {
                navigate('products');
            } else if (transcript.includes("science") || transcript.includes("research")) {
                navigate('science');
            } else if (transcript.includes("contact") || transcript.includes("email")) {
                navigate('contact');
            } else if (transcript.includes("home")) {
                navigate('home');
            } else if (transcript.includes("about")) {
                navigate('about');
            }
        };

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        // Auto-start disabled by default to avoid browser blocks, but component is ready.
    }, [navigate]);

    return null; // Headless component
};

export default VoiceNavigator;
