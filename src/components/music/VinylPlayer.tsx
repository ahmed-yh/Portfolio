import { useEffect, useState } from 'react';
import { useMusic } from './MusicContext';
import { PlayIcon, PauseIcon } from './MusicIcons';
import Scribble from '../Scribble';
import { vars } from '../../lib';

/** Hand-drawn vinyl (ported from the blog): rolls in, spins while playing, shows the track for 5s. */
export default function VinylPlayer() {
  const { isPlaying, togglePlay, hasInteracted, trackName } = useMusic();
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    setShowInfo(true);
    const timer = setTimeout(() => setShowInfo(false), 5000);
    return () => clearTimeout(timer);
  }, [isPlaying]);

  if (!hasInteracted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end gap-6" style={{ viewTransitionName: 'vinyl' }}>
      <button
        onClick={togglePlay}
        className="roll-in group relative h-24 w-24 shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sepia"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <div className={`relative h-full w-full ${isPlaying ? 'scribble-spin' : ''}`}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-ink drop-shadow-xl" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="50" cy="50" r="45" fill="var(--color-card)" stroke="none" />
            <path d="M50 5 C 20 5, 5 25, 5 50 C 5 75, 25 95, 50 95 C 75 95, 95 75, 95 50 C 95 25, 75 5, 50 5 Z M 50 15 C 70 15, 85 30, 85 50 C 85 70, 70 85, 50 85 C 30 85, 20 70, 15 50 C 12 30, 30 15, 50 15" strokeDasharray="3 2" />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-ink-muted opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M50 25 A 25 25 0 1 0 50 75 A 25 25 0 1 0 50 25 Z" />
            <path d="M50 35 A 15 15 0 1 0 50 65 A 15 15 0 1 0 50 35 Z" />
          </svg>
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-sepia shadow-inner">
            <div className="h-1.5 w-1.5 rounded-full bg-paper" />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="rounded-full border-2 border-ink bg-paper/90 p-3 shadow-md">
            {isPlaying ? <PauseIcon className="h-8 w-8 text-ink" /> : <PlayIcon className="ml-0.5 h-8 w-8 text-ink" />}
          </div>
        </div>
      </button>

      <div
        className={`origin-left transition-all duration-700 ease-out max-sm:hidden ${
          showInfo ? 'translate-x-0 scale-100 opacity-100' : 'pointer-events-none -translate-x-10 scale-95 opacity-0'
        }`}
        aria-live="polite"
      >
        <div className="relative mb-4">
          <div className="absolute -left-6 bottom-2 rotate-12 scale-50 opacity-80">
            <Scribble type="arrow" color="var(--color-ink)" />
          </div>
          <div className="relative min-w-[200px] -rotate-1 rounded-sm border-2 border-ink bg-paper p-4 pr-6 shadow-[4px_4px_0px_var(--color-sepia)]">
            <div className="absolute -left-2 -top-3 -rotate-2 bg-ink px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-paper">
              Now Spinning
            </div>
            {/* remounts on play/pause so the name writes itself on again */}
            <p key={String(isPlaying)} className="inview mt-1 line-clamp-2 font-marker text-lg leading-tight">
              <span className="a-write block" style={vars({ base: 300 })}>{trackName}</span>
            </p>
            <div className="mt-2 max-w-[80%] opacity-50">
              <Scribble type="underline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
