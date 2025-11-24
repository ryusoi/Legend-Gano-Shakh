
import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../../translations';

interface IranMushroomsPageProps {
  t: any;
  language: Language;
}

// Coordinate data for accurate plotting on the Iran Map
const MUSHROOM_DATA = [
    {
        id: 1,
        name: "Agaricus bisporus",
        persian: "قارچ دکمه‌ای سفید",
        edibility: "Edible",
        habitat: "Grasslands",
        location: "Tehran / Alborz",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Agaricus_bisporus_2011_G1.jpg/640px-Agaricus_bisporus_2011_G1.jpg",
        toxin: "None",
        lat: 35.6892, lng: 51.3890 // Tehran
    },
    {
        id: 2,
        name: "Amanita verna",
        persian: "فرشته مرگ",
        edibility: "Deadly",
        habitat: "Oak Forests",
        location: "Mazandaran (Hyrcanian)",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Amanita_verna.jpg/640px-Amanita_verna.jpg",
        toxin: "Amatoxins",
        lat: 36.5659, lng: 53.0586 // Sari/Mazandaran
    },
    {
        id: 3,
        name: "Macrolepiota procera",
        persian: "قارچ چتری",
        edibility: "Edible",
        habitat: "Open woods",
        location: "Gilan",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Macrolepiota_procera_fungus.jpg/640px-Macrolepiota_procera_fungus.jpg",
        toxin: "None",
        lat: 37.2774, lng: 49.5890 // Rasht
    },
    {
        id: 4,
        name: "Pleurotus eryngii",
        persian: "قارچ شاه صدف",
        edibility: "Edible",
        habitat: "Roots of plants",
        location: "Zagros Mountains",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pleurotus_eryngii_2.jpg/640px-Pleurotus_eryngii_2.jpg",
        toxin: "None",
        lat: 33.4888, lng: 48.3558 // Lorestan
    },
    {
        id: 5,
        name: "Lepiota brunneoincarnata",
        persian: "لپیوتا قهوه‌ای",
        edibility: "Deadly",
        habitat: "Parks/Gardens",
        location: "Mashhad",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Lepiota_brunneoincarnata_G4.jpg/640px-Lepiota_brunneoincarnata_G4.jpg",
        toxin: "Amatoxins",
        lat: 36.2605, lng: 59.6168 // Mashhad
    }
];

