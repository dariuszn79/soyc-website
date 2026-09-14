import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

/**
 * Human-readable elapsed time for a ms timestamp, e.g.
 * "45s ago", "12min ago", "2h 34min ago", "3d 5h ago".
 */
export function formatTimeAgo(timestampMs: number, now = Date.now()) {
  const diff = Math.max(0, now - timestampMs);
  const minutes = Math.floor(diff / MINUTE_MS);
  if (minutes < 1) return `${Math.floor(diff / 1000)}s ago`;
  const hours = Math.floor(diff / HOUR_MS);
  if (hours < 1) return `${minutes}min ago`;
  const days = Math.floor(diff / DAY_MS);
  if (days < 1) {
    const rem = minutes % 60;
    return rem ? `${hours}h ${rem}min ago` : `${hours}h ago`;
  }
  const rem = hours % 24;
  return rem ? `${days}d ${rem}h ago` : `${days}d ago`;
}

function toDms(value: number, positive: string, negative: string) {
  const totalSec = Math.round(Math.abs(value) * 3600);
  const deg = Math.floor(totalSec / 3600);
  const min = Math.floor((totalSec % 3600) / 60);
  const sec = totalSec % 60;
  const hemi = value >= 0 ? positive : negative;
  return `${deg}° ${String(min).padStart(2, "0")}' ${String(sec).padStart(2, "0")}" ${hemi}`;
}

/** Decimal degrees → DMS, e.g. 50.8058 → "50° 48' 21\" N". */
export function formatLatDms(lat: number) {
  return toDms(lat, "N", "S");
}

/** Decimal degrees → DMS, e.g. -1.0872 → "1° 05' 14\" W". */
export function formatLonDms(lon: number) {
  return toDms(lon, "E", "W");
}
