import type { CSSProperties } from 'react';
import { photos, profile } from '../data';
import { hl, vars } from '../lib';

/**
 * About, as a kraft case file (after cestclair.me's About page): binder clips on top,
 * the name down a side tab, a postage-stamp photo stamped CLASSIFIED: HIREABLE,
 * a "how I ♥ to work" sticky note, and the bio on a sheet of graph paper.
 */

function BinderClip({ className, style }: { className: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 40" aria-hidden="true">
      <path d="M13 22 L17 3 Q17.5 1 20 1 L28 1 Q30.5 1 31 3 L35 22" fill="none" stroke="#B8B8BE" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M4 20 L44 20 L40 38 L8 38 Z" fill="#2D2A24" />
      <path d="M8 23 L40 23" stroke="#5E574D" strokeWidth="1.5" />
    </svg>
  );
}

/** Round rubber stamp with its text running around the rim. */
function ClassifiedStamp() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <path id="stamp-ring" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text fill="currentColor" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" letterSpacing="2">
        <textPath href="#stamp-ring" textLength="258">CLASSIFIED ★ CLASSIFIED ★</textPath>
      </text>
      <text x="60" y="64" textAnchor="middle" fill="currentColor" fontFamily="Permanent Marker, cursive" fontSize="15">
        HIREABLE
      </text>
    </svg>
  );
}

export default function Dossier() {
  return (
    <div className="kraft-folder a-rise relative mt-4" style={vars({ base: 100 })}>
      <BinderClip className="a-pop absolute -top-5 left-10 h-10 w-12" style={vars({ base: 500 })} />
      <BinderClip className="a-pop absolute -top-5 right-16 h-10 w-12" style={vars({ base: 650 })} />
      <span className="folder-side" aria-hidden="true">{profile.name}</span>

      {/* photo + note, side by side where there's room */}
      <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-14 pb-10 pt-4">
        <div className="a-drop sway relative" style={vars({ r: -3, base: 350 })}>
          <div className="drop-shadow-md">
            <div className="perforated w-44 bg-[#FBFAF6]">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={photos.dossier} alt={`${profile.name} working on a laptop in the lab`} className="h-full w-full origin-[55%_58%] scale-[1.35] object-cover object-[50%_58%]" />
              </div>
              <p className="flex justify-between pt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#5E574D]">
                <span>amberg</span>
                <span>2026</span>
              </p>
            </div>
          </div>
          <span className="ink-worn a-stamp absolute -bottom-14 -right-16 h-32 w-32 -rotate-12 text-redpen" style={vars({ base: 1100 })}>
            <ClassifiedStamp />
          </span>
        </div>

        <div className="a-drop sway relative w-64 bg-[#F6E7A6] px-5 pb-6 pt-7 text-[#2D2A24] shadow-lg" style={vars({ r: 3, base: 600 })}>
          <span className="tape a-tape" aria-hidden="true" />
          <p className="font-marker text-2xl leading-tight">
            How I <span className="text-[#B03A2E]">♥</span> to work
          </p>
          <p className="mt-2 font-hand text-xl leading-snug">{profile.howIWork}</p>
        </div>
      </div>

      {/* the bio, on graph paper */}
      <div className="graph-paper light-paper relative rotate-[0.4deg] p-6 shadow-md sm:p-8">
        <p className="mb-4 font-type text-xl">
          who am i??
          <span className="mt-1 block h-0.5 w-12 bg-[#B03A2E]" aria-hidden="true" />
        </p>
        <div className="prose-gwern drop-cap">
          {profile.about.map((p, i) => (
            <p key={i}>{hl(p)}</p>
          ))}
        </div>

        <p className="mb-3 mt-8 font-type text-xl">
          right now:
          <span className="mt-1 block h-0.5 w-12 bg-[#B03A2E]" aria-hidden="true" />
        </p>
        <div className="prose-gwern">
          <p>{hl(profile.now)}</p>
        </div>

        <div className="a-deal mt-10 w-fit" style={vars({ r: -2, base: 900 })}>
          <span className="folder-tab">skills</span>
          <div className="folder-card">
            <p className="-rotate-1 bg-[#FBFAF6] px-5 py-3 font-marker text-2xl shadow-sm">i can make it happen.</p>
          </div>
          <a href="#skills" className="mt-2 block text-right font-hand text-lg text-pen hover:underline">*the boring list is in 05 ↓</a>
        </div>
      </div>
    </div>
  );
}
