import type { CSSProperties } from 'react';

/**
 * Hand-drawn SVG doodles (ported from the blog's mdx/Scribble, plus a few new ones).
 * Stroke paths carry pathLength={1} so any doodle can draw itself: give it the
 * `a-draw` class and it animates once its section is in view (see animations.css).
 */

type ScribbleType =
  | 'star' | 'loop' | 'underline' | 'arrow' | 'squiggle'
  | 'circle' | 'sparkle' | 'pin' | 'clip' | 'tally' | 'spiral';

interface ScribbleProps {
  type: ScribbleType;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const STAR = 'M12 2L15 9L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 9L12 2Z';

export default function Scribble({ type, color = 'var(--color-sepia)', className = '', style }: ScribbleProps) {
  const s = { color, ...style };
  const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

  switch (type) {
    case 'star':
      return (
        <svg className={`w-8 h-8 ${className}`} viewBox="0 0 24 24" style={s} aria-hidden="true">
          <path d={STAR} fill="currentColor" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg className={`w-8 h-8 ${className}`} viewBox="0 0 24 24" style={s} aria-hidden="true">
          <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" fill="currentColor" />
        </svg>
      );
    case 'loop':
      return (
        <svg className={`w-24 h-24 ${className}`} viewBox="0 0 300 300" style={s} aria-hidden="true">
          <path d="M50,150 C50,50 250,50 250,150 C250,250 50,250 50,150 Z" {...stroke} strokeWidth="2" strokeDasharray="10 8" />
        </svg>
      );
    case 'underline':
      return (
        <svg className={`w-full h-4 ${className}`} viewBox="0 0 100 10" preserveAspectRatio="none" style={s} aria-hidden="true">
          <path d="M1 6 Q 30 1, 55 5 T 99 4" pathLength={1} {...stroke} strokeWidth="3" />
        </svg>
      );
    case 'arrow':
      return (
        <svg className={`w-12 h-12 ${className}`} viewBox="0 0 50 50" style={s} aria-hidden="true">
          <path d="M2,28 Q22,4 45,20" pathLength={1} {...stroke} strokeWidth="2.5" />
          <path d="M45,20 L34,16 M45,20 L40,31" pathLength={1} {...stroke} strokeWidth="2.5" />
        </svg>
      );
    case 'circle':
      return (
        <svg className={`w-full h-full ${className}`} viewBox="0 0 100 100" style={s} aria-hidden="true">
          <path d="M55 7 C82 6 96 26 93 52 C90 80 66 95 42 92 C17 89 4 68 7 44 C10 20 32 7 62 11" pathLength={1} {...stroke} strokeWidth="4" />
        </svg>
      );
    case 'pin':
      return (
        <svg className={`w-7 h-9 ${className}`} viewBox="0 0 28 36" style={s} aria-hidden="true">
          <path d="M14 18 L14 34" {...stroke} stroke="#6B6459" strokeWidth="2" />
          <ellipse cx="14" cy="11" rx="10" ry="9" fill="currentColor" />
          <ellipse cx="11" cy="8" rx="3" ry="2.5" fill="#fff" opacity="0.5" />
        </svg>
      );
    case 'clip':
      return (
        <svg className={`w-5 h-10 ${className}`} viewBox="0 0 20 40" style={s} aria-hidden="true">
          <rect x="3" y="2" width="14" height="36" rx="3" fill="currentColor" />
          <path d="M10 4 L10 36" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
          <circle cx="10" cy="15" r="2.5" fill="#6B6459" />
        </svg>
      );
    case 'tally':
      // two bundles of five: four uprights then the slash, drawn in order via --i
      return (
        <svg className={`h-12 w-36 ${className}`} viewBox="0 0 150 50" style={s} aria-hidden="true">
          {[0, 1].map((bundle) => (
            <g key={bundle} transform={`translate(${bundle * 75} 0)`}>
              {[0, 1, 2, 3].map((k) => (
                <path key={k} d={`M${10 + k * 12} ${8 + (k % 2)} L${9 + k * 12} ${43 - (k % 2)}`} pathLength={1} {...stroke} strokeWidth="3" style={{ '--i': (bundle * 5 + k) * 2 } as CSSProperties} />
              ))}
              <path d="M2 34 L58 12" pathLength={1} {...stroke} strokeWidth="3" style={{ '--i': (bundle * 5 + 4) * 2 } as CSSProperties} />
            </g>
          ))}
        </svg>
      );
    case 'spiral':
      return (
        <svg className={`w-24 h-24 ${className}`} viewBox="0 0 100 100" style={s} aria-hidden="true">
          <path d="M50 50 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a14 14 0 1 1 -14 -14 a22 22 0 1 1 22 22 a30 30 0 1 1 -30 -30" {...stroke} strokeWidth="2" strokeDasharray="4 5" />
        </svg>
      );
    default:
      return (
        <svg className={`w-48 h-6 ${className}`} viewBox="0 0 200 30" style={s} aria-hidden="true">
          <path d="M5 20 Q 30 15, 55 20 T 105 18 T 155 20 T 195 18" pathLength={1} {...stroke} strokeWidth="2" />
        </svg>
      );
  }
}
