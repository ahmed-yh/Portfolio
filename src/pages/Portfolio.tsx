import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import TableOfContents from '../components/TableOfContents';
import MobileTOC from '../components/MobileTOC';
import PolaroidCard from '../components/PolaroidCard';
import MarginNote from '../components/MarginNote';
import Scribble from '../components/Scribble';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Sketched from '../components/Sketched';
import Dossier from '../components/Dossier';
import { useInView, vars, tilt, hl } from '../lib';
import { photos, profile, projects, experience, hackathons, education, languages, skills, journey, outsideTheIde } from '../data';


/**
 * The blog's post page, as a portfolio: sticky TOC sidebar on the left,
 * numbered sections on the right, each one animating in as it's reached.
 */

function Section({ n, id, title, children }: { n: number; id: string; title: string; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section ref={ref} className={inView ? 'inview' : ''}>
      <h2 id={id} data-toc={title} className="post-h2">
        <span className="relative grid h-14 w-14 shrink-0 place-items-center">
          <Scribble type="circle" className="a-draw boil absolute inset-0" style={{ '--dur': '800ms' } as CSSProperties} />
          <span className="a-pop font-marker text-xl text-sepia-dark" style={vars({ base: 450 })}>
            {String(n).padStart(2, '0')}
          </span>
        </span>
        <span className="a-rise" style={vars({ base: 150 })}>{title}</span>
      </h2>
      {children}
    </section>
  );
}

function SeeAll({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} viewTransition className="redraw mt-10 inline-flex items-center gap-2 font-hand text-2xl text-pen hover:underline hover:decoration-wavy">
      {children}
      <Scribble type="arrow" color="var(--color-pen)" className="h-9 w-9" />
    </Link>
  );
}

const Row = ({ date, i, children }: { date: string; i: number; children: ReactNode }) => (
  <li className="a-rise relative grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4" style={vars({ i, base: 300 })}>
    <p className="pt-1.5 font-mono text-xs uppercase tracking-wider text-ink-muted">{date}</p>
    <div className="relative">{children}</div>
  </li>
);

const meta = [
  ['Role', profile.role],
  ['Based in', 'Amberg, DE'],
  ['Status', 'Open to work'],
  ['Languages', 'AR / EN / FR'],
  ['Coffee level', '87%'],
  ['Last tended', 'Sep 2026'],
];

