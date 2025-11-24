
import React, { useEffect, useRef, useState } from 'react';
import type { Language } from '../translations';

interface ImmersiveOverlayProps {
    language: Language;
}

const factsData = {
    en: [
        "🛡️ Immune: Beta-glucans bind pattern-recognition receptors (Dectin-1) to modulate cytokine response.",
        "🎗️ Cancer: Triterpenoids induce apoptosis in tumor cells via mitochondrial pathways.",
        "🔥 Anti-inflammatory: Polysaccharides inhibit NF-κB and reduce pro-inflammatory cytokines.",
        "🫐 Antioxidant: Phenols and triterpenes scavenge ROS and enhance SOD enzymes.",
        "🥃 Liver: Ganoderic acids reduce oxidative stress and protect hepatocytes from toxicity.",
        "🧠 Brain: Hericenones in Lion's Mane stimulate Nerve Growth Factor (NGF) synthesis.",
        "😴 Mood: Reishi modulates the HPA axis to reduce anxiety and improve sleep quality.",
        "🔋 Energy: Cordyceps increases ATP production and oxygen utilization (VO2 max).",
        "🧬 Spores: Reishi spores are 75x more concentrated in triterpenes than the fruit body.",
        "🧱 Future: Mycelium composites provide sustainable thermal and acoustic insulation."
    ],
    fa: [
        "🛡️ ایمنی: بتا-گلوکان‌ها با اتصال به گیرنده‌های دکتین-۱، پاسخ سیتوکین‌ها را تنظیم می‌کنند.",
        "🎗️ سرطان: تری‌ترپنوئیدها از طریق مسیرهای میتوکندریایی، باعث مرگ سلولی (آپوپتوز) در تومورها می‌شوند.",
        "🔥 ضد التهاب: پلی‌ساکاریدها مسیر NF-κB را مهار کرده و سیتوکین‌های التهابی را کاهش می‌دهند.",
        "🫐 آنتی‌اکسیدان: فنول‌ها و تری‌ترپن‌ها رادیکال‌های آزاد را پاکسازی کرده و آنزیم SOD را تقویت می‌کنند.",
        "🥃 کبد: اسیدهای گانودریک استرس اکسیداتیو را کاهش داده و از سلول‌های کبدی در برابر سموم محافظت می‌کنند.",
        "🧠 مغز: هریسنون‌های موجود در یال شیر، سنتز فاکتور رشد عصب (NGF) را تحریک می‌کنند.",
        "😴 خلق و خو: ریشی با تنظیم محور HPA، اضطراب را کاهش داده و کیفیت خواب را بهبود می‌بخشد.",
        "🔋 انرژی: کوردیسپس تولید ATP و مصرف اکسیژن (VO2 max) را افزایش می‌دهد.",
        "🧬 هاگ‌ها: هاگ‌های ریشی ۷۵ برابر غلیظ‌تر از بدنه میوه از نظر تری‌ترپن‌ها هستند.",
        "🧱 آینده: کامپوزیت‌های میسلیوم عایق‌های حرارتی و صوتی پایداری را فراهم می‌کنند."
    ],
    es: [
        "🛡️ Inmunidad: Los beta-glucanos se unen a receptores (Dectin-1) para modular citocinas.",
        "🎗️ Cáncer: Los triterpenoides inducen apoptosis en células tumorales vía mitocondrial.",
        "🔥 Antiinflamatorio: Los polisacáridos inhiben NF-κB y reducen la inflamación.",
        "🫐 Antioxidante: Fenoles y triterpenos eliminan radicales libres y mejoran SOD.",
        "🥃 Hígado: Los ácidos ganodéricos protegen los hepatocitos de la toxicidad.",
        "🧠 Cerebro: Las hericenonas en Melena de León estimulan el Factor de Crecimiento Nervioso.",
        "😴 Ánimo: El Reishi modula el eje HPA para reducir la ansiedad y mejorar el sueño.",
        "🔋 Energía: Cordyceps aumenta la producción de ATP y el uso de oxígeno.",
        "🧬 Esporas: Las esporas de Reishi son 75x más concentradas en triterpenos.",
        "🧱 Futuro: Los materiales de micelio ofrecen aislamiento térmico sostenible."
    ]
};

