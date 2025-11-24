
import React, { useState, useRef } from 'react';
import type { Language } from '../translations';

interface BloodworkAnalyzerProps {
    t: any;
    language: Language;
    onAnalyze: (text: string, attachment: { data: string, mimeType: string }) => void;
}

const BloodworkAnalyzer: React.FC<BloodworkAnalyzerProps> = ({ t, language, onAnalyze }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = (reader.result as string).split(',')[1];
            const mimeType = file.type;
            
            const targetLangName = language === 'fa' ? 'Persian (Farsi)' : language === 'es' ? 'Spanish' : 'English';

            // Construct a specific prompt for the AI, ensuring response language matches user selection
            const prompt = `[MEDICAL ANALYSIS REQUEST]
I am uploading a bloodwork document (PDF/Image). 

Please analyze this document comprehensively. 
1. Identify all markers outside standard reference ranges.
2. Provide a detailed medical and nutritional assessment based on these values.
3. Suggest specific dietary changes, lifestyle adjustments, and supplements (including medicinal mushrooms like Reishi) that could help correct these imbalances.
4. Explain the potential root causes for any abnormalities.

Assume the role of an expert functional medicine nutritionist.

IMPORTANT: Provide the response in ${targetLangName}.`;
            
            onAnalyze(prompt, { data: base64String, mimeType });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="relative mx-auto max-w-lg mt-8 mb-12">
            {/* Changed to neon-box-green and reduced padding/size */}
            <div className={`neon-box-green rounded-3xl p-1 transition-all duration-500 ${isDragging ? 'scale-105' : 'scale-100'}`}>
                <div 
                    className="bg-stone-900/90 backdrop-blur-xl rounded-[1.4rem] p-6 text-center border border-green-500/30 flex flex-col items-center justify-center min-h-[150px] cursor-pointer relative overflow-hidden group"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {/* Flash Animation Layer */}
                    <div className="absolute inset-0 rounded-[1.4rem] animate-flash pointer-events-none border-2 border-transparent"></div>
                    
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleFileSelect}
                        accept="application/pdf,image/png,image/jpeg,image/webp" 
                    />
                    
                    <div className="mb-3 p-3 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                    
                    <h3 className="text-lg font-bold text-green-100 mb-1">{t.bloodwork_title}</h3>
                    <p className="text-stone-400 text-xs max-w-sm leading-relaxed">
                        {t.bloodwork_desc}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-green-500 bg-green-900/20 px-3 py-1 rounded border border-green-700/30">
                        <span className="animate-pulse">●</span> {t.bloodwork_secure}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BloodworkAnalyzer;
