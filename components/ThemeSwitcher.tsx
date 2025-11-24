
import React from 'react';
import type { Theme } from '../types';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface ThemeSwitcherProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="theme-switch-wrapper">
      <MoonIcon className={`w-4 h-4 transition-colors ${isDark ? 'text-blue-400' : 'text-gray-500'}`} />
      <label className="theme-switch" htmlFor="theme-toggle">
        <input
          type="checkbox"
          id="theme-toggle"
          checked={!isDark}
          onChange={toggleTheme}
        />
        <span className="slider"></span>
      </label>
      <SunIcon className={`w-4 h-4 transition-colors ${!isDark ? 'text-yellow-500' : 'text-gray-500'}`} />
    </div>
  );
};

export default ThemeSwitcher;
