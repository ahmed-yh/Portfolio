/**
 * Map maths for the visitor map. No imports, so `node --experimental-strip-types src/geo.check.ts` can run it.
 * The shapes in worldPath.ts were traced with exactly this projection and region rule (see the note there).
 */

export const HOME = { city: 'Amberg', lat: 49.44, lon: 11.86 };
export const MAP = { w: 1000, h: 435 };

export type Region = 'na' | 'sa' | 'eu' | 'af' | 'as' | 'oc' | 'arctic';

/** The map's regions, with a patch of open sea beside each ([lon, lat]) where its note can sit without covering land. */
export const REGIONS: { id: Region; name: string; at: [number, number] }[] = [
  { id: 'arctic', name: 'The Arctic', at: [-45, 56] },
  { id: 'na', name: 'North America', at: [-132, 26] },
  { id: 'sa', name: 'South America', at: [-101, -24] },
  { id: 'eu', name: 'Europe', at: [-32, 40] },
  { id: 'af', name: 'Africa', at: [-9, -13] },
  { id: 'as', name: 'Asia', at: [78, -9] },
  { id: 'oc', name: 'Oceania', at: [103, -34] },
];

// Equal Earth projection (Šavrič, Patterson & Jenny, 2018), scaled so 360° of longitude spans MAP.w
const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2;
const K = 184.7316, TOP = 1.306713;

export function project(lon: number, lat: number): [number, number] {
  const l = (lon * Math.PI) / 180;
  const t = Math.asin(M * Math.sin((lat * Math.PI) / 180));
  const t2 = t * t, t6 = t2 * t2 * t2;
  const x = (l * Math.cos(t)) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)));
  const y = t * (A1 + A2 * t2 + t6 * (A3 + A4 * t2));
  return [MAP.w / 2 + x * K, (TOP - y) * K];
}

/** Great-circle distance in km (haversine). */
export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const rad = Math.PI / 180;
  const h =
    Math.sin(((b.lat - a.lat) * rad) / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(((b.lon - a.lon) * rad) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}

/**
 * Which of the map's seven regions a coordinate belongs to.
 * ponytail: boxes and one slanted line (the Red Sea), not real borders. Good to a city or so at the
 * edges (Istanbul and Rhodes land in Asia). Swap in a country-code table if that ever matters.
 */
export function regionOf(lon: number, lat: number): Region {
  if ((lat >= 59 && lon > -60 && lon < -26) || (lat >= 67.5 && lon >= -26 && lon < -10)) return 'arctic'; // Greenland
  if (lon < -32) return lat > 12.5 || (lon < -77 && lat > 7) ? 'na' : 'sa';
  if ((lon >= 141 && lat < 0) || (lon >= 110 && lat < -10.5)) return 'oc';
  const africa =
    lon < 52 &&
    (lat < 12.5 ||
      (lat < 29.5 && lon < 34.5 + (29.5 - lat) * 0.5176) || // west of the Red Sea
      (lat >= 29.5 && lat < 33.5 && lon < 34.3) ||
      (lat >= 33.5 && lat < 37.45 && lon >= -1.5 && lon < 11.6) || // Algeria and Tunisia reach further north than Spain's south coast
      (lat >= 33.5 && lat < 35.95 && lon < -1.5));
  if (africa) return 'af';
  if (lat >= 33.5 && (lon < 26 || (lon < 40 && lat > 42) || (lon < 60 && lat > 44))) return 'eu';
  return 'as';
}
