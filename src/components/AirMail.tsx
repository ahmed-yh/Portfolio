import { useId, useState, type CSSProperties, type PointerEvent } from 'react';
import { HOME, MAP, REGIONS, distanceKm, project, regionOf, type Region } from '../geo';
import { useVisitors, type Place } from '../visitors';
import { CONTINENTS, RELIEF, WORLD } from '../worldPath';
import { tilt, vars } from '../lib';

/**
 * Visitors, as air mail: every visitor is a paper plane that flew to Amberg.
 * An airmail sheet with a hand-coloured physical map of the world (green lowlands up to brown
 * peaks, a blue sea with its depths, all in coloured pencil), a typewriter counter, one dot per
 * city (sized by visitors) and dashed flight paths with paper planes on the busiest routes.
 * Under the map, so nothing covers it: a magnifying glass on Europe, where the dots crowd, the
 * count per region and a passport stamp for whoever is looking. Hover or pick a dot, a region or a tag.
 */

const PIN = 'M0 0c-4-6-6-9-6-12a6 6 0 1 1 12 0c0 3-2 6-6 12Z';
const RING = 'M55 7 C82 6 96 26 93 52 C90 80 66 95 42 92 C17 89 4 68 7 44 C10 20 32 7 62 11';
const PLANE = 'M11 0 L-9 -7 L-4 0 L-9 7 Z';
const FLIGHTS = 6; // planes always in the air: the busiest routes
const [HX, HY] = project(HOME.lon, HOME.lat);

// What the main map shows: the full height, minus the empty Pacific strip on the left...
const VIEW = { x: 120, w: 860, h: MAP.h };
// ...plus a margin for the frame, ruled by hand: four lines, not quite parallel, overshooting the corners.
const PAD = 6;
const BOX = { x: VIEW.x - PAD, y: -PAD, w: VIEW.w + PAD * 2, h: VIEW.h + PAD * 2 };
const [X0, X1, Y1] = [VIEW.x, VIEW.x + VIEW.w, VIEW.h];
const FRAME = `M${X0 - 5} 0.7L${X1 + 4} -0.5M${X1 - 0.6} -5L${X1 + 0.6} ${Y1 + 4}M${X1 + 5} ${Y1 - 0.6}L${X0 - 4} ${Y1 + 0.7}M${X0 + 0.6} ${Y1 + 5}L${X0 - 0.5} -4`;

// The colours of a physical map. Land, from the lowlands up: each tint lies on top of the one before.
const TINTS = [
  { id: 'coast', d: WORLD, wash: '#B4DC92', pencil: '#62A244' }, // lowlands: the land itself
  { id: 'plains', d: RELIEF.plains, wash: '#F6E49A', pencil: '#D6B43C' }, // 200 m and up
  { id: 'highlands', d: RELIEF.highlands, wash: '#F0B870', pencil: '#CC8230' }, // 1000 m
  { id: 'mountains', d: RELIEF.mountains, wash: '#CB8650', pencil: '#96522A' }, // 2000 m
  { id: 'peaks', d: RELIEF.peaks, wash: '#A5633C', pencil: '#6A381B' }, // 4000 m
  { id: 'ice', d: CONTINENTS.arctic, wash: '#FFFFFF', pencil: '#A9CFE0' }, // Greenland's ice sheet
];
// Sea: a mid blue everywhere, darker in the deep basins, palest on the shelf around the land.
const SEA_BLUE = '#B4DDF2';
const SEA = [
  { id: 'deep', d: RELIEF.deep, wash: '#98CDEB' },
  { id: 'abyss', d: RELIEF.abyss, wash: '#7FBEE4' },
  { id: 'shelf', d: RELIEF.shelf, wash: '#DBF0F9' },
];
// The magnifying glass: a square of map centred between Tunisia and Germany.
const [LX, LY] = project(8, 44);
const LENS = { half: 45, zoom: 2.5 };

/** What is hovered or pinned: one city (by key) or one region. */
type Pick = { city?: string; region?: Region };
type Handlers = (pick: Pick) => { onPointerEnter: (e: PointerEvent) => void; onPointerLeave: () => void; onClick: () => void };

