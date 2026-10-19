import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Calendar, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavigationDockProps {
  onBookCall: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  onBookCall,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'Intro', href: '#hero', id: 'hero' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Brands', href: '#brands', id: 'brands' },
    { label: 'App', href: '#app', id: 'app' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundEngine.playClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-full bg-stone-900/90 text-stone-200 backdrop-blur-xl border border-stone-800 shadow-2xl transition-all duration-300 max-w-full overflow-x-auto scrollbar-none">
        {/* Quick Audio Toggle inside dock */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onToggleMusic();
          }}
          className={`p-2 rounded-full transition-all shrink-0 cursor-pointer ${
            isPlayingMusic
              ? 'bg-amber-400 text-stone-950 font-bold'
              : 'text-stone-400 hover:text-white hover:bg-stone-800'
          }`}
          title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
        >
          {isPlayingMusic ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <div className="w-[1px] h-4 bg-stone-700 mx-0.5 shrink-0" />

        {/* Links */}
        <div className="flex items-center gap-0.5 sm:gap-1 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-100 text-stone-900 font-semibold shadow-xs'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="w-[1px] h-4 bg-stone-700 mx-0.5 shrink-0" />

        {/* Book a Call Button */}
        <button
          onClick={() => {
            soundEngine.playPop();
            onBookCall();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book a Call</span>
        </button>
      </nav>
    </div>
  );
};
