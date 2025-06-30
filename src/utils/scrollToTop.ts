/**
 * Utility function to scroll to top of page
 * Compatible with all major browsers and handles edge cases
 */
export const scrollToTop = (behavior: ScrollBehavior = 'instant') => {
  // Primary method - modern browsers
  if (window.scrollTo) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior
    });
  }
  
  // Fallback for older browsers
  if (document.documentElement.scrollTop !== 0) {
    document.documentElement.scrollTop = 0;
  }
  
  if (document.body.scrollTop !== 0) {
    document.body.scrollTop = 0;
  }
};

/**
 * Hook to automatically scroll to top on route changes
 */
export const useScrollToTop = () => {
  React.useEffect(() => {
    scrollToTop();
  }, []);
};

// Re-export React for the hook
import React from 'react';