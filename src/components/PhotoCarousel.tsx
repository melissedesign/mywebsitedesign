import React, { useState, useEffect, useRef } from 'react';

const PhotoCarousel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndices, setCurrentImageIndices] = useState([0, 1, 2, 3]);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Updated collection using existing project images with correct paths
  const allImages = [
    // ABISS project visuals
    '/images/webdesignforabisstokyo.png',
    '/images/BrandingDesignandLogoforabiss.png',
    '/images/abissmockup.png',
    '/images/BagDesignAbiss.png',
    
    // Linven project visuals
    '/images/taglinvenprintdesign.png',
    '/images/linvenvisual.png',
    '/images/businesscardlinven.png',
    '/images/linvenlogodesign.png',
    
    // KōLegal project visuals
    '/images/japaneselawfirm.png',
    '/images/kolegalprintdesign.png',
    '/images/kolegallogodesign.png',
    
    // SUBLEE2 project visuals - Updated paths
    '/images/subleelogodesign.png',
    '/images/itcompanyeventpass.png',
    '/images/usbsublee.png',
    '/images/digitalcompanyprintbook.png'
  ];

  // Auto-advance slideshow every 7 seconds for more elegant pacing
  useEffect(() => {
    if (!isPaused && isVisible) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndices(prevIndices => 
          prevIndices.map(index => (index + 1) % allImages.length)
        );
      }, 7000); // Increased to 7 seconds for more elegant timing
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isVisible, allImages.length]);

  // Intersection Observer for initial visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Clean 2x2 Grid Layout - No text, no dots */}
          <div 
            className="grid grid-cols-2 gap-3 md:gap-4 h-[400px] md:h-[500px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            
            {currentImageIndices.map((imageIndex, gridIndex) => {
              const imageUrl = allImages[imageIndex];
              return (
                <div
                  key={`${gridIndex}-${imageIndex}`}
                  className={`group relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg transition-all duration-[1500ms] ease-out transform ${
                    isVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${gridIndex * 200}ms` : '0ms'
                  }}
                >
                  {/* Gentle floating animation */}
                  <div className="w-full h-full animate-gentle-float" style={{ animationDelay: `${gridIndex * 2}s` }}>
                    <img
                      src={imageUrl}
                      alt={`Project ${gridIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-[2000ms] ease-out group-hover:scale-105 group-hover:brightness-105"
                      loading="lazy"
                      onError={(e) => {
                        console.log(`Failed to load image: ${imageUrl}`);
                        // Fallback to a placeholder or hide the image
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    
                    {/* Ultra-subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent transition-opacity duration-[1500ms]" />
                    
                    {/* Gentle hover glow */}
                    <div className="absolute inset-0 bg-white/3 opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms]" />
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

export default PhotoCarousel;