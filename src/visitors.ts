import { useEffect, useState } from 'react';

/**
 * Visitor counter, browser side: builds the fingerprint id, registers the visit once per
 * page load with the Netlify function (netlify/functions/visit.mts) and shares the result.
 */

export interface Place {
  city: string;
  cc: string;
  country: string;
  lat: number;
  lon: number;
  count: number;
}

export interface Visitors {
  total: number;
  places: Place[];
  recent: { city: string; cc: string; country: string; at: string }[];
  you: { n: number | null; isNew: boolean; place: Omit<Place, 'count'> | null } | null;
  /** true for the built-in example shown where the function can't run (local dev, artifact preview) */
  sample?: boolean;
}

// ---------- fingerprint: OS, screen, browser, language and time zone, hashed. No cookies, nothing stored here.
async function fingerprint(): Promise<string> {
  const ua = navigator.userAgent;
  const os = /Windows/.test(ua) ? 'Windows' : /Android/.test(ua) ? 'Android' : /iPhone|iPad|iPod/.test(ua) ? 'iOS' : /Mac OS X/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'other';
  // order matters: Edge and Opera also say "Chrome", Chrome also says "Safari"
  const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'other';
  const traits = [os, `${screen.width}x${screen.height}x${screen.colorDepth}`, browser, navigator.language, Intl.DateTimeFormat().resolvedOptions().timeZone];
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(traits.join('|')));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

// ---------- example data, only for places the function can't run
const OFFLINE = import.meta.env.DEV || import.meta.env.MODE === 'artifact';
const p = (city: string, cc: string, country: string, lat: number, lon: number, count: number): Place => ({ city, cc, country, lat, lon, count });
const SAMPLE: Visitors = {
  sample: true,
  total: 128,
  places: [
    p('Sousse', 'TN', 'Tunisia', 35.8, 10.6, 22), p('Tunis', 'TN', 'Tunisia', 36.8, 10.2, 15), p('Amberg', 'DE', 'Germany', 49.4, 11.9, 12),
    p('Munich', 'DE', 'Germany', 48.1, 11.6, 9), p('Paris', 'FR', 'France', 48.9, 2.4, 8), p('Berlin', 'DE', 'Germany', 52.5, 13.4, 6),
    p('London', 'GB', 'United Kingdom', 51.5, -0.1, 5), p('New York', 'US', 'United States', 40.7, -74, 4), p('Lyon', 'FR', 'France', 45.8, 4.8, 4),
    p('Montréal', 'CA', 'Canada', 45.5, -73.6, 3), p('Dubai', 'AE', 'United Arab Emirates', 25.2, 55.3, 3), p('Istanbul', 'TR', 'Türkiye', 41, 29, 2),
    p('Tokyo', 'JP', 'Japan', 35.7, 139.7, 1), p('São Paulo', 'BR', 'Brazil', -23.5, -46.6, 1), p('Sydney', 'AU', 'Australia', -33.9, 151.2, 1),
  ],
  recent: [
    { city: 'Lyon', cc: 'FR', country: 'France', at: new Date(Date.now() - 2 * 3600e3).toISOString() },
    { city: 'Tunis', cc: 'TN', country: 'Tunisia', at: new Date(Date.now() - 26 * 3600e3).toISOString() },
    { city: 'Tokyo', cc: 'JP', country: 'Japan', at: new Date(Date.now() - 3 * 86400e3).toISOString() },
  ],
  you: { n: 128, isNew: true, place: { city: 'Lyon', cc: 'FR', country: 'France', lat: 45.8, lon: 4.8 } },
};

let pending: Promise<Visitors | null> | undefined;

/** Registers this visit (once per page load) and resolves to the totals, or null if the counter is unreachable. */
export function loadVisitors(): Promise<Visitors | null> {
  return (pending ??= fingerprint()
    .then((id) => fetch('/api/visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }))
    .then((res) => {
      if (!res.ok) throw new Error(String(res.status));
      return res.json() as Promise<Visitors>;
    })
    .catch(() => (OFFLINE ? SAMPLE : null)));
}

/** undefined while loading, null if the counter is unreachable. */
export function useVisitors(): Visitors | null | undefined {
  const [visitors, setVisitors] = useState<Visitors | null>();
  useEffect(() => {
    let alive = true;
    loadVisitors().then((v) => alive && setVisitors(v));
    return () => {
      alive = false;
    };
  }, []);
  return visitors;
}
