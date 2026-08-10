import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import b5Video from '../material/videos/b5low.mp4';
import b4Video from '../material/videos/b4.mp4';

interface PreloadManagerProps {
  children: React.ReactNode;
}

const PreloadManager: React.FC<PreloadManagerProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Preload videos
    const videoPaths = [
      b5Video,
      b4Video
    ];

    let loadedVideos = 0;
    const totalAssets = videoPaths.length;

    const preloadVideo = (src: string) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement('video');
        
        video.onloadeddata = () => {
          loadedVideos++;
          setProgress((loadedVideos / totalAssets) * 100);
          resolve();
        };

        video.onerror = () => {
          console.error(`Error loading video: ${src}`);
          loadedVideos++;
          setProgress((loadedVideos / totalAssets) * 100);
          resolve();
        };

        video.src = src;
        video.load();
      });
    };

    // Preload all videos concurrently with a 1.5s fallback timeout
    const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, 1500));

    Promise.race([Promise.all(videoPaths.map(preloadVideo)), timeoutPromise])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error preloading assets:', error);
        setIsLoading(false);
      });

    // Cleanup
    return () => {
      setIsLoading(true);
      setProgress(0);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <LoadingSpinner />
        <div className="mt-8 w-64">
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2 text-cyan-400 font-audiowide">
            Loading Assets: {Math.round(progress)}%
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PreloadManager; 