import React from 'react';
import { Check, Flame, RotateCcw } from 'lucide-react';

interface StudyActionButtonProps {
  hasStudiedToday: boolean;
  onStudyToday: () => void;
  onUndoToday: () => void;
}

export const StudyActionButton: React.FC<StudyActionButtonProps> = ({
  hasStudiedToday,
  onStudyToday,
  onUndoToday,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      {hasStudiedToday ? (
        <div className="w-full">
          <div className="w-full h-16 rounded-2xl bg-[#0e161a] border-2 border-[#00FF88]/70 text-[#00FF88] flex items-center justify-center gap-3 px-6 shadow-lg shadow-[#00FF88]/10 transition-all select-none">
            <div className="w-7 h-7 rounded-full bg-[#00FF88]/20 flex items-center justify-center border border-[#00FF88]">
              <Check className="w-4 h-4 text-[#00FF88] stroke-[3]" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-wider text-neon-green">
              ¡HOY SÍ ESTUDIÉ!
            </span>
          </div>

          <div className="flex items-center justify-center mt-2">
            <button
              onClick={onUndoToday}
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-slate-800/40 transition-colors"
              title="Deshacer si fue un toque accidental"
            >
              <RotateCcw className="w-3 h-3" />
              <span>¿Toque por error? Deshacer registro de hoy</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={onStudyToday}
          className="relative group w-full h-16 rounded-2xl bg-[#00FF88] text-black font-display font-black text-xl md:text-2xl tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer shadow-xl transition-all duration-200 active:scale-[0.98] glow-button hover:bg-[#1aff96] select-none"
        >
          <Flame className="w-6 h-6 fill-black text-black group-hover:scale-110 transition-transform" />
          <span>«HOY SÍ ESTUDIÉ»</span>
        </button>
      )}
    </div>
  );
};
