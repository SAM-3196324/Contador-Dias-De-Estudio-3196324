import React, { useState, useEffect } from 'react';
import { WifiOff, BatteryCharging, Zap } from 'lucide-react';

export const AndroidStatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-between px-6 pt-3 pb-2 text-xs font-medium text-slate-300 select-none">
      {/* Time */}
      <span className="font-mono-nums font-semibold text-slate-200 tracking-tight">
        {timeStr}
      </span>

      {/* Camera cutout / punch hole pill */}
      <div className="h-3.5 w-12 bg-black/90 rounded-full border border-slate-800/80 shadow-inner flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/60" />
      </div>

      {/* System Icons: Offline / Battery */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-[11px] text-[#00F0FF] bg-[#00F0FF]/10 px-1.5 py-0.5 rounded border border-[#00F0FF]/30">
          <WifiOff className="w-3 h-3 text-[#00F0FF]" />
          <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">Offline</span>
        </div>
        <div className="flex items-center text-emerald-400">
          <Zap className="w-3 h-3 text-[#00FF88]" />
          <span className="font-mono-nums text-[11px] font-semibold text-slate-200 ml-0.5">100%</span>
        </div>
        <BatteryCharging className="w-4 h-4 text-[#00FF88]" />
      </div>
    </div>
  );
};
