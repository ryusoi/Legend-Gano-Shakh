
import React, { useState, useEffect } from 'react';
import LinkIcon from '../icons/LinkIcon';
import type { Language } from '../../translations';

interface HealthTipsPageProps {
  t: any;
  language: Language;
}

interface HealthTipItem {
  id: number;
  icon: string;
  title: string;
  what: string;
  mechanisms: string;
  evidence: string;
  practical: string;
}

const HealthTipsPage: React.FC<HealthTipsPageProps> = ({ t, language }) => {
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

  const heroVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Health.mp4";

  // --- DATA CONTENT ---
  // We define the content here to ensure full detail is preserved across languages without bloating the global translation file.
  
  const contentData: Record<Language, HealthTipItem[]> = {
    en: [
        {
            id: 1, icon: "🛡️", title: "Immune modulation (stimulation and regulation)",
            what: "Many medicinal mushrooms enhance innate and adaptive immune responses — increased activity of macrophages, natural killer (NK) cells, dendritic cells, and modulation of T-cell and B-cell responses. They are commonly used to support host defense and as adjuncts in oncology supportive care.",
            mechanisms: "β-glucans (polysaccharides) bind pattern-recognition receptors (Dectin-1, CR3, TLRs) on immune cells → cytokine modulation (IL-1, IL-6, TNF-α, IFN-γ), increased phagocytosis, NK cell cytotoxicity; triterpenoids may modulate inflammatory signaling.",
            evidence: "Strong preclinical evidence; multiple small clinical trials and systematic reviews showing immune-modulatory effects in humans (often small, heterogeneous). Turkey Tail and some Reishi extracts have the best clinical trial coverage as adjunctive therapy.",
            practical: "Use standardized extracts (polysaccharide content or specified β-glucan levels) when immune effects are desired. People on immunosuppressants or with autoimmune disease should consult a clinician."
        },
        {
            id: 2, icon: "🎗️", title: "Anticancer adjunct effects (supportive, not curative)",
            what: "Some mushroom extracts improve quality-of-life metrics, immune markers, and sometimes chemo-tolerance in cancer patients; certain polysaccharide-peptide products are used as adjuvants in oncology in parts of Asia.",
            mechanisms: "Immune stimulation (see above), apoptosis induction in tumor cells (in vitro) via triterpenoids and other compounds, anti-angiogenic and anti-metastatic signals in preclinical models.",
            evidence: "Preclinical models are robust; human RCTs are mixed and often small; systematic reviews conclude potential adjunctive benefit but call for larger, standardized RCTs. Turkey Tail and Reishi are the most studied clinically.",
            practical: "Should only be used under oncologist supervision; do not replace evidence-based cancer therapies. Check for interactions with chemotherapy agents."
        },
        {
            id: 3, icon: "🔥", title: "Anti-inflammatory effects",
            what: "Reduction of systemic and local inflammatory markers; useful in chronic inflammation contexts.",
            mechanisms: "Triterpenoids and polysaccharides inhibit NF-κB, MAPK pathways, reduce proinflammatory cytokine production, and modulate oxidative stress.",
            evidence: "Strong preclinical evidence; some human trials show reductions in inflammatory biomarkers or symptom improvement (small trials).",
            practical: "May complement lifestyle measures for chronic inflammatory conditions; monitor clinically if used long-term."
        },
        {
            id: 4, icon: "🫐", title: "Antioxidant and cytoprotective activity",
            what: "Scavenging reactive oxygen species, enhancing endogenous antioxidant enzymes (SOD, catalase, glutathione peroxidase).",
            mechanisms: "Polyphenols, polysaccharides, triterpenoids, and other small molecules contribute antioxidant actions, reducing oxidative damage in cells and tissues.",
            evidence: "Strong in vitro/in vivo evidence; human biomarker data are limited but suggestive.",
            practical: "Supports general “health maintenance” claims; not a substitute for proven antioxidant strategies (diet, exercise, smoking cessation)."
        },
        {
            id: 5, icon: "🥃", title: "Hepatoprotective effects (liver support)",
            what: "Protection against chemical/toxic liver injury, improved liver enzyme profiles in some studies.",
            mechanisms: "Antioxidant, anti-inflammatory, and anti-fibrotic actions of triterpenoids and polysaccharides; modulation of hepatic stellate cell activity in preclinical models.",
            evidence: "Preclinical strong; limited human trials with suggestive improvements in liver biomarkers.",
            practical: "Use cautiously with existing liver disease; rare case reports of liver enzyme elevations exist with some supplements — monitor LFTs if concerned."
        },
        {
            id: 6, icon: "❤️", title: "Cardiometabolic benefits (lipids, blood pressure, glucose)",
            what: "Reports of modest improvements in serum lipids, blood pressure, and glycemic control in animal models and some human trials.",
            mechanisms: "Polysaccharides and triterpenoids can improve insulin sensitivity, inhibit hepatic lipid synthesis, enhance glucose uptake, modulate gut microbiota.",
            evidence: "Mixed — promising animal evidence and small human trials/meta-analyses with heterogeneous results. Not a primary therapy for diabetes or hyperlipidemia.",
            practical: "Consider as adjunct to diet/exercise and prescribed medications; monitor blood glucose if using with hypoglycemic drugs."
        },
        {
            id: 7, icon: "🧠", title: "Neuroprotective and cognitive support (Lion’s Mane prominence)",
            what: "Improvements in mild cognitive impairment, attention, memory and nerve regeneration markers are reported, especially for Hericium erinaceus (Lion’s Mane).",
            mechanisms: "Hericenones and erinacines stimulate nerve growth factor (NGF) synthesis and may increase BDNF; reduce neuroinflammation and oxidative stress; promote neurite outgrowth in vitro.",
            evidence: "Strong preclinical neurotrophic data; small human RCTs show cognitive benefit in older adults or mild cognitive impairment in short-term studies. Larger trials needed.",
            practical: "Lion’s Mane (fruiting body extracts) is the species most associated with cognitive benefit. Expect modest effects; not a substitute for medical care for dementia."
        },
        {
            id: 8, icon: "😴", title: "Mood, anxiety and sleep benefits",
            what: "Reishi and other species are reported to reduce anxiety, stress and improve subjective sleep quality.",
            mechanisms: "Immunomodulation and anti-inflammatory effects, possible modulation of HPA axis, and GABAergic/serotonergic indirect effects via triterpenoids and polysaccharides.",
            evidence: "Small RCTs and observational data support subjective improvements (particularly Reishi for sleep and stress).",
            practical: "Useful adjunct for stress management; evaluate interactions with sedatives or antidepressants."
        },
        {
            id: 9, icon: "🔋", title: "Fatigue reduction and improved quality of life",
            what: "Reduced cancer-related fatigue and general fatigue in small clinical studies; improved QoL scales in some trials.",
            mechanisms: "Immune modulation, improved sleep, antioxidant effects, metabolic support.",
            evidence: "Several small RCTs/pilot studies report benefit; heterogeneity across products and doses.",
            practical: "Clinically useful adjunct in supportive care under supervision."
        },
        {
            id: 10, icon: "🏃", title: "Improved exercise performance & stamina (Cordyceps)",
            what: "Cordyceps extracts (and cultured Cordyceps militaris) are used to enhance endurance, VO₂ max, and reduce perceived exertion.",
            mechanisms: "Cordycepin and other nucleoside analogues may improve cellular energy metabolism (AMPK activation), enhance ATP synthesis, mitochondrial function, and increase oxygen utilization.",
            evidence: "Preclinical evidence is strong; human trials show small but sometimes inconsistent improvements — better evidence for improved fatigue and endurance in older adults or untrained individuals.",
            practical: "Athletes sometimes use 1–3 g/day (whole fruiting body) or standardized extracts; verify anti-doping rules for competition."
        },
        {
            id: 11, icon: "🦠", title: "Respiratory & antiviral activity",
            what: "Some mushrooms show antiviral, anti-influenza, and respiratory symptom-reducing properties in vitro and in animal models; Turkey Tail and Reishi have shown immune support in respiratory contexts.",
            mechanisms: "Immune activation, direct antiviral constituents in some species, modulation of mucosal defenses.",
            evidence: "Mostly preclinical; some human supportive data for symptom reduction or immune markers. Not a replacement for vaccines or antivirals.",
            practical: "Use as supportive care; do not rely on for treatment of serious viral infections without medical care."
        },
        {
            id: 12, icon: "🧫", title: "Antimicrobial & gut health effects",
            what: "Antibacterial and antifungal activity reported for multiple species in vitro; modulation of gut microbiota composition and short-chain fatty acids in animal studies.",
            mechanisms: "Direct antimicrobial metabolites; prebiotic polysaccharides that alter microbiome composition and function.",
            evidence: "Primarily preclinical and small human microbiome studies.",
            practical: "Potential adjunct for gut health; effects depend on extract and dose. Avoid using as sole antimicrobial therapy."
        },
        {
            id: 13, icon: "✨", title: "Skin, wound healing & dermatologic benefits",
            what: "Topical formulations and oral supplementation reports include improved skin hydration, anti-aging (wrinkle reduction), wound healing acceleration, and anti-inflammatory skin effects.",
            mechanisms: "Antioxidant, collagen-protective effects, anti-inflammatory activity, enhanced fibroblast function in preclinical studies.",
            evidence: "Mostly preclinical and small topical studies; early clinical data limited but promising.",
            practical: "Look for formulations with standardized actives; patch-test topical products for sensitivity."
        },
        {
            id: 14, icon: "⏳", title: "Antifibrotic & anti-aging cellular effects",
            what: "Reduction of fibrotic signaling in organs (preclinical) and modulation of cellular senescence markers in vitro.",
            mechanisms: "Inhibition of TGF-β signaling, antioxidant and anti-inflammatory pathways.",
            evidence: "Preclinical; translational human evidence is lacking.",
            practical: "Promising area for research, but not clinically established anti-aging therapies."
        },
        {
            id: 15, icon: "⚖️", title: "Metabolic & weight management support",
            what: "Some evidence for reduced weight gain, improved insulin sensitivity and altered lipid metabolism in animal studies; limited human data.",
            mechanisms: "Modulation of gut microbiota, improved insulin signaling, decreased adipogenesis via AMPK activation.",
            evidence: "Mostly preclinical; few robust human trials.",
            practical: "Not a replacement for diet/exercise; may assist as part of comprehensive lifestyle interventions."
        },
        {
            id: 16, icon: "🦴", title: "Bone & joint health",
            what: "Anti-inflammatory and cartilage-protective effects shown in preclinical models; symptomatic relief in small human studies for joint pain reported occasionally.",
            mechanisms: "Inhibition of inflammatory mediators, antioxidant protection of cartilage cells.",
            evidence: "Preclinical to small clinical; further trials needed.",
            practical: "May be considered as adjunct for inflammatory joint conditions under medical advice."
        },
        {
            id: 17, icon: "🐛", title: "Antiparasitic & ecological benefits (research)",
            what: "Certain mushroom metabolites act against parasites in preclinical models; ecological uses include bioremediation.",
            mechanisms: "Bioactive small molecules with antiparasitic activity; enzymatic degradation of pollutants.",
            evidence: "Largely preclinical and applied research.",
            practical: "Mostly research/industrial applications rather than direct human therapy."
        },
        {
            id: 18, icon: "💞", title: "Reproductive & sexual health (limited)",
            what: "Traditional claims exist (energy, libido) for Cordyceps and other species; limited clinical evidence.",
            mechanisms: "Improved energy metabolism, microcirculation and hormonal modulation in animal studies.",
            evidence: "Small trials and animal studies; not robust.",
            practical: "Treat as exploratory; verify with clinical oversight."
        },
        {
            id: 19, icon: "♻️", title: "Detoxification & heavy metal binding (research)",
            what: "Some mushrooms can bind and sequester heavy metals and toxins in environmental settings; relevance to human detoxification is unproven.",
            mechanisms: "Fungal cell walls bind metals; enzymatic degradation of organic pollutants.",
            evidence: "Environmental science / preclinical; not established for human detox regimens.",
            practical: "Do not use mushroom supplements as a substitute for medically indicated detoxification."
        },
        {
            id: 20, icon: "🧴", title: "Cosmetic & functional food applications",
            what: "Used in cosmeceuticals and functional foods for skin, immunity and general wellness.",
            mechanisms: "See skin and antioxidant sections.",
            evidence: "Product-level studies vary; ingredient evidence often preclinical or small clinical.",
            practical: "Choose products with transparent sourcing, third-party testing and clear ingredient lists."
        },
        {
            id: 21, icon: "🧱", title: "Structural benefits (mycelium materials)",
            what: "Mycelium used to create sustainable building, packaging, and leather-like materials (relevant for non-ingestible applications).",
            mechanisms: "Mycelial network formation binds substrates into lightweight, insulative composites; biochemical tanning for mycelial leather.",
            evidence: "Engineering and materials research robust and rapidly evolving; commercialized products exist.",
            practical: "Not a direct health benefit but relevant to sustainability and reduced exposure to petrochemicals."
        },
        {
            id: 22, icon: "➕", title: "Synergy & combinatory effects",
            what: "Combining mushroom species (or mushrooms with other botanicals) can produce complementary effects — e.g., Reishi for stress + Lion’s Mane for cognition.",
            mechanisms: "Multi-target actions across immune, neurotrophic and metabolic pathways.",
            evidence: "Mostly empirical and product trials; mechanistic rationale exists but combination trials are limited.",
            practical: "Start with single species to assess tolerance before combining; be mindful of interacting pharmacology."
        },
        {
            id: 23, icon: "⚗️", title: "Formulation & extraction differences matter",
            what: "Effects depend strongly on which part is used and how it’s processed. Fruiting bodies often have different profiles vs mycelium grown on grain; spores are concentrated in some actives.",
            mechanisms: "Water extracts concentrate polysaccharides (β-glucans); alcohol extracts concentrate triterpenoids and small lipophilic molecules.",
            evidence: "Well documented in phytochemistry and clinical trial variability.",
            practical: "For immune support choose polysaccharide-standardized water extracts; for liver/anti-inflammatory or triterpenoid effects choose dual or alcohol extracts."
        },
        {
            id: 24, icon: "📏", title: "Dosage ranges & typical preparation notes",
            what: "Dosages vary by species, extract type and product. Typical ranges: Reishi 1–9 g/day (dried), Lion's Mane 500-3000mg, Cordyceps 1-3g.",
            mechanisms: "N/A",
            evidence: "Based on clinical trial protocols.",
            practical: "Follow product standardization info; higher doses are not always better. Start low and titrate."
        },
        {
            id: 25, icon: "🔍", title: "Quality, adulteration & regulatory tips",
            what: "Product quality varies widely: species mislabeling, mycelium grown on grain (low active ratio), heavy metal contamination, microbial contamination, and inaccurate potency claims occur.",
            mechanisms: "DNA barcoding, third-party testing.",
            evidence: "Industry analysis reports.",
            practical: "Buy products that provide: fruiting-body sourcing, extract method, standardized active markers, and transparent COAs (Certificates of Analysis)."
        },
        {
            id: 26, icon: "⚠️", title: "Adverse effects, contraindications & drug interactions",
            what: "Generally well tolerated but side effects (GI upset, dizziness) and interactions (Anticoagulants, Immunosuppressants, Hypoglycemics) exist.",
            mechanisms: "Pharmacodynamic interactions.",
            evidence: "Clinical observation and case reports.",
            practical: "Always disclose mushroom supplement use to prescribing clinicians; stop prior to major surgery unless approved by surgeon."
        },
        {
            id: 27, icon: "🧪", title: "Laboratory & biomarker monitoring",
            what: "For long-term or high-dose use in clinical contexts, monitor appropriate labs.",
            mechanisms: "N/A",
            evidence: "Clinical best practice.",
            practical: "Consider baseline and periodic checks of liver function tests (ALT/AST), fasting glucose, and INR if on warfarin."
        },
        {
            id: 28, icon: "🌱", title: "Strain selection & cultivation relevance",
            what: "Different strains within a species can produce differing concentrations of active compounds. Source matters.",
            mechanisms: "Strain genetics + substrate + growth conditions alter metabolite profiles.",
            evidence: "Agricultural and mycological research.",
            practical: "Prefer brands that disclose strains or partner with research institutions."
        },
        {
            id: 29, icon: "📦", title: "Storage, shelf life & stability",
            what: "Extracts and dried fruiting bodies are stable when kept cool, dry, and away from light; extracts can degrade if exposed to heat/moisture.",
            mechanisms: "Oxidation and hygroscopic degradation.",
            evidence: "Stability testing.",
            practical: "Store in airtight containers, avoid humid environments. Check expiration dates."
        },
        {
            id: 30, icon: "📝", title: "Practical usage tips (Integration)",
            what: "Start low, go slow. Choose evidence-aligned species. Cycle use. Combine with lifestyle medicine.",
            mechanisms: "N/A",
            evidence: "Clinical experience.",
            practical: "Document and track: note dose, product lot, effects, and any side effects to report to clinician."
        },
        {
            id: 31, icon: "❓", title: "Research gaps & cautions",
            what: "Large, standardized RCTs are limited. Optimal dosing and long-term safety need more rigorous study. Interactions are incompletely characterized.",
            mechanisms: "N/A",
            evidence: "Systematic review conclusions.",
            practical: "Maintain realistic expectations and rely on established medical care for serious conditions."
        },
        {
            id: 32, icon: "🏷️", title: "Quick reference — species highlights",
            what: "Reishi: immune/stress. Lion’s Mane: brain/mood. Cordyceps: energy. Turkey Tail: immune adjunct. Maitake: metabolic.",
            mechanisms: "Varied.",
            evidence: "Summary of literature.",
            practical: "Use this as a quick selection guide based on primary health goals."
        },
        {
            id: 33, icon: "✅", title: "How to evaluate a product quickly (Checklist)",
            what: "Species name, Part used, Extraction method, Standardization, Third-party testing, No fillers.",
            mechanisms: "N/A",
            evidence: "Quality control standards.",
            practical: "Use this checklist before every purchase to ensure safety and efficacy."
        },
        {
            id: 34, icon: "🛑", title: "Final safety reminder",
            what: "Medicinal mushrooms are biologically active. Best used thoughtfully: choose high-quality products, disclose use, monitor for side effects.",
            mechanisms: "N/A",
            evidence: "Medical safety standards.",
            practical: "If you have specific conditions (autoimmune, pregnancy, anticoagulants), consult a physician before starting."
        }
    ],
    fa: [
        {
            id: 1, icon: "🛡️", title: "تعدیل سیستم ایمنی (تحریک و تنظیم)",
            what: "بسیاری از قارچ‌های دارویی پاسخ‌های ایمنی ذاتی و اکتسابی را تقویت می‌کنند — افزایش فعالیت ماکروفاژها، سلول‌های کشنده طبیعی (NK)، و تعدیل پاسخ‌های لنفوسیت T و B. آن‌ها معمولاً برای حمایت از دفاع میزبان و به عنوان درمان کمکی در انکولوژی استفاده می‌شوند.",
            mechanisms: "بتا-گلوکان‌ها به گیرنده‌های سلول‌های ایمنی متصل شده و باعث تعدیل سیتوکین‌ها (IL-1, IL-6, TNF-α) و افزایش سمیت سلولی NK می‌شوند; تری‌ترپنوئیدها ممکن است سیگنال‌های التهابی را تعدیل کنند.",
            evidence: "شواهد پیش‌بالینی قوی؛ چندین کارآزمایی بالینی کوچک و مرورهای سیستماتیک اثرات تعدیل‌کننده ایمنی در انسان را نشان می‌دهند. دم بوقلمون و برخی عصاره‌های ریشی بهترین پوشش کارآزمایی بالینی را دارند.",
            practical: "هنگامی که اثرات ایمنی مورد نظر است، از عصاره‌های استاندارد (محتوای پلی‌ساکارید مشخص) استفاده کنید. افراد دارای بیماری خود ایمنی باید با پزشک مشورت کنند."
        },
        {
            id: 2, icon: "🎗️", title: "اثرات کمکی ضد سرطان (حمایتی، نه درمانی)",
            what: "برخی عصاره‌های قارچ معیارهای کیفیت زندگی، نشانگرهای ایمنی و گاهی تحمل شیمی‌درمانی را در بیماران سرطانی بهبود می‌بخشند.",
            mechanisms: "تحریک ایمنی، القای آپوپتوز در سلول‌های تومور (در شرایط آزمایشگاهی) از طریق تری‌ترپنوئیدها، و سیگنال‌های ضد رگ‌زایی در مدل‌های پیش‌بالینی.",
            evidence: "مدل‌های پیش‌بالینی قوی هستند؛ کارآزمایی‌های انسانی مختلط و اغلب کوچک هستند. مرورهای سیستماتیک مزایای کمکی بالقوه را نتیجه‌گیری می‌کنند اما خواستار کارآزمایی‌های بزرگتر هستند.",
            practical: "فقط باید تحت نظارت انکولوژیست استفاده شود؛ جایگزین درمان‌های مبتنی بر شواهد سرطان نشود. تداخلات با داروهای شیمی‌درمانی بررسی شود."
        },
        {
            id: 3, icon: "🔥", title: "اثرات ضد التهابی",
            what: "کاهش نشانگرهای التهابی سیستمیک و موضعی؛ مفید در زمینه التهاب مزمن.",
            mechanisms: "تری‌ترپنوئیدها و پلی‌ساکاریدها مسیرهای NF-κB را مهار کرده، تولید سیتوکین‌های پیش‌التهابی را کاهش می‌دهند و استرس اکسیداتیو را تعدیل می‌کنند.",
            evidence: "شواهد پیش‌بالینی قوی؛ برخی کارآزمایی‌های انسانی کاهش در نشانگرهای زیستی التهابی یا بهبود علائم را نشان می‌دهند.",
            practical: "ممکن است مکمل اقدامات سبک زندگی برای شرایط التهابی مزمن باشد؛ در صورت استفاده طولانی‌مدت به صورت بالینی نظارت شود."
        },
        {
            id: 4, icon: "🫐", title: "فعالیت آنتی‌اکسیدانی و محافظت سلولی",
            what: "پاکسازی گونه‌های فعال اکسیژن، تقویت آنزیم‌های آنتی‌اکسیدانی درون‌زا (SOD، کاتالاز).",
            mechanisms: "پلی‌فنول‌ها، پلی‌ساکاریدها و تری‌ترپنوئیدها با اقدامات آنتی‌اکسیدانی، آسیب اکسیداتیو در سلول‌های و بافت‌ها را کاهش می‌دهند.",
            evidence: "شواهد قوی در آزمایشگاه/موجود زنده؛ داده‌های نشانگر زیستی انسانی محدود اما پیشنهادی هستند.",
            practical: "از ادعاهای کلی حفظ سلامت حمایت می‌کند؛ جایگزین استراتژی‌های اثبات شده آنتی‌اکسیدانی (رژیم غذایی، ورزش) نیست."
        },
        {
            id: 5, icon: "🥃", title: "اثرات محافظت از کبد (هپاتوپروتکتیو)",
            what: "محافظت در برابر آسیب کبدی شیمیایی/سمی، بهبود پروفایل آنزیم‌های کبدی در برخی مطالعات.",
            mechanisms: "اقدامات آنتی‌اکسیدانی، ضد التهابی و ضد فیبروتیک تری‌ترپنوئیدها؛ تعدیل فعالیت سلول‌های ستاره‌ای کبد.",
            evidence: "پیش‌بالینی قوی؛ کارآزمایی‌های انسانی محدود با بهبودهای پیشنهادی در نشانگرهای کبدی.",
            practical: "در بیماری‌های کبدی موجود با احتیاط استفاده شود؛ گزارش‌های نادری از افزایش آنزیم‌های کبدی وجود دارد.",
        },
        {
            id: 6, icon: "❤️", title: "مزایای قلبی متابولیک (لیپیدها، فشار خون، قند)",
            what: "گزارش‌هایی از بهبود متوسط در لیپیدهای سرم، فشار خون و کنترل قند در مدل‌های حیوانی و برخی کارآزمایی‌های انسانی.",
            mechanisms: "پلی‌ساکاریدها می‌توانند حساسیت به انسولین را بهبود بخشند، سنتز لیپید کبدی را مهار کنند و میکروبیوتای روده را تعدیل کنند.",
            evidence: "مختلط — شواهد حیوانی امیدوارکننده و کارآزمایی‌های انسانی کوچک با نتایج ناهمگون. درمان اولیه برای دیابت نیست.",
            practical: "به عنوان مکمل رژیم غذایی/ورزش و داروها در نظر گرفته شود؛ در صورت استفاده با داروهای کاهنده قند، قند خون پایش شود."
        },
        {
            id: 7, icon: "🧠", title: "محافظت عصبی و حمایت شناختی (یال شیر)",
            what: "بهبود در اختلال شناختی خفیف، توجه، حافظه و نشانگرهای بازسازی عصب گزارش شده است، به ویژه برای Hericium erinaceus.",
            mechanisms: "اریناسین‌ها سنتز فاکتور رشد عصب (NGF) را تحریک کرده و ممکن است BDNF را افزایش دهند؛ کاهش التهاب عصبی.",
            evidence: "داده‌های نوروتروفیک پیش‌بالینی قوی؛ کارآزمایی‌های کوچک انسانی مزایای شناختی را در بزرگسالان مسن نشان می‌دهند.",
            practical: "یال شیر (عصاره بدنه میوه) گونه‌ای است که بیشترین ارتباط را با مزایای شناختی دارد. انتظار اثرات متوسط داشته باشید."
        },
        {
            id: 8, icon: "😴", title: "مزایای خلق و خو، اضطراب و خواب",
            what: "ریشی و سایر گونه‌ها برای کاهش اضطراب، استرس و بهبود کیفیت ذهنی خواب گزارش شده‌اند.",
            mechanisms: "تعدیل ایمنی و اثرات ضد التهابی، تعدیل احتمالی محور HPA و اثرات غیرمستقیم گابا/سروتونین.",
            evidence: "کارآزمایی‌های کوچک و داده‌های مشاهده‌ای از بهبودهای ذهنی (به ویژه ریشی برای خواب) حمایت می‌کنند.",
            practical: "مکمل مفید برای مدیریت استرس؛ تداخلات با آرام‌بخش‌ها یا داروهای ضد افسردگی ارزیابی شود."
        },
        {
            id: 9, icon: "🔋", title: "کاهش خستگی و بهبود کیفیت زندگی",
            what: "کاهش خستگی مرتبط با سرطان و خستگی عمومی در مطالعات بالینی کوچک؛ بهبود مقیاس‌های کیفیت زندگی.",
            mechanisms: "تعدیل ایمنی، بهبود خواب، اثرات آنتی‌اکسیدانی، حمایت متابولیک.",
            evidence: "چندین مطالعه پایلوت مزایایی را گزارش می‌دهند؛ ناهمگونی در بین محصولات و دوزها.",
            practical: "به عنوان مکمل مفید بالینی در مراقبت‌های حمایتی تحت نظارت."
        },
        {
            id: 10, icon: "🏃", title: "بهبود عملکرد ورزشی و استقامت (کوردیسپس)",
            what: "عصاره‌های کوردیسپس برای افزایش استقامت، VO₂ max و کاهش درک فشار استفاده می‌شوند.",
            mechanisms: "کوردیسپین ممکن است متابولیسم انرژی سلولی را بهبود بخشد (فعال‌سازی AMPK)، سنتز ATP را افزایش دهد و استفاده از اکسیژن را زیاد کند.",
            evidence: "شواهد پیش‌بالینی قوی است؛ کارآزمایی‌های انسانی بهبودهای کوچک اما گاهی ناسازگار را نشان می‌دهند.",
            practical: "ورزشکاران گاهی ۱-۳ گرم در روز استفاده می‌کنند؛ قوانین ضد دوپینگ برای مسابقات بررسی شود."
        },
        {
            id: 11, icon: "🦠", title: "فعالیت تنفسی و ضد ویروسی",
            what: "برخی قارچ‌ها خواص ضد ویروسی و کاهش‌دهنده علائم تنفسی را نشان می‌دهند؛ دم بوقلمون و ریشی حمایت ایمنی را نشان داده‌اند.",
            mechanisms: "فعال‌سازی ایمنی، اجزای مستقیم ضد ویروسی در برخی گونه‌ها، تعدیل دفاع مخاطی.",
            evidence: "عمدتاً پیش‌بالینی؛ برخی داده‌های حمایتی انسانی برای کاهش علائم. جایگزین واکسن نیست.",
            practical: "به عنوان مراقبت حمایتی استفاده شود؛ برای درمان عفونت‌های ویروسی جدی بدون مراقبت پزشکی تکیه نکنید."
        },
        {
            id: 12, icon: "🧫", title: "اثرات ضد میکروبی و سلامت روده",
            what: "فعالیت ضد باکتریایی و ضد قارچی برای چندین گونه گزارش شده است؛ تعدیل ترکیب میکروبیوتای روده.",
            mechanisms: "متابولیت‌های مستقیم ضد میکروبی؛ پلی‌ساکاریدهای پری‌بیوتیک که میکروبیوم را تغییر می‌دهند.",
            evidence: "عمدتاً مطالعات پیش‌بالینی و کوچک میکروبیوم انسانی.",
            practical: "مکمل بالقوه برای سلامت روده؛ از استفاده به عنوان تنها درمان ضد میکروبی خودداری کنید."
        },
        {
            id: 13, icon: "✨", title: "پوست، بهبود زخم و مزایای پوستی",
            what: "فرمولاسیون‌های موضعی و خوراکی شامل بهبود هیدراتاسیون پوست، ضد پیری، تسریع بهبود زخم و اثرات ضد التهابی است.",
            mechanisms: "آنتی‌اکسیدان، اثرات محافظت از کلاژن، فعالیت ضد التهابی.",
            evidence: "عمدتاً مطالعات پیش‌بالینی و موضعی کوچک؛ داده‌های بالینی اولیه محدود اما امیدوارکننده.",
            practical: "به دنبال فرمولاسیون‌های استاندارد باشید؛ محصولات موضعی را برای حساسیت تست کنید."
        },
        {
            id: 14, icon: "⏳", title: "اثرات ضد فیبروتیک و ضد پیری سلولی",
            what: "کاهش سیگنال‌دهی فیبروتیک در اندام‌ها و تعدیل نشانگرهای پیری سلولی در آزمایشگاه.",
            mechanisms: "مهار سیگنال‌دهی TGF-β، مسیرهای آنتی‌اکسیدانی و ضد التهابی.",
            evidence: "پیش‌بالینی؛ شواهد انسانی ترجمه شده وجود ندارد.",
            practical: "حوزه امیدوارکننده برای تحقیق، اما درمان‌های ضد پیری بالینی تثبیت شده نیستند."
        },
        {
            id: 15, icon: "⚖️", title: "حمایت متابولیک و مدیریت وزن",
            what: "برخی شواهد برای کاهش افزایش وزن، بهبود حساسیت به انسولین و تغییر متابولیسم لیپید در مطالعات حیوانی.",
            mechanisms: "تعدیل میکروبیوتای روده، بهبود سیگنال‌دهی انسولین، کاهش آدیپوژنز.",
            evidence: "عمدتاً پیش‌بالینی؛ تعداد کمی کارآزمایی انسانی قوی.",
            practical: "جایگزین رژیم غذایی/ورزش نیست؛ ممکن است به عنوان بخشی از مداخلات سبک زندگی کمک کند."
        },
        {
            id: 16, icon: "🦴", title: "سلامت استخوان و مفاصل",
            what: "اثرات ضد التهابی و محافظت از غضروف در مدل‌های پیش‌بالینی نشان داده شده است.",
            mechanisms: "مهار واسطه‌های التهابی، محافظت آنتی‌اکسیدانی از سلول‌های غضروفی.",
            evidence: "پیش‌بالینی تا بالینی کوچک؛ کارآزمایی‌های بیشتری مورد نیاز است.",
            practical: "ممکن است به عنوان مکمل برای شرایط التهابی مفصل تحت نظر پزشک در نظر گرفته شود."
        },
        {
            id: 17, icon: "🐛", title: "مزایای ضد انگلی و اکولوژیکی (تحقیقات)",
            what: "برخی متابولیت‌های قارچ علیه انگل‌ها در مدل‌های پیش‌بالینی عمل می‌کنند.",
            mechanisms: "مولکول‌های کوچک زیست‌فعال با فعالیت ضد انگلی.",
            evidence: "عمدتاً تحقیقات پیش‌بالینی و کاربردی.",
            practical: "بیشتر کاربردهای تحقیقاتی/صنعتی تا درمان مستقیم انسانی."
        },
        {
            id: 18, icon: "💞", title: "سلامت جنسی و باروری (محدود)",
            what: "ادعاهای سنتی (انرژی، میل جنسی) برای کوردیسپس وجود دارد؛ شواهد بالینی محدود.",
            mechanisms: "بهبود متابولیسم انرژی و میکروسیرکولاسیون در مطالعات حیوانی.",
            evidence: "کارآزمایی‌های کوچک و مطالعات حیوانی؛ قوی نیست.",
            practical: "به عنوان اکتشافی درمان کنید؛ با نظارت بالینی تایید کنید."
        },
        {
            id: 19, icon: "♻️", title: "سم‌زدایی و اتصال فلزات سنگین (تحقیق)",
            what: "برخی قارچ‌ها می‌توانند فلزات سنگین را در محیط‌های زیست‌محیطی متصل کنند؛ ارتباط با سم‌زدایی انسانی اثبات نشده است.",
            mechanisms: "دیواره‌های سلولی قارچ فلزات را متصل می‌کنند.",
            evidence: "علوم زیست‌محیطی؛ برای رژیم‌های سم‌زدایی انسانی تثبیت نشده است.",
            practical: "از مکمل‌های قارچ به عنوان جایگزین سم‌زدایی پزشکی استفاده نکنید."
        },
        {
            id: 20, icon: "🧴", title: "کاربردهای آرایشی و غذای عملکردی",
            what: "استفاده در محصولات آرایشی-دارویی و غذاهای عملکردی برای پوست و ایمنی.",
            mechanisms: "بخش‌های پوست و آنتی‌اکسیدان را ببینید.",
            evidence: "مطالعات محصول متفاوت است؛ اغلب پیش‌بالینی.",
            practical: "محصولاتی با منبع‌یافی شفاف و تست شخص ثالث انتخاب کنید."
        },
        {
            id: 21, icon: "🧱", title: "مزایای ساختاری (مواد میسلیوم)",
            what: "میسلیوم برای ایجاد مصالح ساختمانی پایدار و بسته‌بندی استفاده می‌شود (غیر خوراکی).",
            mechanisms: "تشکیل شبکه میسلیومی بسترها را به کامپوزیت‌های سبک متصل می‌کند.",
            evidence: "تحقیقات مهندسی قوی؛ محصولات تجاری موجود است.",
            practical: "مزیت مستقیم سلامتی نیست اما به پایداری مربوط است."
        },
        {
            id: 22, icon: "➕", title: "هم‌افزایی و اثرات ترکیبی",
            what: "ترکیب گونه‌های قارچ می‌تواند اثرات تکمیلی ایجاد کند — مثلاً ریشی برای استرس + یال شیر برای شناخت.",
            mechanisms: "اقدامات چند هدفه در مسیرهای ایمنی و عصبی.",
            evidence: "عمدتاً تجربی؛ کارآزمایی‌های ترکیبی محدود هستند.",
            practical: "قبل از ترکیب با گونه‌های تکی شروع کنید تا تحمل را ارزیابی کنید."
        },
        {
            id: 23, icon: "⚗️", title: "تفاوت‌های فرمولاسیون و استخراج مهم است",
            what: "اثرات به شدت به بخش مورد استفاده بستگی دارد. عصاره‌های آبی پلی‌ساکاریدها را متمرکز می‌کنند؛ عصاره‌های الکلی تری‌ترپنوئیدها را.",
            mechanisms: "روش‌های استخراج پروفایل شیمیایی را تغییر می‌دهند.",
            evidence: "در فیتوشیمی به خوبی مستند شده است.",
            practical: "برای ایمنی عصاره‌های آبی؛ برای کبد/التهاب عصاره‌های دوگانه یا الکلی انتخاب کنید."
        },
        {
            id: 24, icon: "📏", title: "دامنه‌های دوز و یادداشت‌های آماده‌سازی",
            what: "دوزها متفاوت است. ریشی ۱-۹ گرم/روز (خشک)، یال شیر ۵۰۰-۳۰۰۰ میلی‌گرم، کوردیسپس ۱-۳ گرم.",
            mechanisms: "N/A",
            evidence: "بر اساس پروتکل‌های کارآزمایی بالینی.",
            practical: "اطلاعات استانداردسازی محصول را دنبال کنید؛ دوزهای بالاتر همیشه بهتر نیستند."
        },
        {
            id: 25, icon: "🔍", title: "کیفیت، تقلب و نکات نظارتی",
            what: "کیفیت محصول متفاوت است: برچسب‌گذاری نادرست گونه، میسلیوم روی غلات، آلودگی فلزات سنگین.",
            mechanisms: "بارکدینگ DNA، تست شخص ثالث.",
            evidence: "گزارش‌های تحلیل صنعت.",
            practical: "محصولاتی بخرید که منبع بدنه میوه، روش استخراج و تست‌های شخص ثالث را ارائه می‌دهند."
        },
        {
            id: 26, icon: "⚠️", title: "عوارض جانبی، منع مصرف و تداخلات دارویی",
            what: "معمولاً به خوبی تحمل می‌شود اما عوارض (گوارشی) و تداخلات (ضد انعقادها، سرکوب‌کننده‌های ایمنی) وجود دارد.",
            mechanisms: "تداخلات فارماکودینامیک.",
            evidence: "مشاهدات بالینی.",
            practical: "همیشه استفاده از مکمل را به پزشک اطلاع دهید؛ قبل از جراحی قطع کنید."
        },
        {
            id: 27, icon: "🧪", title: "پایش آزمایشگاهی و نشانگرهای زیستی",
            what: "برای استفاده طولانی مدت یا دوز بالا، آزمایش‌های مناسب را پایش کنید.",
            mechanisms: "N/A",
            evidence: "بهترین عملکرد بالینی.",
            practical: "تست‌های عملکرد کبد، قند ناشتا و INR را در نظر بگیرید."
        },
        {
            id: 28, icon: "🌱", title: "انتخاب نژاد و اهمیت کشت",
            what: "نژادهای مختلف می‌توانند غلظت‌های متفاوتی از ترکیبات فعال تولید کنند.",
            mechanisms: "ژنتیک نژاد + بستر + شرایط رشد پروفایل متابولیت را تغییر می‌دهد.",
            evidence: "تحقیقات کشاورزی.",
            practical: "برندهایی را ترجیح دهید که نژادها را افشا می‌کنند."
        },
        {
            id: 29, icon: "📦", title: "ذخیره‌سازی، ماندگاری و پایداری",
            what: "عصاره‌ها در جای خشک و خنک پایدار هستند؛ رطوبت می‌تواند آن‌ها را تخریب کند.",
            mechanisms: "اکسیداسیون.",
            evidence: "تست پایداری.",
            practical: "در ظروف دربسته نگهداری کنید، از رطوبت دوری کنید."
        },
        {
            id: 30, icon: "📝", title: "نکات کاربردی استفاده (ادغام)",
            what: "کم شروع کنید. گونه‌های منطبق با شواهد را انتخاب کنید. دوره‌ای استفاده کنید.",
            mechanisms: "N/A",
            evidence: "تجربه بالینی.",
            practical: "مستند کنید و ردیابی کنید: دوز و اثرات را یادداشت کنید."
        },
        {
            id: 31, icon: "❓", title: "شکاف‌های تحقیقاتی و هشدارها",
            what: "کارآزمایی‌های بزرگ محدود است. ایمنی طولانی‌مدت نیاز به مطالعه دارد.",
            mechanisms: "N/A",
            evidence: "نتیجه‌گیری مرور سیستماتیک.",
            practical: "انتظارات واقع‌بینانه داشته باشید و برای شرایط جدی به مراقبت پزشکی تکیه کنید."
        },
        {
            id: 32, icon: "🏷️", title: "مرجع سریع — برجستگی‌های گونه‌ها",
            what: "ریشی: ایمنی/استرس. یال شیر: مغز/خلق. کوردیسپس: انرژی. دم بوقلمون: کمکی ایمنی.",
            mechanisms: "متنوع.",
            evidence: "خلاصه ادبیات.",
            practical: "از این به عنوان راهنمای انتخاب سریع استفاده کنید."
        },
        {
            id: 33, icon: "✅", title: "چگونه یک محصول را سریع ارزیابی کنیم (چک‌لیست)",
            what: "نام گونه، بخش مورد استفاده، روش استخراج، استانداردسازی، تست شخص ثالث.",
            mechanisms: "N/A",
            evidence: "استانداردهای کنترل کیفیت.",
            practical: "قبل از هر خرید از این چک‌لیست استفاده کنید."
        },
        {
            id: 34, icon: "🛑", title: "یادآوری ایمنی نهایی",
            what: "قارچ‌های دارویی از نظر بیولوژیکی فعال هستند. هوشمندانه استفاده کنید: محصولات با کیفیت، افشای مصرف، پایش عوارض.",
            mechanisms: "N/A",
            evidence: "استانداردهای ایمنی پزشکی.",
            practical: "اگر شرایط خاصی دارید (خود ایمنی، بارداری)، قبل از شروع با پزشک مشورت کنید."
        }
    ],
    es: [
        {
            id: 1, icon: "🛡️", title: "Inmunomodulación (estimulación y regulación)",
            what: "Muchos hongos medicinales mejoran las respuestas inmunes innatas y adaptativas: mayor actividad de macrófagos, células asesinas naturales (NK) y modulación de células T y B. Se usan comúnmente como coadyuvantes en oncología.",
            mechanisms: "Los β-glucanos se unen a receptores en células inmunes → modulación de citocinas, aumento de fagocitosis; los triterpenoides pueden modular la señalización inflamatoria.",
            evidence: "Evidencia preclínica fuerte; múltiples ensayos clínicos pequeños muestran efectos inmunomoduladores en humanos. Cola de Pavo y Reishi tienen la mejor cobertura clínica.",
            practical: "Use extractos estandarizados (contenido de polisacáridos) cuando desee efectos inmunes. Consulte a un médico si toma inmunosupresores."
        },
        {
            id: 2, icon: "🎗️", title: "Efectos anticancerígenos coadyuvantes",
            what: "Algunos extractos mejoran la calidad de vida y marcadores inmunes en pacientes con cáncer.",
            mechanisms: "Estimulación inmune, inducción de apoptosis en células tumorales (in vitro) y señales antiangiogénicas.",
            evidence: "Modelos preclínicos robustos; los ECA humanos son mixtos. Las revisiones sistemáticas concluyen un beneficio coadyuvante potencial.",
            practical: "Solo debe usarse bajo supervisión oncológica; no reemplace las terapias probadas. Verifique interacciones."
        },
        {
            id: 3, icon: "🔥", title: "Efectos antiinflamatorios",
            what: "Reducción de marcadores inflamatorios sistémicos y locales.",
            mechanisms: "Inhibición de vías NF-κB, reducción de citocinas proinflamatorias y modulación del estrés oxidativo.",
            evidence: "Fuerte evidencia preclínica; algunos ensayos humanos muestran reducciones en biomarcadores.",
            practical: "Puede complementar medidas de estilo de vida para condiciones inflamatorias crónicas."
        },
        {
            id: 4, icon: "🫐", title: "Actividad antioxidante y citoprotectora",
            what: "Eliminación de especies reactivas de oxígeno, mejora de enzimas antioxidantes endógenas.",
            mechanisms: "Polifenoles y polisacáridos reducen el daño oxidativo en células.",
            evidence: "Fuerte in vitro/in vivo; datos de biomarcadores humanos limitados pero sugestivos.",
            practical: "Apoya el mantenimiento general de la salud; no sustituye dieta y ejercicio."
        },
        {
            id: 5, icon: "🥃", title: "Efectos hepatoprotectores (hígado)",
            what: "Protección contra lesiones hepáticas, mejora de perfiles de enzimas hepáticas.",
            mechanisms: "Acciones antioxidantes y antiinflamatorias de triterpenoides; modulación de células estrelladas hepáticas.",
            evidence: "Preclínica fuerte; ensayos humanos limitados con mejoras sugestivas.",
            practical: "Usar con precaución en enfermedad hepática existente; monitorear enzimas si hay preocupación."
        },
        {
            id: 6, icon: "❤️", title: "Beneficios cardiometabólicos",
            what: "Informes de mejoras modestas en lípidos, presión arterial y control glucémico.",
            mechanisms: "Mejora de la sensibilidad a la insulina, inhibición de síntesis de lípidos, modulación de microbiota intestinal.",
            evidence: "Mixta — evidencia animal prometedora. No es una terapia primaria para diabetes.",
            practical: "Considerar como complemento a dieta/medicamentos; monitorear glucosa si usa hipoglucemiantes."
        },
        {
            id: 7, icon: "🧠", title: "Soporte neuroprotector y cognitivo (Melena de León)",
            what: "Mejoras en deterioro cognitivo leve, atención y memoria, especialmente con Hericium erinaceus.",
            mechanisms: "Estimulación de síntesis de factor de crecimiento nervioso (NGF); reducción de neuroinflamación.",
            evidence: "Datos preclínicos fuertes; pequeños ECA humanos muestran beneficio cognitivo.",
            practical: "La Melena de León es la especie más asociada con el beneficio cognitivo. Espere efectos modestos."
        },
        {
            id: 8, icon: "😴", title: "Beneficios para ánimo, ansiedad y sueño",
            what: "Se informa que el Reishi reduce la ansiedad y mejora la calidad subjetiva del sueño.",
            mechanisms: "Inmunomodulación, posible modulación del eje HPA y efectos GABAérgicos.",
            evidence: "Pequeños ECA y datos observacionales apoyan mejoras subjetivas.",
            practical: "Coadyuvante útil para el estrés; evaluar interacciones con sedantes."
        },
        {
            id: 9, icon: "🔋", title: "Reducción de fatiga y calidad de vida",
            what: "Reducción de fatiga relacionada con el cáncer y fatiga general en estudios clínicos pequeños.",
            mechanisms: "Modulación inmune, mejor sueño, efectos metabólicos.",
            evidence: "Varios estudios piloto informan beneficios.",
            practical: "Clínicamente útil en cuidados de apoyo bajo supervisión."
        },
        {
            id: 10, icon: "🏃", title: "Rendimiento físico y resistencia (Cordyceps)",
            what: "Los extractos de Cordyceps se usan para mejorar la resistencia y el VO₂ máx.",
            mechanisms: "La cordicepina puede mejorar el metabolismo energético celular (AMPK) y la síntesis de ATP.",
            evidence: "Evidencia preclínica fuerte; ensayos humanos muestran mejoras pequeñas.",
            practical: "Los atletas usan 1–3 g/día; verifique reglas antidopaje."
        },
        {
            id: 11, icon: "🦠", title: "Actividad respiratoria y antiviral",
            what: "Algunos hongos muestran propiedades antivirales y reducción de síntomas respiratorios.",
            mechanisms: "Activación inmune, constituyentes antivirales directos.",
            evidence: "Mayormente preclínica. No sustituye vacunas.",
            practical: "Usar como cuidado de apoyo; no confiar para infecciones graves sin atención médica."
        },
        {
            id: 12, icon: "🧫", title: "Efectos antimicrobianos e intestinales",
            what: "Actividad antibacteriana reportada; modulación de microbiota intestinal.",
            mechanisms: "Metabolitos antimicrobianos directos; polisacáridos prebióticos.",
            evidence: "Primariamente preclínica y pequeños estudios de microbioma.",
            practical: "Potencial coadyuvante para salud intestinal."
        },
        {
            id: 13, icon: "✨", title: "Piel, cicatrización y dermatología",
            what: "Mejora de hidratación, antienvejecimiento y cicatrización de heridas.",
            mechanisms: "Efectos protectores del colágeno, actividad antiinflamatoria.",
            evidence: "Mayormente preclínica y pequeños estudios tópicos.",
            practical: "Busque formulaciones estandarizadas; haga prueba de parche."
        },
        {
            id: 14, icon: "⏳", title: "Efectos antifibróticos y celulares",
            what: "Reducción de señalización fibrótica y marcadores de senescencia celular.",
            mechanisms: "Inhibición de TGF-β, vías antioxidantes.",
            evidence: "Preclínica; falta evidencia humana traslacional.",
            practical: "Área prometedora de investigación, no terapia establecida."
        },
        {
            id: 15, icon: "⚖️", title: "Soporte metabólico y peso",
            what: "Alguna evidencia de reducción de peso y mejora de sensibilidad a insulina en animales.",
            mechanisms: "Modulación de microbiota, señalización de insulina.",
            evidence: "Mayormente preclínica.",
            practical: "No reemplaza dieta/ejercicio."
        },
        {
            id: 16, icon: "🦴", title: "Salud ósea y articular",
            what: "Efectos antiinflamatorios y condroprotectores en modelos preclínicos.",
            mechanisms: "Inhibición de mediadores inflamatorios.",
            evidence: "Preclínica a clínica pequeña.",
            practical: "Puede considerarse como coadyuvante para dolor articular."
        },
        {
            id: 17, icon: "🐛", title: "Beneficios antiparasitarios (investigación)",
            what: "Ciertos metabolitos actúan contra parásitos en modelos.",
            mechanisms: "Moléculas bioactivas pequeñas.",
            evidence: "Investigación preclínica.",
            practical: "Aplicaciones industriales más que terapia humana directa."
        },
        {
            id: 18, icon: "💞", title: "Salud reproductiva y sexual (limitado)",
            what: "Afirmaciones tradicionales para Cordyceps; evidencia clínica limitada.",
            mechanisms: "Mejora del metabolismo energético y microcirculación.",
            evidence: "Ensayos pequeños y estudios animales.",
            practical: "Tratar como exploratorio."
        },
        {
            id: 19, icon: "♻️", title: "Desintoxicación de metales (investigación)",
            what: "Algunos hongos unen metales pesados en el medio ambiente.",
            mechanisms: "Paredes celulares fúngicas unen metales.",
            evidence: "Ciencia ambiental.",
            practical: "No usar como sustituto de desintoxicación médica."
        },
        {
            id: 20, icon: "🧴", title: "Aplicaciones cosméticas y funcionales",
            what: "Uso en cosmecéuticos y alimentos funcionales.",
            mechanisms: "Ver secciones de piel y antioxidantes.",
            evidence: "Varía por producto.",
            practical: "Elija productos con listas de ingredientes claras."
        },
        {
            id: 21, icon: "🧱", title: "Beneficios estructurales (micelio)",
            what: "Micelio usado para materiales sostenibles (no comestible).",
            mechanisms: "Red micelial une sustratos.",
            evidence: "Investigación de materiales robusta.",
            practical: "Relevante para sostenibilidad."
        },
        {
            id: 22, icon: "➕", title: "Sinergia y efectos combinados",
            what: "Combinar especies puede producir efectos complementarios.",
            mechanisms: "Acciones multi-objetivo.",
            evidence: "Mayormente empírica.",
            practical: "Comience con especies individuales para evaluar tolerancia."
        },
        {
            id: 23, icon: "⚗️", title: "Diferencias de formulación y extracción",
            what: "Los efectos dependen de la parte usada y el proceso. Extractos de agua concentran polisacáridos; alcohol concentra triterpenoides.",
            mechanisms: "La extracción altera el perfil químico.",
            evidence: "Bien documentado en fitoquímica.",
            practical: "Elija extractos de agua para inmunidad; dual/alcohol para hígado."
        },
        {
            id: 24, icon: "📏", title: "Rangos de dosis típicos",
            what: "Dosis varían. Reishi 1–9 g/día (seco), Melena de León 500-3000mg.",
            mechanisms: "N/A",
            evidence: "Protocolos de ensayos clínicos.",
            practical: "Siga la estandarización del producto."
        },
        {
            id: 25, icon: "🔍", title: "Calidad y adulteración",
            what: "La calidad varía: etiquetado incorrecto, micelio en grano, contaminación.",
            mechanisms: "Pruebas de ADN y laboratorio.",
            evidence: "Informes de la industria.",
            practical: "Compre productos con COA transparentes y pruebas de terceros."
        },
        {
            id: 26, icon: "⚠️", title: "Efectos adversos e interacciones",
            what: "Generalmente bien tolerado pero existen interacciones (Anticoagulants, Inmunosupresores).",
            mechanisms: "Interacciones farmacodinámicas.",
            evidence: "Observación clínica.",
            practical: "Siempre informe al médico sobre el uso de suplementos."
        },
        {
            id: 27, icon: "🧪", title: "Monitoreo de laboratorio",
            what: "Para uso a largo plazo, monitoree laboratorios apropiados.",
            mechanisms: "N/A",
            evidence: "Mejor práctica clínica.",
            practical: "Considere chequeos hepáticos y de glucosa."
        },
        {
            id: 28, icon: "🌱", title: "Selección de cepa",
            what: "Diferentes cepas producen diferentes concentraciones de activos.",
            mechanisms: "Genética + sustrato.",
            evidence: "Investigación agrícola.",
            practical: "Prefiera marcas que divulguen cepas."
        },
        {
            id: 29, icon: "📦", title: "Almacenamiento y estabilidad",
            what: "Los extractos son estables si se mantienen frescos y secos.",
            mechanisms: "Degradación por humedad.",
            evidence: "Pruebas de estabilidad.",
            practical: "Almacenar en recipientes herméticos."
        },
        {
            id: 30, icon: "📝", title: "Consejos prácticos de uso",
            what: "Empiece bajo. Elija especies alineadas con la evidencia. Cicle el uso.",
            mechanisms: "N/A",
            evidence: "Experiencia clínica.",
            practical: "Documente dosis y efectos."
        },
        {
            id: 31, icon: "❓", title: "Brechas de investigación",
            what: "Faltan grandes ECA estandarizados. Seguridad a largo plazo necesita estudio.",
            mechanisms: "N/A",
            evidence: "Revisiones sistemáticas.",
            practical: "Mantenga expectativas realistas."
        },
        {
            id: 32, icon: "🏷️", title: "Referencia rápida de especies",
            what: "Reishi: estrés. Melena de León: cerebro. Cordyceps: energía. Cola de Pavo: inmune.",
            mechanisms: "Variado.",
            evidence: "Resumen de literatura.",
            practical: "Use como guía de selección rápida."
        },
        {
            id: 33, icon: "✅", title: "Cómo evaluar un producto (Checklist)",
            what: "Especie, Parte usada, Extracción, Estandarización, Pruebas.",
            mechanisms: "N/A",
            evidence: "Control de calidad.",
            practical: "Use esta lista antes de comprar."
        },
        {
            id: 34, icon: "🛑", title: "Recordatorio final de seguridad",
            what: "Úselos con prudencia: elija calidad, informe el uso, monitoree efectos.",
            mechanisms: "N/A",
            evidence: "Estándares de seguridad.",
            practical: "Consulte a un médico si tiene condiciones específicas."
        }
    ]
  };

  const currentContent = contentData[language] || contentData.en;

  // --- RENDER HELPERS ---

  const DetailCard: React.FC<{ item: HealthTipItem }> = ({ item }) => (
    <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/80 backdrop-blur-sm border border-stone-800 shadow-xl transition-all duration-300 hover:border-amber-500/30 hover:shadow-2xl hover:-translate-y-1 living-border">
        <div className="flex items-center gap-4 mb-6 border-b border-stone-700/50 pb-4">
            <div className="w-14 h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-stone-800 to-black border border-stone-700 flex items-center justify-center text-3xl shadow-inner">
                {item.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
                {item.title}
            </h3>
        </div>
        
        <div className="space-y-6">
            <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">What & Why</span>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">{item.what}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">Mechanism</span>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.mechanisms}</p>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-green-400 uppercase tracking-widest block mb-2">Evidence Level</span>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.evidence}</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-700/50">
                <div className="flex items-start gap-3">
                    <span className="text-amber-500 text-xl mt-0.5">💡</span>
                    <div>
                        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Practical Tip</span>
                        <p className="text-stone-200 font-medium text-sm sm:text-base">{item.practical}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="animate-fade-in pb-24">
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        `}</style>
        
      {/* Hero Section with Sharp Parallax */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden bg-stone-950">
        <div 
          className="absolute top-0 left-0 w-full h-[120%] pointer-events-none will-change-transform"
          style={{ transform: `translateY(${offset * 0.7}px)` }} 
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
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] mb-6 electric-underline">
                {t.health_tips_hero_title}
            </h1>
            <p className="text-xl sm:text-2xl text-amber-100 font-light tracking-widest uppercase drop-shadow-md">
                Comprehensive Medicinal Mushroom Guide
            </p>
        </div>
      </section>

      {/* Main Content List */}
      <section className="py-20 bg-stone-950 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
              {currentContent.map((item) => (
                  <DetailCard key={item.id} item={item} />
              ))}
          </div>
      </section>

      {/* Sources List Footer */}
      <section className="py-20 bg-black border-t border-stone-900">
          <div className="max-w-5xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-stone-500 mb-8">Trusted by Science</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                  The information presented above is synthesized from peer-reviewed literature, clinical trial registries (PubMed, Cochrane), and authoritative mycological texts. Always consult your healthcare provider for personalized medical advice.
              </p>
          </div>
      </section>

    </div>
  );
};

export default HealthTipsPage;
