import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on whether element is in viewport
        // This allows the animation to rewind when scrolling back up
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
        }`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll; 