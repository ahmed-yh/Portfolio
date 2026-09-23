import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Doodles from './Doodles';
import Scribble from './Scribble';
import Footer from './Footer';
import Sketched from './Sketched';
import { vars } from '../lib';

/**
 * The blog's /writings page shell: paper, floating doodles, a hand-underlined
 * title, a taped intro card with a drop cap, then whatever the page pins up.
 */
interface GardenPageProps {
  title: string;
  subtitle: string;
  intro: ReactNode;
  children: ReactNode;
}

export default function GardenPage({ title, subtitle, intro, children }: GardenPageProps) {
  return (
    <main className="paper-texture relative min-h-screen overflow-hidden bg-paper">
      {/* only the top of the page plays on load; the grid below animates card by card as it scrolls in */}
      <div className="inview">
      <Doodles />

      <Link
        to="/portfolio"
        viewTransition
        className="a-fade absolute left-6 top-6 z-20 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3 w-3" aria-hidden="true" />
        Back
      </Link>

      <header className="relative z-10 px-6 pb-12 pt-28 text-center">
        <h1 className="relative mb-4 inline-block font-serif text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
          <Sketched text={title} base={150} step={75} />
          <Scribble type="underline" className="a-draw boil absolute -bottom-2 -left-4 h-4 w-[110%]" style={vars({ base: 150 + title.length * 75 + 300 })} />
          <span className="a-pop absolute -right-9 -top-6" style={vars({ base: 150 + title.length * 75 + 700 })}>
            <Scribble type="sparkle" className="h-8 w-8 animate-twinkle" />
          </span>
        </h1>
        <p className="a-fade mx-auto max-w-2xl font-serif text-lg italic text-ink-muted sm:text-xl" style={vars({ base: 400 })}>
          {subtitle}
        </p>
      </header>

      <div className="relative z-10 mx-auto mb-20 max-w-3xl px-6">
        <div className="a-drop relative rounded-2xl border border-line bg-card p-8 shadow-sm transition-transform duration-500 hover:[transform:rotate(-1deg)] md:p-10" style={vars({ r: 1, base: 600 })}>
          <span className="tape a-tape" aria-hidden="true" />
          <div className="drop-cap mx-auto text-left font-serif leading-relaxed [&>p+p]:mt-4">
            {intro}
          </div>
        </div>
      </div>
      </div>

      <section className="relative z-10 px-6 pb-24">{children}</section>

      <Footer />
    </main>
  );
}
