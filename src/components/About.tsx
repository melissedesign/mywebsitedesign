import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.src = "https://embed.cal.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Disconnect observer after animation starts
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element is fully visible
      }
    );

    if (paragraphRef.current) {
      observer.observe(paragraphRef.current);
    }

    return () => {
      if (paragraphRef.current) {
        observer.unobserve(paragraphRef.current);
      }
    };
  }, [isVisible]);

  // Split text into words for animation
  const text = "Based in Tokyo, I help businesses build cohesive brands through web design and strategic communication. With several years of experience in international corporations, I bring a global perspective that blends creative communication strategies with a deep understanding of professional realities and a client-focused approach. I design websites and brand assets that connect, convert, and elevate your presence online and offline.";
  
  const words = text.split(' ');

  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5F5] to-[#FBEAEA] relative overflow-hidden">
      {/* Large scrolling background text */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="animate-scroll-horizontal text-[120px] md:text-[200px] lg:text-[280px] xl:text-[320px] font-bold text-gray-900 opacity-5 select-none whitespace-nowrap">
          Your Designer&nbsp;&nbsp;&nbsp;&nbsp;Your Designer&nbsp;&nbsp;&nbsp;&nbsp;Your Designer&nbsp;&nbsp;&nbsp;&nbsp;Your Designer&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>

      {/* Main content - Enhanced horizontal padding for mobile */}
      <div className="container mx-auto px-8 sm:px-10 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Optimized mobile heading with increased bottom margin */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-sm">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-700">
                About
              </h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Profile Image - Optimized with Cloudinary CDN */}
            <div className="w-full lg:w-1/3">
              <div className="relative max-w-[280px] md:max-w-[320px] mx-auto lg:max-w-none mb-8 md:mb-0">
                {/* Rounded rectangle container matching "Modern websites" style */}
                <div className="aspect-[4/5] overflow-hidden rounded-[32px] shadow-lg">
                  <img
                    src="/images/melissewebdesigner.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                {/* Subtle border overlay for depth */}
                <div className="absolute inset-0 rounded-[32px] ring-1 ring-black/5"></div>
              </div>
            </div>

            {/* About Content - Center-aligned on both desktop and mobile */}
            <div className="w-full lg:w-2/3 text-center">
              {/* Enhanced title with better mobile sizing - Center-aligned */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#5A1717] mb-3 md:mb-4">
                Hi, I am Melisse !
              </h3>
              
              {/* Elegant tagline */}
              <div className="mb-6 md:mb-8">
                <p className="text-base md:text-lg text-[#8B5A5A] italic font-light tracking-wide">
                </p>
              </div>
              
              {/* Paragraph - Justified text for readability */}
              <div
                ref={paragraphRef}
                className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8 text-justify"
              >
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={`inline transition-all duration-700 ease-out ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${index * 50}ms` : '0ms'
                    }}
                  >
                    {word}{' '}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cards - Enhanced mobile spacing and typography with justified text and center alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm border border-white/50">
              <h4 className="text-lg md:text-xl font-medium text-[#5A1717] mb-3 md:mb-4">My Approach</h4>
              <p className="text-gray-600 text-sm md:text-base text-center">
                I focus on designing websites that are both visually refined and strategically effective. Each element is thoughtfully crafted to align with your business objectives, ensuring your website delivers meaningful results.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm border border-white/50">
              <h4 className="text-lg md:text-xl font-medium text-[#5A1717] mb-3 md:mb-4">Work Process</h4>
              <p className="text-gray-600 text-sm md:text-base text-center">
                From initial concept to final launch, I maintain clear communication and attention to detail. Your project is handled with care, ensuring a smooth and efficient development process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;