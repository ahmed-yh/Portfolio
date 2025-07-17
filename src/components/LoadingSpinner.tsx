import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative">
      {/* Outer ring */}
      <div className="w-24 h-24 border-8 border-cyan-500/20 rounded-full animate-spin">
        {/* Inner highlight */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-purple-500 rounded-full animate-spin-fast"></div>
      </div>

      {/* Center elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Pulsing dot */}
        <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-20 blur-xl animate-pulse"></div>
    </div>
  );
};

export default LoadingSpinner; 