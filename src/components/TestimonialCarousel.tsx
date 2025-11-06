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

  // Touch/Mouse event handlers
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
    const threshold = 50; // Minimum distance to trigger slide change
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped right - go to previous
        goToPrevious();
      } else {
        // Swiped left - go to next
        goToNext();
      }
    } else {
      // Snap back to current slide
      setTranslateX(-currentIndex * 100);
    }
  };

  // Mouse events
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

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleEnd();
  };

  // Reset translateX when currentIndex changes (for button navigation)
  useEffect(() => {
    if (!isDragging) {
      setTranslateX(-currentIndex * 100);
    }
  }, [currentIndex, isDragging]);

  // Prevent text selection during drag
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
        <div className="max-w-5xl mx-auto">
          {/* Section Header - Optimized mobile typography */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-sm">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-700">
                Testimonials
              </h2>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows - Hidden on mobile to encourage swiping */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl hidden md:block"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-[#5A1717]" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:shadow-xl hidden md:block"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-[#5A1717]" />
            </button>

            {/* Testimonial Cards Container with Touch Support */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                ref={carouselRef}
                className={`flex transition-transform ${isDragging ? 'duration-0' : 'duration-700'} ease-in-out cursor-grab active:cursor-grabbing select-none`}
                style={{ 
                  transform: `translateX(${translateX}%)`,
                  touchAction: 'pan-y pinch-zoom' // Allow vertical scrolling but handle horizontal
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
                    className="w-full flex-shrink-0 px-2 md:px-4"
                  >
                    <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 relative shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                      {/* Quote - Optimized mobile typography */}
                      <div className="text-center mb-6 md:mb-8">
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed italic text-justify">
                          "{testimonial.quote}"
                        </p>
                      </div>

                      {/* Author Info - Optimized mobile typography */}
                      <div className="flex flex-col items-center">
                        <h4 className="text-base md:text-lg font-medium text-[#5A1717] mb-1 md:mb-2 text-center">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 text-center text-xs md:text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots - Responsive sizing for mobile and desktop */}
            <div className="flex justify-center mt-2 md:mt-1 gap-2 sm:gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#381c2d] scale-90 sm:scale-100'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile Swipe Hint - Shows only on first visit */}
            <div className="md:hidden text-center mt-4">
              <p className="text-xs text-gray-400">
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;