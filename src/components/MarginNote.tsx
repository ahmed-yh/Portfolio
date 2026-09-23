import type { CSSProperties, ReactNode } from 'react';
import Scribble from './Scribble';

/**
 * Blue-pen note. In the right gutter on wide screens (parent must be `relative`),
 * inline under its block on smaller ones. Writes itself on, then the arrow draws.
 */
export default function MarginNote({ children, top = 0, base = 0 }: { children: ReactNode; top?: number; base?: number }) {
  return (
    <aside className="margin-note boil" style={{ '--top': `${top}px`, '--base': `${base}ms` } as CSSProperties}>
      <Scribble type="arrow" color="var(--color-pen)" className="a-draw h-9 w-9 shrink-0 -scale-x-100 max-xl:hidden" style={{ '--extra': '900ms' } as CSSProperties} />
      <span className="a-write">{children}</span>
    </aside>
  );
}
