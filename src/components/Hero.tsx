import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowDown, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import heroLandscape from '../assets/images/hero_landscape_1792065639025.jpg';
import girlPortrait from '../assets/images/girl_portrait_red_1792072829660.jpg';

interface HeroProps {
  onBookCall: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookCall, isPlayingMusic, onToggleMusic }) => {
  const [characterHovered, setCharacterHovered] = useState(false);
  const [balloonHovered, setBalloonHovered] = useState(false);

  return (
    <section id="hero" className="relative w-full min-h-[95vh] md:min-h-screen overflow-hidden flex flex-col justify-between">
      {/* Background Painted Landscape with subtle zoom/ken-burns feel */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroLandscape}
          alt="Studio Ghibli style painted landscape of countryside valley with observatory and hot air balloon"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Subtle atmospheric vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-[#faf9f5]/90 pointer-events-none" />
      </div>

      {/* Top Floating Control Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex items-center justify-between">
        {/* Availability Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/40 shadow-sm text-xs sm:text-sm font-medium text-stone-800 transition-all hover:bg-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for work</span>
        </div>

        {/* Right side controls: Location & Music Player */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/40 text-xs font-medium text-stone-700 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            <span>SF & Remote</span>
          </div>

          {/* Lofi Background Music Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleMusic();
            }}
            className={`group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border transition-all text-xs sm:text-sm font-medium shadow-sm cursor-pointer ${
              isPlayingMusic
                ? 'bg-amber-50/95 border-amber-300 text-amber-900 shadow-amber-500/10'
                : 'bg-white/85 border-white/40 text-stone-800 hover:bg-white'
            }`}
            title={isPlayingMusic ? 'Mute background lofi music' : 'Play chill lofi background music'}
          >
            {isPlayingMusic ? (
              <>
                <div className="flex items-end gap-[2px] h-3.5 w-3.5 pb-0.5">
                  <span className="w-[3px] bg-amber-600 rounded-full animate-eq-1" />
                  <span className="w-[3px] bg-amber-600 rounded-full animate-eq-2" />
                  <span className="w-[3px] bg-amber-600 rounded-full animate-eq-3" />
                </div>
                <span className="font-mono-code text-[11px] font-semibold tracking-wide">LOFI ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-800 transition-colors" />
                <span className="text-[11px] text-stone-600 font-medium">PLAY AUDIO</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Hero Headline & Interactive Story Elements */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-28 md:pb-24 flex-1 flex flex-col justify-between">
        {/* Top-Left Headline Box */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-stone-600 uppercase tracking-widest mb-3 border border-stone-200/60 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Product Designer & Indie Maker
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15] drop-shadow-xs">
            I design like so you don't{' '}
            <span className="relative inline-block text-red-600 underline decoration-amber-400 decoration-wavy decoration-2">
              rage quit.
            </span>
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-stone-700 max-w-md font-medium leading-relaxed bg-white/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-xs">
            Translating complex systems into effortless, human, and delightfully intuitive interfaces at scale.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="#journey"
              onClick={() => soundEngine.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Explore My Journey</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
            <button
              onClick={() => {
                soundEngine.playClick();
                onBookCall();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-stone-900 font-medium text-sm border border-stone-200/80 backdrop-blur-md transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <span>Book a Chat</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </button>
          </div>
        </div>

        {/* Interactive Hot Air Balloon Trigger (over the hot air balloon in the scenery) */}
        <div
          onMouseEnter={() => setBalloonHovered(true)}
          onMouseLeave={() => setBalloonHovered(false)}
          onClick={() => {
            soundEngine.playPop();
            setBalloonHovered(!balloonHovered);
          }}
          className="absolute top-[8%] sm:top-[10%] right-[10%] sm:right-[26%] z-20 cursor-pointer"
        >
          <div className="relative group">
            <div className="w-12 h-16 sm:w-16 sm:h-20 rounded-full flex items-center justify-center">
              {/* Invisible touch target over the balloon with gentle pulsing indicator */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[10px] text-white font-bold items-center justify-center">
                  ✦
                </span>
              </span>
            </div>

            {/* Floating Speech Banner attached to balloon */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-stone-900/90 text-white text-xs font-semibold rounded-full whitespace-nowrap shadow-xl backdrop-blur-md border border-stone-700 transition-all duration-300 ${
                balloonHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-85 scale-95'
              }`}
            >
              🎈 8+ Years of Craft • 300M+ Users
            </div>
          </div>
        </div>

        {/* Interactive Standing Character on the winding path */}
        <div
          onMouseEnter={() => setCharacterHovered(true)}
          onMouseLeave={() => setCharacterHovered(false)}
          onClick={() => {
            soundEngine.playPop();
            setCharacterHovered(!characterHovered);
          }}
          className="absolute bottom-[10%] sm:bottom-[14%] right-[8%] sm:right-[14%] z-20 cursor-pointer"
        >
          <div className="relative flex flex-col items-center">
            {/* Speech bubble pop */}
            <div
              className={`mb-2 px-3.5 py-1.5 bg-white text-stone-900 text-xs sm:text-sm font-semibold rounded-2xl shadow-xl border border-stone-200 transition-all duration-300 font-handwriting text-base ${
                characterHovered ? 'scale-110 -translate-y-1 shadow-2xl' : 'scale-100'
              }`}
            >
              <span>Hey there! I'm Harekam Kaur 👋</span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-white" />
            </div>

            {/* Stylized Illustrated Character Avatar Badge */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-stone-900 to-stone-700 p-0.5 shadow-xl transition-transform hover:scale-105 active:scale-95">
              <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center overflow-hidden border-2 border-white">
                <img src={girlPortrait} alt="Harekam Kaur" className="w-full h-full object-cover" />
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <span className="mt-1 text-[11px] font-mono-code font-semibold px-2 py-0.5 rounded-full bg-white/90 text-stone-700 shadow-xs border border-stone-200">
              Harekam Kaur
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
