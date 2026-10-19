import React, { useState, useEffect } from 'react';
import { Plus, X, Heart, MessageSquare, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Note {
  id: string;
  name: string;
  role?: string;
  message: string;
  color: 'yellow' | 'pink' | 'purple' | 'green' | 'blue';
  rotate: number;
  timestamp: string;
  likes: number;
}

const DEFAULT_NOTES: Note[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Staff Product Designer @ Stripe',
    message: 'This portfolio is insanely good! Love the interactive heart trajectory and the tactile card box. So much craft.',
    color: 'yellow',
    rotate: -2,
    timestamp: '2 hours ago',
    likes: 14,
  },
  {
    id: '2',
    name: 'Alex Rivera',
    role: 'Founder @ EarlyStage',
    message: 'Rare to see an engineer-turned-designer with this much taste and commercial intuition. Booked a call for our Q4 redesign!',
    color: 'pink',
    rotate: 2,
    timestamp: 'Yesterday',
    likes: 9,
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Product Lead @ MakeMyTrip alumni',
    message: 'Can confirm the Coupon Hunter impact was legendary! Proud to see your journey mapped out so beautifully.',
    color: 'purple',
    rotate: -1,
    timestamp: '3 days ago',
    likes: 22,
  },
  {
    id: '4',
    name: 'Liam Vance',
    role: 'iOS Developer',
    message: 'Just downloaded LastLook from the App Store. The geofence trigger is seamless. Great work on the micro-interactions!',
    color: 'green',
    rotate: 3,
    timestamp: 'Oct 2026',
    likes: 7,
  },
  {
    id: '5',
    name: 'Elena Rostova',
    role: 'Design Director',
    message: 'The sound effects and lofi Rhodes chords playing while browsing are such an incredible touch. Never rage-quitting this site!',
    color: 'blue',
    rotate: -2,
    timestamp: 'Oct 2026',
    likes: 18,
  },
];

const COLOR_MAP = {
  yellow: {
    bg: 'bg-[#fef08a]',
    border: 'border-amber-300',
    pin: 'bg-red-500',
    text: 'text-amber-950',
  },
  pink: {
    bg: 'bg-[#fce7f3]',
    border: 'border-pink-300',
    pin: 'bg-purple-600',
    text: 'text-pink-950',
  },
  purple: {
    bg: 'bg-[#f3e8ff]',
    border: 'border-purple-300',
    pin: 'bg-indigo-600',
    text: 'text-purple-950',
  },
  green: {
    bg: 'bg-[#dcfce7]',
    border: 'border-emerald-300',
    pin: 'bg-amber-500',
    text: 'text-emerald-950',
  },
  blue: {
    bg: 'bg-[#e0f2fe]',
    border: 'border-sky-300',
    pin: 'bg-blue-600',
    text: 'text-sky-950',
  },
};

export const GuestbookWall: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(DEFAULT_NOTES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'pink' | 'purple' | 'green' | 'blue'>('yellow');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jc_guestbook_notes');
      if (saved) {
        setNotes(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    soundEngine.playPop();

    const newNote: Note = {
      id: Date.now().toString(),
      name: name.trim(),
      role: role.trim() || 'Visitor',
      message: message.trim(),
      color: selectedColor,
      rotate: Math.floor(Math.random() * 6) - 3,
      timestamp: 'Just now',
      likes: 1,
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    try {
      localStorage.setItem('jc_guestbook_notes', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setName('');
    setRole('');
    setMessage('');
    setIsModalOpen(false);
  };

  const handleLike = (id: string) => {
    soundEngine.playClick();
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n))
    );
  };

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#faf9f5] border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 text-stone-700 text-xs font-semibold tracking-wider uppercase mb-3">
              Community Guestbook
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
              Before you leave, <br className="hidden sm:block" />
              <span className="text-amber-600">leave a note.</span>
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base font-medium max-w-lg">
              Drop a thought, feedback on the site, or just say hello. It goes right onto this wall!
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playPop();
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Leave a Note</span>
          </button>
        </div>

        {/* Sticky Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => {
            const conf = COLOR_MAP[note.color];
            return (
              <div
                key={note.id}
                style={{ transform: `rotate(${note.rotate}deg)` }}
                className={`p-6 rounded-sm ${conf.bg} border ${conf.border} shadow-lg hover:shadow-xl hover:rotate-0 hover:scale-[1.02] transition-all duration-300 relative select-none flex flex-col justify-between min-h-[220px]`}
              >
                {/* Pushpin at top */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${conf.pin} shadow-md border border-white`}
                />

                <div>
                  <p className={`font-handwriting text-xl sm:text-2xl ${conf.text} leading-snug font-bold`}>
                    “{note.message}”
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-black/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-stone-900">{note.name}</h4>
                    {note.role && (
                      <span className="text-[10px] text-stone-600 font-medium block truncate max-w-[160px]">
                        {note.role}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-code text-stone-400">
                      {note.timestamp}
                    </span>
                    <button
                      onClick={() => handleLike(note.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono-code text-stone-700 bg-white/60 hover:bg-white px-2 py-0.5 rounded-full border border-black/5 cursor-pointer transition-colors"
                      title="Like this note"
                    >
                      <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                      <span>{note.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leave Note Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsModalOpen(false);
                }}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-5">
                <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-amber-600">
                  Sticky Note
                </span>
                <h3 className="text-2xl font-extrabold text-stone-900">Leave your mark on the wall</h3>
              </div>

              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Role / Company (Optional)</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Product Designer @ Startup"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Note *</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Say hello, share feedback on the site, or mention your favorite detail..."
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-handwriting text-lg"
                  />
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">Pick Sticky Color</label>
                  <div className="flex items-center gap-3">
                    {(['yellow', 'pink', 'purple', 'green', 'blue'] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full transition-all cursor-pointer ${
                          COLOR_MAP[c].bg
                        } border-2 ${
                          selectedColor === c ? 'ring-2 ring-stone-900 scale-110' : 'opacity-80'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-stone-600 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Stick to Wall 📌
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
