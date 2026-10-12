// Self-check for the map maths. Run: node --experimental-strip-types src/geo.check.ts
import { HOME, MAP, distanceKm, project, regionOf, type Region } from './geo.ts';

const cities: [string, number, number, Region][] = [
  ['Sousse', 10.6, 35.8, 'af'], ['Tunis', 10.2, 36.8, 'af'], ['Bizerte', 9.87, 37.27, 'af'], ['Algiers', 3.06, 36.75, 'af'],
  ['Tangier', -5.8, 35.78, 'af'], ['Cairo', 31.2, 30.0, 'af'], ['Sharm el-Sheikh', 34.3, 27.9, 'af'], ['Djibouti', 43.1, 11.6, 'af'],
  ['Dakar', -17.4, 14.7, 'af'], ['Cape Town', 18.4, -33.9, 'af'],
  ['Málaga', -4.42, 36.72, 'eu'], ['Gibraltar', -5.35, 36.14, 'eu'], ['Malta', 14.4, 35.9, 'eu'], ['Palermo', 13.36, 38.1, 'eu'],
  ['Crete', 25, 35.2, 'eu'], ['Amberg', 11.86, 49.44, 'eu'], ['Moscow', 37.6, 55.75, 'eu'], ['Reykjavik', -21.9, 64.1, 'eu'],
  ['Tel Aviv', 34.8, 32.1, 'as'], ['Jeddah', 39.2, 21.5, 'as'], ['Aden', 45, 12.8, 'as'], ['Istanbul', 29, 41, 'as'],
  ['Dubai', 55.3, 25.2, 'as'], ['Tokyo', 139.7, 35.7, 'as'], ['Jakarta', 106.8, -6.2, 'as'], ['Yekaterinburg', 60.6, 56.8, 'as'],
  ['Sydney', 151.2, -33.9, 'oc'], ['Perth', 115.9, -31.9, 'oc'], ['Auckland', 174.8, -36.8, 'oc'],
  ['New York', -74, 40.7, 'na'], ['Panama City', -79.5, 9, 'na'], ['Bogotá', -74.1, 4.7, 'sa'], ['São Paulo', -46.6, -23.5, 'sa'],
  ['Nuuk', -51.7, 64.2, 'arctic'],
];
for (const [name, lon, lat, want] of cities) {
  const got = regionOf(lon, lat);
  if (got !== want) throw new Error(`${name}: regionOf gave ${got}, expected ${want}`);
}

// the projection keeps every city inside the map box, with the centre of the world in the middle
for (const [name, lon, lat] of cities) {
  const [x, y] = project(lon, lat);
  if (!(x > 0 && x < MAP.w && y > 0 && y < MAP.h)) throw new Error(`${name} projects outside the map: ${x}, ${y}`);
}
if (Math.abs(project(0, 0)[0] - MAP.w / 2) > 1e-6) throw new Error('lon 0 should sit on the centre line');

// Sousse is about 1,515 km from Amberg
const km = distanceKm(HOME, { lat: 35.83, lon: 10.64 });
if (Math.abs(km - 1517) > 15) throw new Error(`Amberg to Sousse came out as ${km} km`);

console.log(`geo.check: ${cities.length} cities, all passed`);