export default function Portfolio() {
  return (
    <div className="post-page-bg font-serif">
      <MobileTOC />

      <div className="post-layout">
        <aside className="toc-sidebar">
          <Link to="/" viewTransition className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            Cover
          </Link>
          <TableOfContents />
          <p className="mt-10 -rotate-3 font-hand text-2xl leading-tight text-pen">
            currently: looking for my next thing <Scribble type="sparkle" className="inline h-4 w-4 animate-twinkle" />
          </p>
        </aside>

        <div className="post-content-wrapper">
          <main className="post-content">
            <article id="article-content">
              {/* Header */}
              <header className="inview relative border-b border-dashed border-ink pb-12">
                <Link to="/" viewTransition className="a-fade mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted lg:hidden">
                  <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                  Cover
                </Link>
                <p className="a-fade mb-4 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">sketchbook · vol. 2026</p>
                <h1 className="mb-6 font-serif text-4xl font-black leading-none tracking-tight sm:text-5xl md:text-6xl">
                  <Sketched text={profile.name} base={100} step={60} />
                </h1>
                <dl className="a-fade mb-10 grid gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-wider text-ink-muted sm:grid-cols-2" style={vars({ base: 300 })}>
                  {meta.map(([k, v]) => (
                    <div key={k}>
                      <dt className="inline font-bold">{k}:</dt> <dd className="inline">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start">
                  <div className="relative shrink-0">
                    <figure className="polaroid a-drop sway w-44" style={vars({ r: -3, base: 900 })}>
                      <span className="tape a-tape" aria-hidden="true" />
                      <div className="aspect-square overflow-hidden">
                        <img src={photos.header} alt={`${profile.name} with a robot and a laptop`} className="h-full w-full object-cover" />
                      </div>
                      <figcaption className="pt-2 text-center font-hand text-xl text-ink-muted">me & the robot</figcaption>
                      <span className="stamp a-stamp absolute -bottom-5 -right-8 bg-tan/70" style={vars({ base: 1100 })}>
                        open to
                        <br />
                        work ✦
                      </span>
                    </figure>
                    <p className="a-write boil mt-7 -rotate-3 text-center font-hand text-lg leading-none text-pen" style={vars({ base: 1700 })}>
                      (his name is jackal btw :) )
                    </p>
                  </div>

                  <div className="relative">
                    <p className="a-fade font-serif text-xl italic leading-relaxed" style={vars({ base: 700 })}>
                      {profile.quote}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="a-rise btn btn-outline" style={vars({ base: 900 })}>
                        <FileText className="h-4 w-4" aria-hidden="true" />
                        View Resume
                      </a>
                      <a href="#contact" className="a-rise btn border-2 border-transparent text-ink underline decoration-sepia decoration-2 underline-offset-4 hover:decoration-ink" style={vars({ base: 1000 })}>
                        Say hello
                      </a>
                    </div>
                    <MarginNote top={-10} base={1400}>hire me? i'm good company</MarginNote>
                  </div>
                </div>
              </header>

              <Section n={1} id="about" title="About">
                <Dossier />
              </Section>

              <Section n={2} id="experience" title="Experience">
                <ol className="space-y-10">
                  {experience.map((job, i) => (
                    <Row key={job.id} date={job.period} i={i}>
                      <h3 className="text-xl font-bold leading-snug">{job.role}</h3>
                      <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                        {job.company} · {job.place}
                      </p>
                      <p className="mt-2 leading-relaxed">{hl(job.line)}</p>
                      {job.note && <MarginNote top={0} base={900}>{job.note}</MarginNote>}
                    </Row>
                  ))}
                </ol>
                <SeeAll to="/experience">read the full field notes</SeeAll>
              </Section>

              <Section n={3} id="projects" title="Projects">
                <div className="grid gap-x-10 gap-y-14 pt-4 sm:grid-cols-2">
                  {projects.map((p, i) => (
                    <PolaroidCard
                      key={p.id}
                      id={p.id}
                      i={i % 2}
                      title={p.title}
                      image={p.image}
                      meta={p.role}
                      text={p.summary}
                      tags={p.tags.slice(0, 4)}
                      sticker={p.status}
                      links={[
                        ...(p.demo ? [{ label: 'Live demo', href: p.demo }] : []),
                        { label: 'GitHub', href: p.github },
                      ]}
                    />
                  ))}
                </div>
                <SeeAll to="/projects">see the whole project wall</SeeAll>
              </Section>

              <Section n={4} id="hackathons" title="Hackathons">
                <div className="mb-10 flex flex-wrap items-center gap-4">
                  <Scribble type="tally" color="var(--color-ink)" className="a-draw" style={{ '--base': '300ms', '--dur': '260ms' } as CSSProperties} />
                  <p className="a-write font-hand text-3xl text-pen" style={vars({ base: 2200 })}>
                    10+ hackathons in two years
                  </p>
                </div>
                <ol className="space-y-10">
                  {hackathons.map((h, i) => (
                    <Row key={h.id} date={h.date} i={i}>
                      <h3 className="pr-24 text-xl font-bold leading-snug">
                        {h.name} <span className="font-mono text-xs font-normal uppercase tracking-wider text-ink-muted">· {h.org}</span>
                      </h3>
                      <p className="mt-1 leading-relaxed text-ink-muted">{h.text}</p>
                      <span className="sticker a-peel absolute -top-1 right-0 text-base" style={vars({ r: tilt(h.id) * 2, base: 700 })}>
                        winner ★
                      </span>
                    </Row>
                  ))}
                </ol>
              </Section>

              <Section n={5} id="skills" title="Skills">
                <div className="space-y-6">
                  {skills.map((group, gi) => (
                    <div key={group.group} className="grid items-start gap-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
                      <p className="a-write font-hand text-2xl text-pen" style={vars({ i: gi, base: 200 })}>{group.group}</p>
                      <ul className="flex flex-wrap gap-3">
                        {group.items.map((item, i) => (
                          <li key={item} className="sticker a-peel text-sm" style={vars({ r: tilt(item), i: gi + i * 0.6, base: 300 })}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>

              <Section n={6} id="education" title="Education">
                <div className="space-y-10">
                  {education.map((ed, i) => (
                    <div key={ed.id} className="index-card a-deal max-w-xl" style={vars({ r: i ? 1 : -1, i: i * 3, base: 200 })}>
                      <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">{ed.period}</p>
                      <h3 className="text-xl font-bold">{ed.degree}</h3>
                      <p>{ed.school} · {ed.place}</p>
                      {ed.courses.length > 0 && <p className="text-sm text-ink-muted">{ed.courses.join(' · ')}</p>}
                      {ed.stamp && (
                        <span className="stamp stamp-round a-stamp absolute -right-4 -top-10 w-28 bg-card/70 sm:-right-10" style={vars({ base: 900 })}>
                          {ed.stamp}
                          <br />
                          ★ 2026 ★
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-12 flex flex-wrap items-center gap-3">
                  <span className="a-write mr-2 font-hand text-2xl text-pen" style={vars({ base: 600 })}>i speak:</span>
                  {languages.map((l, i) => (
                    <span key={l.name} className="sticker a-peel text-sm" style={vars({ r: tilt(l.name), i, base: 800 })}>
                      {l.name} <span className="font-mono text-[0.65rem] opacity-70">{l.level}</span>
                    </span>
                  ))}
                </div>
              </Section>

              <Section n={7} id="journey" title="My Journey">
                <p className="a-fade mb-2 font-hand text-2xl text-pen">scroll along the line →</p>
                {/* the line sags, so each photo hangs a little lower towards the middle */}
                <div className="-mx-6 snap-x snap-mandatory overflow-x-auto px-6 pb-6">
                  <div className="relative flex w-max gap-10 pl-4 pr-12">
                    <svg className="a-draw absolute inset-x-0 top-2 h-14 w-full text-ink-muted" viewBox="0 0 1344 56" preserveAspectRatio="none" style={{ '--dur': '1400ms' } as CSSProperties} aria-hidden="true">
                      <path d="M0 6 Q 672 34 1344 6" pathLength={1} fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    {journey.map((j, i) => {
                      const t = (i + 0.5) / journey.length;
                      return (
                        <div key={j.id} className="shrink-0 snap-center" style={{ marginTop: 26 + 56 * t * (1 - t) }}>
                          <PolaroidCard attach="clip" id={j.id} i={i} base={700} title={j.title} meta={j.date} text={j.text} media={j.media} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Section>

              <Section n={8} id="outside-the-ide" title="Outside the IDE">
                <div className="prose-gwern mb-12">
                  <p>
                    When I step away from the screen I recharge by travelling, editing videos and chasing the next hackathon. Tap a photo to flip to the next one.
                  </p>
                </div>
                <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-14">
                  {outsideTheIde.map((o, i) => (
                    <PolaroidCard key={o.id} id={o.id} i={i} title={o.title} text={o.text} media={o.media} placeholder="photo coming soon :)" />
                  ))}
                </div>
              </Section>

              <Section n={9} id="github" title="GitHub">
                <figure className="a-drop sway relative mx-auto max-w-2xl" style={{ ...vars({ r: -1, base: 200 }), '--amp': '0.5deg' } as CSSProperties}>
                  <span className="tape a-tape" aria-hidden="true" />
                  <div className="receipt torn-bottom font-mono text-xs uppercase">
                    <div className="flex justify-between tracking-widest">
                      <span>github activity</span>
                      <span>@ahmed-yh</span>
                    </div>
                    <div className="my-3 border-t border-dashed border-[#2D2A24]/40" />
                    <img src="https://ghchart.rshah.org/C4A77D/ahmed-yh" alt="GitHub contribution chart for ahmed-yh over the last year" loading="lazy" className="w-full" onError={(e) => (e.currentTarget.hidden = true)} />
                    <div className="my-3 border-t border-dashed border-[#2D2A24]/40" />
                    <div className="flex justify-between">
                      <span>items: commits, lots</span>
                      <span>total: ∞</span>
                    </div>
                    <p className="mt-4 text-center tracking-[0.3em]">★ thank you for visiting ★</p>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="mt-2 block text-center underline underline-offset-4">
                      view on github ↗
                    </a>
                  </div>
                </figure>
              </Section>

              <Section n={10} id="contact" title="Contact">
                <Contact />
              </Section>
            </article>

            <div className="mt-24">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
