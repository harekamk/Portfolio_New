import React, { useState } from 'react';
import { Sparkles, Terminal, Compass, Layers, CheckCircle } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const IntroSection: React.FC = () => {
  const [stickyInteracted, setStickyInteracted] = useState(false);

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#faf9f5] border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/70 text-stone-700 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              About Me
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.25]">
              I started as a{' '}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy">
                mechanical engineer
              </span>
              , learning how things work. Then I got way more curious about{' '}
              <span className="text-amber-600 font-black">
                why people use them
              </span>
              . So I Googled my way into UX...
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-stone-700 leading-snug">
              I've been fixing the{' '}
              <span className="inline-block px-2.5 py-0.5 rounded-lg bg-red-100 text-red-600 border border-red-200 font-black italic">
                “ugh” moments
              </span>{' '}
              ever since.
            </p>

            {/* Badges / Core Pillars */}
            <div className="pt-4 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 text-white text-xs sm:text-sm font-medium shadow-xs">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                UX Research & Behavior
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-stone-800 border border-stone-200 text-xs sm:text-sm font-medium shadow-xs">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                Scalable Design Systems
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-stone-800 border border-stone-200 text-xs sm:text-sm font-medium shadow-xs">
                <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                Full-Fidelity Prototyping
              </span>
            </div>
          </div>

          {/* Sticky Notes Stack (Interactive & Playful) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 items-center justify-center">
            {/* Yellow Sticky Note */}
            <div
              onClick={() => {
                soundEngine.playPop();
                setStickyInteracted(!stickyInteracted);
              }}
              className="relative w-full max-w-[280px] p-5 rounded-sm bg-[#fef08a] shadow-lg border border-amber-300 text-stone-900 cursor-pointer transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 select-none group"
            >
              {/* Tape at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-xs border border-white/40 shadow-xs transform rotate-1" />
              <div className="font-handwriting text-xl sm:text-2xl text-stone-900 leading-snug">
                “Wait, isn't that just common sense? 🤷‍♂️”
              </div>
              <div className="mt-3 text-right font-handwriting text-sm text-stone-600 font-bold">
                — Everyone before user testing
              </div>
              <div className="mt-2 text-[10px] font-mono-code text-amber-800/60 uppercase tracking-widest text-center group-hover:text-amber-900">
                Click me
              </div>
            </div>

            {/* Pink Sticky Note */}
            <div
              onClick={() => soundEngine.playPop()}
              className="relative w-full max-w-[280px] p-5 rounded-sm bg-[#fce7f3] shadow-md border border-pink-300 text-stone-900 cursor-pointer transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 select-none"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-xs border border-white/40 shadow-xs transform -rotate-2" />
              <div className="font-handwriting text-xl text-stone-900 leading-snug">
                “If you have to explain the button, redesign the button.”
              </div>
              <div className="mt-2 text-right font-handwriting text-xs text-pink-700 font-bold">
                — Core Rule #1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
