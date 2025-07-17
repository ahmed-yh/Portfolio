import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const BackToHome: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show the button on the home page
  if (location.pathname === '/') {
    return null;
  }

  const handleBack = useCallback(async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Add fade-out animation to the main content
    const mainContent = document.querySelector('.fade-in');
    if (mainContent) {
      mainContent.classList.remove('fade-in');
      mainContent.classList.add('fade-out');
    }
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Navigate home
    navigate('/', { replace: false });
  }, [navigate, isTransitioning]);

  return (
    <button
      onClick={handleBack}
      disabled={isTransitioning}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 
        transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20
        ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Home className="w-6 h-6 text-white" />
      
      {/* Tooltip */}
      <div
        className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap
          bg-black/80 text-white text-sm px-3 py-1 rounded-md transition-opacity duration-200
          ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        Back to Home
      </div>

      {/* Glowing effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50 blur-md -z-10"></div>
    </button>
  );
};

export default BackToHome; 