import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMusic } from './MusicContext';

/** Offers music the first time the visitor opens the sketchbook (any page but the cover). */
export default function MusicManager() {
  const { pathname } = useLocation();
  const { triggerMusicExperience, hasInteracted, isMusicReady } = useMusic();

  useEffect(() => {
    if (pathname === '/' || hasInteracted || !isMusicReady) return;
    const timer = setTimeout(triggerMusicExperience, 1000);
    return () => clearTimeout(timer);
  }, [pathname, hasInteracted, isMusicReady, triggerMusicExperience]);

  return null;
}
