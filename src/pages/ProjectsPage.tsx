import GardenPage from '../components/GardenPage';
import PolaroidCard from '../components/PolaroidCard';
import { projects } from '../data';

export default function ProjectsPage() {
  return (
    <GardenPage
      title="The Project Wall"
      subtitle="What I've built, pinned up where I can see it"
      intro={
        <>
          <p>
            Each of these started as a question in my notes, like "what if a camera could count the queue?" or "why can't a spreadsheet explain itself?". Two of them are demos and one is live.
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
