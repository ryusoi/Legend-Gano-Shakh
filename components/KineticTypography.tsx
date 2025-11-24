
import React, { useEffect, useRef, useState } from 'react';

interface KineticTypographyProps {
    text: string;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    stagger?: number;
    isFarsi?: boolean;
}

const KineticTypography: React.FC<KineticTypographyProps> = ({ text, className = "", tag: Tag = 'h2', stagger = 0.03, isFarsi = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); }
    }, []);

    // For Farsi/Arabic scripts:
    // 1. Disable character splitting to preserve cursive ligatures (prevent disconnected letters).
    // 2. Apply 'chrome-gold-text' for the requested dynamic shine effect.
    if (isFarsi) {
        return (
            <Tag 
                ref={ref as any} 
                className={`${className} chrome-gold-text transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                aria-label={text}
                style={{ lineHeight: 1.5 }}
            >
                {text}
            </Tag>
        );
    }

    const words = text.split(" ");

    return (
        <Tag ref={ref as any} className={`kinetic-text ${className}`} aria-label={text}>
            {words.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, cIdx) => {
                        const delay = (wIdx * 5 + cIdx) * stagger;
                        return (
                            <span 
                                key={cIdx} 
                                className={`inline-block transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
                                style={{ transitionDelay: `${delay}s` }}
                            >
                                {char}
                            </span>
                        );
                    })}
                </span>
            ))}
        </Tag>
    );
};

export default KineticTypography;
