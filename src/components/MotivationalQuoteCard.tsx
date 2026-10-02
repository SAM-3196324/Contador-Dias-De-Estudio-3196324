import React, { useState } from 'react';
import { Quote, RefreshCw } from 'lucide-react';
import { MotivationalQuote } from '../types';

interface MotivationalQuoteCardProps {
  quote: MotivationalQuote;
  onRefreshQuote: () => void;
}

export const MotivationalQuoteCard: React.FC<MotivationalQuoteCardProps> = ({
  quote,
  onRefreshQuote,
}) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);
    onRefreshQuote();
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0D111A] border border-slate-800/90 p-5 relative overflow-hidden group hover:border-[#00F0FF]/30 transition-all duration-300">
      {/* Ambient corner glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none blur-2xl opacity-10"
        style={{ background: '#00F0FF' }}
      />

      {/* Header with Title and Refresh Action */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#00F0FF]">
            MENSAJE MOTIVADOR
          </span>
          {quote.tag && (
            <span className="text-[10px] text-slate-400 font-mono">
              · {quote.tag}
            </span>
          )}
        </div>

        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-lg text-slate-400 hover:text-[#00FF88] hover:bg-slate-800/60 active:scale-95 transition-all cursor-pointer"
          title="Cambiar a otra frase motivadora"
          aria-label="Cambiar mensaje motivador"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 transition-transform duration-500 ${
              isRotating ? 'rotate-180 text-[#00FF88]' : ''
            }`}
          />
        </button>
      </div>

      {/* Quote text */}
      <div className="relative z-10">
        <p className="text-slate-100 text-sm md:text-base font-medium leading-relaxed italic">
          “{quote.quote}”
        </p>
        <p className="text-right text-xs font-semibold text-[#00FF88] mt-2.5">
          — {quote.author}
        </p>
      </div>
    </div>
  );
};
