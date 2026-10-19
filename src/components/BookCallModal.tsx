import React, { useState } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('portfolio');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 3:00 PM (PST)');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playPop();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const CALL_TYPES = [
    {
      id: 'portfolio',
      title: '1:1 Design Deep Dive',
      duration: '45 mins',
      desc: 'Portfolio teardown, design critique, and career trajectory strategy.',
      badge: 'Popular',
    },
    {
      id: 'hire',
      title: 'Project / Role Discovery',
      duration: '30 mins',
      desc: 'Discussing full-time product roles, 0-to-1 MVP builds, or design advisory.',
      badge: 'High Priority',
    },
    {
      id: 'coffee',
      title: 'Casual Virtual Coffee',
      duration: '20 mins',
      desc: 'Say hello, swap design war stories, or talk indie hacking & LastLook.',
      badge: 'Cozy',
    },
  ];

  const TIME_SLOTS = [
    'Tomorrow, 10:00 AM (PST)',
    'Tomorrow, 3:00 PM (PST)',
    'Thursday, 11:30 AM (PST)',
    'Friday, 2:00 PM (PST)',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500">
                Direct Calendar Booking
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Schedule a 1:1 chat with Harekam Kaur
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Select the purpose of our conversation below.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Call Type Cards */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Select Call Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {CALL_TYPES.map((type) => {
                    const isSelected = selectedType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedType(type.id);
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/30'
                            : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono-code font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                              {type.duration}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-stone-900 leading-snug">
                            {type.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-2 line-clamp-2 leading-tight">
                          {type.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Available Slots
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedSlot(slot);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer flex items-center justify-between ${
                        selectedSlot === slot
                          ? 'bg-stone-900 text-white border-stone-800'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </span>
                      {selectedSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  What would you like to cover?
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Tell me a bit about your product, challenges, or goals..."
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono-code text-stone-400">
                  ✦ Google Meet invite will be sent
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-950 text-white font-bold text-xs sm:text-sm hover:bg-stone-800 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Confirm Booking</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-stone-900">You're on the calendar!</h3>
            <p className="mt-2 text-stone-600 text-sm max-w-sm mx-auto">
              Thanks <strong className="text-stone-900">{name || 'friend'}</strong>! A Google Meet invite has been dispatched to{' '}
              <strong className="text-stone-900">{email || 'your email'}</strong> for{' '}
              <span className="text-blue-600 font-bold">{selectedSlot}</span>.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 max-w-sm mx-auto text-left text-xs text-amber-900 font-medium">
              💡 <strong>Prep tip:</strong> Feel free to reply to the calendar invite with any Figma links or slide decks you want me to review in advance.
            </div>

            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer"
            >
              Back to Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
