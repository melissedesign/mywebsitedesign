import React, { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // Skip preloader for returning users
      setIsVisible(false);
      return;
    }

    // Mark as visited
    localStorage.setItem('hasVisited', 'true');

    // Start the fill animation after a brief delay
    const fillTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);

    // Hide preloader after animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3200); // 800ms delay + 2000ms fill + 400ms fade out

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-400 ${
        animationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        transitionDelay: animationComplete ? '2000ms' : '0ms'
      }}
    >
      <div className="relative">
        {/* Logo container with animation */}
        <div className="w-32 h-32 md:w-40 md:h-40 relative">
          {/* Background logo (outline) */}
          <img
            src="https://res.cloudinary.com/dzvgatvfg/image/upload/v1749460776/TheMelisseDesign_Website_qytc64.png"
            alt="TheMelisseDesign Logo"
            className="w-full h-full object-contain opacity-20"
          />
          
          {/* Filling logo with mask animation */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: animationComplete 
                ? 'inset(0 0 0 0)' 
                : 'inset(0 100% 0 0)',
              transition: 'clip-path 2000ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <img
              src="https://res.cloudinary.com/dzvgatvfg/image/upload/v1749460776/TheMelisseDesign_Website_qytc64.png"
              alt="TheMelisseDesign Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Subtle loading indicator */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div 
              className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
              style={{ animationDelay: '0ms' }}
            />
            <div 
              className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
              style={{ animationDelay: '200ms' }}
            />
            <div 
              className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
              style={{ animationDelay: '400ms' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;