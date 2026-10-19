import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Award, Compass, TrendingUp, Users, Building, Smartphone, Rocket } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Milestone {
  id: string;
  year: string;
  pinLabel: string;
  title: string;
  subtitle: string;
  story: string;
  metricLabel?: string;
  metricValue?: string;
  tags: string[];
  x: number; // Percentage on SVG map
  y: number; // Percentage on SVG map
  color: string;
  icon: React.ReactNode;
}

const MILESTONES: Milestone[] = [
  {
    id: 'engineering',
    year: '2016',
    pinLabel: 'B.Tech Mech',
    title: 'The Spark: Mechanical Engineering',
    subtitle: 'Learning how physical machines behave',
    story: 'Trained to think in torque, tolerances, and fluid dynamics. But during CAD modeling, I realized my favorite part was not the gearbox—it was why the software ergonomics made humans miserable. I wanted to design for brains, not just gears.',
    metricLabel: 'Cadence',
    metricValue: '4 Years',
    tags: ['First Principles', 'System Architecture', 'Ergonomics'],
    x: 48,
    y: 82,
    color: '#3b82f6',
    icon: <Compass className="w-4 h-4 text-blue-500" />,
  },
  {
    id: 'ios',
    year: '2018',
    pinLabel: 'iOS Epiphany',
    title: 'The day iOS changed everything',
    subtitle: 'Falling down the Human Interface Guidelines rabbit hole',
    story: 'Got my hands on an iPhone and spent nights taking screenshots of spring animations, bouncy physics, and haptic feedback. Realized great digital products are kinetic art that respects human cognition.',
    metricLabel: 'Hours Dissecting',
    metricValue: '1,000+',
    tags: ['HIG', 'Micro-interactions', 'Typography'],
    x: 32,
    y: 60,
    color: '#8b5cf6',
    icon: <Smartphone className="w-4 h-4 text-purple-500" />,
  },
  {
    id: 'failed-app',
    year: '2019',
    pinLabel: 'New Delhi',
    title: 'A failed app changed my life',
    subtitle: 'My first startup venture in New Delhi',
    story: 'Coded and designed a hyperlocal discovery product for 7 months. We launched, got 14 downloads, and zero retention. It crushed me—and taught me the most valuable lesson of my career: beautiful UI without user necessity is just expensive wallpaper.',
    metricLabel: 'Tough Lessons',
    metricValue: '100% PMF Focus',
    tags: ['Customer Discovery', 'Problem Validation', 'Resilience'],
    x: 24,
    y: 35,
    color: '#ef4444',
    icon: <Rocket className="w-4 h-4 text-red-500" />,
  },
  {
    id: 'freelancing',
    year: '2020',
    pinLabel: 'Freelance Hustle',
    title: 'Freelancing made it real',
    subtitle: 'From bedroom wireframes to global clients',
    story: 'Took on 25+ freelance projects across fintech, edtech, and SaaS. Learned how to communicate trade-offs, scope under tight constraints, and pitch business ROI to founders who cared about bottom-line conversion.',
    metricLabel: 'Shipped Clients',
    metricValue: '25+ Brands',
    tags: ['Full Lifecycle', 'Speed to Market', 'Client Trust'],
    x: 38,
    y: 18,
    color: '#f59e0b',
    icon: <Users className="w-4 h-4 text-amber-500" />,
  },
  {
    id: 'makemytrip',
    year: '2021-2023',
    pinLabel: 'MakeMyTrip',
    title: 'MakeMyTrip taught me to look beyond the screen',
    subtitle: 'Designing at 300 Million user scale',
    story: 'At India’s largest travel platform, design had direct revenue stakes. Revamped promotional coupon architectures, hotel checkout flows, and traveler reassurance microcopy. If a button was unclear, thousands dropped off.',
    metricLabel: 'Conversion Shift',
    metricValue: '15% → 33%',
    tags: ['300M+ Users', 'Booking Velocity', 'A/B Testing'],
    x: 62,
    y: 18,
    color: '#ec4899',
    icon: <TrendingUp className="w-4 h-4 text-pink-500" />,
  },
  {
    id: 'hospitality',
    year: '2023-2024',
    pinLabel: 'OYO Hospitality',
    title: 'OYO taught me speed and scale',
    subtitle: 'Optimizing checkout & storefronts for 4,000+ stays',
    story: 'Designed rapid hotel discovery engines and booking confidence modules. Focused on reducing cognitive friction during high-stress same-day travel bookings.',
    metricLabel: 'Live Properties',
    metricValue: '4,000+ Hotels',
    tags: ['High-Velocity Ops', 'Mobile-First', 'Localization'],
    x: 76,
    y: 36,
    color: '#06b6d4',
    icon: <Building className="w-4 h-4 text-cyan-500" />,
  },
  {
    id: 'lastlook',
    year: '2024-Present',
    pinLabel: 'LastLook App',
    title: 'LastLook & Indie Craft',
    subtitle: 'From scratch to App Store recognition',
    story: 'Built my own iOS app to solve my ADHD memory struggles. Built it end-to-end, earned 400+ five-star reviews, and proved that passionate craft combined with deep personal pain creates products people adore.',
    metricLabel: 'App Store Rating',
    metricValue: '4.9 ★',
    tags: ['SwiftUI', 'Product Strategy', 'Community Love'],
    x: 68,
    y: 62,
    color: '#10b981',
    icon: <Award className="w-4 h-4 text-emerald-500" />,
  },
];

