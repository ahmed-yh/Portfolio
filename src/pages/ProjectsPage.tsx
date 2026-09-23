import GardenPage from '../components/GardenPage';
import PolaroidCard from '../components/PolaroidCard';
import { projects } from '../data';

export default function ProjectsPage() {
  return (
    <GardenPage
      title="The Project Wall"
      subtitle="Everything I've built, pinned up where I can see it"
      intro={
        <>
          <p>
            Every project here started as a line in a notebook: a "what if the camera could count the queue?" or a "why can't a spreadsheet just explain itself?". Some became demos, some went live, all of them taught me something.
          </p>
          <p className="italic text-ink-muted">Open the live demos, or dig through the code on GitHub.</p>
        </>
      }
    >
      <div className="garden-connections mx-auto grid max-w-6xl gap-x-10 gap-y-20 pt-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <PolaroidCard
            key={p.id}
            id={p.id}
            attach="pin"
            i={i % 3}
            title={p.title}
            image={p.image}
            meta={p.role}
            text={p.description}
            tags={p.tags}
            sticker={p.status}
            links={[
              ...(p.demo ? [{ label: 'Live demo', href: p.demo }] : []),
              { label: 'GitHub', href: p.github },
            ]}
          />
        ))}
      </div>
    </GardenPage>
  );
}
