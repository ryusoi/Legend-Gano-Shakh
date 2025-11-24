import React from 'react';
import type { Language } from '../translations';
import IranFlag from './icons/IranFlag';
import BritainFlag from './icons/BritainFlag';
import SpainFlag from './icons/SpainFlag';

interface LanguageSwitcherProps {
  selectedLang: Language;
  onSelectLang: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string; FlagComponent: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { code: 'fa', label: 'IR', FlagComponent: IranFlag },
  { code: 'en', label: 'GB', FlagComponent: BritainFlag },
  { code: 'es', label: 'ES', FlagComponent: SpainFlag },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ selectedLang, onSelectLang }) => {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1.5">
      {LANGUAGES.map(({ code, label, FlagComponent }) => (
        <button
          key={code}
          onClick={() => onSelectLang(code)}
          className={`p-1 rounded-md transition-all ${
            selectedLang === code
              ? 'bg-amber-400/20 dark:bg-amber-800/50 scale-110'
              : 'opacity-70 hover:opacity-100 hover:bg-slate-200/50 dark:hover:bg-stone-700/50'
          }`}
          aria-label={`Switch to ${label}`}
        >
          <div className="flex flex-col items-center gap-0.5">
              <span className="text-[9px] font-bold text-slate-700 dark:text-slate-300">{label}</span>
              <FlagComponent className="w-4 h-auto rounded-sm" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;