export const JourneyMap: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(4); // Default on MakeMyTrip (prominent milestone)

  const activeMilestone = MILESTONES[currentIndex];

  const handlePrev = () => {
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : MILESTONES.length - 1));
  };

  const handleNext = () => {
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev < MILESTONES.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="journey" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#faf9f5] border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
            Career Trajectory
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Engineer by degree, <br className="hidden sm:block" />
            <span className="text-blue-600">designer by obsession.</span>
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-medium">
            Interactive map tracing the journey from machine mechanics to high-scale digital interfaces.
          </p>
        </div>

        {/* Two-Column Interactive Display: Left Card + Right Interactive Heart/Trajectory Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Active Chapter Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xl relative overflow-hidden transition-all duration-300 min-h-[440px]">
            {/* Top Accent Pill */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-800 border border-stone-200">
                {activeMilestone.icon}
                <span>{activeMilestone.year}</span>
              </span>
              <span className="text-xs font-mono-code font-bold text-stone-400">
                Chapter {currentIndex + 1} of {MILESTONES.length}
              </span>
            </div>

            {/* Headline and Narrative */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug">
                {activeMilestone.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-stone-500 mt-1">
                {activeMilestone.subtitle}
              </p>

              <p className="mt-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                {activeMilestone.story}
              </p>
            </div>

            {/* Metric Callout Highlight */}
            {activeMilestone.metricValue && (
              <div className="my-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    {activeMilestone.metricLabel}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-mono-code">
                    {activeMilestone.metricValue}
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
                  style={{ backgroundColor: activeMilestone.color }}
                >
                  ✓
                </div>
              </div>
            )}

            {/* Tags & Milestone Navigation Controls */}
            <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {activeMilestone.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Step Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                  title="Previous Chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white transition-colors shadow-sm cursor-pointer"
                  title="Next Chapter"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Interactive Journey Route Map */}
          <div className="lg:col-span-7 relative bg-white/70 backdrop-blur-md rounded-3xl p-4 sm:p-8 border border-stone-200/80 shadow-lg flex flex-col items-center justify-center select-none">
            {/* Map title watermark */}
            <div className="absolute top-4 left-6 text-xs font-mono-code uppercase tracking-wider text-stone-400 font-bold">
              🗺 Career Route Map • Interactive
            </div>

            {/* SVG Interactive Canvas */}
            <div className="relative w-full aspect-[4/3] max-w-[540px]">
              <svg
                viewBox="0 0 500 400"
                className="w-full h-full overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background subtle road grid */}
                <path
                  d="M 50 100 Q 250 80 450 100 M 50 200 Q 250 180 450 200 M 50 300 Q 250 280 450 300"
                  stroke="#f1efe7"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Heart-Shaped / Looping Trajectory Line */}
                <path
                  d="M 240 330 C 130 300 70 200 120 120 C 160 60 230 80 250 140 C 270 80 340 60 380 120 C 430 200 370 300 260 330"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Animated active path highlight */}
                <path
                  d="M 240 330 C 130 300 70 200 120 120 C 160 60 230 80 250 140 C 270 80 340 60 380 120 C 430 200 370 300 260 330"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  className="opacity-70 animate-pulse"
                />

                {/* Current Active Indicator Glow on Map */}
                <circle
                  cx={activeMilestone.x * 5}
                  cy={activeMilestone.y * 4}
                  r="24"
                  fill={activeMilestone.color}
                  fillOpacity="0.18"
                  className="animate-ping"
                />
              </svg>

              {/* Interactive Milestone Pins placed over the map */}
              {MILESTONES.map((m, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      soundEngine.playPop();
                      setCurrentIndex(idx);
                    }}
                    style={{
                      left: `${m.x}%`,
                      top: `${m.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group z-30 transition-all duration-300 cursor-pointer ${
                      isActive ? 'scale-125 z-40' : 'hover:scale-115'
                    }`}
                  >
                    {/* Pin Graphic */}
                    <div className="relative flex flex-col items-center">
                      {/* Floating Pin Label */}
                      <span
                        className={`absolute -top-7 whitespace-nowrap text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-md border transition-all ${
                          isActive
                            ? 'bg-stone-900 text-white border-stone-800 scale-105'
                            : 'bg-white text-stone-700 border-stone-200 group-hover:bg-stone-100'
                        }`}
                      >
                        {m.pinLabel}
                      </span>

                      {/* Pin Marker with Icon */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all ${
                          isActive
                            ? 'ring-4 ring-blue-400/50 scale-110'
                            : 'opacity-85 group-hover:opacity-100'
                        }`}
                        style={{ backgroundColor: m.color }}
                      >
                        <div className="text-white text-xs font-bold">
                          {idx + 1}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Timeline Dots */}
            <div className="flex items-center gap-2 mt-4">
              {MILESTONES.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-7 bg-stone-900'
                      : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  title={m.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
