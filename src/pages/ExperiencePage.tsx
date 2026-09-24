import type { ReactNode } from 'react';
import GardenPage from '../components/GardenPage';
import { experience } from '../data';
import { useInView, vars, tilt, hl } from '../lib';

/** A 3x5 index card, dealt onto the table the first time it scrolls into view. */
function IndexCard({ id, i, children }: { id: string; i: number; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <article ref={ref} className={`index-card a-deal ${inView ? 'inview' : ''}`} style={vars({ r: tilt(id), i })}>
      {children}
    </article>
  );
}

export default function ExperiencePage() {
  return (
    <GardenPage
      title="Field Notes"
      subtitle="Where I've worked, and what I built there"
      intro={
        <>
          <p>
            From labeling 20,000 images to rebuilding tunnels from LiDAR scans, plus one production deploy I'll never forget. These are the notes I kept along the way.
          </p>
          <p className="italic text-ink-muted">Highlighted bits are the numbers I'm proudest of.</p>
        </>
      }
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-14 md:grid-cols-2">
          {experience.map((job, i) => (
            <IndexCard key={job.id} id={job.id} i={i}>
              <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">{job.period} · {job.place}</p>
              <h2 className="font-serif text-2xl font-bold leading-snug">{job.role}</h2>
              <p className="font-hand text-2xl text-pen">@ {job.company}</p>
              <ul className="mt-2 list-['–__'] pl-4">
                {job.bullets.map((b) => (
                  <li key={b}>{hl(b)}</li>
                ))}
              </ul>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <li key={s} className="rounded bg-line px-2 py-0.5 font-sans text-xs text-ink-muted">{s}</li>
                ))}
              </ul>
            </IndexCard>
          ))}
        </div>
      </div>
    </GardenPage>
  );
}
