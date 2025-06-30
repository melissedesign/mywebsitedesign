import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollToTop';

/**
 * Component that automatically scrolls to top on route changes
 * Place this component inside Router but outside Routes
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever the pathname changes
    scrollToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;