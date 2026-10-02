import React from 'react';

export const AndroidNavBar: React.FC = () => {
  return (
    <div className="w-full h-8 flex items-center justify-center select-none opacity-80 hover:opacity-100 transition-opacity">
      {/* Modern Android Gesture Bar */}
      <div className="w-32 h-1 bg-slate-600 rounded-full hover:bg-slate-400 transition-colors" />
    </div>
  );
};
