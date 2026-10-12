import { getStore } from '@netlify/blobs';
import { recordVisit } from '../lib/visitors.mjs';

/**
 * POST /api/visit  { id: <sha-256 hex of the browser fingerprint> }
 * Counts the visitor once and returns the totals for the map. Netlify supplies the
 * city-level location (context.geo); the IP address is never read or stored.
 */
export default async (req: Request, context: { geo?: unknown }) => {
  let id = '';
  try {
    id = String((await req.json())?.id ?? '');
  } catch {
    // not JSON: falls through to the "bad id" answer
  }

  try {
    const store = getStore({ name: 'visitors', consistency: 'strong' });
    return Response.json(await recordVisit(store, id, context.geo));
  } catch (err) {
    const bad = err instanceof RangeError;
    if (!bad) console.error(err);
    return Response.json({ error: bad ? 'bad id' : 'counter unavailable' }, { status: bad ? 400 : 503 });
  }
};

export const config = {
  path: '/api/visit',
  method: 'POST',
  // one visitor needs one call per page load; this only slows down someone trying to inflate the count
  rateLimit: { windowLimit: 20, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
