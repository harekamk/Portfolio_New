import React, { useState } from 'react';
import { Disc3, Plane, Coffee, MapPin, Heart, Sparkles, Music } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import corkTexture from '../assets/images/cork_texture_1792065694390.jpg';
import girlPortrait from '../assets/images/girl_portrait_red_1792072829660.jpg';

interface CalculatedChaosProps {
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const CalculatedChaos: React.FC<CalculatedChaosProps> = ({ isPlayingMusic, onToggleMusic }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section id="about" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#faf9f5] border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
            Life & Inspirations
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Calculated <span className="text-amber-600 font-black">chaos.</span>
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-medium">
            Behind the Figma frames—what fuels the taste, obsessions, and curiosities.
          </p>
        </div>

        {/* Corkboard Frame Container */}
        <div className="relative rounded-[32px] p-4 sm:p-8 md:p-12 shadow-2xl border-8 border-[#82542a] overflow-hidden select-none bg-stone-900">
          {/* Authentic Cork Texture Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: `url(${corkTexture})` }}
          />

          {/* Vignette shadow inside frame */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/35 pointer-events-none" />

          {/* Pinned Elements Grid / Collage */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* 1. Polaroid Photo */}
            <div
              onClick={() => {
                soundEngine.playPop();
                setActiveItem(activeItem === 'portrait' ? null : 'portrait');
              }}
              className="md:col-span-4 bg-white p-3.5 pb-6 rounded-sm shadow-2xl border border-stone-200 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer relative group"
            >
              {/* Pushpin at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-red-600 shadow-md border-2 border-red-800 z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-red-300" />
              </div>

              {/* Polaroid Image */}
              <div className="w-full aspect-square overflow-hidden bg-stone-100 rounded-xs">
                <img
                  src={girlPortrait}
                  alt="Me smiling in red jacket"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Handwritten Caption */}
              <div className="mt-3 px-1 flex items-center justify-between">
                <span className="font-handwriting text-xl text-stone-800 font-bold">
                  Harekam Kaur • 2026
                </span>
                <span className="text-[10px] font-mono-code text-stone-400">#BuildInPublic</span>
              </div>
            </div>

            {/* 2. Personal Manifesto Note Sheet */}
            <div
              onClick={() => soundEngine.playClick()}
              className="md:col-span-5 bg-[#fffdfa] p-6 rounded-md shadow-xl border border-stone-200 transform rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 relative group cursor-pointer"
            >
              {/* Scotch tape at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/70 backdrop-blur-xs border border-white/50 shadow-xs transform -rotate-1" />

              <h3 className="font-handwriting text-2xl text-stone-900 font-bold leading-snug">
                “Hi, I'm Harekam Kaur. Here's what's currently in my head & life...”
              </h3>

              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-base">🎨</span>
                  <span><strong>Painting & Design:</strong> A little colour, a little chaos, a lot of creativity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base">🚗</span>
                  <span><strong>Long drives & loud music:</strong> Spotify is always on. Main character energy, with the volume all the way up.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base">❄️</span>
                  <span><strong>Slow winter evenings:</strong> Sunsets, colourful lights, chilly air, and a little magic everywhere.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base">💻</span>
                  <span><strong>Computer Science:</strong> Chitkara University (9.43 CGPA) & BCEHS Alum.</span>
                </li>
              </ul>

              <div className="mt-5 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs font-mono-code text-stone-500">
                <span>📍 Chitkara University</span>
                <span>Developer & Builder</span>
              </div>
            </div>

            {/* 3. Vinyl Player / Music Widget */}
            <div className="md:col-span-3 space-y-5">
              {/* Vinyl Record Card */}
              <div
                onClick={() => {
                  soundEngine.playClick();
                  onToggleMusic();
                }}
                className="bg-stone-900 text-white p-4 rounded-2xl shadow-2xl border-2 border-stone-700 transform rotate-2 hover:rotate-0 transition-all duration-300 cursor-pointer relative group"
              >
                {/* Silver Pushpin */}
                <div className="absolute -top-2.5 right-4 w-4 h-4 rounded-full bg-stone-300 border border-stone-500 shadow-md" />

                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-stone-800 ${isPlayingMusic ? 'animate-spin' : ''}`}>
                    <Disc3 className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code uppercase tracking-wider text-amber-400 font-bold">
                      {isPlayingMusic ? 'Now Spinning' : 'Tap to Play'}
                    </div>
                    <div className="text-xs font-bold text-white truncate">Lofi Beats & Rhodes</div>
                    <div className="text-[10px] text-stone-400">Cozy Audio Synth</div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-300 font-medium">
                  <span>{isPlayingMusic ? 'Playing ♪' : 'Paused'}</span>
                  <span className="text-amber-400 font-mono-code font-bold">
                    {isPlayingMusic ? 'MUTE' : 'PLAY'}
                  </span>
                </div>
              </div>

              {/* Flight Boarding Pass */}
              <div
                onClick={() => soundEngine.playPop()}
                className="bg-[#fefce8] p-4 rounded-xl shadow-lg border border-amber-300 transform -rotate-2 hover:rotate-0 transition-all cursor-pointer relative"
              >
                {/* Red pushpin */}
                <div className="absolute -top-2.5 left-4 w-4 h-4 rounded-full bg-red-600 shadow-md border border-red-800" />

                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-mono-code text-stone-800">
                    <Plane className="w-3.5 h-3.5 text-stone-600" />
                    <span>BOARDING PASS</span>
                  </div>
                  <span className="text-[10px] font-mono-code font-bold text-amber-800">CLASS: CRAFT</span>
                </div>

                <div className="my-2.5 flex items-center justify-between font-mono-code">
                  <div>
                    <div className="text-[10px] text-stone-400">FROM</div>
                    <div className="text-lg font-black text-stone-900">DEL</div>
                  </div>
                  <div className="text-xs text-stone-400 font-bold">✈ ✈ ✈</div>
                  <div>
                    <div className="text-[10px] text-stone-400">TO</div>
                    <div className="text-lg font-black text-stone-900">SFO</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono-code text-stone-500 pt-1 border-t border-amber-200/60">
                  <span>SEAT: 12A</span>
                  <span>GATE: OPEN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pinned Sticky Note Quote */}
          <div className="relative z-10 mt-8 flex justify-center">
            <div
              onClick={() => soundEngine.playPop()}
              className="bg-[#dcfce7] p-4 sm:p-5 rounded-md shadow-lg border border-emerald-300 text-stone-900 max-w-md transform rotate-1 hover:rotate-0 hover:scale-105 transition-all cursor-pointer"
            >
              <div className="font-handwriting text-xl sm:text-2xl font-bold text-stone-900 text-center leading-snug">
                “The best interfaces feel like they were never designed at all.”
              </div>
              <div className="text-right text-xs font-handwriting text-emerald-800 font-bold mt-1">
                — Sticky reminder on my monitor
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
