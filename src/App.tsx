import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import PreloadManager from './components/PreloadManager';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const MyStory = lazy(() => import('./components/MyStory'));
const AIProjects = lazy(() => import('./components/AIProjects'));
const Contact = lazy(() => import('./components/Contact'));
const SharedVideoBackground = lazy(() => import('./components/SharedVideoBackground'));
const BackToHome = lazy(() => import('./components/BackToHome'));

// Preload all components
const preloadComponents = () => {
  const components = [
    import('./components/Hero'),
    import('./components/AboutMe'),
    import('./components/MyStory'),
    import('./components/AIProjects'),
    import('./components/Contact'),
    import('./components/SharedVideoBackground'),
    import('./components/BackToHome')
  ];
  return Promise.all(components);
};

// Main content page component
const MainContent = () => {
  return (
    <div className="relative min-h-screen bg-theme-dark-primary dark:bg-theme-dark-primary light:bg-theme-light-primary text-theme-dark-text dark:text-theme-dark-text light:text-theme-light-text">
      <Suspense fallback={<LoadingSpinner />}>
        <SharedVideoBackground />
        <div className="relative z-10 fade-in">
          <AboutMe />
          <MyStory />
          <AIProjects />
          <Contact />
        </div>
        <BackToHome />
      </Suspense>
    </div>
  );
};

function App() {
  // Start preloading components immediately
  useEffect(() => {
    preloadComponents();
  }, []);

  return (
    <ThemeProvider>
      <PreloadManager>
        <Router>
          <ThemeToggle />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/portfolio" element={<MainContent />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </Router>
      </PreloadManager>
    </ThemeProvider>
  );
}

export default App;