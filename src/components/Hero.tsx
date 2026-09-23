import type { CSSProperties, ReactNode } from 'react';
import { Github, Linkedin } from 'lucide-react';
import Doodles from './Doodles';
import Scribble from './Scribble';
import Sketched from './Sketched';
import SketchbookLink from './SketchbookLink';
import { profile } from '../data';
import { vars } from '../lib';
import photo from '../material/cropped_image.png';

/**
 * Landing page: the blog hero turned into a sketchbook cover.
 * One slow timeline on load (ms): the name sketches itself in letter by letter,
 * then everything else is drawn, dropped and stamped around it; after that
 * the letters, stickers and polaroid keep moving gently at rest.
 */
const T = {
  hi: 100,
  name: 500, // 12 letters x 130ms, inked by ~2.9s
  photo: 1700,
  underline: 2500,
  sparkle: 2950,
  strike1: 3050,
  role: 3350,
  stamp: 3300,
  quote: 4400,
  note: 4300,
  socials: 4700,
  book: 5200,
  idle: 6600,
};

/** A word crossed out in red pen, drawn at `base` ms. */
function Struck({ children, base }: { children: ReactNode; base: number }) {
  return (
    <span className="relative inline-block text-ink-muted">
      {children}
      <svg
        className="a-draw boil absolute -left-[6%] top-1/2 h-5 w-[112%] -translate-y-1/2 text-redpen"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        style={{ '--base': `${base}ms`, '--dur': '450ms' } as CSSProperties}
        aria-hidden="true"
      >
        <path d="M1 7 Q 30 3, 55 5.5 T 99 3" pathLength={1} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Hero() {
  const socials = [
    { label: 'GitHub', Icon: Github, href: profile.github },
    { label: 'LinkedIn', Icon: Linkedin, href: profile.linkedin },
  ];

  return (
    <main className="inview paper-texture hero-gradient relative flex min-h-screen items-center overflow-hidden">
      <Doodles />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-20 px-6 py-24 md:grid-cols-[1.25fr_1fr] md:gap-12">
        {/* Left: who */}
        <div className="text-center md:text-left">
          <p className="a-write font-hand text-3xl text-pen" style={vars({ base: T.hi })}>
            hi, i'm
          </p>

          <h1 className="relative inline-block w-min font-serif text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
            <Sketched text={profile.shortName} base={T.name} step={130} />
            <Scribble type="underline" className="a-draw boil absolute -bottom-3 left-0 -z-10 h-6 w-full opacity-80" style={{ '--base': `${T.underline}ms`, '--dur': '800ms' } as CSSProperties} />
            <span className="a-pop absolute -right-8 -top-6" style={vars({ base: T.sparkle })}>
              <Scribble type="sparkle" className="h-10 w-10 animate-twinkle" />
            </span>
          </h1>

          <p className="mt-8 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2 font-serif text-2xl sm:text-3xl md:justify-start">
            <Struck base={T.strike1}>student</Struck>
            <span className="a-write font-marker text-3xl text-ink sm:text-4xl" style={vars({ base: T.role })}>
              {profile.role}
            </span>
          </p>

          <p className="a-fade mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-ink-muted sm:text-xl md:mx-0" style={vars({ base: T.quote })}>
            <span className="relative">
              <span className="absolute -left-6 -top-5 font-serif text-6xl font-bold text-sepia opacity-40" aria-hidden="true">“</span>
              {profile.quote}
            </span>
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 md:justify-start">
            {socials.map(({ label, Icon, href }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="a-pop bump group rounded-full bg-ink p-4 text-paper shadow-md transition-[transform,box-shadow] duration-300 hover:[transform:translateY(-4px)] hover:shadow-xl"
                style={{ ...vars({ i, base: T.socials }), '--idle': `${T.idle}ms` } as CSSProperties}
              >
                <Icon className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mt-14">
            <SketchbookLink base={T.book} />
          </div>
        </div>

        {/* Right: the photo, taped in, stamped, annotated */}
        <div className="relative mx-auto w-60 sm:w-72">
          <figure className="polaroid a-drop sway" style={vars({ r: 4, base: T.photo })}>
            <span className="tape a-tape" aria-hidden="true" />
            <img src={photo} alt={`Portrait of ${profile.name}`} className="block aspect-square w-full" />
            <figcaption className="pt-3 text-center font-hand text-2xl text-ink-muted">amberg, de</figcaption>
          </figure>

          <span className="stamp a-stamp absolute -bottom-8 -right-10 z-30 bg-paper/70 text-sm" style={vars({ base: T.stamp })}>
            open to
            <br />
            work ✦
          </span>

          <p className="absolute -left-4 top-6 flex -translate-x-full items-start gap-1 font-hand text-2xl leading-tight text-pen max-md:static max-md:mt-10 max-md:translate-x-0 max-md:justify-center">
            <span className="a-write boil w-36 -rotate-6 max-md:w-auto" style={vars({ base: T.note })}>
              that's me (probably debugging)
            </span>
            <Scribble type="arrow" color="var(--color-pen)" className="a-draw boil h-10 w-10 shrink-0 rotate-12 max-md:hidden" style={vars({ base: T.note + 800 })} />
          </p>
        </div>
      </div>

    </main>
  );
}