// --- Custom Digital Map Engine ---
const DigitalMapEngine: React.FC<{ t: any, language: Language, markers: any[] }> = ({ t, language, markers }) => {
    const [zoom, setZoom] = useState(1.2);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeMarker, setActiveMarker] = useState<number | null>(null);
    const [mapMode, setMapMode] = useState<'sat' | 'topo' | 'heat'>('sat');
    const [imageLoaded, setImageLoaded] = useState(false);

    // Reliable Map Source: Wikimedia Commons Relief Map of Iran
    // Bounds approx: Top 40N, Bottom 25N, Left 44E, Right 64E
    const MAP_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Iran_relief_location_map.jpg/1280px-Iran_relief_location_map.jpg";
    
    // Image Dimensions (Natural aspect ratio of the map source)
    const mapWidth = 1280; 
    const mapHeight = 1280 * (20/22); // Approx ratio based on lat/lng spread

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const newZoom = Math.min(Math.max(zoom - e.deltaY * 0.001, 0.8), 4);
        setZoom(newZoom);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;
        setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    // Projection Logic: Calibrated to the specific Iran Relief Map
    const latLngToPixel = (lat: number, lng: number) => {
        // Bounds of the map image
        const NORTH = 40.0;
        const SOUTH = 25.0;
        const WEST = 44.0;
        const EAST = 63.5; // Adjusted slightly for image crop

        const y = ((NORTH - lat) / (NORTH - SOUTH)) * mapHeight;
        const x = ((lng - WEST) / (EAST - WEST)) * mapWidth;
        
        return { x, y };
    };

    return (
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-stone-900 group">
            
            {/* Map Viewport */}
            <div 
                ref={containerRef}
                className="w-full h-full cursor-move relative overflow-hidden bg-[#0f172a]"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div 
                    className="absolute origin-center transition-transform duration-75 ease-linear will-change-transform"
                    style={{ 
                        width: `${mapWidth}px`, 
                        height: `${mapHeight}px`,
                        transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
                        left: '50%',
                        top: '50%',
                    }}
                >
                    {/* Map Layer 1: The Image (Online) */}
                    <img 
                        src={MAP_IMAGE_URL}
                        alt="Iran Map"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoaded && mapMode !== 'heat' ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        draggable={false}
                    />

                    {/* Map Layer 2: The Offline Grid (Fallback / Tech Mode) */}
                    <div 
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${!imageLoaded || mapMode === 'heat' ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            background: `
                                linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                                radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)
                            `,
                            backgroundSize: '40px 40px, 40px 40px, 100% 100%'
                        }}
                    >
                        {/* Offline Fallback Text */}
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">🗺️</div>
                                    <div className="text-emerald-500 font-mono text-sm tracking-widest">TACTICAL GRID MODE</div>
                                    <div className="text-xs text-stone-500">Map image unavailable. Using coordinates.</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Overlay: Topographic Scan Lines (Optional Visual Flair) */}
                    {mapMode === 'topo' && (
                        <div className="absolute inset-0 pointer-events-none opacity-30" style={{backgroundImage: 'repeating-radial-gradient( circle at 0 0, transparent 0, #000 10px ), repeating-linear-gradient(#3335, #3335)'}}></div>
                    )}

                    {/* Markers Layer */}
                    {markers.map((m) => {
                        const pos = latLngToPixel(m.lat, m.lng);
                        const isDeadly = m.edibility === 'Deadly';
                        return (
                            <div 
                                key={m.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/marker"
                                style={{ left: pos.x, top: pos.y }}
                                onClick={(e) => { e.stopPropagation(); setActiveMarker(m.id === activeMarker ? null : m.id); }}
                            >
                                {/* Marker Pin */}
                                <div className="relative">
                                    <div className={`w-4 h-4 rounded-full border-2 border-white ${isDeadly ? 'bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]' : 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]'} animate-pulse relative z-10`}></div>
                                    {/* Ping Effect */}
                                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border ${isDeadly ? 'border-red-500/30' : 'border-emerald-500/30'} animate-ping`}></div>
                                </div>
                                
                                {/* Info Card Popover */}
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-stone-900/95 backdrop-blur-2xl border border-stone-600 rounded-2xl p-0 shadow-2xl z-50 transition-all duration-300 origin-bottom ${activeMarker === m.id ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible group-hover/marker:opacity-100 group-hover/marker:visible delay-75'}`}>
                                    <div className="h-24 w-full relative overflow-hidden rounded-t-2xl">
                                        <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
                                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isDeadly ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                                            {m.edibility}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-white font-bold text-sm">{m.name}</h4>
                                        <p className="text-xs text-amber-400 font-mono mb-2">{m.persian}</p>
                                        <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-400">
                                            <div>
                                                <span className="block text-stone-500 uppercase text-[8px]">Habitat</span>
                                                {m.habitat}
                                            </div>
                                            <div>
                                                <span className="block text-stone-500 uppercase text-[8px]">Region</span>
                                                {m.location}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-stone-900 border-r border-b border-stone-600 transform rotate-45"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Overlay: Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto bg-stone-900/90 backdrop-blur-md p-1.5 rounded-xl border border-stone-700 flex gap-1 shadow-xl">
                    <button onClick={() => setMapMode('sat')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${mapMode === 'sat' ? 'bg-amber-500 text-black shadow-lg' : 'text-stone-400 hover:bg-stone-800'}`}>{t.im_map_control_sat}</button>
                    <button onClick={() => setMapMode('topo')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${mapMode === 'topo' ? 'bg-amber-500 text-black shadow-lg' : 'text-stone-400 hover:bg-stone-800'}`}>{t.im_map_control_topo}</button>
                    <button onClick={() => setMapMode('heat')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${mapMode === 'heat' ? 'bg-amber-500 text-black shadow-lg' : 'text-stone-400 hover:bg-stone-800'}`}>Grid Mode</button>
                </div>
                
                <div className="pointer-events-auto flex flex-col gap-2">
                    <button onClick={() => setZoom(z => Math.min(z + 0.5, 4))} className="w-8 h-8 bg-stone-800 hover:bg-stone-700 rounded-lg text-white font-bold border border-stone-600 shadow-lg flex items-center justify-center text-lg">+</button>
                    <button onClick={() => setZoom(z => Math.max(z - 0.5, 0.8))} className="w-8 h-8 bg-stone-800 hover:bg-stone-700 rounded-lg text-white font-bold border border-stone-600 shadow-lg flex items-center justify-center text-lg">-</button>
                </div>
            </div>

            {/* Overlay: Search */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 pointer-events-none">
                <div className="pointer-events-auto relative group">
                    <input 
                        type="text" 
                        placeholder={t.im_map_search_placeholder || "Find location..."}
                        className="w-full bg-stone-900/90 backdrop-blur-xl border border-stone-600 text-white text-sm rounded-full py-3 pl-5 pr-12 shadow-2xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    />
                    <button className="absolute right-1.5 top-1.5 p-1.5 bg-amber-500 rounded-full text-black hover:bg-amber-400 transition-colors shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

const IranMushroomsPage: React.FC<IranMushroomsPageProps> = ({ t, language }) => {
    const [activeTab, setActiveTab] = useState<'map' | 'list' | 'upload' | 'safety'>('map');
    const [selectedMushroom, setSelectedMushroom] = useState<any>(null);
    const isRtl = language === 'fa';

    return (
        <div className={`animate-fade-in pb-24 text-slate-100 ${isRtl ? 'font-reishi-body' : ''}`}>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            `}</style>

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden bg-stone-950">
                <div className="absolute inset-0 bg-[url('https://qsikfiqqjxgichvjkvbz.supabase.co/storage/v1/object/public/media/2024-12-19-19-43-22-952.jpg')] bg-cover bg-center opacity-40 pointer-events-none blur-sm scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-900/50 to-stone-950 pointer-events-none"></div>
                
                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <div className="inline-block border border-amber-500/30 bg-amber-900/20 px-4 py-1 rounded-full mb-6 backdrop-blur-sm">
                        <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">National Mycology Project</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] mb-6">
                        {t.im_hero_title}
                    </h1>
                    <p className="text-xl sm:text-2xl text-stone-300 font-light tracking-wide drop-shadow-md max-w-3xl mx-auto">
                        {t.im_hero_subtitle}
                    </p>
                </div>
            </section>

            {/* Main Dashboard Interface */}
            <section className="py-12 bg-stone-950 relative z-20 -mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    
                    {/* Dashboard Controls */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8 bg-stone-900/80 backdrop-blur-xl p-1.5 rounded-2xl border border-stone-800 inline-flex mx-auto shadow-2xl relative left-1/2 transform -translate-x-1/2 z-30">
                        {[
                            { id: 'map', label: t.im_tab_map, icon: '🗺️' },
                            { id: 'list', label: t.im_tab_db, icon: '📋' },
                            { id: 'upload', label: t.im_tab_upload, icon: '📸' },
                            { id: 'safety', label: t.im_tab_safety, icon: '⚠️' }
                        ].map((tab) => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)} 
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'text-stone-400 hover:text-white hover:bg-stone-800'}`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="min-h-[600px]">
                        
                        {/* MAP TAB */}
                        {activeTab === 'map' && (
                            <div className="animate-fade-in">
                                <DigitalMapEngine t={t} language={language} markers={MUSHROOM_DATA} />
                                
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 hover:border-amber-500/30 transition-all hover:-translate-y-1">
                                        <span className="text-stone-500 text-[10px] uppercase tracking-widest block mb-1">Total Sightings</span>
                                        <span className="text-2xl font-bold text-white">1,248</span>
                                    </div>
                                    <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 hover:border-green-500/30 transition-all hover:-translate-y-1">
                                        <span className="text-stone-500 text-[10px] uppercase tracking-widest block mb-1">Verified Species</span>
                                        <span className="text-2xl font-bold text-green-400">86</span>
                                    </div>
                                    <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 hover:border-red-500/30 transition-all hover:-translate-y-1">
                                        <span className="text-stone-500 text-[10px] uppercase tracking-widest block mb-1">Toxic Hotspots</span>
                                        <span className="text-2xl font-bold text-red-500">12</span>
                                    </div>
                                    <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                                        <span className="text-stone-500 text-[10px] uppercase tracking-widest block mb-1">Contributors</span>
                                        <span className="text-2xl font-bold text-blue-400">340</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* DATABASE TAB */}
                        {activeTab === 'list' && (
                            <div className="bg-stone-900/50 border border-stone-800 rounded-3xl overflow-hidden animate-fade-in shadow-2xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-stone-800 text-stone-400 uppercase text-xs tracking-wider">
                                            <tr>
                                                <th className="p-4 border-b border-stone-700">{t.im_db_col_img}</th>
                                                <th className="p-4 border-b border-stone-700">{t.im_db_col_name}</th>
                                                <th className="p-4 border-b border-stone-700">{t.im_db_col_persian}</th>
                                                <th className="p-4 border-b border-stone-700">{t.im_db_col_status}</th>
                                                <th className="p-4 border-b border-stone-700">{t.im_db_col_habitat}</th>
                                                <th className="p-4 border-b border-stone-700">{t.im_db_col_loc}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-stone-800 text-sm text-stone-200">
                                            {MUSHROOM_DATA.map((m) => (
                                                <tr key={m.id} className="hover:bg-stone-800/80 transition-colors cursor-pointer group" onClick={() => setSelectedMushroom(m)}>
                                                    <td className="p-4">
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-700">
                                                            <img src={m.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={m.name} />
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-bold italic text-amber-200">{m.name}</td>
                                                    <td className="p-4">{m.persian}</td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${m.edibility === 'Deadly' ? 'bg-red-900/50 text-red-400 border border-red-700' : 'bg-green-900/50 text-green-400 border border-green-700'}`}>
                                                            {m.edibility}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-stone-400">{m.habitat}</td>
                                                    <td className="p-4 text-stone-400">{m.location}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* UPLOAD TAB */}
                        {activeTab === 'upload' && (
                            <div className="max-w-3xl mx-auto bg-stone-900 border border-stone-800 rounded-3xl p-8 text-center animate-fade-in shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                                
                                <div className="mb-8 relative z-10">
                                    <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-stone-600 hover:border-amber-500 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                        <span className="text-3xl">📸</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{t.im_upload_title}</h3>
                                    <p className="text-stone-400 max-w-md mx-auto">{t.im_upload_desc}</p>
                                </div>
                                
                                <div className="border-2 border-dashed border-stone-700 hover:border-amber-500 rounded-2xl p-12 transition-all cursor-pointer bg-stone-950/50 group hover:bg-stone-900 relative z-10">
                                    <p className="text-stone-300 group-hover:text-white transition-colors font-bold text-lg">{t.im_upload_btn}</p>
                                    <p className="text-xs text-stone-500 mt-2">JPG, PNG, MP4 (Max 50MB)</p>
                                </div>

                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 text-left">
                                    <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700">
                                        <label className="text-xs font-bold text-amber-500 uppercase block mb-2">{t.im_upload_location}</label>
                                        <div className="flex items-center gap-2 text-stone-400 text-sm">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            Waiting for GPS signal...
                                        </div>
                                    </div>
                                    <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700">
                                        <label className="text-xs font-bold text-amber-500 uppercase block mb-2">{t.im_upload_notes}</label>
                                        <textarea className="w-full bg-transparent border-none text-stone-300 text-sm focus:ring-0 resize-none h-10" placeholder="Enter details..."></textarea>
                                    </div>
                                </div>

                                <button className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]">
                                    {t.im_upload_submit}
                                </button>
                            </div>
                        )}

                        {/* SAFETY TAB */}
                        {activeTab === 'safety' && (
                            <div className="animate-fade-in max-w-4xl mx-auto">
                                <div className="bg-red-950/40 border border-red-500/50 rounded-3xl p-8 text-center mb-12 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                                    <div className="inline-block p-4 rounded-full bg-red-600 text-white mb-6 animate-pulse shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl sm:text-5xl font-bold text-red-500 mb-6">{t.im_safety_title}</h2>
                                    <p className="text-xl text-red-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                                        {t.im_safety_text}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
                                        <h3 className="text-xl font-bold text-white mb-6 border-b border-stone-700 pb-4">{t.im_edu_title}</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 bg-stone-800 rounded-lg text-2xl">🍄</div>
                                                <div>
                                                    <h4 className="font-bold text-amber-400 text-sm">{t.im_edu_spore}</h4>
                                                    <p className="text-xs text-stone-400 mt-1">Place cap on paper for 4h. White = Danger.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 bg-stone-800 rounded-lg text-2xl">🏺</div>
                                                <div>
                                                    <h4 className="font-bold text-amber-400 text-sm">{t.im_edu_volva}</h4>
                                                    <p className="text-xs text-stone-400 mt-1">Always dig the base. A cup (volva) is a major warning sign.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-stone-900 border border-green-900/50 rounded-2xl p-6 shadow-xl">
                                        <h3 className="text-xl font-bold text-green-400 mb-6 border-b border-stone-700 pb-4">{t.im_safety_firstaid}</h3>
                                        <ul className="space-y-3 text-stone-300 text-sm">
                                            <li className="flex items-center gap-2"><span className="text-red-500">●</span> Go to ER immediately.</li>
                                            <li className="flex items-center gap-2"><span className="text-red-500">●</span> Keep a sample of the mushroom.</li>
                                            <li className="flex items-center gap-2"><span className="text-red-500">●</span> Mention "Amatoxin" suspicion.</li>
                                            <li className="flex items-center gap-2"><span className="text-red-500">●</span> Do NOT wait for symptoms.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IranMushroomsPage;
