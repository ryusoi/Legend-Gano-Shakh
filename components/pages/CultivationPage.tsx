
import React, { useState, useEffect, useRef } from 'react';
import type { Language } from '../../translations';

interface CultivationPageProps {
  t: any;
  language: Language;
}

// --- SCIENTIFIC PAPER CONTENT ---
const PAPER_CONTENT = {
    en: {
        title: "Log-Based vs. Sawdust-Based Ganoderma Cultivation",
        subtitle: "A Scientific, Biochemical, and Energetic Analysis of Bioactive Density, Mycelial Physiology, and Holistic Vitality Transfer",
        meta: "Author: Compiled Research Review | Institution: Gano Shakh Myco-Scientific Facility | Date: 2025",
        abstract: {
            title: "Abstract",
            text: "This paper analyzes the biochemical and physiological differences between whole-log Ganoderma cultivation and sawdust-substrate cultivation, focusing on colonization dynamics, substrate complexity, secondary metabolite biosynthesis, and the emerging hypothesis of energy transfer from ancient trees through the fungal lifecycle into human physiology. Log-grown Ganoderma demonstrates dramatically higher density, diversity, and completeness of 500+ bioactives, including triterpenoids, polysaccharides, sterols, peptides, alkaloids, trace elements, and phenolic compounds. The synergy between lignin-rich ancient hardwood and long-term mycelial colonization drives a uniquely potent bioactive expression profile—far exceeding any sawdust-based system. Additionally, modern biophoton-imaging technologies from Germany have enabled early-stage scientific exploration into bioenergetic fields in wood, fungal tissues, and human cells, supporting the traditional concept that long-lived trees store complex energetic signatures. Ganoderma acts as a biological converter—transforming lignin into chitin-rich fungal tissues infused with biochemical and energetic information."
        },
        sections: [
            {
                title: "1. Introduction",
                color: "border-cyan-500",
                text: "Ganoderma spp. (Reishi/Lingzhi) is one of the most physiologically complex medicinal fungi known, with over 500 identified bioactives regulating immunity, inflammation, oxidative stress, metabolic pathways, and cellular repair. While modern industry often turns to sawdust substrate for rapid, economical production, traditional medicinal practice—and modern biochemical studies—identify whole-log cultivation as the superior method for producing genuine, complete-spectrum, therapeutic-grade Ganoderma. This superiority arises from ecological fidelity: Ganoderma evolved as a lignin-degrading basidiomycete specialized for hardwood decomposition. Only whole wood provides the biochemical richness and structural complexity that trigger the fungus to produce its full repertoire of secondary metabolites."
            },
            {
                title: "2. Colonization Time & Physiological Stress",
                color: "border-rose-500",
                columns: [
                    {
                        header: "2.1 Sawdust Systems (Fast & Weak)",
                        points: [
                            "Colonization in 30–90 days",
                            "Loose, fragmented substrate",
                            "Low lignin density",
                            "Limited oxidative stress gradients",
                            "Reduced need for enzymatic diversity (cellulases > ligninases)"
                        ],
                        summary: "Sawdust offers speed but creates low metabolic pressure. Without dense lignin matrices, the fungus does not need to produce the full suite of ganoderic acids. Bioactive diversity is restricted."
                    },
                    {
                        header: "2.2 Log-Based Systems (Slow & Potent)",
                        points: [
                            "Colonization in 10–14 months",
                            "Intact lignin–cellulose architecture",
                            "Strong natural gradients: moisture, oxygen, minerals",
                            "High structural resistance forces advanced enzyme production",
                            "Induces stress-triggered secondary metabolism"
                        ],
                        summary: "The long colonization period exposes the mycelium to extended oxidative and physical stress, stimulating deep metabolic pathways including Cytochrome P450 expansion and Lanosterol-transforming oxidases."
                    }
                ]
            },
            {
                title: "3. Why Bioactives Are More Potent",
                color: "border-amber-500",
                text: "Lignin is the core biochemical trigger. Hardwood lignin contains Phenylpropanoid networks and aromatic rings. Ganoderma must deploy lignin peroxidases and laccases to break these structures, producing reactive quinones and aromatic intermediates. These intermediates are precursors for Ganoderic acids (100+ types), Lucidenic acids, and Meroterpenoids. Only when grown on solid wood does Ganoderma access this biochemical precursor pool.\n\nFurthermore, ancient wood accumulates trace minerals and long-term solar energy transformed into lignin-carbon bonds. German biophoton imaging has measured higher photon emission density in ancient wood and distinct emission signatures in Ganoderma grown on such wood."
            },
            {
                title: "4. Ganoderma as a Biological Transformer",
                color: "border-purple-500",
                list: [
                    "Biochemical Transformation: Reassembles lignin carbon backbones into Chitin, Beta-Glucans, and Triterpenoids.",
                    "Biophysical Transformation: Mycelial signaling networks take on the vibrational complexity of the host tree.",
                    "Bioenergetic Transmission: Consumers report 'deep calmness' and 'grounding energy', correlating with measurable cellular responses like mitochondrial photon coherence."
                ]
            },
            {
                title: "5. Why Sawdust Cultivation Fails",
                color: "border-red-500",
                text: "Sawdust lacks lignin complexity and long-term energy storage. Because the fungus colonizes sawdust quickly, it never passes through the long-term secondary metabolism phases necessary to produce rare ganoderic acids. The result is a mushroom physically resembling Reishi—but chemically and energetically incomplete."
            },
            {
                title: "6. The Holistic Outcome",
                color: "border-emerald-500",
                text: "Log-grown Ganoderma contains full-spectrum 500+ bioactives, complex high-weight β-glucans, and unique biophotonic signatures. This translates into stronger immune activation, deeper antioxidant protection, superior liver detox support, and heightened mitochondrial coherence."
            },
            {
                title: "7. Spiritual–Scientific Synthesis",
                color: "border-blue-400",
                text: "Ancient trees represent time and endurance. Ganoderma decodes their lifetime of information. When consumed, there is a three-level transfer: Biochemical (molecules), Biophysical (redox balance), and Energetic (vibrational resonance). The consumer receives a distilled imprint of the tree’s longevity."
            },
            {
                title: "8. The Gano Shakh Commitment",
                color: "border-yellow-400",
                text: "At Gano Shakh, we use only whole-log, long-cycle cultivation. We choose the hard path because it produces the strongest mushrooms and the deepest medicinal profiles. People describe the experience as something beyond ordinary supplementation — something living, ancient, and transformative. We call it the miracle of log-grown Ganoderma."
            }
        ]
    },
    fa: {
        title: "کشت گانودرما مبتنی بر کنده در مقابل خاک‌اره",
        subtitle: "تحلیل علمی، بیوشیمیایی و انرژیایی تراکم زیست‌فعال، فیزیولوژی میسلیوم و انتقال نشاط جامع",
        meta: "نویسنده: مرور تحقیقات گردآوری شده | موسسه: تاسیسات علمی-قارچ‌شناسی گانو شاخ | تاریخ: ۲۰۲۵",
        abstract: {
            title: "چکیده",
            text: "این مقاله تفاوت‌های بیوشیمیایی و فیزیولوژیکی بین کشت گانودرما روی کنده کامل و کشت بستر خاک‌اره را تجزیه و تحلیل می‌کند، با تمرکز بر دینامیک کلونیزاسیون، پیچیدگی بستر، بیوسنتز متابولیت‌های ثانویه و فرضیه نوظهور انتقال انرژی از درختان کهن از طریق چرخه زندگی قارچی به فیزیولوژی انسان. گانودرمای رشد یافته روی کنده تراکم، تنوع و کامل بودن بسیار بالاتری از ۵۰۰+ ماده زیست‌فعال از جمله تری‌ترپنوئیدها، پلی‌ساکاریدها، استرول‌ها، پپتیدها، آلکالوئیدها، عناصر کمیاب و ترکیبات فنلی را نشان می‌دهد. هم‌افزایی بین سخت‌چوب کهن غنی از لیگنین و کلونیزاسیون طولانی‌مدت میسلیوم منجر به پروفایل بیان زیست‌فعال منحصر به فرد و قدرتمندی می‌شود که بسیار فراتر از هر سیستم مبتنی بر خاک‌اره است."
        },
        sections: [
            {
                title: "۱. مقدمه",
                color: "border-cyan-500",
                text: "گونه‌های گانودرما (ریشی/لینگژی) یکی از پیچیده‌ترین قارچ‌های دارویی شناخته شده از نظر فیزیولوژیکی هستند، با بیش از ۵۰۰ ماده زیست‌فعال شناسایی شده. در حالی که صنعت مدرن اغلب برای تولید سریع و اقتصادی به بستر خاک‌اره روی می‌آورد، طب سنتی و مطالعات بیوشیمیایی مدرن کشت کنده کامل را به عنوان روش برتر برای تولید گانودرمای اصیل، با طیف کامل و درجه درمانی شناسایی می‌کنند. این برتری ناشی از وفاداری اکولوژیکی است: تنها چوب کامل غنای بیوشیمیایی و پیچیدگی ساختاری را فراهم می‌کند که قارچ را تحریک به تولید رپرتوار کامل متابولیت‌های ثانویه خود می‌کند."
            },
            {
                title: "۲. زمان کلونیزاسیون و استرس فیزیولوژیک",
                color: "border-rose-500",
                columns: [
                    {
                        header: "۲.۱ سیستم‌های خاک‌اره (سریع و ضعیف)",
                        points: [
                            "کلونیزاسیون در ۳۰ تا ۹۰ روز",
                            "بستر سست و تکه تکه",
                            "تراکم لیگنین پایین",
                            "شیب‌های استرس اکسیداتیو محدود",
                            "نیاز کمتر به تنوع آنزیمی"
                        ],
                        summary: "خاک‌اره سرعت را ارائه می‌دهد اما فشار متابولیک کمی ایجاد می‌کند. بدون ماتریس‌های لیگنین متراکم، قارچ نیازی به تولید مجموعه کامل اسیدهای گانودریک ندارد. در نتیجه، تنوع زیست‌فعال محدود می‌شود."
                    },
                    {
                        header: "۲.۲ سیستم‌های مبتنی بر کنده (آهسته و قوی)",
                        points: [
                            "کلونیزاسیون در ۱۰ تا ۱۴ ماه",
                            "معماری دست‌نخورده لیگنین-سلولز",
                            "شیب‌های طبیعی قوی: رطوبت، اکسیژن، مواد معدنی",
                            "مقاومت ساختاری بالا قارچ را مجبور به تولید آنزیم‌های پیشرفته می‌کند",
                            "متابولیسم ثانویه ناشی از استرس را القا می‌کند"
                        ],
                        summary: "دوره طولانی کلونیزاسیون میسلیوم را در معرض استرس اکسیداتیو و فیزیکی طولانی قرار می‌دهد و مسیرهای متابولیک عمیق را تحریک می‌کند."
                    }
                ]
            },
            {
                title: "۳. چرا مواد زیست‌فعال قوی‌تر هستند",
                color: "border-amber-500",
                text: "لیگنین محرک اصلی بیوشیمیایی است. لیگنین سخت‌چوب حاوی شبکه‌های فنیل‌پروپانوئید است. گانودرما باید پراکسیدازهای لیگنین را برای شکستن این ساختارها به کار گیرد که منجر به تولید واسطه‌های آروماتیک می‌شود. این واسطه‌ها پیش‌سازهای اسیدهای گانودریک (۱۰۰+ نوع) و لوسیدنیک هستند. تنها زمانی که روی چوب جامد رشد می‌کند، گانودرما به این استخر پیش‌ساز بیوشیمیایی دسترسی پیدا می‌کند.\n\nعلاوه بر این، چوب کهن انرژی خورشیدی طولانی‌مدت را که به پیوندهای لیگنین-کربن تبدیل شده است، ذخیره می‌کند. دستگاه‌های تصویربرداری بیوفوتون آلمانی تراکم انتشار فوتون بالاتری را در چوب کهن و امضاهای انتشار متمایز را در گانودرمای رشد یافته روی چنین چوبی اندازه‌گیری کرده‌اند."
            },
            {
                title: "۴. گانودرما به عنوان مبدل بیولوژیکی",
                color: "border-purple-500",
                list: [
                    "تبدیل بیوشیمیایی: اسکلت کربنی لیگنین را به کیتین، بتا-گلوکان‌ها و تری‌ترپنوئیدها بازآرایی می‌کند.",
                    "تبدیل بیوفیزیکی: شبکه‌های سیگنالینگ میسلیوم پیچیدگی ارتعاشی درخت میزبان را به خود می‌گیرند.",
                    "انتقال انرژی زیستی: مصرف‌کنندگان 'آرامش عمیق' و 'انرژی زمین‌گیرنده' را گزارش می‌دهند که با پاسخ‌های سلولی قابل اندازه‌گیری مرتبط است."
                ]
            },
            {
                title: "۵. چرا کشت خاک‌اره شکست می‌خورد",
                color: "border-red-500",
                text: "خاک‌اره فاقد پیچیدگی لیگنین و ذخیره انرژی طولانی‌مدت است. چون قارچ خاک‌اره را به سرعت کلونیزه می‌کند، هرگز از فازهای متابولیسم ثانویه طولانی‌مدت لازم برای تولید اسیدهای گانودریک کمیاب عبور نمی‌کند. نتیجه قارچی است که از نظر فیزیکی شبیه ریشی است—اما از نظر شیمیایی و انرژیایی ناقص است."
            },
            {
                title: "۶. نتیجه جامع",
                color: "border-emerald-500",
                text: "گانودرمای کنده طبیعی حاوی طیف کامل ۵۰۰+ ماده زیست‌فعال و امضاهای بیوفوتونیک منحصر به فرد است. این به معنای فعال‌سازی ایمنی قوی‌تر، محافظت آنتی‌اکسیدانی عمیق‌تر، حمایت سم‌زدایی کبد برتر و انسجام میتوکندریایی بالاتر است."
            },
            {
                title: "۷. سنتز معنوی-علمی",
                color: "border-blue-400",
                text: "درختان کهن نمایانگر زمان و استقامت هستند. گانودرما ارگانیسمی است که اطلاعات بیوشیمیایی و انرژیایی آن‌ها را رمزگشایی کرده و به شکل دارویی بازآرایی می‌کند. مصرف‌کننده اثر تقطیر شده‌ای از طول عمر و حافظه ارتعاشی درخت را دریافت می‌کند."
            },
            {
                title: "۸. تعهد گانو شاخ",
                color: "border-yellow-400",
                text: "در گانو شاخ، ما فقط از کشت کنده کامل و چرخه طولانی استفاده می‌کنیم. ما مسیر دشوار را انتخاب می‌کنیم زیرا قوی‌ترین قارچ‌ها و عمیق‌ترین پروفایل‌های دارویی را تولید می‌کند. مردم تجربه را به عنوان چیزی فراتر از مکمل معمولی توصیف می‌کنند — چیزی زنده، کهن و دگرگون‌کننده. ما آن را معجزه گانودرمای کنده طبیعی می‌نامیم."
            }
        ]
    },
    es: {
        title: "Cultivo de Ganoderma en Tronco vs. Aserrín",
        subtitle: "Un Análisis Científico, Bioquímico y Energético de la Densidad Bioactiva, Fisiología Micelial y Transferencia de Vitalidad Holística",
        meta: "Autor: Revisión de Investigación Compilada | Institución: Instalación Mico-Científica Gano Shakh | Fecha: 2025",
        abstract: {
            title: "Resumen",
            text: "Este documento analiza las diferencias bioquímicas y fisiológicas entre el cultivo de Ganoderma en tronco entero y el cultivo en sustrato de aserrín, centrándose en la dinámica de colonización, complejidad del sustrato y la hipótesis emergente de transferencia de energía desde árboles antiguos. El Ganoderma cultivado en tronco demuestra una densidad y diversidad dramáticamente mayores de más de 500 bioactivos, incluidos triterpenoides, polisacáridos y compuestos fenólicos. La sinergia entre la madera dura antigua rica en lignina y la colonización micelial a largo plazo impulsa un perfil de expresión bioactiva inigualable. Además, tecnologías modernas de imagen de biofotones han permitido la exploración de campos bioenergéticos, apoyando el concepto de que el Ganoderma actúa como un convertidor biológico, transformando la lignina en tejidos fúngicos infundidos con información bioquímica y energética."
        },
        sections: [
            {
                title: "1. Introducción",
                color: "border-cyan-500",
                text: "Ganoderma spp. (Reishi) es uno de los hongos medicinales más complejos, con más de 500 bioactivos. Mientras que la industria moderna utiliza aserrín para una producción rápida, la práctica tradicional y los estudios bioquímicos identifican el cultivo en tronco entero como el método superior. Esta superioridad surge de la fidelidad ecológica: solo la madera entera proporciona la riqueza bioquímica y la complejidad estructural que activan al hongo para producir su repertorio completo de metabolitos secundarios."
            },
            {
                title: "2. Tiempo de Colonización y Estrés Fisiológico",
                color: "border-rose-500",
                columns: [
                    {
                        header: "2.1 Sistemas de Aserrín (Rápido y Débil)",
                        points: [
                            "Colonización en 30–90 días",
                            "Sustrato suelto y fragmentado",
                            "Baja densidad de lignina",
                            "Gradientes de estrés limitados",
                            "Menor necesidad de diversidad enzimática"
                        ],
                        summary: "El aserrín ofrece velocidad pero crea baja presión metabólica. Sin matrices densas de lignina, el hongo no necesita producir el conjunto completo de ácidos ganodéricos. La diversidad bioactiva está restringida."
                    },
                    {
                        header: "2.2 Sistemas de Tronco (Lento y Potente)",
                        points: [
                            "Colonización en 10–14 meses",
                            "Arquitectura intacta de lignina-celulosa",
                            "Fuertes gradientes naturales",
                            "Alta resistencia estructural fuerza la producción avanzada de enzimas",
                            "Induce metabolismo secundario activado por estrés"
                        ],
                        summary: "El largo período de colonización expone al micelio a estrés oxidativo y físico extendido, estimulando rutas metabólicas profundas necesarias para el perfil medicinal."
                    }
                ]
            },
            {
                title: "3. Por Qué los Bioactivos Son Más Potentes",
                color: "border-amber-500",
                text: "La lignina es el desencadenante bioquímico central. El Ganoderma debe desplegar peroxidasas para romper las redes de fenilpropanoide de la madera dura, produciendo intermedios aromáticos que son precursores de ácidos ganodéricos y lucidenicos. Solo cuando crece en madera sólida accede a este grupo de precursores.\n\nAdemás, la madera antigua acumula minerales traza y energía solar a largo plazo. Imágenes alemanas de biofotones han medido una mayor densidad de emisión de fotones en madera antigua y firmas de emisión distintas en Ganoderma cultivado en dicha madera."
            },
            {
                title: "4. Ganoderma como Transformador Biológico",
                color: "border-purple-500",
                list: [
                    "Transformación Bioquímica: Reensambla la columna vertebral de carbono de la lignina en Quitina, Beta-Glucanos y Triterpenoides.",
                    "Transformación Biofísica: Las redes de señalización micelial adquieren la complejidad vibratoria del árbol huésped.",
                    "Transmisión Bioenergética: Los consumidores reportan 'calma profunda' y 'energía de conexión a tierra', correlacionándose con la coherencia fotónica mitocondrial."
                ]
            },
            {
                title: "5. Por Qué Falla el Cultivo en Aserrín",
                color: "border-red-500",
                text: "El aserrín carece de complejidad de lignina y almacenamiento de energía a largo plazo. Debido a que el hongo coloniza el aserrín rápidamente, nunca pasa por las fases de metabolismo secundario a largo plazo necesarias para producir ácidos ganodéricos raros. El resultado es un hongo físicamente parecido al Reishi, pero químicamente incompleto."
            },
            {
                title: "6. El Resultado Holístico",
                color: "border-emerald-500",
                text: "El Ganoderma cultivado en tronco contiene un espectro completo de más de 500 bioactivos y firmas biofotónicas únicas. Esto se traduce en una activación inmune más fuerte, protección antioxidante más profunda y una mayor coherencia mitocondrial."
            },
            {
                title: "7. Síntesis Espiritual-Científica",
                color: "border-blue-400",
                text: "Los árboles antiguos representan tiempo y resistencia. Ganoderma decodifica su información bioquímica y energética. Al consumirlo, hay una transferencia de tres niveles: Bioquímica, Biofísica y Energética. El consumidor recibe una impronta destilada de la longevidad del árbol."
            },
            {
                title: "8. El Compromiso Gano Shakh",
                color: "border-yellow-400",
                text: "En Gano Shakh, utilizamos solo cultivo en tronco entero de ciclo largo. Elegimos el camino difícil porque produce los hongos más fuertes y los perfiles medicinales más profundos. La gente describe la experiencia como algo más allá de la suplementación ordinaria: algo vivo, antiguo y transformador."
            }
        ]
    }
};

