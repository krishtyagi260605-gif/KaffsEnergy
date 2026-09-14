import React, { useState } from 'react';
import { Gamepad2, Code, Dumbbell, Car, GraduationCap, Zap, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

export default function ActivityCalculator() {
  const [selectedActivity, setSelectedActivity] = useState('coding');

  const activities = {
    coding: {
      id: 'coding',
      title: 'Late-Night Coding / AI Sprint',
      icon: Code,
      recommendation: "KAFF'S Energy (1-2 Strips • 40-80mg)",
      stripsCount: '1 Strip per 3-4 Hour Sprint',
      caffeineEq: '1 Strong Espresso Shot',
      timeSaved: '0 Restroom Breaks / Fluid Bloat',
      caloriesSaved: '180 kcal (vs Coffee Latte)',
      kickSpeed: '5 Mins',
      desc: 'Bypasses stomach digestion so your mind enters flow state immediately without coffee mug distractions or liquid bloating.',
    },
    gaming: {
      id: 'gaming',
      title: 'Competitive Gaming / Ranked Stream',
      icon: Gamepad2,
      recommendation: "KAFF'S Energy (1 Strip • 40mg)",
      stripsCount: '1 Strip Before Match',
      caffeineEq: '1 Red Bull Can Equivalent',
      timeSaved: 'Zero Pause / No Spill Risk',
      caloriesSaved: '220 kcal (vs Sugary Energy Drinks)',
      kickSpeed: '5 Mins',
      desc: 'Sublingual delivery sharpens reaction times and mouse control without shaky hands or sudden sugar drops midway.',
    },
    workout: {
      id: 'workout',
      title: 'Pre-Workout & Gym Session',
      icon: Dumbbell,
      recommendation: "KAFF'S Energy (2 Strips • 80mg)",
      stripsCount: '2 Strips 10 Mins Pre-Gym',
      caffeineEq: '1 Scoop Pre-Workout Powder',
      timeSaved: 'No Water Shaker Needed',
      caloriesSaved: '120 kcal',
      kickSpeed: '5 Mins',
      desc: 'Get immediate central nervous system stimulation and muscle alertness without carrying bulky liquid shakers.',
    },
    drive: {
      id: 'drive',
      title: 'Highway Night Drive',
      icon: Car,
      recommendation: "KAFF'S Energy (1 Strip • 40mg)",
      stripsCount: '1 Strip Every 3-4 Hours',
      caffeineEq: '1 Fresh Brewed Coffee',
      timeSaved: 'Fewer Highway Pitstops',
      caloriesSaved: '150 kcal',
      kickSpeed: '5 Mins',
      desc: 'Instant wakefulness right at the wheel. Pocket-friendly foil pack stays easily accessible in your dashboard or wallet.',
    },
    exam: {
      id: 'exam',
      title: 'College Exam All-Nighter',
      icon: GraduationCap,
      recommendation: "KAFF'S Energy (1 Strip • 40mg)",
      stripsCount: '1 Strip for Sustained Memory Retention',
      caffeineEq: '1 Filter Coffee',
      timeSaved: '30 Mins Prep Time',
      caloriesSaved: '140 kcal',
      kickSpeed: '5 Mins',
      desc: 'Precisely metered 40mg dose maintains calm, laser-sharp memory retention without overwhelming heart palpitations.',
    },
  };

  const current = activities[selectedActivity];
  const IconComponent = current.icon;

  return (
    <section id="calculator" className="py-24 bg-[#030508] border-t border-cyan-500/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frost-pill border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest glow-ice-sm">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Personalized 40mg Dosage Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            WHAT ARE YOU POWERING UP FOR?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Calculate your exact KAFF'S strip dosage based on your task, mental intensity, and timing requirements.
          </p>
        </div>

        {/* Activity Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {Object.values(activities).map((act) => {
            const Icon = act.icon;
            const isSelected = selectedActivity === act.id;
            return (
              <button
                key={act.id}
                onClick={() => setSelectedActivity(act.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 shadow-lg shadow-cyan-500/25 glow-ice-sm'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{act.title.split('/')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Dosage Card */}
        <div className="max-w-4xl mx-auto frost-card rounded-3xl p-8 sm:p-10 border border-cyan-500/30 relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold">
                Recommended Routine
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                {current.recommendation}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {current.desc}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  {current.stripsCount}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Kicks in {current.kickSpeed}
                </span>
              </div>
            </div>

            {/* Right Column Metrics */}
            <div className="lg:col-span-5 space-y-3 bg-slate-950/70 p-6 rounded-2xl border border-cyan-500/20">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Caffeine Equivalent:</span>
                <span className="font-bold text-white">{current.caffeineEq}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Time Saved:</span>
                <span className="font-bold text-cyan-300">{current.timeSaved}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Calories Saved:</span>
                <span className="font-bold text-emerald-400">{current.caloriesSaved}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800 font-mono">
                <span className="text-slate-400">Pack Available:</span>
                <span className="text-cyan-400 font-bold">Pack of 5 / 10</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
