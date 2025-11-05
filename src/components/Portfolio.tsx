import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveScrollPosition } from '../utils/scrollPosition';

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const portfolioRef = useRef<HTMLElement>(null);

  const projects = [
    {
      id: 'abiss',
      title: 'ABISS',
      categories: ['Brand Identity', 'Web Design', 'Packaging Design'],
      image: '/images/Abiss/abisswebdesign.png',
      hoverImage: '/images/Abiss/abisspackagingdesign.png',
    },
    {
      id: 'linven',
      title: 'Linven',
      categories: ['Brand Identity', 'Web Design', 'Print Design'],
      image: '/images/Linven/llinvenbusinesscard.png',
      hoverImage: '/images/Linven/linvenprintdesign.png',
    },
    {
      id: 'kolegal',
      title: 'KōLegal',
      categories: ['Brand Identity', 'Print Design'],
      image: '/images/KoLegal/kolegallogodesign.png',
      hoverImage: '/images/KoLegal/kolegalprintdesign.png',
    },
    {
      id: 'sublee',
      title: 'SUBLEE2',
      categories: ['Brand Identity', 'UX/UI Design'],
      image: '/images/Sublee/subleelogodesign.png',
      hoverImage: '/images/Sublee/heroitcompanydesign.png',
    }
  ];

  // Initialize arrays
  useEffect(() => {
    setVisibleProjects(new Array(projects.length).fill(false));
    setImagesLoaded(new Array(projects.length).fill(false));
  }, [projects.length]);

  // Optimized scroll-based animation with better performance
  useEffect(() => {
    const handleScroll = () => {
      if (!portfolioRef.current) return;

      const projectCards = portfolioRef.current.querySelectorAll('.project-card');
      const newVisibleProjects: boolean[] = [];

      projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // More generous trigger point for smoother mobile experience
        const triggerPoint = windowHeight * 0.85;
        const isVisible = rect.top < triggerPoint && rect.bottom > 0;
        
        newVisibleProjects[index] = isVisible;
      });

      setVisibleProjects(newVisibleProjects);
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Preload images for smoother transitions with progressive loading
  useEffect(() => {
    projects.forEach((project, index) => {
      const img1 = new Image();
      const img2 = new Image();
      let loadedCount = 0;

      const handleImageLoad = () => {
        loadedCount++;
        if (loadedCount === 2) {
          setImagesLoaded(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }
      };

      img1.onload = handleImageLoad;
      img2.onload = handleImageLoad;
      img1.onerror = handleImageLoad; // Still mark as "loaded" even if error
      img2.onerror = handleImageLoad;

      // Add loading="lazy" equivalent for preloading
      img1.loading = 'lazy';
      img2.loading = 'lazy';
      
      img1.src = project.image;
      img2.src = project.hoverImage;
    });
  }, [projects]);

  const handleProjectClick = (projectId: string) => {
    // Save current scroll position before navigating
    saveScrollPosition();
    navigate(`/project/${projectId}`);
  };

  return (
    <section 
      ref={portfolioRef}
      id="portfolio" 
      className="py-12 md:py-16 lg:py-20 bg-white"
      style={{
        // Enable hardware acceleration for smoother scrolling
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Optimized mobile heading with significantly increased bottom margin */}
          <div className="text-center mb-16 md:mb-20 lg:mb-24">
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-sm">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-700">
                Selected Work
              </h2>
            </div>
          </div>

          {/* Fixed Grid Layout with Consistent Aspect Ratios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {projects.map((project, index) => {
              const isVisible = visibleProjects[index];
              const isImageLoaded = imagesLoaded[index];
              
              return (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className={`project-card group relative cursor-pointer transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    // Hardware acceleration for smoother animations
                    transform: isVisible ? 'translateZ(0) translateY(0) scale(1)' : 'translateZ(0) translateY(32px) scale(0.95)',
                    willChange: 'transform, opacity'
                  }}
                >
                  {/* Fixed Aspect Ratio Container - Ensures consistent sizing */}
                  <div className="relative w-full" style={{ paddingBottom: '75%' }}> {/* 4:3 aspect ratio */}
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
                      
                      {/* Loading placeholder */}
                      {!isImageLoaded && (
                        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
                          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                        </div>
                      )}
                      
                      {/* Default Image with optimized loading */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-105 ${
                          isImageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        decoding="async"
                        fetchPriority={index < 2 ? "high" : "low"}
                        style={{
                          // Optimize image rendering and ensure consistent sizing
                          imageRendering: 'auto',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                          objectPosition: 'center center'
                        }}
                      />
                      
                      {/* Hover Image with optimized loading */}
                      <img
                        src={project.hoverImage}
                        alt={`${project.title} - Alternative view`}
                        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 ${
                          !isImageLoaded ? 'hidden' : ''
                        }`}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        style={{
                          // Optimize image rendering and ensure consistent sizing
                          imageRendering: 'auto',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0) scale(1.05)',
                          objectPosition: 'center center'
                        }}
                      />

                      {/* Overlay with smoother transition */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

                      {/* Content with enhanced mobile animation */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-75">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100">
                          {project.categories.map((category, categoryIndex) => (
                            <span
                              key={categoryIndex}
                              className="px-2 md:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white transition-all duration-300 ease-out"
                              style={{
                                transitionDelay: `${100 + categoryIndex * 50}ms`
                              }}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;