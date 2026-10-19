import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, X, Sparkles, Check, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Project {
  id: string;
  title: string;
  company: string;
  metric: string;
  metricLabel: string;
  tagline: string;
  cardColor: string;
  accentBg: string;
  problem: string;
  solution: string;
  takeaway: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'coupon-hunter',
    title: 'The Coupon Hunter',
    company: 'MakeMyTrip',
    metric: '+28%',
    metricLabel: 'Coupon Application Lift',
    tagline: 'Fixing promotional coupon drop-offs at checkout',
    cardColor: 'from-orange-500 to-rose-500',
    accentBg: '#f97316',
    problem: 'Users were abandoning payment flows to Google coupons in external tabs, losing purchase intent and driving high cart drop-offs.',
    solution: 'Designed an in-flow "Smart Coupon Engine" that automatically evaluated the user’s cart, highlighted highest-savings combinations, and applied them with one tap.',
    takeaway: 'Don’t make users work for savings they already qualified for.',
    highlights: ['Zero tab switching', '14% drop in abandoned bookings', 'Tested on 4M+ monthly travelers'],
  },
  {
    id: 'request-rescue',
    title: 'The Request Rescue',
    company: 'Enterprise Core',
    metric: '-42%',
    metricLabel: 'Support Ticket Influx',
    tagline: 'Transforming customer service into proactive self-resolution',
    cardColor: 'from-blue-600 to-cyan-500',
    accentBg: '#2563eb',
    problem: 'Customer support teams were inundated with repetitive reschedule and refund inquiries during peak seasonal disruptions.',
    solution: 'Created an intelligent contextual resolution drawer that surfaced dynamic actions (reschedule, refund, hotel credit) right inside the booking status banner.',
    takeaway: 'The fastest support ticket is the one the user never had to file.',
    highlights: ['Average resolution time dropped from 4 hours to 45 seconds', '94% user CSAT score'],
  },
  {
    id: 'seamless-booking',
    title: 'The Seamless Booking',
    company: 'MakeMyTrip',
    metric: '2 Steps',
    metricLabel: 'From 6-step multi-page funnel',
    tagline: 'Radical simplification of high-friction flight checkout',
    cardColor: 'from-purple-600 to-indigo-600',
    accentBg: '#7c3aed',
    problem: 'Add-ons (seats, meals, baggage, insurance) overwhelmed users, stretching checkout across 6 complex decision screens.',
    solution: 'Consolidated traveler info and smart bundling into a unified sticky drawer with progressive disclosure.',
    takeaway: 'Clarity over clutter. Every additional step is a leak in your funnel.',
    highlights: ['+18% booking completion rate', '33% faster checkout velocity'],
  },
  {
    id: 'property-matchmaker',
    title: 'Property Matchmaker',
    company: 'OYO Hospitality',
    metric: '+22%',
    metricLabel: 'Repeat Booking Surge',
    tagline: 'Algorithmic hotel recommendation engine for solo & family travelers',
    cardColor: 'from-amber-500 to-yellow-500',
    accentBg: '#d97706',
    problem: 'Travelers spent an average of 18 minutes scrolling through hundreds of generic hotel cards without knowing neighborhood suitability.',
    solution: 'Designed a "Vibe & Proximity" visual tag system that matched travelers directly with their exact trip archetype (work, leisure, couple, quick transit).',
    takeaway: 'People don’t search for rooms; they search for peace of mind.',
    highlights: ['4,000+ live hotel storefronts', 'Reduced bounce rate on hotel details by 29%'],
  },
  {
    id: 'design-system',
    title: 'Design System at Scale',
    company: 'Multi-Brand Squads',
    metric: '120+',
    metricLabel: 'Production Components',
    tagline: 'Unifying design tokens and patterns across 14 product squads',
    cardColor: 'from-emerald-500 to-teal-600',
    accentBg: '#059669',
    problem: 'Inconsistent button heights, conflicting modals, and 4 different date-pickers across web and mobile products.',
    solution: 'Architected and documented a comprehensive tokenized design system in Figma and React with strict accessibility benchmarks.',
    takeaway: 'A design system is not a library; it is a shared company vocabulary.',
    highlights: ['3x faster feature handoff', '100% WCAG AA contrast compliance across all flows'],
  },
];

