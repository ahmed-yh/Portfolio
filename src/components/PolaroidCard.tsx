import { useState, type ReactNode } from 'react';
import { useInView, vars, tilt } from '../lib';
import Scribble from './Scribble';

/**
 * Polaroid (ported from the blog's WritingCard): tilted by a hash of its id,
 * taped, pinned or clipped on, and it drops/swings in the first time it's seen.
 * `image` is cropped to 4:3. A single `media` item keeps its own shape; with several,
 * the frame locks to 16:9 (so the page never reflows) and a click flips to the next one.
 */

const isVideo = (src: string) => /\.(mp4|webm|mov)(\?|$)/i.test(src);

/** One photo or video: at its natural shape, or fitted inside a fixed frame (`fit`). */
function Shot({ src, alt, fit }: { src: string; alt: string; fit?: boolean }) {
  const cls = fit
    ? 'a-shuffle relative h-full w-full object-contain'
    : 'a-shuffle mx-auto block h-auto max-h-80 w-auto max-w-[min(26rem,75vw)] transition-transform duration-500 group-hover:scale-105';
  return isVideo(src) ? (
    <video src={src} className={cls} autoPlay muted loop playsInline preload="metadata" aria-label={alt} />
  ) : (
    <img src={src} alt={alt} className={cls} />
  );
}
interface PolaroidCardProps {
  id: string;
  title: string;
  image?: string;
  placeholder?: string;
  meta?: string;
  text?: ReactNode;
  tags?: string[];
  links?: { label: string; href: string }[];
  sticker?: string;
  media?: string[];
  attach?: 'tape' | 'pin' | 'clip';
  i?: number;
  base?: number;
  className?: string;
}

export default function PolaroidCard({
  id, title, image, placeholder, meta, text, tags, links, sticker, media = [],
  attach = 'tape', i = 0, base, className = '',
}: PolaroidCardProps) {
  const [ref, inView] = useInView<HTMLElement>();
  const hangs = attach !== 'tape';
  const [shown, setShown] = useState(0);
  const current = media[shown % media.length];
  const many = media.length > 1;
  // media cards size to their photo; an empty one keeps a fixed width for its placeholder
  const size = media.length ? 'w-min min-w-44' : placeholder && !image ? 'w-56' : '';

  return (
    <article
      ref={ref}
      className={`polaroid group sway ${hangs ? 'a-swing' : 'a-drop'} ${inView ? 'inview' : ''} ${size} ${className}`}
      style={vars({ r: tilt(id), i, base })}
    >
      {attach === 'tape' && <span className="tape a-tape" aria-hidden="true" />}
      {attach === 'pin' && (
        <Scribble type="pin" color="#B03A2E" className="a-pop absolute -top-5 left-1/2 -ml-3.5 z-20" />
      )}
      {attach === 'clip' && (
        <Scribble type="clip" color="#C4A77D" className="absolute -top-7 left-1/2 -ml-2.5 z-20" />
      )}

      {sticker && (
        <span className="sticker a-peel absolute -top-3 -right-3 z-20 text-xs" style={vars({ r: 8, base: 700 })}>
          {sticker}
        </span>
      )}

      <Scribble type="sparkle" className="hover-sparkle absolute -top-4 -left-4 z-20 w-7 h-7" />

      {current && !many && (
        <div className="overflow-hidden bg-line">
          <Shot src={current} alt={title} />
        </div>
      )}
      {current && many && (
        <button
          type="button"
          onClick={() => setShown((n) => n + 1)}
          className="relative block aspect-video w-[min(26rem,75vw)] cursor-pointer overflow-hidden bg-[#2D2A24]"
          aria-label={`${title}: show the next one (${(shown % media.length) + 1} of ${media.length})`}
        >
          {/* tall photos get a blurred copy of themselves behind them instead of empty bars */}
          {!isVideo(current) && (
            <img src={current} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-xl" />
          )}
          {/* re-keyed so each new photo shuffles in */}
          <Shot key={shown} src={current} alt="" fit />
          <span className="absolute bottom-1.5 right-2 rounded-full bg-black/55 px-2 font-mono text-[0.65rem] text-white">
            {(shown % media.length) + 1}/{media.length}
          </span>
        </button>
      )}
      {image && (
        <div className="aspect-[4/3] w-full overflow-hidden bg-line">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      {!image && !current && placeholder && (
        <div className="grid aspect-[4/3] w-full place-items-center bg-line/60 font-marker text-lg text-ink-muted">
          {placeholder}
        </div>
      )}

      <div className="space-y-2 pt-3">
        {meta && <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">{meta}</p>}
        <h3 className="font-serif text-lg font-semibold leading-snug">{title}</h3>
        {text && <p className="font-serif text-sm leading-relaxed text-ink-muted">{text}</p>}
        {many && <p className="font-hand text-lg leading-none text-pen">tap the photo for the next one →</p>}

        {tags && tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <li key={tag} className="rounded bg-line px-2 py-0.5 font-sans text-xs text-ink-muted">
                {tag}
              </li>
            ))}
          </ul>
        )}

        {links && links.length > 0 && (
          <div className="flex gap-4 pt-2 font-mono text-xs uppercase tracking-wider">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-sepia decoration-2 underline-offset-4 hover:text-sepia-dark"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
