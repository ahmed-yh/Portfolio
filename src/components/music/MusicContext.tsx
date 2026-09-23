import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Ported from the blog. Tracks are whatever audio files live in src/material/music
 * (Vite's glob replaces the blog's /api/music route); one is picked at random.
 * No silent autoplay: the popup asks first, and a click on "yes" is the user gesture.
 */
const tracks = Object.entries(
  import.meta.glob<string>('../../material/music/*.{mp3,m4a,ogg,wav}', { eager: true, query: '?url', import: 'default' })
);

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  playMusic: () => void;
  showPopup: boolean;
  dismissPopup: () => void;
  hasInteracted: boolean;
  triggerMusicExperience: () => void;
  trackName: string;
  isMusicReady: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [trackName, setTrackName] = useState('No music found');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (tracks.length === 0) return;
    const [path, url] = tracks[Math.floor(Math.random() * tracks.length)];
    // name from the source file ("../../material/music/Joey Bada$$ - 'Show Me'.mp3"), not the hashed build URL
    setTrackName(path.split('/').pop()!.replace(/\.[^/.]+$/, ''));

    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playMusic = useCallback(() => {
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playMusic();
    }
  }, [isPlaying, playMusic]);

  const triggerMusicExperience = useCallback(() => {
    setHasInteracted(true);
    setShowPopup(true);
  }, []);

  const dismissPopup = useCallback(() => setShowPopup(false), []);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        togglePlay,
        playMusic,
        showPopup,
        dismissPopup,
        hasInteracted,
        triggerMusicExperience,
        trackName,
        isMusicReady: tracks.length > 0,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within a MusicProvider');
  return context;
}
