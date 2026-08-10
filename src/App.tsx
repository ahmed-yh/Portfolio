import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import MyStory from './components/MyStory';
import AIProjects from './components/AIProjects';
import Contact from './components/Contact';
import SharedVideoBackground from './components/SharedVideoBackground';
import BackToHome from './components/BackToHome';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

// Main content page component
const MainContent = () => {
  return (
    <div className="relative min-h-screen bg-theme-dark-primary dark:bg-theme-dark-primary light:bg-theme-light-primary text-theme-dark-text dark:text-theme-dark-text light:text-theme-light-text">
      <SharedVideoBackground />
      <div className="relative z-10 fade-in">
        <AboutMe />
        <MyStory />
        <AIProjects />
        <Contact />
      </div>
      <BackToHome />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/portfolio" element={<MainContent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;