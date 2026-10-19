import React, { useState } from 'react';
import { ExternalLink, Sparkles, Layout, Globe, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface WebsiteItem {
  id: string;
  title: string;
  category: 'SaaS' | 'E-Commerce' | 'Studio & Brand';
  description: string;
  urlPreview: string;
  tags: string[];
  gradient: string;
  accentNote?: string;
  previewContent: {
    headline: string;
    subline: string;
    buttonText: string;
    themeBg: string;
  };
}

const WEBSITES: WebsiteItem[] = [
  {
    id: 'life-is',
    title: 'Life is... Do the Whole Thing',
    category: 'Studio & Brand',
    description: 'Editorial brand identity and digital monograph for a high-concept creative design collective.',
    urlPreview: 'lifeis.design',
    tags: ['Branding', 'Typography', 'Interactive Art'],
    gradient: 'from-stone-900 to-stone-800',
    accentNote: 'Minimalist editorial layout with micro-scroll choreography',
    previewContent: {
      headline: 'Life is... Do the whole thing.',
      subline: 'An exploratory monograph on creative bravery and purposeful friction.',
      buttonText: 'Read Monograph →',
      themeBg: 'bg-stone-50 text-stone-900',
    },
  },
  {
    id: 'arch-living',
    title: 'Atelier Kura — Spatial Living',
    category: 'E-Commerce',
    description: 'High-end furniture and spatial design showroom with 3D room visualization and bespoke checkouts.',
    urlPreview: 'atelierkura.studio',
    tags: ['E-Commerce', 'Spatial UI', 'Luxury'],
    gradient: 'from-amber-900 to-stone-900',
    accentNote: '+44% conversion over standard Shopify theme',
    previewContent: {
      headline: 'It’s your room. You decide.',
      subline: 'Timeless Scandinavian and Japanese minimalist furniture handcrafted from reclaimed walnut.',
      buttonText: 'Explore Catalog',
      themeBg: 'bg-[#f4efe6] text-stone-900',
    },
  },
  {
    id: 'soundscape',
    title: 'Sundown Audio & Soundscapes',
    category: 'SaaS',
    description: 'Interactive generative audio workstation for focused creators, with binaural tones and lo-fi presets.',
    urlPreview: 'sundown.fm',
    tags: ['Web Audio', 'Dark Mode UI', 'SaaS'],
    gradient: 'from-indigo-900 to-purple-900',
    accentNote: 'Over 120,000 monthly active listeners',
    previewContent: {
      headline: 'Deep focus, engineered by sound.',
      subline: 'Algorithmic soundscapes tuned to alpha brainwave resonance.',
      buttonText: 'Start Listening Free',
      themeBg: 'bg-stone-900 text-white',
    },
  },
  {
    id: 'hyperflow',
    title: 'Hyperflow AI Studio',
    category: 'SaaS',
    description: 'Next-generation prompt canvas for product designers to test generative UI variants in real-time.',
    urlPreview: 'hyperflow.ai',
    tags: ['AI Interface', 'Canvas UI', 'B2B SaaS'],
    gradient: 'from-blue-900 to-cyan-900',
    accentNote: 'Featured #1 Product of the Day on ProductHunt',
    previewContent: {
      headline: 'Ship design variants in seconds.',
      subline: 'The AI canvas that turns natural language into production React components.',
      buttonText: 'Get Early Access',
      themeBg: 'bg-slate-950 text-slate-100',
    },
  },
];

export const BrandsAndWebsites: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'SaaS' | 'E-Commerce' | 'Studio & Brand'>('All');

  const filtered = activeFilter === 'All'
    ? WEBSITES
    : WEBSITES.filter((w) => w.category === activeFilter);

  return (
    <section id="brands" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#faf9f5] border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
              Web Design & Brands
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              Brands & websites
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base font-medium max-w-xl">
              Designing identities, landing pages, and interactive web experiences that actually convert.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-stone-200/70 border border-stone-300/50 backdrop-blur-md">
            {(['All', 'SaaS', 'E-Commerce', 'Studio & Brand'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveFilter(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-300/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Browser Mockup Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl bg-white border border-stone-200 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Browser Header Bar */}
              <div className="px-4 py-3 bg-stone-100 border-b border-stone-200/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="px-3 py-1 rounded-md bg-white border border-stone-200 text-[11px] font-mono-code text-stone-500 font-semibold flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-stone-400" />
                  <span>https://{item.urlPreview}</span>
                </div>
                <span className="text-[10px] font-mono-code text-stone-400 uppercase tracking-widest font-semibold">
                  {item.category}
                </span>
              </div>

              {/* Browser Content Simulated Viewport */}
              <div
                className={`p-6 sm:p-8 aspect-[16/10] flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.01] ${item.previewContent.themeBg}`}
              >
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-stone-200/60 text-[10px] font-mono-code font-bold uppercase tracking-wider mb-3">
                    Featured Craft
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-snug">
                    {item.previewContent.headline}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm opacity-80 max-w-sm leading-relaxed">
                    {item.previewContent.subline}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold shadow-sm">
                    {item.previewContent.buttonText}
                  </span>
                  {item.accentNote && (
                    <span className="font-handwriting text-base sm:text-lg text-amber-600 font-bold">
                      ★ {item.accentNote}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-5 bg-white border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-stone-900 text-base">{item.title}</h4>
                  <p className="text-xs text-stone-500 line-clamp-1">{item.description}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-medium font-mono-code"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
