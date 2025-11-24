import React from 'react';

const MushroomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
    <defs>
      <radialGradient id="capGloss" cx="50%" cy="35%" r="55%" fx="50%" fy="25%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#F08C00" />
        <stop offset="100%" stopColor="#B35A00" />
      </radialGradient>
      <linearGradient id="stemShade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#E0C8A8" />
        <stop offset="50%" stopColor="#D2B48C" />
        <stop offset="100%" stopColor="#C0A070" />
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
      </filter>
    </defs>
    
    <g filter="url(#softShadow)">
      {/* Stem */}
      <path d="M 44 55 V 90 C 44 96, 56 96, 56 90 V 55 Z" fill="url(#stemShade)" />
      
      {/* Gills (underside) */}
      <path d="M 18 50 C 18 68, 82 68, 82 50 A 32 18 0 0 0 18 50" fill="#C8B494" />
      <path d="M 22 50 C 22 65, 78 65, 78 50 A 28 15 0 0 0 22 50" fill="#B49C7C" />
      
      {/* Cap */}
      <path d="M 10,50 A 40,40 0 0,1 90,50 A 40,30 0 0,1 10,50" fill="url(#capGloss)" stroke="#652A00" strokeWidth="1" />
      
      {/* Cap Highlight */}
      <path d="M 35,28 A 20,10 0 0,1 65,25" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" transform="rotate(5 50 50)" />
    </g>
  </svg>
);

export default MushroomIcon;