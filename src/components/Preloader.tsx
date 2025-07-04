import React, { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // Skip preloader for returning users to improve performance
      setIsVisible(false);
      return;
    }

    // Mark as visited
    localStorage.setItem('hasVisited', 'true');

    // Start the fill animation after a brief delay
    const fillTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 600); // Reduced from 800ms for faster loading

    // Hide preloader after animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2800); // Reduced from 3200ms for faster loading

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-300 ${
        animationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        transitionDelay: animationComplete ? '1800ms' : '0ms' // Reduced delay
      }}
    >
      <div className="relative">
        {/* Logo container with optimized animation */}
        <div className="w-32 h-32 md:w-40 md:h-40 relative">
          {/* Background logo (outline) */}
          <img
            src="/images/logothemelissedesign.png"
            alt="TheMelisseDesign Logo"
            className="w-full h-full object-contain opacity-20"
            loading="eager"
            decoding="sync"
          />
          
          {/* Filling logo with mask animation */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: animationComplete 
                ? 'inset(0 0 0 0)' 
                : 'inset(0 100% 0 0)',
              transition: 'clip-path 1800ms cubic-bezier(0.4, 0, 0.2, 1)' // Reduced from 2000ms
            }}
          >
            <img
              src="/images/logothemelissedesign.png"
              alt="TheMelisseDesign Logo"
              className="w-full h-full object-contain"
              loading="eager"
              decoding="sync"
            />
          </div>
        </div>

        {/* Optimized loading indicator */}
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