const keyOf = (p: { cc: string; city: string }) => `${p.cc}|${p.city}`;
const nameOf = (p: { cc: string; city: string; country: string }) => (p.city ? `${p.city}, ${p.cc}` : p.country);
const km = (n: number) => `${Math.round(n / 10) * 10}`.replace(/\B(?=(\d{3})+$)/g, ',');
const count = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const radius = (visitors: number) => Math.min(13, 4 + 1.6 * Math.sqrt(visitors));

/** Flight path from a place to Amberg: a quadratic arc bowed upwards. Null for Amberg itself. */
function arc(p: { lat: number; lon: number }): string | null {
  const [x, y] = project(p.lon, p.lat);
  const dist = Math.hypot(HX - x, HY - y);
  if (dist < 12) return null;
  const cx = (x + HX) / 2;
  const cy = Math.max(6, (y + HY) / 2 - dist * 0.28);
  return `M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${HX.toFixed(1)} ${HY.toFixed(1)}`;
}

function ago(iso: string): string {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  if (mins < 60) return rtf.format(-Math.max(mins, 1), 'minute');
  if (mins < 60 * 24) return rtf.format(-Math.round(mins / 60), 'hour');
  return rtf.format(-Math.round(mins / 1440), 'day');
}

/** Mechanical counter: each digit is a column of 0-9 that rolls to its value. */
function Odometer({ value }: { value: number }) {
  return (
    <span className="odometer" role="img" aria-label={`${value} visitors`}>
      <span className="mr-2 font-type text-2xl text-ink-muted" aria-hidden="true">№</span>
      {String(value).padStart(6, '0').split('').map((d, i) => (
        <span key={i} className="odo-cell" aria-hidden="true">
          <span className="odo-col" style={{ '--d': d, '--i': i } as CSSProperties}>
            {'0123456789'.split('').map((n) => <span key={n}>{n}</span>)}
          </span>
        </span>
      ))}
    </span>
  );
}

interface LayerProps {
  /** prefix of the ids in MapDefs */
  uid: string;
  activeRegion: Region | null;
  /** how much this copy of the map is magnified; lines and marks shrink by the same factor to stay the same size on screen */
  zoom?: number;
  /** entrance delay in ms */
  base: number;
  on: Handlers;
}

