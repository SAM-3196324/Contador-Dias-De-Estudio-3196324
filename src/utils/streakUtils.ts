import { DayRecord, StreakStats } from '../types';

const STORAGE_KEY = 'racha_study_dates_v2';
const MAX_STREAK_KEY = 'racha_max_streak_v2';
const SOUND_MUTED_KEY = 'racha_sound_muted';

/**
 * Returns date in YYYY-MM-DD using local timezone
 */
export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses YYYY-MM-DD back into local Date object
 */
export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Subtracts n days from a given date
 */
export function subDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

/**
 * Loads stored study dates from localStorage
 */
export function loadStudyDates(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with some recent activity for first-time experience if empty?
      // Wait, let's start with a clean state, or if the user is testing we can provide demo toggle.
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading study dates from localStorage', e);
    return [];
  }
}

/**
 * Saves study dates to localStorage
 */
export function saveStudyDates(dates: string[]): void {
  try {
    const unique = Array.from(new Set(dates)).sort();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
  } catch (e) {
    console.error('Error saving study dates', e);
  }
}

/**
 * Calculates current streak and stats
 */
export function calculateStreakStats(studyDates: string[]): StreakStats {
  const dateSet = new Set(studyDates);
  const now = new Date();
  const todayStr = formatLocalDate(now);
  const yesterdayStr = formatLocalDate(subDays(now, 1));

  const hasStudiedToday = dateSet.has(todayStr);
  const hasStudiedYesterday = dateSet.has(yesterdayStr);

  let currentStreak = 0;

  if (hasStudiedToday) {
    currentStreak = 1;
    let checkDate = subDays(now, 1);
    while (dateSet.has(formatLocalDate(checkDate))) {
      currentStreak++;
      checkDate = subDays(checkDate, 1);
    }
  } else if (hasStudiedYesterday) {
    // Today hasn't been checked in yet, but streak from yesterday is still active!
    currentStreak = 1;
    let checkDate = subDays(now, 2);
    while (dateSet.has(formatLocalDate(checkDate))) {
      currentStreak++;
      checkDate = subDays(checkDate, 1);
    }
  } else {
    currentStreak = 0;
  }

  // Calculate historical max streak
  let historicalMax = 0;
  try {
    const storedMax = localStorage.getItem(MAX_STREAK_KEY);
    if (storedMax) {
      historicalMax = parseInt(storedMax, 10) || 0;
    }
  } catch {
    // ignore
  }

  const maxStreak = Math.max(historicalMax, currentStreak);
  if (maxStreak > historicalMax) {
    try {
      localStorage.setItem(MAX_STREAK_KEY, String(maxStreak));
    } catch {
      // ignore
    }
  }

  return {
    currentStreak,
    maxStreak,
    totalDaysStudied: studyDates.length,
    hasStudiedToday,
    lastStudyDate: studyDates.length > 0 ? studyDates[studyDates.length - 1] : null,
  };
}

const SHORT_DAYS_ES = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
const FULL_DAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

/**
 * Returns records for the last 7 calendar days (from 6 days ago up to today)
 */
export function getLast7Days(studyDates: string[]): DayRecord[] {
  const dateSet = new Set(studyDates);
  const now = new Date();
  const todayStr = formatLocalDate(now);
  const list: DayRecord[] = [];

  for (let i = 6; i >= 0; i--) {
    const dateObj = subDays(now, i);
    const dateString = formatLocalDate(dateObj);
    const dayOfWeek = dateObj.getDay();

    list.push({
      dateString,
      dayOfWeekShort: SHORT_DAYS_ES[dayOfWeek],
      dayOfWeekFull: FULL_DAYS_ES[dayOfWeek],
      dayNumber: dateObj.getDate(),
      monthName: MONTHS_ES[dateObj.getMonth()],
      isToday: dateString === todayStr,
      isStudied: dateSet.has(dateString),
    });
  }

  return list;
}

/**
 * Plays a pleasant cyberpunk/neon victory chord using Web Audio API
 */
export function playNeonCelebrationSound(): void {
  try {
    if (localStorage.getItem(SOUND_MUTED_KEY) === 'true') return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Arpeggiated high-tech chord: C5 -> E5 -> G5 -> C6
    const freqs = [523.25, 659.25, 783.99, 1046.50];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  } catch (err) {
    // Audio might be blocked before first user gesture
    console.debug('Web Audio play silenced', err);
  }
}

/**
 * Triggers mobile device vibration if available
 */
export function triggerHapticFeedback(): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([40, 50, 40]);
    } catch {
      // ignore
    }
  }
}
