import React, { useState } from 'react';
import { Calendar, Mail, Check, ArrowUpRight, Github, Twitter, Linkedin, Instagram, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface FooterCTAProps {
  onBookCall: () => void;
}

export const FooterCTA: React.FC<FooterCTAProps> = ({ onBookCall }) => {
  const [copied, setCopied] = useState(false);
  const email = 'harekamk@gmail.com';

  const handleCopyEmail = () => {
    soundEngine.playPop();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="relative w-full pt-20 sm:pt-28 pb-32 sm:pb-36 px-4 sm:px-6 bg-gradient-to-b from-[#faf9f5] via-[#e0f2fe] to-[#bae6fd] overflow-hidden text-center">
      {/* Decorative cloud shapes in background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-[10%] w-72 h-32 bg-white rounded-full blur-2xl" />
        <div className="absolute top-32 right-[15%] w-96 h-40 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-stone-800 text-xs sm:text-sm font-semibold border border-white/60 shadow-sm mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Available for select design roles & consulting</span>
        </div>

        {/* Big Catchphrase */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-900 tracking-tight leading-[1.15]">
          Let's make something <br />
          <span className="text-blue-700 underline decoration-amber-400 decoration-wavy decoration-3">
            nobody rage quits.
          </span>
        </h2>

        <p className="mt-5 text-base sm:text-lg text-stone-700 max-w-xl mx-auto font-medium leading-relaxed">
          Whether you need a zero-to-one product architecture, conversion optimization, or a 1:1 portfolio mentorship session—my inbox is always open.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => {
              soundEngine.playPop();
              onBookCall();
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-stone-950 text-white font-bold text-sm sm:text-base hover:bg-stone-800 transition-all shadow-xl active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Book a 1:1 Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-stone-900 font-bold text-sm sm:text-base border border-stone-200/90 shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-stone-500" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Social Icons Bar */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundEngine.playClick()}
            className="p-3 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 border border-white/60 shadow-xs transition-all hover:scale-110 active:scale-95"
            title="Twitter / X"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/harekam-kaur-348849301/"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundEngine.playClick()}
            className="p-3 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 border border-white/60 shadow-xs transition-all hover:scale-110 active:scale-95"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/harekam_28"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundEngine.playClick()}
            className="p-3 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 border border-white/60 shadow-xs transition-all hover:scale-110 active:scale-95"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundEngine.playClick()}
            className="p-3 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 border border-white/60 shadow-xs transition-all hover:scale-110 active:scale-95"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Footer Bottom Note */}
        <div className="mt-12 pt-6 border-t border-stone-300/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-code text-stone-600 gap-2">
          <span>© 2026 Harekam Kaur • All rights reserved</span>
          <span className="flex items-center gap-1.5">
            <span>Crafted with passion, React & TypeScript</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </span>
        </div>
      </div>
    </footer>
  );
};
