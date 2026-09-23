import type { CSSProperties } from 'react';

/**
 * A title that sketches itself in, letter by letter: pencil outline first,
 * then ink, then a slow hop wave at rest (see .sketch-letter in animations.css).
 * Screen readers get the plain text; the letters are decoration.
 */
interface SketchedProps {
  text: string;
  base?: number; // ms before the first letter
  step?: number; // ms between letters
}

export default function Sketched({ text, base = 0, step = 130 }: SketchedProps) {
  const words = text.split(' ');
  const letters = text.replace(/ /g, '').length;
  // the hop wave starts once the last letter has been inked
  const idle = base + letters * step + 1400;
  let i = 0;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ '--base': `${base}ms`, '--step': `${step}ms`, '--idle': `${idle}ms` } as CSSProperties}>
        {words.map((word, w) => (
          <span key={w}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((ch) => (
                <span key={i} className="sketch-letter" style={{ '--i': i++ } as CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
            {w < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </>
  );
}
