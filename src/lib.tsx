import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** Flips to true the first time the element is ~15% visible, then stops watching (animations play once). */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

/** Animation knobs as CSS variables: r = resting tilt (deg), i = stagger index, base = delay (ms). */
export function vars({ r, i, base }: { r?: number; i?: number; base?: number }): CSSProperties {
  return {
    ...(r !== undefined && { '--r': r }),
    ...(i !== undefined && { '--i': i }),
    ...(base !== undefined && { '--base': `${base}ms` }),
  } as CSSProperties;
}

/** Deterministic -3..3 degree tilt from a string (ported from the blog's getRandomRotation). */
export function tilt(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return (Math.abs(hash) % 7) - 3;
}

/** Wraps **double-starred** bits of a string in a highlighter mark. */
export function hl(text: string): ReactNode[] {
  return text.split('**').map((part, i) =>
    i % 2 ? <mark key={i} className="marker">{part}</mark> : part
  );
}