// Intersection Observer hook for scroll reveal
const useOnScreen = (options: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
            }
        }, options);
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if(ref.current) observer.unobserve(ref.current);
        }
    }, [ref, options]);
    return [ref, visible] as const;
}

const ScrollRevealSection: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const [ref, visible] = useOnScreen({ threshold: 0.2 });
    return (
        <div 
            ref={ref} 
            className={`transition-all duration-1000 ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} ${className}`}
        >
            {children}
        </div>
    );
}

const ImageGallery: React.FC<{ images: {url: string, position?: string}[], altPrefix: string }> = ({ images, altPrefix }) => (
    <div className="grid grid-cols-2 gap-4 my-8">
        {images.map(({url, position}, index) => (
            <div key={index} className={`rounded-2xl shadow-md dark:shadow-lg dark:shadow-black/30 overflow-hidden transition-transform duration-500 hover:scale-[1.02] ${images.length === 3 && index === 0 ? 'col-span-2' : ''}`}>
                <img 
                    src={url} 
                    alt={`${altPrefix} - image ${index + 1}`}
                    className="w-full h-64 object-cover"
                    style={{ objectPosition: position || 'center' }}
                />
            </div>
        ))}
    </div>
);

const SpeakerWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

const SpeakerXMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

const ScientificPaperView: React.FC<{ language: Language }> = ({ language }) => {
    const content = PAPER_CONTENT[language];
    const isRtl = language === 'fa';

    return (
        <div className={`max-w-4xl mx-auto my-20 ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Paper Header */}
            <div className="mb-16 text-center">
                <div className="inline-block px-4 py-1 mb-4 border border-amber-500/50 rounded-full bg-amber-900/20 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">Scientific Report</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">{content.title}</h2>
                <h3 className="text-lg sm:text-xl text-amber-200/80 font-light leading-relaxed mb-4">{content.subtitle}</h3>
                <p className="text-xs text-stone-500 font-mono uppercase tracking-wide">{content.meta}</p>
            </div>

            {/* Abstract Box */}
            <div className="mb-12 p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-stone-900/90 to-black/90 shadow-[0_0_30px_rgba(245,158,11,0.1)] relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                <h4 className="text-xl font-bold text-amber-400 mb-4 uppercase tracking-wider">{content.abstract.title}</h4>
                <p className="text-stone-300 leading-loose text-sm sm:text-base">{content.abstract.text}</p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
                {content.sections.map((section, idx) => (
                    <div 
                        key={idx} 
                        className={`p-6 sm:p-8 rounded-2xl border ${section.color}/30 bg-stone-900/60 backdrop-blur-md shadow-lg hover:shadow-${section.color.split('-')[1]}-500/10 transition-all duration-500 group hover:border-${section.color.split('-')[1]}-500/60 relative overflow-hidden`}
                    >
                        {/* Header */}
                        <h4 className={`text-2xl font-bold mb-6 ${section.color.replace('border', 'text')} group-hover:translate-x-2 transition-transform duration-300`}>
                            {section.title}
                        </h4>

                        {/* Layout: Columns vs Text vs List */}
                        {section.columns ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {section.columns.map((col, cIdx) => (
                                    <div key={cIdx} className="bg-black/20 p-6 rounded-xl border border-white/5">
                                        <h5 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">{col.header}</h5>
                                        <ul className="space-y-2 mb-6">
                                            {col.points.map((pt, pIdx) => (
                                                <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                                                    <span className={`mt-1 w-1.5 h-1.5 rounded-full ${cIdx === 0 ? 'bg-stone-500' : 'bg-emerald-500'}`}></span>
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-xs italic text-stone-400 border-t border-white/10 pt-4">{col.summary}</p>
                                    </div>
                                ))}
                            </div>
                        ) : section.list ? (
                            <ul className="space-y-4">
                                {section.list.map((item, lIdx) => (
                                    <li key={lIdx} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <span className="text-xl">✦</span>
                                        <span className="text-stone-200 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-stone-300 leading-loose text-sm sm:text-base whitespace-pre-wrap">
                                {section.text}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const CultivationPage: React.FC<CultivationPageProps> = ({ t, language }) => {
  const farmTourVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoshakh%20NEW.mp4";
  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Medicinal%20Mushroom%206.mp4";
  const [isMuted, setIsMuted] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
      const handleScroll = () => {
          requestAnimationFrame(() => {
              setOffset(window.pageYOffset);
          });
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const logImages = [
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-19-19-16-43-725.jpg", position: 'top' },
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-23-11-22-38-847.jpg" },
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-23-11-24-01-235.jpg" },
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-19-19-28-59-698.jpg" },
  ];

  const outdoorImages = [
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Grow%20room.jpg" },
    { url: "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Outdoor%20Cultivation.png" }
  ];

  return (
    <div className="pb-24">
        {/* Hero Section with Sharp Parallax */}
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-stone-950 mb-12">
            <div 
            className="absolute top-[-10%] left-0 w-full h-[120%] pointer-events-none will-change-transform"
            style={{ transform: `translateY(${offset * 0.5}px)` }}
            >
                <video 
                    src={heroVideoUrl} 
                    className="w-full h-full object-cover opacity-90"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-stone-950/90 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                    {t.cultivation_title}
                </h1>
            </div>
        </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="space-y-24 mt-12 text-center">
            {/* Log Cultivation Section - Storytelling */}
            <ScrollRevealSection>
                <div className="relative pl-4 border-l-4 border-amber-500/50">
                    <h2 className="text-2xl sm:text-4xl font-bold dark:text-amber-300 text-left mb-6" style={{ color: 'var(--text-primary)'}}>{t.cultivation_log_title}</h2>
                    <p className="text-lg leading-relaxed whitespace-pre-wrap text-left mb-8" style={{ color: 'var(--text-secondary)'}}>{t.cultivation_log_text}</p>
                    <ImageGallery images={logImages} altPrefix="Log cultivation" />
                </div>
            </ScrollRevealSection>

            {/* Scientific Paper Section (Replacing Old Container Section) */}
            <ScrollRevealSection>
                 <ScientificPaperView language={language} />
            </ScrollRevealSection>

            {/* Outdoor Cultivation Section */}
            <ScrollRevealSection>
                 <div className="relative pl-4 border-l-4 border-stone-500/30">
                    <h2 className="text-2xl sm:text-4xl font-bold dark:text-amber-300 text-left mb-6" style={{ color: 'var(--text-primary)'}}>{t.cultivation_outdoor_title}</h2>
                    <p className="text-lg leading-relaxed whitespace-pre-wrap text-left mb-8" style={{ color: 'var(--text-secondary)'}}>{t.cultivation_outdoor_text}</p>
                    <ImageGallery images={outdoorImages} altPrefix="Outdoor cultivation" />
                 </div>
            </ScrollRevealSection>
        </div>

        <ScrollRevealSection className="mt-24 sm:mt-32 text-center">
            <div id="farm-tour">
                <h2 className="text-2xl sm:text-3xl font-bold" style={{ background: 'linear-gradient(to right, var(--text-heading-from), var(--text-heading-to))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                  {t.farm_tour_title}
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-secondary)'}}>
                  {t.farm_tour_text}
                </p>
                <div className="mt-8 aspect-[9/16] w-full max-w-sm mx-auto rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden border border-slate-200 dark:border-slate-800/50 transform hover:scale-105 transition-transform duration-500">
                  <video
                    src={farmTourVideoUrl}
                    aria-label={t.farm_tour_title}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                 <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-stone-200/50 dark:bg-stone-800/50 hover:bg-stone-300 dark:hover:bg-stone-700 backdrop-blur-sm transition-all text-sm font-medium shadow-sm"
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <SpeakerXMarkIcon className="w-4 h-4" /> : <SpeakerWaveIcon className="w-4 h-4" />}
                    <span>{isMuted ? "Unmute" : "Mute"}</span>
                  </button>
            </div>
        </ScrollRevealSection>
      </div>
    </div>
  );
};

export default CultivationPage;
