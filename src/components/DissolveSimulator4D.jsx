import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Zap, Sparkles, Activity, ShieldCheck, HeartPulse, Droplets } from 'lucide-react';
import { soundFX } from '../utils/audioFX';

export default function DissolveSimulator4D() {
  const [step, setStep] = useState(0); // 0: Place, 1: 3s Dissolve, 2: 5-Min Capillary Entry, 3: 100% Focus
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setStep(3);
            soundFX.playPowerUp();
            return 100;
          }
          const next = prev + 2;
          if (next === 20) setStep(1);
          if (next === 60) setStep(2);
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStart = () => {
    soundFX.playClick();
    setProgress(0);
    setStep(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    soundFX.playClick();
    setProgress(0);
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <section id="dissolve" className="py-24 bg-[#030508] relative overflow-hidden border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frost-pill border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest glow-ice-sm">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            4D Sublingual Absorption Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            HOW 40mg COOL MINT DISSOLVES
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Unlike caffeine drinks or pills that take 45+ minutes to digest through the stomach, KAFF'S oral strips enter your bloodstream directly through oral capillaries in 5 minutes.
          </p>
        </div>

        {/* Interactive Simulator Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto frost-card p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/40">
          
          {/* Left: Interactive Controls & Telemetry */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                LIVE ABSORPTION TELEMETRY
              </span>
              <h3 className="text-2xl font-black font-heading text-white">
                {step === 0 && 'Step 1: Place 40mg Strip On Tongue'}
                {step === 1 && 'Step 2: 3-Second Contact Dissolve'}
                {step === 2 && 'Step 3: 5-Min Capillary Entry'}
                {step === 3 && 'Step 4: Instant Energy & Sharper Focus Unlocked!'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step === 0 && 'Place the paper-thin Cool Mint strip directly onto your tongue. No water required.'}
                {step === 1 && 'Oral saliva breaks down the thin film polymer matrix in exactly 3 seconds.'}
                {step === 2 && 'Sublingual oral capillaries absorb micro-caffeine particles directly into the bloodstream.'}
                {step === 3 && 'Instant Energy, Sharper Focus, and Clearer Mind achieved with zero stomach acidity, zero jitters, and zero sugar.'}
              </p>
            </div>

            {/* Progress Telemetry Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-bold text-slate-300">
                <span>Bloodstream Absorption Level:</span>
                <span className="text-cyan-400">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-cyan-500/30">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 rounded-full transition-all duration-100 shadow-[0_0_12px_#00F0FF]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleStart}
                disabled={isPlaying}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-black font-black text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPlaying ? 'SIMULATING ABSORPTION...' : 'START 4D SIMULATION'}</span>
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-3.5 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs uppercase tracking-wider border border-slate-800 hover:text-white flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RESET</span>
              </button>
            </div>

          </div>

          {/* Right: Visual Capillary Visualizer */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-slate-950/80 rounded-2xl border border-cyan-500/30 relative min-h-[280px]">
            <div className="relative w-48 h-48 flex items-center justify-center">
              
              {/* Outer Pulsing Vascular Ring */}
              <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                progress > 50 ? 'border-cyan-400/80 animate-ping' : 'border-slate-800'
              }`} />

              {/* Central Neural Sphere */}
              <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-500 ${
                progress === 100
                  ? 'bg-gradient-to-tr from-cyan-400 to-sky-400 text-black glow-ice scale-110'
                  : 'bg-slate-900 border border-cyan-500/50 text-cyan-400'
              }`}>
                <Zap className="w-8 h-8 fill-current mb-1" />
                <span className="text-xs font-black font-mono tracking-widest uppercase">
                  {progress === 100 ? 'PEAK FOCUS' : `${progress}%`}
                </span>
                <span className="text-[9px] font-mono opacity-85 font-bold">
                  {progress === 100 ? '40mg ACTIVE' : 'SUBLINGUAL'}
                </span>
              </div>

            </div>

            <div className="mt-4 text-[11px] font-mono text-cyan-300 text-center">
              {progress === 100 ? '⚡ Peak Alertness Active • Zero Sugar Bloat' : 'Simulating sublingual mucosal permeation'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
