import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  Code2, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { StreakStats, DayRecord, MotivationalQuote } from './types';
import { getRandomQuote } from './data/quotes';
import { 
  loadStudyDates, 
  saveStudyDates, 
  formatLocalDate, 
  calculateStreakStats, 
  getLast7Days, 
  playNeonCelebrationSound, 
  triggerHapticFeedback,
  subDays 
} from './utils/streakUtils';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { StreakHero } from './components/StreakHero';
import { StudyActionButton } from './components/StudyActionButton';
import { MotivationalQuoteCard } from './components/MotivationalQuoteCard';
import { SevenDaysList } from './components/SevenDaysList';
import { KotlinCodeModal } from './components/KotlinCodeModal';
import { AndroidNavBar } from './components/AndroidNavBar';

export default function App() {
  const [studyDates, setStudyDates] = useState<string[]>([]);
  const [quote, setQuote] = useState<MotivationalQuote>(() => getRandomQuote());
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(() => {
    return localStorage.getItem('racha_sound_muted') === 'true';
  });
  const [isKotlinModalOpen, setIsKotlinModalOpen] = useState<boolean>(false);
  const [showQuickSettings, setShowQuickSettings] = useState<boolean>(false);

  // Initialize data from localStorage on mount
  useEffect(() => {
    const stored = loadStudyDates();
    setStudyDates(stored);
  }, []);

  // Compute derived streak stats & last 7 days
  const stats: StreakStats = calculateStreakStats(studyDates);
  const sevenDays: DayRecord[] = getLast7Days(studyDates);

  // Primary Action: "Hoy sí estudié"
  const handleStudyToday = useCallback(() => {
    const todayStr = formatLocalDate(new Date());
    if (studyDates.includes(todayStr)) return;

    const newDates = [...studyDates, todayStr];
    setStudyDates(newDates);
    saveStudyDates(newDates);

    // Motivational Quote change
    setQuote(getRandomQuote(quote.id));

    // Audio & Haptic
    if (!isSoundMuted) {
      playNeonCelebrationSound();
    }
    triggerHapticFeedback();

    // Neon Confetti
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#00FF88', '#00F0FF', '#FFB800', '#FFFFFF', '#05FFA1'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
  }, [studyDates, quote.id, isSoundMuted]);

  // Undo today action
  const handleUndoToday = useCallback(() => {
    const todayStr = formatLocalDate(new Date());
    const newDates = studyDates.filter(d => d !== todayStr);
    setStudyDates(newDates);
    saveStudyDates(newDates);
  }, [studyDates]);

  // Interactive toggle for any of the 7 days (allows user corrections)
  const handleToggleDay = useCallback((dateString: string) => {
    const exists = studyDates.includes(dateString);
    let newDates: string[];
    if (exists) {
      newDates = studyDates.filter(d => d !== dateString);
    } else {
      newDates = [...studyDates, dateString];
      if (!isSoundMuted) playNeonCelebrationSound();
      triggerHapticFeedback();
    }
    setStudyDates(newDates);
    saveStudyDates(newDates);
  }, [studyDates, isSoundMuted]);

  // Change quote manually
  const handleRefreshQuote = useCallback(() => {
    setQuote(getRandomQuote(quote.id));
  }, [quote.id]);

  // Toggle sound
  const toggleSound = () => {
    const nextVal = !isSoundMuted;
    setIsSoundMuted(nextVal);
    localStorage.setItem('racha_sound_muted', String(nextVal));
  };

  // Demo: Seed consecutive days to preview streak
  const handleSeedDemoData = (daysCount: number) => {
    const now = new Date();
    const demoDates: string[] = [];
    for (let i = 0; i < daysCount; i++) {
      demoDates.push(formatLocalDate(subDays(now, i)));
    }
    setStudyDates(demoDates);
    saveStudyDates(demoDates);
    setShowQuickSettings(false);
    if (!isSoundMuted) playNeonCelebrationSound();
  };

  // Reset all data
  const handleResetData = () => {
    if (window.confirm('¿Seguro que deseas reiniciar tu registro de racha?')) {
      setStudyDates([]);
      saveStudyDates([]);
      localStorage.removeItem('racha_max_streak_v2');
      setShowQuickSettings(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06070A] text-slate-100 flex justify-center selection:bg-[#00FF88] selection:text-black">
      {/* Mobile Device Canvas Wrapper */}
      <div className="w-full max-w-md min-h-screen flex flex-col justify-between bg-[#08090C] border-x border-slate-900/80 shadow-2xl relative">
        
        {/* TOP: Android Status Bar */}
        <AndroidStatusBar />

        {/* APP TOP BAR: Brand "RACHA" and quick actions */}
        <header className="px-6 py-3.5 flex items-center justify-between border-b border-slate-900/60 bg-[#08090C]/90 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00FF88]/15 border border-[#00FF88]/40 flex items-center justify-center text-[#00FF88] shadow-[0_0_12px_rgba(0,255,136,0.3)]">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-display font-black text-xl tracking-[0.18em] text-white flex items-center gap-1.5">
                RACHA
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 tracking-normal">
                  v1.0
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsKotlinModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-[#00FF88]/20 border border-slate-700/60 hover:border-[#00FF88]/50 text-slate-300 hover:text-[#00FF88] text-xs font-medium transition-all"
              title="Ver código fuente en Kotlin y Jetpack Compose"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] font-semibold">Kotlin</span>
            </button>

            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title={isSoundMuted ? 'Activar sonido neón' : 'Silenciar sonido'}
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-[#00FF88]" />}
            </button>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 px-5 py-5 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-6">
          
          {/* 1. CONTADOR GRANDE DE DÍAS CONSECUTIVOS DE ESTUDIO */}
          <StreakHero stats={stats} />

          {/* 2. BOTÓN «HOY SÍ ESTUDIÉ» */}
          <StudyActionButton
            hasStudiedToday={stats.hasStudiedToday}
            onStudyToday={handleStudyToday}
            onUndoToday={handleUndoToday}
          />

          {/* 3. MENSAJE MOTIVADOR DISTINTO CADA VEZ */}
          <MotivationalQuoteCard
            quote={quote}
            onRefreshQuote={handleRefreshQuote}
          />

          {/* 4. LISTA DE LOS ÚLTIMOS SIETE DÍAS */}
          <SevenDaysList
            days={sevenDays}
            onToggleDay={handleToggleDay}
          />

          {/* APP GUARANTEES: Sin publicidad y sin conexión a internet */}
          <div className="rounded-2xl bg-[#090C12] border border-slate-800/80 p-4 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
              <span className="font-medium text-slate-300">100% Offline & Sin Publicidad</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Datos en el teléfono</span>
          </div>

          {/* Quick options menu toggle */}
          <div className="flex items-center justify-center gap-3 text-xs text-slate-400 pt-1">
            <button
              onClick={() => setShowQuickSettings(!showQuickSettings)}
              className="hover:text-slate-300 underline underline-offset-4 cursor-pointer"
            >
              {showQuickSettings ? 'Ocultar opciones de prueba' : 'Opciones de simulación y datos'}
            </button>
          </div>

          {/* Optional drawer for testing streaks */}
          {showQuickSettings && (
            <div className="rounded-2xl bg-[#0E131E] border border-slate-700/80 p-4 flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2">
              <span className="text-xs font-semibold text-slate-300">Simulación rápida de prueba:</span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleSeedDemoData(3)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-[#00FF88]/20 hover:text-[#00FF88] transition-colors"
                >
                  Probar racha 3 días
                </button>
                <button
                  onClick={() => handleSeedDemoData(7)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-[#00FF88]/20 hover:text-[#00FF88] transition-colors"
                >
                  Probar racha 7 días (Semana perfecta)
                </button>
                <button
                  onClick={handleResetData}
                  className="px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-xs text-red-300 hover:bg-red-900/50 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reiniciar a cero</span>
                </button>
              </div>
            </div>
          )}

          {/* Kotlin Code banner trigger */}
          <div 
            onClick={() => setIsKotlinModalOpen(true)}
            className="rounded-2xl bg-gradient-to-r from-[#00FF88]/10 via-[#00F0FF]/10 to-transparent border border-[#00FF88]/30 p-3.5 flex items-center justify-between cursor-pointer hover:border-[#00FF88]/60 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-[#00FF88]/40 flex items-center justify-center text-[#00FF88] group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5 text-[#00FF88]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-[#00FF88] transition-colors">
                  ¿Quieres compilar el APK en Android Studio?
                </p>
                <p className="text-[11px] text-slate-400">
                  Toca para ver el código Kotlin (Jetpack Compose) 100% completo
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#00F0FF] group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </div>

        </main>

        {/* BOTTOM: Android Navigation Bar */}
        <AndroidNavBar />

        {/* Kotlin & Jetpack Compose Modal */}
        <KotlinCodeModal
          isOpen={isKotlinModalOpen}
          onClose={() => setIsKotlinModalOpen(false)}
        />
      </div>
    </div>
  );
}