/** The shapes and pencil strokes of the map, defined once: both copies (map and magnifying glass) point at them by id. */
function MapDefs({ uid }: { uid: string }) {
  return (
    <defs>
      {[...TINTS, ...SEA].map((t) => (
        <path key={t.id} id={`${uid}-${t.id}`} d={t.d} fillRule="evenodd" clipRule="evenodd" />
      ))}
      {/* coloured-pencil shading, one direction per tint */}
      {TINTS.map((t, i) => (
        <pattern key={t.id} id={`${uid}-h-${t.id}`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform={`rotate(${35 + i * 37})`}>
          <path d="M-1 2.5h7" stroke={t.pencil} strokeWidth="1.1" opacity="0.5" />
        </pattern>
      ))}
      <pattern id={`${uid}-waves`} width="16" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4q4-2.4 8 0t8 0" fill="none" stroke="#5FA3CF" strokeWidth="0.8" opacity="0.45" />
      </pattern>
      {/* the relief shapes are rougher than the coastline: keep them inside it */}
      <clipPath id={`${uid}-land`}>
        <use href={`#${uid}-coast`} />
      </clipPath>
      <clipPath id={`${uid}-frame`}>
        <rect x={VIEW.x} width={VIEW.w} height={VIEW.h} />
      </clipPath>
    </defs>
  );
}

/** The map itself: sea, then the land coloured in by height, the coastline in pen, and the regions as hover targets. */
function Land({ uid, activeRegion, zoom = 1, base, on }: LayerProps) {
  const s = 1 / zoom;
  return (
    <>
      <g className="a-fade" style={vars({ base })}>
        <rect x={VIEW.x} width={VIEW.w} height={VIEW.h} fill={SEA_BLUE} />
        {SEA.map((t) => (
          <use key={t.id} href={`#${uid}-${t.id}`} fill={t.wash} />
        ))}
        <rect x={VIEW.x} width={VIEW.w} height={VIEW.h} fill={`url(#${uid}-waves)`} />
      </g>

      {/* coloured in one tint after the other, lowlands first */}
      <g clipPath={`url(#${uid}-land)`}>
        {TINTS.map((t, i) => (
          <g key={t.id} className="a-fade" style={vars({ i: i * 2.5, base: base + 600 })}>
            <use href={`#${uid}-${t.id}`} fill={t.wash} />
            <use href={`#${uid}-${t.id}`} fill={`url(#${uid}-h-${t.id})`} />
          </g>
        ))}
      </g>

      <g className="a-draw pointer-events-none" style={{ '--base': `${base + 200}ms`, '--dur': '1800ms' } as CSSProperties}>
        <path d={WORLD} pathLength={1} fill="none" stroke="var(--color-ink-muted)" strokeWidth={1.4 * s} strokeLinejoin="round" strokeLinecap="round" />
      </g>

      {/* the regions: see-through until one is picked, then the others go pale and it gets an outline */}
      {REGIONS.map((r) => (
        <path
          key={r.id}
          d={CONTINENTS[r.id]}
          strokeWidth={2.4 * s}
          className={`region ${activeRegion ? (activeRegion === r.id ? 'is-active' : 'is-off') : ''}`}
          {...on({ region: r.id })}
        />
      ))}
    </>
  );
}

interface MarksProps extends Omit<LayerProps, 'uid'> {
  places: Place[];
  regionOfPlace: Map<string, Region>;
  activeKey: string | null;
  you: [number, number] | null;
}

/** City dots, the "you" ring and the home pin. */
function Marks({ places, regionOfPlace, activeKey, activeRegion, you, zoom = 1, base, on }: MarksProps) {
  const s = 1 / zoom;
  return (
    <>
      {/* one dot per city, growing with visitors; the invisible circle is the hover target */}
      {places.slice(0, 300).map((p, i) => {
        const [x, y] = project(p.lon, p.lat);
        const k = keyOf(p);
        const state = k === activeKey ? 'is-active' : activeRegion && regionOfPlace.get(k) !== activeRegion ? 'is-off' : '';
        return (
          <g key={k} className="cursor-pointer" {...on({ city: k })}>
            <circle cx={x} cy={y} r={Math.max(16, radius(p.count) + 4) * s} fill="transparent" />
            <circle
              cx={x}
              cy={y}
              r={radius(p.count) * s}
              strokeWidth={2 * s}
              className={`dot a-pop ${state}`}
              style={{ ...vars({ i: Math.min(i, 20), base }), transformBox: 'fill-box', transformOrigin: 'center' } as CSSProperties}
            />
          </g>
        );
      })}

      {you && (
        <g className="a-draw pointer-events-none" style={{ '--base': `${base + 1200}ms`, '--dur': '700ms' } as CSSProperties}>
          <path d={RING} pathLength={1} transform={`translate(${you[0] - 21 * s} ${you[1] - 21 * s}) scale(${0.42 * s})`} fill="none" stroke="var(--color-redpen)" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      <g className="a-pop pointer-events-none" style={{ ...vars({ base: Math.max(0, base - 900) }), transformBox: 'fill-box', transformOrigin: '50% 100%' } as CSSProperties}>
        <path d={PIN} transform={`translate(${HX} ${HY}) scale(${1.7 * s})`} fill="var(--color-redpen)" stroke="#fff" strokeWidth="1" />
        <circle cx={HX} cy={HY - 20.4 * s} r={3.6 * s} fill="#fff" />
      </g>
    </>
  );
}

export default function AirMail() {
  const visitors = useVisitors();
  const uid = `fl${useId().replace(/\W/g, '')}`;
  const [hover, setHover] = useState<Pick | null>(null);
  const [pin, setPin] = useState<Pick | null>(null);

  const places = visitors?.places ?? [];
  const total = visitors?.total ?? 0;
  const you = visitors?.you ?? null;
  const youKey = you?.place ? keyOf(you.place) : null;
  const youXY = you?.place ? project(you.place.lon, you.place.lat) : null;

  const sel = hover ?? pin;
  const activeKey = sel?.city ?? null;
  const activeRegion = sel?.region ?? null;
  const active = places.find((p) => keyOf(p) === activeKey);
  const hovered = REGIONS.find((r) => r.id === hover?.region);

  // hover follows the mouse only: on a touch screen a tap pins instead, so nothing gets stuck highlighted
  const on: Handlers = (pick) => ({
    onPointerEnter: (e) => e.pointerType === 'mouse' && setHover(pick),
    onPointerLeave: () => setHover(null),
    onClick: () => setPin(pin?.city === pick.city && pin?.region === pick.region ? null : pick),
  });

  // who came from where
  const regionOfPlace = new Map(places.map((p) => [keyOf(p), regionOf(p.lon, p.lat)]));
  const tally = Object.fromEntries(REGIONS.map((r) => [r.id, { visitors: 0, cities: 0 }])) as Record<Region, { visitors: number; cities: number }>;
  for (const p of places) {
    const t = tally[regionOfPlace.get(keyOf(p))!];
    t.visitors += p.count;
    t.cities += 1;
  }
  const byRegion = [...REGIONS].sort((a, b) => tally[b.id].visitors - tally[a.id].visitors);

  // routes drawn: the busiest ones, plus the visitor's own and whichever is selected
  const routed = places.filter((p, i) => arc(p) && (i < 12 || keyOf(p) === youKey || keyOf(p) === activeKey));
  const routeId = new Map(routed.map((p, i) => [keyOf(p), `${uid}-${i}`]));
  const flying = routed.filter((p, i) => i < FLIGHTS || keyOf(p) === youKey || keyOf(p) === activeKey);
  const farthest = places.reduce<Place | null>((far, p) => (!far || distanceKm(HOME, p) > distanceKm(HOME, far) ? p : far), null);
  const countries = new Set(places.map((p) => p.cc)).size;

  // the sticky note: about the selected city, or the region under the mouse.
  // A pinned region gets none: its outline and its tag under the map say it, and a note would sit on the map.
  const note = active
    ? { at: project(active.lon, active.lat), lift: radius(active.count) + 8, title: active.city || active.country, rest: active.city ? `, ${active.country}` : '', body: `${count(active.count, 'visitor')} · ${km(distanceKm(HOME, active))} km` }
    : hovered
      ? {
          at: project(...hovered.at),
          lift: 0,
          title: hovered.name,
          rest: '',
          body: tally[hovered.id].visitors
            ? `${count(tally[hovered.id].visitors, 'visitor')} · ${count(tally[hovered.id].cities, 'city', 'cities')}`
            : 'nobody yet',
        }
      : null;
  const noteBelow = note !== null && note.at[1] - note.lift < 60; // no room above: hang it under the mark

  const land = { uid, activeRegion, on };
  const marks = { places, regionOfPlace, activeKey, activeRegion, you: youXY, on };

  return (
    <div className="space-y-10">
      <div className="prose-gwern">
        <p>Every visitor is a paper plane that landed in Amberg. Hover a dot or a continent, or pick a tag below, to see who flew in from there.</p>
      </div>

      <div className="airmail light-paper a-drop" style={vars({ r: -0.6, base: 200 })}>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 px-4 pt-5 sm:px-6">
          <div>
            <p className="mb-1 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink-muted">visitors flown in</p>
            <Odometer value={total} />
          </div>
          <div className="flex items-center gap-5">
            <span className="par-avion" aria-hidden="true">
              par avion
              <br />
              by air mail
            </span>
            <span className="stamp stamp-round a-stamp w-24 text-[0.6rem]" style={vars({ base: 1400 })} aria-hidden="true">
              amberg
              <br />
              ✈ arrivals ✈
            </span>
          </div>
        </div>

        <div className="relative mx-2 mt-3 sm:mx-4">
          <svg
            viewBox={`${BOX.x} ${BOX.y} ${BOX.w} ${BOX.h}`}
            className="block w-full overflow-visible"
            role="img"
            aria-label={`World map of ${total} visitors from ${places.length} places. The same data is in the lists below.`}
          >
            <MapDefs uid={uid} />

            <g clipPath={`url(#${uid}-frame)`}>
              <Land {...land} base={400} />
            </g>
            <g className="a-draw pointer-events-none" style={{ '--base': '300ms', '--dur': '1100ms' } as CSSProperties}>
              <path d={FRAME} pathLength={1} fill="none" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* the patch of map the magnifying glass below shows */}
            <g className="a-fade pointer-events-none" style={vars({ base: 3200 })} fill="none" stroke="var(--color-ink)" strokeWidth="1.2">
              <rect x={LX - LENS.half} y={LY - LENS.half} width={LENS.half * 2} height={LENS.half * 2} rx="6" strokeDasharray="3 4" />
              <circle cx={LX - LENS.half - 10} cy={LY - 24} r="5" />
              <path d={`M${LX - LENS.half - 6.5} ${LY - 20.5}l5 5`} strokeWidth="2.2" strokeLinecap="round" />
            </g>

            {/* flight paths */}
            <g className="a-fade pointer-events-none" style={vars({ base: 3200 })}>
              {routed.map((p) => {
                const k = keyOf(p);
                const state = k === activeKey ? 'is-active' : activeRegion && regionOfPlace.get(k) !== activeRegion ? 'is-off' : '';
                return <path key={k} id={routeId.get(k)} d={arc(p)!} className={`arc ${state}`} />;
              })}
            </g>

            {/* planes: SMIL, so they follow the curve and bank with it */}
            <g className="planes a-fade pointer-events-none" style={vars({ base: 3500 })}>
              {flying.map((p, i) => {
                const [x, y] = project(p.lon, p.lat);
                const dur = `${(4 + Math.hypot(HX - x, HY - y) / 110).toFixed(1)}s`;
                const begin = `${(i * 1.3).toFixed(1)}s`;
                return (
                  <g key={keyOf(p)} className={keyOf(p) === activeKey ? 'plane is-active' : 'plane'} opacity="0">
                    <path d={PLANE} />
                    <animateMotion dur={dur} begin={begin} repeatCount="indefinite" rotate="auto">
                      <mpath href={`#${routeId.get(keyOf(p))}`} />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.88;1" dur={dur} begin={begin} repeatCount="indefinite" />
                  </g>
                );
              })}
            </g>

            <Marks {...marks} base={2800} />

            {youXY && (
              <text x={youXY[0] - 62} y={youXY[1] + 34} className="a-fade map-note pointer-events-none" style={vars({ base: 4400 })}>
                you
              </text>
            )}
          </svg>

          {note && (
            <p
              className={`pointer-events-none absolute z-20 w-max max-w-[60%] -translate-x-1/2 -rotate-2 bg-[#F6E7A6] px-2 py-1 font-hand text-base leading-tight text-[#2D2A24] shadow-md sm:px-3 sm:py-1.5 sm:text-xl ${noteBelow ? '' : '-translate-y-full'}`}
              style={{
                left: `${Math.min(84, Math.max(16, ((note.at[0] - BOX.x) / BOX.w) * 100))}%`,
                top: `${((note.at[1] + (noteBelow ? note.lift : -note.lift) - BOX.y) / BOX.h) * 100}%`,
              }}
              role="status"
            >
              <strong>{note.title}</strong>
              {note.rest}
              <br />
              {note.body}
            </p>
          )}

        </div>

        {/* under the map, so nothing covers it: the magnifying glass and the count per region */}
        <div className="mx-4 mt-5 grid items-center gap-x-8 gap-y-6 border-t-2 border-dashed border-[#2D2A24]/20 py-6 sm:mx-6 sm:grid-cols-[auto_1fr]">
          <figure className="justify-self-center">
            <figcaption className="a-write mb-2 -rotate-2 font-hand text-xl leading-tight text-pen" style={vars({ base: 3300 })}>
              the dashed box,
              <br />
              {LENS.zoom}× closer:
            </figcaption>
            <div className="lens a-pop" style={vars({ base: 3200 })}>
              <svg viewBox={`${LX - LENS.half} ${LY - LENS.half} ${LENS.half * 2} ${LENS.half * 2}`} className="block h-full w-full" aria-hidden="true">
                <Land {...land} zoom={LENS.zoom} base={3300} />
                <Marks {...marks} zoom={LENS.zoom} base={4000} />
              </svg>
            </div>
          </figure>

          <div>
            <p className="a-write mb-3 font-hand text-2xl text-pen" style={vars({ base: 2600 })}>by region:</p>
            <ul className="flex flex-wrap gap-3">
              {byRegion.map((r, i) => (
                <li key={r.id}>
                  <button
                    type="button"
                    className={`sticker a-peel cursor-pointer text-sm ${tally[r.id].visitors ? '' : 'opacity-60'}`}
                    style={vars({ r: tilt(r.id), i: i * 0.5, base: 2800 })}
                    aria-pressed={pin?.region === r.id}
                    onFocus={() => setHover({ region: r.id })}
                    onBlur={() => setHover(null)}
                    {...on({ region: r.id })}
                  >
                    {r.name} <span className="font-mono text-[0.65rem] opacity-70">×{tally[r.id].visitors}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* passport stamp for whoever is looking */}
            {you && (
              <p className="mr-3 mt-6 text-right">
                <span className="stamp a-stamp text-xs text-redpen" style={vars({ base: 3900 })}>
                  {you.isNew ? 'arrived' : 'welcome back'}
                  {you.n !== null && ` · № ${you.n}`}
                  <br />
                  from {you.place ? nameOf(you.place) : 'somewhere on earth'}
                </span>
              </p>
            )}
          </div>
        </div>

        <p className="px-4 pb-4 font-mono text-[0.7rem] uppercase tracking-wider text-ink-muted sm:px-6" aria-live="polite">
          {visitors === undefined && 'counting…'}
          {visitors === null && 'the counter is out of reach right now. it will be back.'}
          {visitors && (
            <>
              {count(total, 'visitor')} · {count(places.length, 'city', 'cities')} · {count(countries, 'country', 'countries')}
              {farthest && distanceKm(HOME, farthest) > 50 && ` · longest flight: ${farthest.city || farthest.country}, ${km(distanceKm(HOME, farthest))} km`}
            </>
          )}
        </p>
      </div>

      {visitors?.sample && (
        <p className="-rotate-1 font-hand text-xl text-pen">* example data. the real counter only runs on the live site.</p>
      )}

      {places.length > 0 && (
        <div>
          <p className="a-write mb-3 font-hand text-2xl text-pen" style={vars({ base: 2800 })}>flown in from:</p>
          <ul className="flex flex-wrap gap-3">
            {places.slice(0, 14).map((p, i) => (
              <li key={keyOf(p)}>
                <button
                  type="button"
                  className="sticker a-peel cursor-pointer text-sm"
                  style={vars({ r: tilt(keyOf(p)), i: i * 0.5, base: 3000 })}
                  aria-pressed={pin?.city === keyOf(p)}
                  onClick={on({ city: keyOf(p) }).onClick}
                >
                  {nameOf(p)} <span className="font-mono text-[0.65rem] opacity-70">×{p.count}</span>
                </button>
              </li>
            ))}
            {places.length > 14 && <li className="self-center font-hand text-xl text-ink-muted">+ {places.length - 14} more</li>}
          </ul>
        </div>
      )}

      {visitors && visitors.recent.length > 0 && (
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          latest landings: {visitors.recent.map((r) => `${r.city || r.country} (${ago(r.at)})`).join(' · ')}
        </p>
      )}
    </div>
  );
}
