import React, { useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSrc, opacity = 0.6 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = 'auto';
      videoRef.current.load();
    }
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute w-full h-full object-cover"
        style={{ 
          willChange: 'transform',
          opacity: opacity
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
    </div>
  );
};

export default VideoBackground; 