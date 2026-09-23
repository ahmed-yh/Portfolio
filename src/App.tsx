import { useEffect } from 'react';
import { BrowserRouter, MemoryRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Portfolio from './pages/Portfolio';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import LampToggle from './components/LampToggle';
import { MusicProvider } from './components/music/MusicContext';
import MusicManager from './components/music/MusicManager';
import MusicPopup from './components/music/MusicPopup';
import VinylPlayer from './components/music/VinylPlayer';

// Artifact builds are served without real paths, so routing stays in memory there
const Router = import.meta.env.MODE === 'artifact' ? MemoryRouter : BrowserRouter;

/** New page = top of the page (unless we're jumping to a #section). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <MusicProvider>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="boil">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="1">
            <animate attributeName="seed" values="1;2;3" dur="0.36s" calcMode="discrete" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>
      </svg>
      <Router>
        <ScrollToTop />
        <MusicManager />
        <LampToggle />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <MusicPopup />
        <VinylPlayer />
      </Router>
    </MusicProvider>
  );
}

export default App;
