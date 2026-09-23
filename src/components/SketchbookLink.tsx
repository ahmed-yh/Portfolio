import { useState, type CSSProperties, type MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Scribble from './Scribble';
import { vars } from '../lib';

/**
 * The "enter" button, as an actual spiral sketchbook: the cover peeks open
 * at rest, lifts on hover, and swings fully open on click before the page turns.
 */
export default function SketchbookLink({ base = 0 }: { base?: number }) {
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);

  const open = (e: MouseEvent) => {
    // let cmd/ctrl/shift-click open a new tab as usual
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (opening) return;
    setOpening(true);
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => navigate('/portfolio', { viewTransition: true }), instant ? 0 : 600);
  };

  return (
    <div className="a-drop relative inline-block" style={vars({ r: -3, base })}>
      <Link
        to="/portfolio"
        onClick={open}
        className={`book ${opening ? 'is-open' : ''}`}
        style={{ '--peek-delay': `${base + 1800}ms` } as CSSProperties}
        aria-label="Open the sketchbook"
      >
        {/* first page, seen when the cover lifts */}
        <span className="book-page" aria-hidden="true">
          <span className="flex items-center gap-1 pl-8 font-hand text-3xl text-[#2F4A8A]">
            let's go
            <Scribble type="arrow" color="#2F4A8A" className="h-10 w-10" />
          </span>
        </span>

        <span className="book-cover" aria-hidden="true">
          <span className="book-spiral" />
          <span className="absolute left-9 top-5 w-[62%] -rotate-2 bg-[#FBFAF6] px-3 pb-2 pt-3 shadow-sm">
            <span className="tape" style={{ width: 46, marginLeft: -23, top: -9 }} />
            <span className="block font-mono text-[0.58rem] uppercase tracking-[0.3em] text-[#6B6459]">sketchbook</span>
            <span className="block font-marker text-[1.35rem] leading-tight">Open me</span>
            <span className="block font-hand text-lg leading-none text-[#2F4A8A]">A. Yassine · vol. 2026</span>
          </span>
          <Scribble type="star" color="#FFF8E7" className="animate-wiggle absolute bottom-4 left-10 h-7 w-7 opacity-90" />
          <Scribble type="sparkle" color="#2D2A24" className="animate-twinkle absolute bottom-6 left-20 h-4 w-4 opacity-60" />
        </span>

        <span className="book-ribbon" aria-hidden="true" />
      </Link>

      {/* "psst" note, pointing at the book */}
      <span className="pointer-events-none absolute left-full top-2 ml-3 hidden w-32 items-start gap-1 font-hand text-2xl leading-tight text-pen sm:flex">
        <Scribble type="arrow" color="var(--color-pen)" className="a-draw boil h-9 w-9 shrink-0 -scale-x-100 rotate-[20deg]" style={vars({ base: base + 900 })} />
        <span className="a-write -rotate-6" style={vars({ base: base + 600 })}>psst… open me</span>
      </span>
    </div>
  );
}
