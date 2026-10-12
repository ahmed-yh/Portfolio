/**
 * Visitor counting, kept free of Netlify imports so it can be checked with plain node
 * (see visitors.check.mjs). `store` is a Netlify Blobs store, or anything shaped like one.
 *
 * Blobs used:
 *   seen/<id>  one per visitor: { at, n, key }   (id = the browser's fingerprint hash)
 *   summary    { total, places: { [key]: { city, cc, country, lat, lon, count } }, recent: [{ key, at }] }
 */
const ID = /^[0-9a-f]{64}$/;
const RECENT = 6;
// ponytail: the summary is one JSON blob; past this many places new cities only raise the total.
// Split into per-country blobs if the map ever gets that crowded.
const MAX_PLACES = 2000;

/** City-level place from Netlify's geo data, coordinates rounded to ~11 km. Null when unknown. */
export function placeOf(geo) {
  const lat = Number(geo?.latitude);
  const lon = Number(geo?.longitude);
  const cc = String(geo?.country?.code || '').slice(0, 2).toUpperCase();
  // 0,0 is what a lookup without coordinates looks like, not a real city
  if (!cc || !Number.isFinite(lat) || !Number.isFinite(lon) || (lat === 0 && lon === 0)) return null;
  const city = String(geo.city || '').slice(0, 60);
  return {
    key: `${cc}|${city}`,
    city,
    cc,
    country: String(geo.country.name || cc).slice(0, 60),
    lat: Math.round(lat * 10) / 10,
    lon: Math.round(lon * 10) / 10,
  };
}

function view(summary, you) {
  const places = Object.values(summary.places).sort((a, b) => b.count - a.count);
  const recent = summary.recent
    .filter((r) => summary.places[r.key])
    .map((r) => ({ city: summary.places[r.key].city, cc: summary.places[r.key].cc, country: summary.places[r.key].country, at: r.at }));
  return { total: summary.total, places, recent, you };
}

/**
 * Counts `id` once, ever, and returns the public summary plus what we know about this visitor.
 * Throws RangeError for a malformed id.
 */
export async function recordVisit(store, id, geo, now = new Date().toISOString()) {
  if (!ID.test(id)) throw new RangeError('bad id');
  const place = placeOf(geo);
  const empty = () => ({ total: 0, places: {}, recent: [] });

  // First write wins: a second request with the same id (two tabs, a retry) is a return visit.
  const { modified: isNew } = await store.setJSON(`seen/${id}`, { at: now }, { onlyIfNew: true });

  if (!isNew) {
    const seen = await store.get(`seen/${id}`, { type: 'json' });
    const summary = (await store.get('summary', { type: 'json' })) ?? empty();
    return view(summary, { n: seen?.n ?? null, isNew: false, place });
  }

  // Compare-and-swap on the summary so two first-time visitors at once are both counted.
  let summary;
  for (let attempt = 0; ; attempt++) {
    const entry = await store.getWithMetadata('summary', { type: 'json' });
    summary = entry?.data ?? empty();
    summary.total += 1;
    if (place && (summary.places[place.key] || Object.keys(summary.places).length < MAX_PLACES)) {
      const { key, ...rest } = place;
      summary.places[key] ??= { ...rest, count: 0 };
      summary.places[key].count += 1;
      summary.recent = [{ key, at: now }, ...summary.recent].slice(0, RECENT);
    }
    const { modified } = await store.setJSON('summary', summary, entry ? { onlyIfMatch: entry.etag } : { onlyIfNew: true });
    if (modified) break;
    if (attempt >= 5) {
      await store.delete(`seen/${id}`); // not counted: let their next visit try again
      throw new Error('summary is busy');
    }
  }

  await store.setJSON(`seen/${id}`, { at: now, n: summary.total, key: place?.key ?? null });
  return view(summary, { n: summary.total, isNew: true, place });
}
