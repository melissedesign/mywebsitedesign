import React, { useState, useEffect, useRef } from 'react';

const PhotoCarousel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndices, setCurrentImageIndices] = useState([0, 1, 2, 3]);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const allImages = [
    '/images/Abiss/abisswebdesign.png',
    '/images/Abiss/abisslogodesign.png',
    '/images/Abiss/abisspackagingdesign.png',
    '/images/Abiss/abissbagdesign.png',
    '/images/Linven/taglinvenprintdesign.png',
    '/images/Linven/linvenvisual.png',
    '/images/Linven/linvenbusinesscard.png',
    '/images/Linven/linvenlogodesign.png',
    '/images/KoLegal/kolegallogodesign.png',
    '/images/KoLegal/kolegalprintdesign.png',
    '/images/KoLegal/kolegalbusinesscard.png',
    '/images/Sublee/subleelogodesign.png',
    '/images/Sublee/subleeeventpass.png',
    '/images/Sublee/subleeusbdesign.png',
    '/images/Sublee/subleeprintdesign.png'
  ];

  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = allImages.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            resolve();
          };
          img.src = src;
        });
      });

      for (let i = 0; i < loadPromises.length; i++) {
        await loadPromises[i];
        if (i < loadPromises.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!isPaused && isVisible) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndices(prevIndices =>
          prevIndices.map(index => (index + 1) % allImages.length)
        );
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isVisible, allImages.length]);

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
    <section ref={sectionRef} className="py-16 bg-white content-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="grid grid-cols-2 gap-3 md:gap-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {currentImageIndices.map((imageIndex, gridIndex) => {
              const imageUrl = allImages[imageIndex];
              const isImageLoaded = imagesLoaded[imageIndex];

              return (
                <div
                  key={`${gridIndex}-${imageIndex}`}
                  className={`group relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg transition-all duration-[1500ms] ease-out transform ${
                    isVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${gridIndex * 200}ms` : '0ms',
                    aspectRatio: '1 / 1'
                  }}
                >
                  {!isImageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-50">
                      <div className="w-8 h-8 border-3 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
                    </div>
                  )}

                  <div className="w-full h-full">
                    <img
                      src={imageUrl}
                      alt={`Project ${gridIndex + 1}`}
                      className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:scale-105 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      decoding="async"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                      }}
                      onError={(e) => {
                        console.log(`Failed to load image: ${imageUrl}`);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
