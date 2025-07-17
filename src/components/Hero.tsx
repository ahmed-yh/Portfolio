import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Hero: React.FC = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [nextPhraseIndex, setNextPhraseIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<number>();
  const navigate = useNavigate();

  const phrases = [
    "Applied AI Developer",
    "AI Enthusiast",
    "Building intelligent systems",
    "Let's innovate together!"
  ];

  useEffect(() => {
    const switchText = () => {
      setIsAnimating(true);
      
      // After animation completes (500ms), update indices
      setTimeout(() => {
        setCurrentPhraseIndex(nextPhraseIndex);
        setNextPhraseIndex((nextPhraseIndex + 1) % phrases.length);
        setIsAnimating(false);
      }, 500);
    };

    timeoutRef.current = window.setTimeout(switchText, 3000);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [nextPhraseIndex, phrases.length]);

  // Handle video setup
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = 'auto';
      videoRef.current.load();
      
      const playVideo = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            document.addEventListener('click', () => {
              videoRef.current?.play();
            }, { once: true });
          });
        }
      };

      videoRef.current.addEventListener('loadeddata', playVideo);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', playVideo);
        }
      };
    }
  }, []);

  const handleKnowMore = useCallback(async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const section = document.querySelector('section');
    if (section) {
      section.classList.add('fade-out');
    }

    await new Promise(resolve => setTimeout(resolve, 250));
    navigate('/portfolio', { replace: false });
  }, [navigate, isTransitioning]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        >
          <source src="src/material/videos/b5low.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-theme-dark-primary/30 to-theme-dark-primary/60 dark:from-theme-dark-primary/30 dark:to-theme-dark-primary/60 light:from-theme-light-primary/30 light:to-theme-light-primary/60"></div>
      </div>

      {/* Animated background grid with reduced opacity */}
      <div className="absolute inset-0 opacity-10 z-[1]">
        <div className="grid-pattern animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-center">
        <div className="max-w-2xl text-center">
          {/* Main Headline */}
          <div className="mb-6">
            <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-fredoka font-bold bg-clip-text text-transparent bg-gradient-to-r from-theme-dark-accent1 via-theme-dark-accent2 to-theme-dark-accent1 dark:from-theme-dark-accent1 dark:via-theme-dark-accent2 dark:to-theme-dark-accent1 light:from-theme-light-accent1 light:via-theme-light-accent2 light:to-theme-light-accent1 animate-gradient leading-tight">
              Hello, I'm Ahmed Yassine
            </h1>
          </div>
          
          {/* Dynamic Text Container */}
          <div className="h-24 flex items-center justify-center mb-12 overflow-hidden">
            <div className="relative h-full w-full flex flex-col justify-center">
              {/* Current Text */}
              <p 
                className={`text-center text-2xl md:text-3xl lg:text-4xl text-theme-dark-accent1/80 dark:text-theme-dark-accent1/80 light:text-theme-light-accent1/80 font-caveat font-bold tracking-wide absolute w-full whitespace-nowrap ${
                  isAnimating ? 'animate-slide-out' : ''
                }`}
              >
                {phrases[currentPhraseIndex]}
              </p>
              {/* Next Text */}
              <p 
                className={`text-center text-2xl md:text-3xl lg:text-4xl text-theme-dark-accent1/80 dark:text-theme-dark-accent1/80 light:text-theme-light-accent1/80 font-caveat font-bold tracking-wide absolute w-full whitespace-nowrap ${
                  isAnimating ? 'animate-slide-in' : 'translate-y-full opacity-0'
                }`}
              >
                {phrases[nextPhraseIndex]}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleKnowMore}
              disabled={isTransitioning}
              className={`font-fredoka font-semibold cyberpunk-btn cyberpunk-btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-theme-dark-accent1 to-theme-dark-accent2 dark:from-theme-dark-accent1 dark:to-theme-dark-accent2 light:from-theme-light-accent1 light:to-theme-light-accent2 text-white ${
                isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{isTransitioning ? 'Loading...' : 'Explore My Work'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Navbar */}
      <Navbar />

      {/* Scroll Indicator - Adjusted positioning */}
      <div className="absolute bottom-24 inset-x-0 mx-auto flex justify-center animate-bounce z-10">
        <ChevronDown className="text-theme-dark-accent1 dark:text-theme-dark-accent1 light:text-theme-light-accent1 w-8 h-8" />
      </div>
    </section>
  );
};

export default Hero;