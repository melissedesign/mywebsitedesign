import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
}

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "I asked Melisse to help me in April 2025 and have been totally satisfied. Top visual quality, innovative spirit for the contents too, and also reactivity and easy to work with. I highly recommend Melisse for any communication support that you may need.",
      name: "François-Xavier LIENHART",
      role: "Executive Coach (ICC – INSEAD), with prior experience as CEO in Japan"
    },
    {
      id: 2,
      quote: "Themelissedesign was very professional and attentive during my time working with them for the design of my brand. They have done a great job at creating the modern logos and architecture of my website. We will definitely use their services again.",
      name: "Ozmoze.ai",
      role: "Founder"
    }
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setTranslateX(-index * 100);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    setCurrentX(clientX);
    const diff = clientX - startX;
    const dragPercentage = (diff / (carouselRef.current?.offsetWidth || 1)) * 100;
    setTranslateX(-currentIndex * 100 + dragPercentage);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const diff = currentX - startX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else {
      setTranslateX(-currentIndex * 100);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleEnd();
  };

  useEffect(() => {
    if (!isDragging) {
      setTranslateX(-currentIndex * 100);
    }
  }, [currentIndex, isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    } else {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    }

    return () => {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [isDragging]);

  return (
    <section id="testimonials" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-2">
              What clients say
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Trusted by professionals worldwide
            </p>
          </div>

          <div className="relative">
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 z-10 bg-white hover:bg-gray-50 rounded-full p-2 lg:p-3 shadow-lg transition-all duration-300 hidden md:block"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 z-10 bg-white hover:bg-gray-50 rounded-full p-2 lg:p-3 shadow-lg transition-all duration-300 hidden md:block"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            <div className="overflow-hidden">
              <div 
                ref={carouselRef}
                className={`flex transition-transform ${isDragging ? 'duration-0' : 'duration-700'} ease-in-out cursor-grab active:cursor-grabbing select-none`}
                style={{ 
                  transform: `translateX(${translateX}%)`,
                  touchAction: 'pan-y pinch-zoom'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-2 sm:px-3"
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                      
                      <div className="mb-4 sm:mb-6">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                      </div>

                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed font-light mb-6 sm:mb-8">
                        {testimonial.quote}
                      </p>

                      <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#381c2d] to-[#5A1717] flex items-center justify-center text-white font-medium text-xs sm:text-sm flex-shrink-0">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        
                        <div className="min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base md:text-lg truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group focus:outline-none"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8'
                        : 'w-8 bg-gray-300 group-hover:bg-gray-400'
                    }`}
                    style={{
                      backgroundColor: index === currentIndex ? '#381c2d' : undefined
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;