export const ShippedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const handleOpenProject = (p: Project) => {
    soundEngine.playPop();
    setSelectedProject(p);
  };

  const handleClose = () => {
    soundEngine.playClick();
    setSelectedProject(null);
  };

  return (
    <section id="work" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#faf9f5] border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
            Impact Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Things I shipped, and the <br className="hidden sm:block" />
            <span className="text-amber-600">numbers they moved.</span>
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-medium">
            Click on any card standing in the tray to inspect the case study and architectural decisions.
          </p>
        </div>

        {/* 3D Box Showcase Tray Container */}
        <div className="relative max-w-4xl mx-auto pt-10 pb-6 px-4">
          {/* Wooden / Frosted Acrylic Tray Base */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#e7e1cf] to-[#d6cbb3] p-4 sm:p-7 shadow-2xl border-4 border-[#c8bc9f]">
            {/* Inner Recessed Slot */}
            <div className="relative rounded-2xl bg-[#bfb296]/60 p-3 sm:p-5 shadow-inner border border-black/10">
              {/* Standup Cards Flex Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 items-end min-h-[300px] sm:min-h-[360px] pb-2">
                {PROJECTS.map((project, idx) => {
                  const isHovered = hoveredCardId === project.id;
                  return (
                    <div
                      key={project.id}
                      onMouseEnter={() => {
                        setHoveredCardId(project.id);
                        soundEngine.playClick();
                      }}
                      onMouseLeave={() => setHoveredCardId(null)}
                      onClick={() => handleOpenProject(project)}
                      className={`relative cursor-pointer transition-all duration-300 transform select-none ${
                        isHovered
                          ? '-translate-y-10 sm:-translate-y-14 scale-105 z-30 shadow-2xl'
                          : 'translate-y-0 hover:-translate-y-4'
                      }`}
                      style={{
                        zIndex: isHovered ? 30 : idx + 1,
                      }}
                    >
                      {/* Card Body */}
                      <div
                        className={`w-full aspect-[9/16] rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-white shadow-xl bg-gradient-to-b ${project.cardColor} border-2 border-white/30 backdrop-blur-md relative overflow-hidden`}
                      >
                        {/* Shimmer gradient highlight */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-transparent pointer-events-none" />

                        {/* Top index number and company */}
                        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-code font-bold opacity-90">
                          <span>0{idx + 1}</span>
                          <span className="uppercase tracking-widest text-[9px] bg-black/20 px-2 py-0.5 rounded-full">
                            {project.company}
                          </span>
                        </div>

                        {/* Card Title & Tagline */}
                        <div className="relative z-10 my-auto">
                          <h4 className="text-base sm:text-lg font-extrabold leading-snug drop-shadow-sm">
                            {project.title}
                          </h4>
                          <p className="text-[11px] text-white/80 line-clamp-2 mt-1 leading-tight">
                            {project.tagline}
                          </p>
                        </div>

                        {/* Bottom Highlight Stat */}
                        <div className="relative z-10 pt-3 border-t border-white/25">
                          <div className="text-xl sm:text-2xl font-black font-mono-code leading-none">
                            {project.metric}
                          </div>
                          <div className="text-[9px] text-white/90 uppercase tracking-wider font-semibold mt-0.5 truncate">
                            {project.metricLabel}
                          </div>
                        </div>

                        {/* Pull Out Tag */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-stone-900 text-white text-[9px] font-mono-code rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                          Click to Inspect
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Wooden Box Front Lip */}
              <div className="mt-4 pt-3 border-t border-[#ab9e81] flex items-center justify-between text-xs font-mono-code text-stone-700 font-semibold px-2">
                <span>✦ SHIPPED PORTFOLIO CARDS</span>
                <span>PULL TO INSPECT ↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Case Study Inspection Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-800">
                  {selectedProject.company}
                </span>
                <span className="text-xs font-mono-code text-stone-400 font-semibold">
                  Shipped Case Study
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base mt-1">
                {selectedProject.tagline}
              </p>

              {/* Big Metric Box */}
              <div
                className={`my-6 p-5 rounded-2xl bg-gradient-to-r ${selectedProject.cardColor} text-white shadow-lg flex items-center justify-between`}
              >
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold opacity-90">
                    Primary Measured Metric
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono-code mt-0.5">
                    {selectedProject.metric}
                  </div>
                  <div className="text-xs sm:text-sm font-medium opacity-90">
                    {selectedProject.metricLabel}
                  </div>
                </div>
                <TrendingUp className="w-12 h-12 text-white/40" />
              </div>

              {/* Problem & Solution Grid */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
                    The Problem
                  </h4>
                  <p className="text-stone-800 text-sm leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                    The Design Solution
                  </h4>
                  <p className="text-stone-800 text-sm leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                    Core Design Philosophy
                  </h4>
                  <p className="font-handwriting text-xl text-stone-900 font-bold">
                    “{selectedProject.takeaway}”
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Key Outcomes & Architecture
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-stone-700 text-sm">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Close Action */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 transition-all cursor-pointer shadow-sm"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
