/**
 * Utility functions for managing scroll position preservation
 */

export const saveScrollPosition = (key: string = 'mainPageScroll') => {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  sessionStorage.setItem(key, scrollPosition.toString());
};

export const restoreScrollPosition = (key: string = 'mainPageScroll') => {
  const savedPosition = sessionStorage.getItem(key);
  if (savedPosition) {
    const position = parseInt(savedPosition, 10);
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }, 100);
    // Clear the saved position after restoring
    sessionStorage.removeItem(key);
  }
};

export const clearScrollPosition = (key: string = 'mainPageScroll') => {
  sessionStorage.removeItem(key);
};