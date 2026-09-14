import React from 'react';

export default function SupremeLogo({ size = 'normal', className = '' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <div className={`inline-flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      {/* Electric Ice-Blue Shield & Lightning Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-cyan-400/50 via-cyan-500/20 to-sky-400/40 blur-md group-hover:scale-110 transition-transform duration-500" />
        
        <div className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-b from-slate-900 via-[#060B14] to-[#02050A] border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:border-cyan-400 transition-colors">
          {/* Glowing Vector Lightning Bolt */}
          <svg
            className="w-6 h-6 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(0,240,255,0.9)] group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
          </svg>
        </div>
      </div>

      {/* Brand Typographic Identity: KAFF'S ⚡ ENERGY */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-black font-heading tracking-wider uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
            isLarge ? 'text-2xl sm:text-3xl' : isSmall ? 'text-lg' : 'text-xl sm:text-2xl'
          }`}>
            KAFF'S
          </span>
          <span className="text-cyan-400 font-black text-base sm:text-lg animate-pulse filter drop-shadow-[0_0_6px_#00F0FF]">
            ⚡
          </span>
          <span className={`font-black font-heading tracking-wider uppercase bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent filter drop-shadow-[0_0_12px_rgba(0,240,255,0.6)] ${
            isLarge ? 'text-2xl sm:text-3xl' : isSmall ? 'text-lg' : 'text-xl sm:text-2xl'
          }`}>
            ENERGY
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[9px] font-mono tracking-[0.22em] text-cyan-400/80 uppercase font-bold">
            40mg COOL MINT STRIPS
          </span>
        </div>
      </div>
    </div>
  );
}
