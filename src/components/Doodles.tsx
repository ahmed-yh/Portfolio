import type { CSSProperties } from 'react';
import Scribble from './Scribble';

/**
 * Floating background doodles (the blog hero's scribbles and stars, plus a few friends).
 * Each sits in a .parallax wrapper that drifts with scroll where supported,
 * pops or draws in on load, then keeps floating/wiggling.
 */
const depth = (px: number) => ({ '--depth': `${px}px` }) as CSSProperties;

export default function Doodles({ base = 0 }: { base?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
      <div className="parallax absolute left-[8%] top-10" style={depth(-220)}>
        <svg className="a-draw boil h-56 w-56 animate-float text-sepia opacity-40" viewBox="0 0 200 200" style={{ '--base': `${base}ms`, '--dur': '1600ms' } as CSSProperties}>
          <path d="M40,100 Q80,20 160,100 T180,180" pathLength={1} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="parallax absolute bottom-16 right-[4%]" style={depth(-120)}>
        <span className="a-fade block">
          <Scribble type="loop" color="var(--color-ink-muted)" className="boil h-80 w-80 animate-float-delayed opacity-25" />
        </span>
      </div>

      <div className="parallax absolute right-[18%] top-[22%] max-md:hidden" style={depth(-300)}>
        <span className="a-pop block" style={{ '--base': `${base + 300}ms` } as CSSProperties}>
          <Scribble type="star" color="var(--color-sepia-dark)" className="boil h-11 w-11 animate-wiggle opacity-60" />
        </span>
      </div>

      <div className="parallax absolute bottom-[18%] left-[3%]" style={depth(-180)}>
        <span className="a-pop block" style={{ '--base': `${base + 500}ms` } as CSSProperties}>
          <svg className="boil h-8 w-8 animate-wiggle text-ink opacity-40" viewBox="0 0 24 24">
            <path d="M12 2L15 9L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 9L12 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </div>

      <div className="parallax absolute left-[45%] top-[8%] max-md:hidden" style={depth(-260)}>
        <span className="a-pop block" style={{ '--base': `${base + 700}ms` } as CSSProperties}>
          <Scribble type="sparkle" className="h-6 w-6 animate-twinkle opacity-60" />
        </span>
      </div>

      <div className="parallax absolute bottom-[12%] left-[38%]" style={depth(-90)}>
        <span className="a-fade block">
          <Scribble type="spiral" color="var(--color-ink-muted)" className="boil h-20 w-20 animate-float opacity-30" />
        </span>
      </div>

      <div className="parallax absolute right-[6%] top-[55%]" style={depth(-240)}>
        <span className="a-pop block" style={{ '--base': `${base + 900}ms` } as CSSProperties}>
          <Scribble type="sparkle" color="var(--color-sepia-dark)" className="h-5 w-5 animate-twinkle opacity-50" />
        </span>
      </div>
    </div>
  );
}
