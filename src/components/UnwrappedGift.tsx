import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, ExternalLink, X, Info } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface CuratedTool {
  id: string;
  name: string;
  icon: string;
  category: string;
  whyILoveIt: string;
  proTip: string;
  link: string;
  color: string;
}

const TOOLS: CuratedTool[] = [
  {
    id: 'figma',
    name: 'Figma',
    icon: '🎨',
    category: 'Design & Canvas',
    whyILoveIt: 'The bedrock of modern product collaboration. Auto-layout and component variants changed the speed of iteration forever.',
    proTip: 'Use Shift + A on everything. Master slot components for super flexible design systems.',
    link: 'https://figma.com',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'framer',
    name: 'Framer',
    icon: '⚡',
    category: 'Web & Animation',
    whyILoveIt: 'Bridges visual imagination and production web code without waiting for engineers.',
    proTip: 'Use spring physics over linear easings for human, physical tactile micro-interactions.',
    link: 'https://framer.com',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: '📝',
    category: 'Second Brain',
    whyILoveIt: 'Where messy research synthesizes into crisp product briefs and prioritization matrixes.',
    proTip: 'Keep a "Frustrations Journal" of weird UI quirks you encounter in the wild.',
    link: 'https://notion.so',
    color: 'from-stone-700 to-stone-900',
  },
  {
    id: 'raycast',
    name: 'Raycast',
    icon: '🚀',
    category: 'Speed & Workflow',
    whyILoveIt: 'My operating system for high keystroke-per-minute productivity.',
    proTip: 'Map window management and clipboard history to hyper-key shortcuts.',
    link: 'https://raycast.com',
    color: 'from-rose-500 to-red-600',
  },
  {
    id: 'linear',
    name: 'Linear',
    icon: '📐',
    category: 'Execution & Issues',
    whyILoveIt: 'The gold standard for minimalist, lightning-fast product management.',
    proTip: 'Break gigantic redesigns into atomic 1-day shippable PRs.',
    link: 'https://linear.app',
    color: 'from-indigo-600 to-violet-700',
  },
  {
    id: 'claude-gemini',
    name: 'Claude & Gemini',
    icon: '✨',
    category: 'AI Thought Partner',
    whyILoveIt: 'My 24/7 design critic, user persona simulator, and edge-case finder.',
    proTip: 'Paste user research transcripts and prompt it to find emotional contradictions.',
    link: 'https://gemini.google.com',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'mobbin',
    name: 'Mobbin',
    icon: '📱',
    category: 'Real-World Reference',
    whyILoveIt: 'Never design from a blank canvas. See how Apple, Stripe, and Airbnb solved onboarding.',
    proTip: 'Study payment recovery and edge-case error flows, not just happy paths.',
    link: 'https://mobbin.com',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'cleanshot',
    name: 'CleanShot X',
    icon: '📸',
    category: 'Screen & Feedback',
    whyILoveIt: 'Essential for pinning screenshots, blurring sensitive data, and recording snappy bug GIFs.',
    proTip: 'Use Quick Reference windows to overlay competing mockups side-by-side.',
    link: 'https://cleanshot.com',
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: 'spline',
    name: 'Spline 3D',
    icon: '🧊',
    category: '3D Spatial Web',
    whyILoveIt: 'Bringing lightweight, interactive 3D directly onto responsive landing pages.',
    proTip: 'Keep polygon counts tight and bake lighting for 60fps mobile performance.',
    link: 'https://spline.design',
    color: 'from-pink-500 to-rose-600',
  },
];

export const UnwrappedGift: React.FC = () => {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [activeTool, setActiveTool] = useState<CuratedTool | null>(null);

  const handleUnwrap = () => {
    soundEngine.playPop();
    setIsUnwrapped(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#f59e0b', '#ec4899', '#10b981', '#6366f1'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#faf9f5] border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
          Curated Stack & Knowledge
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Everything I know, <span className="text-amber-500 underline decoration-amber-300">unwrapped.</span>
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base font-medium max-w-lg mx-auto">
          Resources, design guides, curated tools, and frameworks I use every single day.
        </p>

        {/* Gift Box Interactive Component */}
        <div className="mt-12 relative flex flex-col items-center justify-center min-h-[380px]">
          {!isUnwrapped ? (
            /* Wrapped 3D Box State */
            <div className="flex flex-col items-center group cursor-pointer" onClick={handleUnwrap}>
              {/* Gift Box Graphic */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 transition-transform duration-300 group-hover:scale-105 active:scale-95">
                {/* Box body */}
                <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-800 shadow-2xl border-4 border-blue-950 flex items-center justify-center relative overflow-hidden">
                  {/* Golden Ribbons */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 shadow-sm" />
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-300 shadow-sm" />
                  {/* Center Bow */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-amber-400 border-2 border-amber-300 shadow-md flex items-center justify-center text-stone-950 font-bold">
                    ✦
                  </div>
                </div>

                {/* Pulsing Hint Badge */}
                <div className="absolute -top-3 -right-3 flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-amber-500 text-stone-950 font-bold text-xs items-center justify-center shadow-md">
                    🎁
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleUnwrap}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm font-semibold shadow-md hover:bg-stone-800 transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Click to Unwrap the Stack</span>
              </button>
            </div>
          ) : (
            /* Unwrapped Open State: Floating Arc of Tools */
            <div className="w-full max-w-4xl animate-in fade-in zoom-in-95 duration-500">
              {/* Box Lid Popped Open Graphic in background */}
              <div className="flex justify-center mb-6">
                <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shadow-xs">
                  <span>🎉 Unwrapped! Click any tool to see my private notes & shortcuts</span>
                </div>
              </div>

              {/* Floating Tools Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4">
                {TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      soundEngine.playPop();
                      setActiveTool(tool);
                    }}
                    className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md hover:border-stone-300 transition-all text-left flex items-start gap-3.5 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-amber-50 border border-stone-200 flex items-center justify-center text-xl shrink-0 transition-colors">
                      {tool.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-stone-900 text-sm truncate">{tool.name}</h4>
                        <span className="text-[10px] font-mono-code text-stone-400 font-semibold">↗</span>
                      </div>
                      <p className="text-[11px] text-stone-500 font-medium truncate mt-0.5">
                        {tool.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Re-wrap button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsUnwrapped(false);
                  }}
                  className="text-xs font-mono-code font-bold text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  ↺ Pack the box again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tool Notes Modal */}
        {activeTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 text-left">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTool(null);
                }}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-2xl">
                  {activeTool.icon}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-stone-900">{activeTool.name}</h3>
                  <span className="text-xs font-mono-code text-stone-500 font-medium">
                    {activeTool.category}
                  </span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Why I Love It
                  </h4>
                  <p className="text-stone-800 text-sm leading-relaxed">{activeTool.whyILoveIt}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>My Pro Secret / Shortcut</span>
                  </h4>
                  <p className="text-stone-800 text-sm leading-relaxed font-medium">
                    {activeTool.proTip}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-3 border-t border-stone-100">
                <a
                  href={activeTool.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>Visit {activeTool.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveTool(null)}
                  className="px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-all"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
