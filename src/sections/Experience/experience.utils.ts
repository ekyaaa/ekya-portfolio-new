import { Experience } from './experience.types';

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Formats date string (e.g. "2026-01-01", "2025-12-27", "2026-01", "2026") into "MMM YYYY".
 */
export function formatExperienceDate(dateStr: string): string {
  if (!dateStr) return '';
  const trimmed = dateStr.trim();
  if (/^[A-Za-z]{3}\s+\d{4}$/.test(trimmed)) {
    return trimmed;
  }
  const parts = trimmed.split('-');
  if (parts.length >= 2) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${MONTH_NAMES[monthIndex]} ${year}`;
    }
  } else if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
    return parts[0];
  }

  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return `${MONTH_NAMES[parsed.getUTCMonth()]} ${parsed.getUTCFullYear()}`;
  }
  return trimmed;
}

/**
 * Returns formatted period string such as "Jan 2026 — Present" or "Jun 2024 — Nov 2025".
 */
export function formatExperiencePeriod(
  exp: Pick<Experience, 'startDate' | 'endDate' | 'current'>
): string {
  const start = formatExperienceDate(exp.startDate);
  if (exp.current || !exp.endDate || exp.endDate.toLowerCase() === 'present') {
    return `${start} \u2014 Present`;
  }
  const end = formatExperienceDate(exp.endDate);
  return `${start} \u2014 ${end}`;
}

/**
 * Sorts experiences chronologically by start date descending (most recent first).
 */
export function sortExperiencesChronologically(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    const timeA = new Date(a.startDate).getTime();
    const timeB = new Date(b.startDate).getTime();
    return timeB - timeA;
  });
}
