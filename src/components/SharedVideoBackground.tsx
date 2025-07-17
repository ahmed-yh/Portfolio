import React, { useRef, useEffect } from 'react';

const SharedVideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = 'auto';
      videoRef.current.load();
      
      // Ensure video plays when it's loaded
      const playVideo = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            // Autoplay might be blocked, we'll try again on user interaction
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

  return (
    <div className="fixed inset-0 z-0 min-h-screen">
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
        <source src="src/material/videos/b4.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
    </div>
  );
};

export default SharedVideoBackground; 