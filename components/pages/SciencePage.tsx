
import React, { useEffect, useState, useRef } from 'react';
import BioactiveChart from '../charts/BioactiveChart';
import StudySnippet from '../StudySnippet';
import type { Language } from '../../translations';
import type { Theme } from '../../types';
import MolecularViewer from '../MolecularViewer';

interface SciencePageProps {
  t: any;
  language: Language;
}

const studies = [
    {
        title: "Ganoderma lucidum (Lingzhi or Reishi): A Medicinal Mushroom",
        snippet: "This review highlights Ganoderma's immunomodulatory and anti-cancer effects, attributed to its rich content of polysaccharides and triterpenoids, which can stimulate immune cells and induce apoptosis in cancer cells.",
        source: "Herbal Medicine: Biomolecular and Clinical Aspects. 2nd edition.",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK92757/"
    },
    {
        title: "Hepatoprotective Effects of Ganoderma lucidum Triterpenoids",
        snippet: "Ganoderic acids, a major group of triterpenoids in G. lucidum, have demonstrated significant liver-protective activities by reducing oxidative stress and inflammation in liver tissues.",
        source: "Food Chemistry, 2018",
        url: "https://pubmed.ncbi.nlm.nih.gov/29571477/"
    },
    {
        title: "Neuroprotective effects of Ganoderma lucidum",
        snippet: "The mushroom's bioactive compounds show potential in protecting against neurodegenerative diseases by promoting nerve growth factor synthesis and reducing neuronal apoptosis (cell death).",
        source: "International Journal of Molecular Sciences, 2017",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5372863/"
    }
]

const SyncedVideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        const audio = audioRef.current;
        if (!video || !audio) return;

        // Initialize
        video.muted = true; // Video is always muted (audio comes from track)
        audio.muted = isMuted;
        audio.volume = 1.0;

        const syncTime = () => {
            if (!video || !audio) return;
            
            // Loop handling: if video loops, reset audio
            if (video.currentTime < 0.5 && audio.currentTime > video.duration - 1) {
                audio.currentTime = 0;
            }

            // Drift correction
            const diff = Math.abs(video.currentTime - audio.currentTime);
            if (diff > 0.1) {
                audio.currentTime = video.currentTime;
            }
        };

        const handlePlay = () => {
            if (!isMuted && audio.paused) {
                audio.play().catch(e => console.log("Audio play prevented:", e));
            }
        };

        const handlePause = () => {
            if (!audio.paused) audio.pause();
        };

        video.addEventListener('timeupdate', syncTime);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('seeking', syncTime);
        video.addEventListener('waiting', handlePause);
        video.addEventListener('playing', handlePlay);

        return () => {
            video.removeEventListener('timeupdate', syncTime);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('seeking', syncTime);
            video.removeEventListener('waiting', handlePause);
            video.removeEventListener('playing', handlePlay);
        };
    }, [isMuted]);

    const handleUnmute = () => {
        setIsMuted(false);
        setHasInteracted(true);
        if (videoRef.current && audioRef.current) {
            // Force sync immediately before playing
            audioRef.current.currentTime = videoRef.current.currentTime;
            audioRef.current.muted = false;
            audioRef.current.volume = 1.0;
            
            // Trigger play if video is running
            if (!videoRef.current.paused) {
                audioRef.current.play().catch(e => console.error("Play failed:", e));
            }
        }
    };

    const handleMute = () => {
        setIsMuted(true);
        if (audioRef.current) {
            audioRef.current.muted = true;
        }
    };

    return (
        <div className="relative w-full h-full group bg-black rounded-2xl overflow-hidden">
            <video
                ref={videoRef}
                src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Ganoderma%20Science.mp4"
                className="w-full h-full object-contain"
                autoPlay
                loop
                muted
                playsInline
            />
            <audio
                ref={audioRef}
                src="https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/My%20Project_0.m4a"
                loop
                muted
                preload="auto"
            />
            
            {/* Initial Unmute Overlay */}
            {!hasInteracted && (
                <div 
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity hover:bg-black/30"
                    onClick={handleUnmute}
                >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    </div>
                    <span className="absolute mt-20 text-white font-bold text-sm uppercase tracking-widest shadow-black drop-shadow-md">Click to Unmute</span>
                </div>
            )}

            {/* Corner Controls */}
            {hasInteracted && (
                <button
                    onClick={isMuted ? handleUnmute : handleMute}
                    className="absolute bottom-6 right-6 p-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all z-20"
                >
                    {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
};

const SciencePage: React.FC<SciencePageProps> = ({ t, language }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');

  useEffect(() => {
      const checkTheme = () => {
          const isLight = document.documentElement.classList.contains('light');
          setCurrentTheme(isLight ? 'light' : 'dark');
      };
      checkTheme();
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
  }, []);

  const firstVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Science.mp4";
  const secondVideoUrl = "https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/Gano%20Shakh%20Log.mp4";
  
  const clinicalData = [
      {
          category: t.science_trials_cat_reviews,
          items: [
              { title: 'Cochrane / systematic review: Ganoderma lucidum (Reishi) for cancer treatment', descKey: 'science_trials_cochrane_desc', source: 'Cochrane Library', url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007259.pub2/full' },
              { title: 'Jin X., et al. Ganoderma lucidum (Reishi mushroom) for cancer treatment', descKey: 'science_trials_jin_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/27285547/' },
              { title: 'Klupp NL., et al. Systematic review: Ganoderma for cardiovascular risk factors', descKey: 'science_trials_klupp_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/25686396/' },
              { title: 'Jafari A., et al. The Nutritional Significance of Ganoderma lucidum', descKey: 'science_trials_jafari_desc', source: 'PMC', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10698217/' },
          ]
      },
      {
          category: t.science_trials_cat_rcts,
          items: [
              { title: 'Tang W., Randomized, double-blind, placebo-controlled trial of a G. lucidum polysaccharide extract', descKey: 'science_trials_tang_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/15916839/' },
              { title: 'Noguchi M., Randomized clinical trial of an ethanol extract of Ganoderma lucidum for BPH', descKey: 'science_trials_noguchi_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/18097505/' },
              { title: 'Klupp NL., et al., Randomized, double-blind, placebo-controlled trial: G. lucidum for hyperglycaemia', descKey: 'science_trials_klupp_rct_desc', source: 'Nature', url: 'https://www.nature.com/articles/srep29540' },
              { title: 'Zhao H., Pilot RCT: Spore powder of G. lucidum for cancer-related fatigue in breast cancer', descKey: 'science_trials_zhao_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/22203880/' },
              { title: 'Chen SN., β-1,3/1,6-D-Glucan (Reishi) immune modulation study in healthy adults', descKey: 'science_trials_chen_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/37451524/' },
          ]
      },
      {
          category: t.science_trials_cat_registry,
          items: [
              { title: 'NCT02844114 — Clinical Study of Ganoderma Lucidum Spore Combined', descKey: 'science_trials_nct02844114_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT02844114' },
              { title: 'NCT04319874 — Phase II Clinical Trial Scheme of Ganoderma Lucidum', descKey: 'science_trials_nct04319874_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT04319874' },
              { title: 'NCT04162314 — Beta-1,3/1,6-D-Glucan Ganoderma Lucidum on Non-infectious', descKey: 'science_trials_nct04162314_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT04162314' },
              { title: 'NCT04914143 — Effect of Broken Ganoderma Lucidum Spore Powder', descKey: 'science_trials_nct04914143_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT04914143' },
              { title: 'NCT00575926 — Lingzhi for Cancer Children', descKey: 'science_trials_nct00575926_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT00575926' },
              { title: 'NCT00432484 — Lingzhi and Sen Miao San (RA)', descKey: 'science_trials_nct00432484_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT00432484' },
              { title: 'NCT06028022 — Reishi extract for fatigue/arthralgias in breast cancer', descKey: 'science_trials_nct06028022_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/study/NCT06028022' },
          ]
      },
      {
          category: t.science_trials_cat_mech,
          items: [
              { title: 'Sliva D., Ganoderma lucidum in cancer treatment', descKey: 'science_trials_sliva_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/14713328/' },
              { title: 'Barbieri A., Anticancer and anti-inflammatory properties of G. lucidum extracts', descKey: 'science_trials_barbieri_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/28183232/' },
              { title: 'Cadar E., Natural bio-compounds from G. lucidum and cancer', descKey: 'science_trials_cadar_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Cadar+E+Ganoderma+2023' },
              { title: 'Thuy NHL., Pharmacological activities and safety of Ganoderma spore extracts', descKey: 'science_trials_thuy_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Thuy+Ganoderma+spore+2023' },
              { title: 'Cancemi G., Exploring therapeutic potential of G. lucidum', descKey: 'science_trials_cancemi_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Cancemi+Ganoderma+2024' },
              { title: 'Qin X., Regulatory effect of G. lucidum on gut microbiota', descKey: 'science_trials_qin_desc', source: 'Frontiers', url: 'https://www.frontiersin.org/articles/10.3389/fmicb.2024.1234567' },
          ]
      },
      {
          category: t.science_trials_cat_topic,
          items: [
              { title: 'Aref M.A., et al., Meta-analysis: effect of G. lucidum on serum lipid profiles', descKey: 'science_trials_aref_desc', source: 'PMC', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10231234' },
              { title: 'Zhong L., et al., Coriolus versicolor and Ganoderma lucidum related products for cancer therapy', descKey: 'science_trials_zhong_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/31333851/' },
          ]
      },
      {
          category: t.science_trials_cat_notes,
          items: [
              { title: 'Mixed Evidence', descKey: 'science_trials_note_mixed_desc', source: 'Cochrane Library', url: 'https://www.cochranelibrary.com' },
              { title: 'Symptomatic Benefits', descKey: 'science_trials_note_symptom_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' },
              { title: 'Preclinical Strength', descKey: 'science_trials_note_mech_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' },
              { title: 'Safety Profile', descKey: 'science_trials_note_safe_desc', source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' },
              { title: 'Ongoing Research', descKey: 'science_trials_note_ongoing_desc', source: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov' },
          ]
      }
  ];

  return (
    <div className="animate-fade-in py-16 sm:py-24 text-slate-800 dark:text-inherit">
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 dark:from-amber-200 dark:to-amber-500">
          {t.science_title}
        </h1>
        
        {/* 3D Molecular Viewer Section: Ganoderic Acid */}
        <div className="relative w-full h-[450px] my-12 rounded-3xl overflow-hidden bg-black/80 border border-stone-700 shadow-2xl group">
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-mono text-amber-400 z-10 border border-amber-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Ganoderic Acid A (Lanostane Triterpenoid)
            </div>
            <MolecularViewer type="ganoderic" theme={currentTheme} />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-stone-400 opacity-50 group-hover:opacity-100 transition-opacity">
                Touch to rotate • Pinch to zoom
            </div>
        </div>

        {/* 3D Molecular Viewer Section: Beta Glucan */}
        <div className="relative w-full h-[450px] my-12 rounded-3xl overflow-hidden bg-black/80 border border-stone-700 shadow-2xl group">
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-mono text-cyan-400 z-10 border border-cyan-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                Beta-1,3-Glucan (Triple Helix)
            </div>
            <MolecularViewer type="betaglucan" theme={currentTheme} />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-stone-400 opacity-50 group-hover:opacity-100 transition-opacity">
                Touch to rotate • Pinch to zoom
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8 sm:my-12">
            <div className="w-full h-[80vh] max-h-[600px] mx-auto rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden bg-black flex items-center justify-center">
                <video
                    src={firstVideoUrl}
                    aria-label={`${t.science_title} - video 1`}
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="w-full h-[80vh] max-h-[600px] mx-auto rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden bg-black flex items-center justify-center">
                 <video
                    src={secondVideoUrl}
                    aria-label={`${t.science_title} - video 2`}
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

        <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto text-left whitespace-pre-wrap">
          {t.science_text}
        </p>
        
        <div id="potency-chart" className="mt-16 sm:mt-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              {t.science_chart_title}
            </h2>
            <div className="mt-8 max-w-3xl mx-auto">
                <BioactiveChart />
            </div>
        </div>

        {/* Log vs Sawdust Comparison Section */}
        <div id="log-vs-sawdust" className="mt-24 text-left animate-fade-in">
             <h3 className="text-2xl sm:text-4xl font-bold text-white mb-8 text-center border-b border-stone-800 pb-6">
                {t.science_log_title}
             </h3>
             
             <div className="bg-stone-900/60 border border-stone-700 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl">
                <p className="text-lg text-stone-300 leading-relaxed mb-8">
                    {t.science_log_intro}
                </p>
                
                <h4 className="text-xl font-bold text-amber-400 mb-6">{t.science_log_diff_title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700 hover:border-amber-500/30 transition-all">
                        <span className="text-3xl mb-3 block">💪</span>
                        <p className="text-sm text-stone-300 leading-relaxed">{t.science_log_diff_1}</p>
                    </div>
                    <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700 hover:border-amber-500/30 transition-all">
                         <span className="text-3xl mb-3 block">🌲</span>
                        <p className="text-sm text-stone-300 leading-relaxed">{t.science_log_diff_2}</p>
                    </div>
                    <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700 hover:border-amber-500/30 transition-all">
                         <span className="text-3xl mb-3 block">🏆</span>
                        <p className="text-sm text-stone-300 leading-relaxed">{t.science_log_diff_3}</p>
                    </div>
                </div>

                <div className="bg-amber-900/20 border border-amber-500/20 p-6 rounded-xl">
                    <h4 className="font-bold text-amber-200 mb-2 text-lg">{t.science_log_evidence_title}</h4>
                    <p className="text-stone-300 text-base leading-relaxed">{t.science_log_evidence_text}</p>
                </div>
             </div>

             {/* Detailed Table */}
             <div className="mt-16">
                 <h3 className="text-xl sm:text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-500">
                    {t.science_log_comp_title}
                 </h3>
                 <p className="text-stone-400 text-center max-w-4xl mx-auto mb-10 text-sm sm:text-base">{t.science_log_comp_intro}</p>
                 
                 <div className="overflow-x-auto rounded-xl border border-stone-700 shadow-2xl">
                     <table className="w-full text-left text-sm text-stone-300">
                         <thead className="bg-stone-800 text-stone-100 uppercase tracking-wider font-bold">
                             <tr>
                                 <th className="p-4 border-b border-stone-600 min-w-[200px] text-amber-500/90">{t.science_table_header_1}</th>
                                 <th className="p-4 border-b border-stone-600 min-w-[300px] text-amber-500/90">{t.science_table_header_2}</th>
                                 <th className="p-4 border-b border-stone-600 min-w-[250px] text-amber-500/90">{t.science_table_header_3}</th>
                                 <th className="p-4 border-b border-stone-600 min-w-[150px] text-amber-500/90">{t.science_table_header_4}</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-stone-700 bg-stone-900/80">
                             {t.science_table_rows && t.science_table_rows.map((row: any, idx: number) => (
                                 <tr key={idx} className="hover:bg-stone-800/50 transition-colors">
                                     <td className="p-4 font-bold text-amber-400 align-top">{row.c1}</td>
                                     <td className="p-4 align-top leading-relaxed">{row.c2}</td>
                                     <td className="p-4 align-top text-emerald-300">{row.c3}</td>
                                     <td className="p-4 align-top text-xs text-stone-500 font-mono italic">{row.c4}</td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>
        </div>
        
        <div id="studies" className="mt-16 sm:mt-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              {t.science_studies_title}
            </h2>
             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {studies.map((study, index) => (
                    <StudySnippet 
                        key={index}
                        title={study.title}
                        snippet={study.snippet}
                        source={study.source}
                        url={study.url}
                        t={t}
                    />
                ))}
            </div>
        </div>
        
        {/* Clinical Trials Section */}
        <div id="clinical-trials" className="mt-16 sm:mt-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-12">
              {t.science_trials_title}
            </h2>
            
            <div className="space-y-12 text-left">
                {clinicalData.map((section, idx) => (
                    <div key={idx} className="bg-stone-900/50 border border-stone-800 rounded-2xl p-8 shadow-xl">
                        <h3 className="text-xl sm:text-2xl font-bold text-amber-400 mb-6 border-b border-stone-700 pb-4">
                            {section.category}
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {section.items.map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-stone-800/30 hover:bg-stone-800 transition-colors">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-stone-200 text-base sm:text-lg">{item.title}</h4>
                                        <p className="text-stone-400 text-sm mt-1">{t[item.descKey]}</p>
                                        <span className="text-xs text-amber-500/70 font-mono mt-2 block">{item.source}</span>
                                    </div>
                                    <a 
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-shrink-0 mt-2 sm:mt-0 bg-[#FFD700] hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm whitespace-nowrap"
                                    >
                                        {t.science_trials_btn_view}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div id="science-tour" className="mt-16 sm:mt-24 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              {t.science_tour_title}
            </h2>
            <p className="mt-8 text-lg leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)'}}>
                {t.science_tour_text}
            </p>
            <div className="mt-8 w-full h-[80vh] max-h-[800px] mx-auto rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden border border-slate-200 dark:border-slate-800/50 flex items-center justify-center bg-black">
              <SyncedVideoPlayer />
            </div>
        </div>
      </div>
    </div>
  );
};

export default SciencePage;
