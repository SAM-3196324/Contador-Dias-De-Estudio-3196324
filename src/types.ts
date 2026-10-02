export interface DayRecord {
  dateString: string; // YYYY-MM-DD
  dayOfWeekShort: string; // LUN, MAR, MIÉ, JUE, VIE, SÁB, DOM
  dayOfWeekFull: string;
  dayNumber: number; // 1-31
  monthName: string; // Oct, Nov...
  isToday: boolean;
  isStudied: boolean;
  timestamp?: number;
}

export interface StreakStats {
  currentStreak: number;
  maxStreak: number;
  totalDaysStudied: number;
  hasStudiedToday: boolean;
  lastStudyDate: string | null;
}

export interface MotivationalQuote {
  id: number;
  quote: string;
  author: string;
  tag?: string;
}