const labels = {
    en: "Scientific Fact",
    fa: "آیا می‌دانستید؟",
    es: "¿Sabías que?"
};

const ImmersiveOverlay: React.FC<ImmersiveOverlayProps> = ({ language }) => {
    const [bgGradient, setBgGradient] = useState('');
    const [activeFact, setActiveFact] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: -100, y: -100, vx: 0, vy: 0 });
    const lastPos = useRef({ x: -100, y: -100, time: 0 });
    
    // --- 1. Spore Logic ---
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = performance.now();
            const dt = now - lastPos.current.time;
            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            
            // Calculate velocity
            if (dt > 0) {
                mouseRef.current.vx = dx / dt;
                mouseRef.current.vy = dy / dt;
            }
            
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            lastPos.current = { x: e.clientX, y: e.clientY, time: now };
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = -100;
            mouseRef.current.y = -100;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // --- 2. Breathing Background Logic ---
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            // Morning: Emerald / Teal
            setBgGradient('radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08), rgba(15, 23, 42, 0))'); 
        } else if (hour >= 12 && hour < 18) {
            // Afternoon: Gold / Amber
            setBgGradient('radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08), rgba(15, 23, 42, 0))');
        } else {
            // Night: Indigo / Purple
            setBgGradient('radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08), rgba(15, 23, 42, 0))');
        }
    }, []);

    // --- 3. Neon Particle Trail System ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: any[] = [];
        const maxParticles = 40; // Reduced max count to prevent clutter
        const connectionDistance = 40; // Much shorter connection distance

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Only spawn particles if mouse is on screen and valid
            if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
                // Spawn rate linked to random chance for "trail" feel
                if (particles.length < maxParticles && Math.random() > 0.3) {
                    particles.push({
                        x: mouseRef.current.x,
                        y: mouseRef.current.y,
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: (Math.random() - 0.5) * 1.5,
                        life: 1.0,
                        size: Math.random() * 1.5 + 0.5
                    });
                }
            }

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.05; // Fast decay

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    return;
                }

                // Neon Blue particle
                ctx.fillStyle = `rgba(0, 243, 255, ${p.life * 0.5})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw Local Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 243, 255, ${p.life * 0.2})`; // Faint lines
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    // --- 4. Fact Bubbles ---
    useEffect(() => {
        setActiveFact(null); 

        const interval = setInterval(() => {
            const currentFacts = factsData[language] || factsData.en;
            const randomFact = currentFacts[Math.floor(Math.random() * currentFacts.length)];
            setActiveFact(randomFact);
            setTimeout(() => setActiveFact(null), 8000); // Show for 8 seconds
        }, 20000); // Every 20 seconds

        return () => clearInterval(interval);
    }, [language]);

    const label = labels[language] || labels.en;
    const isRtl = language === 'fa';

    return (
        <>
            {/* Neon Grid Floor */}
            <div className="neon-grid-floor"></div>

            {/* Breathing Background */}
            <div 
                className="fixed inset-0 -z-10 transition-all duration-[10000ms] ease-in-out"
                style={{ background: bgGradient }}
            />

            {/* Particle Trail Canvas (High Z-index but transparent and neat) */}
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[70]" />

            {/* Fact Bubble */}
            {activeFact && (
                <div 
                    className={`fixed bottom-24 z-[55] max-w-xs bg-stone-900/80 backdrop-blur-xl border border-amber-500/30 p-4 rounded-2xl shadow-2xl animate-float-up ${isRtl ? 'left-8 text-right' : 'right-8 text-left'}`}
                    dir={isRtl ? 'rtl' : 'ltr'}
                >
                    <div className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">{label}</div>
                    <p className="text-xs text-white leading-relaxed font-medium">{activeFact}</p>
                </div>
            )}
            
            <style>{`
                @keyframes float-up {
                    0% { opacity: 0; transform: translateY(20px) scale(0.9); }
                    10% { opacity: 1; transform: translateY(0) scale(1); }
                    90% { opacity: 1; transform: translateY(-5px) scale(1); }
                    100% { opacity: 0; transform: translateY(-10px) scale(0.95); }
                }
                .animate-float-up {
                    animation: float-up 8s ease-in-out forwards;
                }
            `}</style>
        </>
    );
};

export default ImmersiveOverlay;
