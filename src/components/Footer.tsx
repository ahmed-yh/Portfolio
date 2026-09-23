import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="border-t border-dashed border-ink/40 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-sans text-sm text-ink-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-hand text-xl text-pen">made with too much coffee ☕</p>
      </div>
    </footer>
  );
}
