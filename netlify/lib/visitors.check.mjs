// Self-check for the visitor counter. Run: node netlify/lib/visitors.check.mjs
import assert from 'node:assert/strict';
import { recordVisit, placeOf } from './visitors.mjs';

/** In-memory stand-in for a Netlify Blobs store (same etag / onlyIfNew / onlyIfMatch rules). */
function fakeStore() {
  const data = new Map();
  let tick = 0;
  return {
    async get(key) { return data.has(key) ? structuredClone(data.get(key).value) : null; },
    async getWithMetadata(key) { return data.has(key) ? { data: structuredClone(data.get(key).value), etag: data.get(key).etag } : null; },
    async setJSON(key, value, { onlyIfNew, onlyIfMatch } = {}) {
      const cur = data.get(key);
      if (onlyIfNew && cur) return { modified: false };
      if (onlyIfMatch && cur?.etag !== onlyIfMatch) return { modified: false };
      const etag = `e${++tick}`;
      data.set(key, { value: structuredClone(value), etag });
      return { modified: true, etag };
    },
    async delete(key) { data.delete(key); },
  };
}

const id = (c) => c.repeat(64);
const amberg = { city: 'Amberg', country: { code: 'DE', name: 'Germany' }, latitude: 49.4432, longitude: 11.8621 };
const sousse = { city: 'Sousse', country: { code: 'TN', name: 'Tunisia' }, latitude: 35.8254, longitude: 10.637 };

const store = fakeStore();

// first visit counts, with coordinates rounded to one decimal
let r = await recordVisit(store, id('a'), amberg);
assert.equal(r.total, 1);
assert.deepEqual(r.you, { n: 1, isNew: true, place: placeOf(amberg) });
assert.deepEqual(r.places, [{ city: 'Amberg', cc: 'DE', country: 'Germany', lat: 49.4, lon: 11.9, count: 1 }]);

// the same visitor again is not counted twice, and keeps their number
r = await recordVisit(store, id('a'), amberg);
assert.equal(r.total, 1);
assert.equal(r.you.isNew, false);
assert.equal(r.you.n, 1);

// new visitors add up; places sort by count; recent lists newest first
await recordVisit(store, id('b'), sousse, '2026-10-12T10:00:00.000Z');
r = await recordVisit(store, id('c'), sousse, '2026-10-12T11:00:00.000Z');
assert.equal(r.total, 3);
assert.deepEqual(r.places.map((p) => [p.city, p.count]), [['Sousse', 2], ['Amberg', 1]]);
assert.equal(r.recent[0].at, '2026-10-12T11:00:00.000Z');
assert.equal(r.you.n, 3);

// unknown location still counts, just without a pin
r = await recordVisit(store, id('d'), undefined);
assert.equal(r.total, 4);
assert.equal(r.you.place, null);
assert.equal(r.places.length, 2);

// a lookup with no coordinates (0,0) is treated as unknown, not pinned in the Atlantic
assert.equal(placeOf({ city: 'San Francisco', country: { code: 'US', name: 'United States' }, latitude: 0, longitude: 0 }), null);

// malformed ids are rejected before anything is written
await assert.rejects(recordVisit(store, 'not-a-hash', amberg), RangeError);
await assert.rejects(recordVisit(store, id('A'), amberg), RangeError);
assert.equal((await store.get('summary')).total, 4);

// two first-time visitors racing on the summary are both counted
const racing = fakeStore();
await Promise.all([recordVisit(racing, id('1'), amberg), recordVisit(racing, id('2'), sousse), recordVisit(racing, id('3'), sousse)]);
assert.equal((await racing.get('summary')).total, 3);

console.log('visitors.check: all passed');
