import React, { useState, useEffect } from 'react';

interface SectionTransitionProps {
  position?: 'top' | 'bottom';
  height?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  position = 'bottom',
  height = '12rem',
  intensity = 'medium'
}) => {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fadePoint = windowHeight * 0.8;

      const opacity = position === 'bottom'
        ? Math.max(0, Math.min(1, 1 - (scrollPosition / fadePoint)))
        : Math.max(0, Math.min(1, scrollPosition / fadePoint));

      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [position]);

  const gradientIntensities = {
    light: {
      start: 'rgba(255, 255, 255, 0)',
      mid1: 'rgba(255, 255, 255, 0.2)',
      mid2: 'rgba(255, 255, 255, 0.5)',
      mid3: 'rgba(255, 255, 255, 0.7)',
      end: 'rgba(255, 255, 255, 0.9)'
    },
    medium: {
      start: 'rgba(255, 255, 255, 0)',
      mid1: 'rgba(255, 255, 255, 0.3)',
      mid2: 'rgba(255, 255, 255, 0.6)',
      mid3: 'rgba(255, 255, 255, 0.85)',
      end: 'rgba(255, 255, 255, 1)'
    },
    strong: {
      start: 'rgba(255, 255, 255, 0)',
      mid1: 'rgba(255, 255, 255, 0.5)',
      mid2: 'rgba(255, 255, 255, 0.75)',
      mid3: 'rgba(255, 255, 255, 0.95)',
      end: 'rgba(255, 255, 255, 1)'
    }
  };

  const colors = gradientIntensities[intensity];

  const gradientStyle = position === 'bottom'
    ? {
        background: `linear-gradient(to bottom, ${colors.start} 0%, ${colors.mid1} 20%, ${colors.mid2} 40%, ${colors.mid3} 70%, ${colors.end} 100%)`
      }
    : {
        background: `linear-gradient(to top, ${colors.start} 0%, ${colors.mid1} 20%, ${colors.mid2} 40%, ${colors.mid3} 70%, ${colors.end} 100%)`
      };

  return (
    <div
      className={`absolute ${position === 'bottom' ? 'bottom-0' : 'top-0'} left-0 right-0 pointer-events-none z-10 transition-opacity duration-500 ease-out`}
      style={{
        height,
        ...gradientStyle,
        opacity: scrollOpacity,
        transform: 'translateZ(0)',
        willChange: 'opacity'
      }}
    />
  );
};

export default SectionTransition;
