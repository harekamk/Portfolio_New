import React, { useState } from 'react';
import { Activity, Users, Lightbulb, Eye, CheckCircle2, Repeat } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface PhilosophyNode {
  id: string;
  type: 'Quantitative' | 'Qualitative';
  title: string;
  shortDesc: string;
  quote: string;
  icon: React.ReactNode;
  color: string;
  x: number; // percentage along the curve
  y: number; // vertical position on curve
}

const NODES: PhilosophyNode[] = [
  {
    id: '1',
    type: 'Quantitative',
    title: 'Data & Telemetry Audit',
    shortDesc: 'Numbers tell you WHERE users fall off.',
    quote: 'Before sketching a single wireframe, inspect the funnel drop-offs, event telemetry, and session rage-clicks.',
    icon: <Activity className="w-4 h-4 text-blue-500" />,
    color: '#3b82f6',
    x: 8,
    y: 25,
  },
  {
    id: '2',
    type: 'Qualitative',
    title: 'Customer Empathy Deep Dives',
    shortDesc: 'Humans tell you WHY they rage-quit.',
    quote: 'Data reveals the symptom, but only 1:1 customer observation reveals the emotional friction.',
    icon: <Users className="w-4 h-4 text-amber-500" />,
    color: '#f59e0b',
    x: 25,
    y: 75,
  },
  {
    id: '3',
    type: 'Quantitative',
    title: 'Atomic Prototype Hypotheses',
    shortDesc: 'Fast prototypes beat boardroom opinions.',
    quote: 'Build clickable interactive prototypes in hours, not weeks. Test concrete interactions immediately.',
    icon: <Lightbulb className="w-4 h-4 text-purple-500" />,
    color: '#8b5cf6',
    x: 42,
    y: 25,
  },
  {
    id: '4',
    type: 'Qualitative',
    title: 'Unmoderated Usability Testing',
    shortDesc: 'Listen to the sighs and hesitant clicks.',
    quote: 'Watch where users hesitate. If a microcopy label makes someone pause for 2 seconds, simplify it.',
    icon: <Eye className="w-4 h-4 text-rose-500" />,
    color: '#f43f5e',
    x: 58,
    y: 75,
  },
  {
    id: '5',
    type: 'Quantitative',
    title: 'High-Impact Production Polish',
    shortDesc: 'Craft is how trust is earned.',
    quote: 'Deliver pixel-perfect components with accessible contrast, instant load times, and fluid haptics.',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    color: '#10b981',
    x: 75,
    y: 25,
  },
  {
    id: '6',
    type: 'Qualitative',
    title: 'Customer Love & Retention Loop',
    shortDesc: 'A shipped feature is just step zero.',
    quote: 'Watch real customer reviews, NPS sentiment, and long-term cohort retention to feed the next cycle.',
    icon: <Repeat className="w-4 h-4 text-cyan-500" />,
    color: '#06b6d4',
    x: 92,
    y: 75,
  },
];

export const DesignPhilosophy: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<PhilosophyNode>(NODES[0]);

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#faf9f5] border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
            Design Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            I start with the numbers, <br className="hidden sm:block" />
            <span className="text-blue-600">then go find the people.</span>
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base font-medium">
            Great products balance quantitative data rigor with genuine human observation.
          </p>
        </div>

        {/* Interactive Sine Wave Curve Display */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl overflow-hidden">
          {/* Top Axis Labels */}
          <div className="flex items-center justify-between text-xs font-mono-code font-bold uppercase tracking-wider text-stone-400 mb-8 border-b border-stone-100 pb-3">
            <span className="text-blue-600">▲ Quantitative Data (Where)</span>
            <span className="text-amber-600">▼ Qualitative Empathy (Why)</span>
          </div>

          {/* SVG Sine Wave Path */}
          <div className="relative w-full h-[180px] sm:h-[220px]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Center baseline */}
              <line
                x1="0"
                y1="100"
                x2="1000"
                y2="100"
                stroke="#e2e8f0"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Sine Wave Curve */}
              <path
                d="M 0 100 C 80 20, 160 20, 250 100 C 340 180, 420 180, 500 100 C 580 20, 660 20, 750 100 C 840 180, 920 180, 1000 100"
                stroke="#cbd5e1"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Glowing active animated overlay */}
              <path
                d="M 0 100 C 80 20, 160 20, 250 100 C 340 180, 420 180, 500 100 C 580 20, 660 20, 750 100 C 840 180, 920 180, 1000 100"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="animate-pulse opacity-75"
              />
            </svg>

            {/* Interactive Nodes Placed Along the Wave */}
            {NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    soundEngine.playPop();
                    setSelectedNode(node);
                  }}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 cursor-pointer ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Node Dot / Badge */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white transition-all ${
                        isSelected ? 'ring-4 ring-blue-400/40 scale-110' : 'opacity-90'
                      }`}
                      style={{ backgroundColor: node.color }}
                    >
                      <div className="text-white">{node.icon}</div>
                    </div>

                    {/* Step label pill */}
                    <span
                      className={`mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap shadow-xs transition-colors ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-800'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      {node.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Card at Bottom */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                style={{ backgroundColor: selectedNode.color }}
              >
                {selectedNode.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500">
                    {selectedNode.type} Phase
                  </span>
                </div>
                <h4 className="text-lg font-extrabold text-stone-900">{selectedNode.title}</h4>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5">{selectedNode.quote}</p>
              </div>
            </div>

            <div className="shrink-0 font-handwriting text-xl text-stone-800 font-bold bg-white px-3.5 py-1.5 rounded-xl border border-stone-200 shadow-xs">
              “{selectedNode.shortDesc}”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
