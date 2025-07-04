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
      image: '/images/webdesignforabisstokyo.png',
      hoverImage: '/images/abissmockup.png',
    },
    {
      id: 'linven',
      title: 'Linven',
      categories: ['Brand Identity', 'Web Design', 'Print Design'],
      image: '/images/taglinvenprintdesign.png',
      hoverImage: '/images/businesscardlinven.png',
    },
    {
      id: 'kolegal',
      title: 'KōLegal',
      categories: ['Brand Identity', 'Print Design'],
      image: '/images/japaneselawfirmpng.png',
      hoverImage: '/images/kolegalprintdesign.png',
    },
    {
      id: 'SUBLEE2',
      title: 'SUBLEE2',
      categories: ['Brand Identity', 'UX/UI Design'],
      image: '/images/subleelogodesign.png',
      hoverImage: '/images/iicompanyeventpass.png',
    }
  ];

  // Initialize arrays
  useEffect(() => {
    setVisibleProjects(new Array(projects.length).fill(false));
    setImagesLoaded(new Array(projects.length).fill(false));
  }, [projects.length]);

  // Optimized scroll-based animation with better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Enhanced progressive image loading
  useEffect(() => {
    const loadImagesProgressively = async () => {
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        
        try {
          // Load images with priority for first two projects
          const priority = i < 2 ? 'high' : 'low';
          
          await Promise.all([
            new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve(); // Continue even if image fails
              img.src = project.image;
              if (priority === 'high') {
                img.fetchPriority = 'high';
              }
            }),
            new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = project.hoverImage;
              if (priority === 'high') {
                img.fetchPriority = 'high';
              }
            })
          ]);

          // Mark this project's images as loaded
          setImagesLoaded(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });

          // Add small delay between loading different projects for better performance
          if (i < projects.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } catch (error) {
          console.warn(`Failed to load images for project ${i}:`, error);
          // Mark as loaded even if failed to prevent infinite loading
          setImagesLoaded(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }
      }
    };

    loadImagesProgressively();
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
      className="py-12 md:py-16 lg:py-20 bg-white content-section"
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

          {/* Enhanced Grid Layout with Performance Optimizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {projects.map((project, index) => {
              const isVisible = visibleProjects[index];
              const isImageLoaded = imagesLoaded[index];
              
              return (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className={`project-card group relative cursor-pointer transition-all duration-700 ease-out optimized-animation ${
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
                      
                      {/* Enhanced loading placeholder with skeleton effect */}
                      {!isImageLoaded && (
                        <div className="absolute inset-0 skeleton-loading flex items-center justify-center z-10">
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
                        loading={index < 2 ? "eager" : "lazy"} // Load first 2 images eagerly
                        decoding="async"
                        fetchPriority={index < 2 ? "high" : "auto"}
                        style={{
                          // Optimize image rendering and ensure consistent sizing
                          imageRendering: 'auto',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0)',
                          objectPosition: 'center center',
                          contentVisibility: 'auto'
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
                        style={{
                          // Optimize image rendering and ensure consistent sizing
                          imageRendering: 'auto',
                          backfaceVisibility: 'hidden',
                          transform: 'translateZ(0) scale(1.05)',
                          objectPosition: 'center center',
                          contentVisibility: 'auto'
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