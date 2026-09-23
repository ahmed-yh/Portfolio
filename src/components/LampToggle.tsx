import { useState } from 'react';

/**
 * Desk-lamp theme switch. Lamp on = cream paper, lamp off = the blog's dark paper.
 * The <html> class is set before first paint by the inline script in index.html.
 */
export default function LampToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [flickers, setFlickers] = useState(0);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // private mode: the lamp still works, it just won't be remembered
    }
    setDark(next);
    setFlickers((n) => n + 1);
  };

  return (
    <>
      <button
        onClick={toggle}
        className="fixed right-4 top-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-paper/80 text-ink shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
        style={{ viewTransitionName: 'lamp' }}
        aria-label={dark ? 'Turn the lamp on (light mode)' : 'Turn the lamp off (dark mode)'}
        aria-pressed={!dark}
      >
        <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse className="lamp-glow" cx="38" cy="34" rx="9" ry="6" fill="var(--color-sepia)" stroke="none" />
          <path d="M8 44 Q18 40 28 44 Z" fill="currentColor" />
          <path d="M18 42 L14 27 L26 17" />
          <circle cx="14" cy="27" r="1.6" fill="currentColor" />
          <g className="lamp-head">
            <path d="M24 13 L35 7 L42 19 L30 23 Z" fill="var(--color-paper)" />
            <g className="lamp-rays">
              <path d="M38 25 L42 31" pathLength={1} />
              <path d="M33 26 L34 33" pathLength={1} />
              <path d="M43 21 L47 25" pathLength={1} />
            </g>
          </g>
        </svg>
      </button>
      {flickers > 0 && <div key={flickers} className="lamp-flicker" aria-hidden="true" />}
    </>
  );
}
