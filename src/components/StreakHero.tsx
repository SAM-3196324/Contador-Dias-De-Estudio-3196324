import React from 'react';
import { Flame, Trophy, Sparkles } from 'lucide-react';
import { StreakStats } from '../types';

interface StreakHeroProps {
  stats: StreakStats;
}

export const StreakHero: React.FC<StreakHeroProps> = ({ stats }) => {
  const { currentStreak, maxStreak, hasStudiedToday } = stats;

  return (
    <div className="relative w-full rounded-3xl bg-[#0D1017] border border-[#00FF88]/30 p-6 md:p-8 overflow-hidden glow-green-box">
      {/* Background ambient neon radial gradient */}
      <div 
        className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #00FF88 0%, rgba(0,240,255,0.4) 60%, transparent 80%)' }}
      />
      <div 
        className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #00F0FF 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Top Flame Badge with animated neon pulse */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`p-2 rounded-2xl border transition-all duration-300 ${
            currentStreak > 0 
              ? 'bg-[#00FF88]/15 border-[#00FF88]/50 text-[#00FF88] animate-neon-pulse' 
              : 'bg-slate-800/40 border-slate-700 text-slate-500'
          }`}>
            <Flame className="w-7 h-7 fill-current" />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#00F0FF]">
            {currentStreak === 1 ? 'Día Consecutivo' : 'Días Consecutivos'}
          </span>
        </div>

        {/* Large Counter Display */}
        <div className="my-2 relative flex items-baseline justify-center">
          <span 
            className="font-display font-black text-8xl md:text-9xl tracking-tight font-mono-nums text-neon-green transition-all duration-500 scale-100"
          >
            {currentStreak}
          </span>
          <span className="text-2xl font-display font-bold text-[#00F0FF] ml-2 tracking-wide">
            {currentStreak === 1 ? 'DÍA' : 'DÍAS'}
          </span>
        </div>

        {/* Status text */}
        <div className="mt-1 flex items-center gap-2">
          {hasStudiedToday ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/40 text-[#00FF88] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>¡Racha activa y asegurada hoy!</span>
            </div>
          ) : currentStreak > 0 ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
              <span>Pendiente de registrar hoy para mantenerla</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700 text-slate-400 text-xs font-medium">
              <span>¡Comienza tu racha hoy estudiando!</span>
            </div>
          )}
        </div>

        {/* Record streak pill */}
        {maxStreak > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex items-center justify-between text-xs text-slate-400 px-2">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Récord personal:</span>
            </span>
            <span className="font-mono-nums font-bold text-slate-200">
              {maxStreak} {maxStreak === 1 ? 'día' : 'días'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
