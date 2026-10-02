import React from 'react';
import { Check, Calendar } from 'lucide-react';
import { DayRecord } from '../types';

interface SevenDaysListProps {
  days: DayRecord[];
  onToggleDay: (dateString: string) => void;
}

export const SevenDaysList: React.FC<SevenDaysListProps> = ({ days, onToggleDay }) => {
  const completedCount = days.filter(d => d.isStudied).length;

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Header of the list with 7-day completion count */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#00F0FF]" />
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#00F0FF]">
            ÚLTIMOS 7 DÍAS
          </h2>
        </div>
        <span className="font-mono-nums text-xs font-semibold text-slate-400">
          <span className="text-neon-green font-bold">{completedCount}</span> / 7 completados
        </span>
      </div>

      {/* 7 Days List Container */}
      <div className="flex flex-col gap-2">
        {days.map((day) => {
          const isDone = day.isStudied;
          const isToday = day.isToday;

          return (
            <div
              key={day.dateString}
              onClick={() => onToggleDay(day.dateString)}
              className={`group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isDone
                  ? 'bg-[#0E151A] border-[#00FF88]/40 shadow-sm shadow-[#00FF88]/10 hover:border-[#00FF88]/70'
                  : isToday
                  ? 'bg-[#10141D] border-[#00F0FF]/40 hover:border-[#00F0FF]/70'
                  : 'bg-[#0B0D13] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Left slot: Day of week indicator badge & date details */}
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-display transition-all ${
                    isDone
                      ? 'bg-[#00FF88]/20 border border-[#00FF88] text-[#00FF88] shadow-[0_0_10px_rgba(0,255,136,0.3)]'
                      : isToday
                      ? 'bg-[#00F0FF]/15 border border-[#00F0FF]/50 text-[#00F0FF]'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-wider leading-none">
                    {day.dayOfWeekShort}
                  </span>
                  <span className="text-sm font-black font-mono-nums leading-tight mt-0.5">
                    {day.dayNumber}
                  </span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-slate-200'}`}>
                      {day.dayOfWeekFull} {day.dayNumber} de {day.monthName}
                    </span>
                    {isToday && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF]">
                        Hoy
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">
                    {isDone ? (
                      <span className="text-emerald-400 font-medium">Estudio registrado</span>
                    ) : isToday ? (
                      <span className="text-amber-400/90 font-medium">Pendiente de completar hoy</span>
                    ) : (
                      <span className="text-slate-400">Sin registro</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Right slot: Neon Checkmark or Checkbox */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-[#00FF88] text-black shadow-[0_0_12px_rgba(0,255,136,0.5)]'
                    : isToday
                    ? 'border-2 border-dashed border-[#00F0FF]/60 text-transparent hover:border-[#00F0FF]'
                    : 'border border-slate-700/80 bg-slate-900/60 text-transparent group-hover:border-slate-600'
                }`}
              >
                <Check className={`w-4 h-4 stroke-[3] ${isDone ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
