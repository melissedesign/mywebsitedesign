import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Globe, Search, Palette, Users, Target, Sparkles } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { scrollToTop } from '../utils/scrollToTop';

const WebDesignPage: React.FC = () => {
  const navigate = useNavigate();
  const [animateWords, setAnimateWords] = useState(false);
  const [cardAnimations, setCardAnimations] = useState<boolean[]>([]);
  const [processAnimations, setProcessAnimations] = useState<boolean[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  // Start word animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateWords(true);
    }, 500); // Start animation after 500ms
    return () => clearTimeout(timer);
  }, []);

  // Mobile scroll stacking animation for "What You Get" section
  useEffect(() => {
    const handleScroll = () => {
      if (!featuresRef.current) return;

      const cards = featuresRef.current.querySelectorAll('.feature-card');
      const newAnimations: boolean[] = [];

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Trigger animation when card is 70% visible from bottom
        const triggerPoint = windowHeight * 0.7;
        const isVisible = rect.top < triggerPoint;
        
        newAnimations[index] = isVisible;
      });

      setCardAnimations(newAnimations);
    };

    // Only add scroll listener on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    } else {
      // On desktop, show all cards immediately
      setCardAnimations(new Array(6).fill(true));
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Process section scroll animation
  useEffect(() => {
    const handleProcessScroll = () => {
      if (!processRef.current) return;

      const processSteps = processRef.current.querySelectorAll('.process-step');
      const newProcessAnimations: boolean[] = [];

      processSteps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Trigger animation when step is 80% visible from bottom
        const triggerPoint = windowHeight * 0.8;
        const isVisible = rect.top < triggerPoint;
        
        newProcessAnimations[index] = isVisible;
      });

      setProcessAnimations(newProcessAnimations);
    };

    window.addEventListener('scroll', handleProcessScroll);
    handleProcessScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleProcessScroll);
    };
  }, []);

  // Updated service cards with cleaner design and consistent styling
  const modernServices = [
    {
      number: '01',
      title: 'Custom Web Design',
      description: 'Tailored websites that perfectly reflect your brand identity and business goals with modern, responsive design.'
    },
    {
      number: '02',
      title: 'Web Redesign',
      description: 'Transform your existing website with fresh, contemporary design that improves user experience and conversion rates.'
    },
    {
      number: '03',
      title: 'Monthly Maintenance',
      description: 'Comprehensive ongoing support to keep your website secure, updated, and performing at its best.'
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Beautiful websites that work flawlessly across all devices and screen sizes.'
    },
    {
      icon: Users,
      title: 'User Experience Focus',
      description: 'Intuitive navigation and engaging interfaces designed with your audience in mind.'
    },
    {
      icon: Palette,
      title: 'Brand Alignment',
      description: 'Every design element carefully crafted to reflect your unique brand identity.'
    },
    {
      icon: Target,
      title: 'Strategic Design',
      description: 'Purpose-driven design that supports your business goals and drives conversions.'
    },
    {
      icon: Search,
      title: 'SEO Optimized',
      description: 'Built with search engine best practices to help your business get discovered.'
    },
    {
      icon: Globe,
      title: 'Modern Technology',
      description: 'Future-proof solutions using the latest web technologies and frameworks.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description: 'We start by understanding your business goals, target audience, and project requirements through detailed consultation.'
    },
    {
      step: '02',
      title: 'Design & Wireframing',
      description: 'Creating wireframes and visual designs that align with your brand identity and user experience goals.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Building your website with clean, efficient code using modern web technologies and best practices.'
    },
    {
      step: '04',
      title: 'Testing & Launch',
      description: 'Thorough testing across devices and browsers, followed by deployment and ongoing support.'
    },
    {
      step: '05',
      title: 'Final Delivery',
      description: 'Delivering all approved assets in the required formats, along with clear usage guidelines, ensuring a smooth handover and easy implementation for your brand.'
    }
  ];

  // Updated portfolio items with the specific images you requested
  const portfolioItems = [
    {
      title: 'ABISS',
      category: 'Sustainable Skincare',
      image: '/images/Abiss/abisswebdesign.png'
    },
    {
      title: 'Linven',
      category: 'Luxury Bedding Brand',
      image: '/images/Linven/taglinvenprintdesign.png'
    },
    {
      title: 'KōLegal',
      category: 'Law Firm',
      image: '/images/KoLegal/kolegallogodesign.png'
    }
  ];

  // Custom scroll function for services section
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Account for fixed header
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  // Render hero title with animation - Updated for consistent sizing
  const renderHeroTitle = () => {
    const line1Words = ['Web', 'Design'];
    const line2Words = ['Solutions']; // Updated subtitle

    return (
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight text-white leading-tight tracking-wide text-center">
        {/* Line 1 */}
        <div className="block">
          {line1Words.map((word, wordIndex) => (
            <span
              key={`line1-${wordIndex}`}
              className={`inline-block mr-3 transition-all duration-700 ease-out ${
                animateWords 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: animateWords ? `${wordIndex * 150}ms` : '0ms'
              }}
            >
              {word}
            </span>
          ))}
        </div>
        {/* Line 2 - Updated subtitle */}
        <div className="block">
          {line2Words.map((word, wordIndex) => (
            <span
              key={`line2-${wordIndex}`}
              className={`inline-block mr-3 transition-all duration-700 ease-out ${
                animateWords 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: animateWords ? `${(line1Words.length + wordIndex) * 150}ms` : '0ms'
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </h1>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Portfolio style with updated image */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image - Updated with new image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/webdesignsolutions.jpg')`
          }}
        />
        
        {/* Subtle Black Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {renderHeroTitle()}
            </div>
          </div>
        </div>
        
        {/* Back Button - Updated to use HashLink targeting services section */}
        <div className="absolute top-24 left-4 sm:left-6 lg:left-8 z-20">
          <HashLink
            to="/#features"
            scroll={scrollWithOffset}
            className="flex items-center text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </HashLink>
        </div>
      </div>

      {/* Main Content - Enhanced horizontal padding for mobile consistency */}
      <div className="container mx-auto px-8 sm:px-10 lg:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Description - Enhanced padding and consistent text sizing - FIXED MOBILE TEXT ALIGNMENT */}
          <div className="max-w-4xl mb-16 mx-auto">
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed text-left md:text-justify">
              I create modern, tailored websites that combine strategic design with strong brand alignment. Each project is built to communicate clearly, engage your audience, and deliver a seamless user experience across all platforms.
            </p>
          </div>

          {/* Modern Services Section - Clean Card Design with Pink Numbers */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-8 py-4 shadow-sm">
                <h2 className="text-xl font-medium text-gray-700">
                  Services
                </h2>
              </div>
            </div>
            
            {/* Clean Service Cards Grid - Aligned with page margins */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {modernServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                >
                  {/* Large Pink Number */}
                  <div className="mb-6 md:mb-8">
                    <span className="text-4xl md:text-5xl font-light text-[#5A1717]">
                      {service.number}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-medium text-[#5A1717] mb-3 md:mb-4">
                    {service.title}
                  </h3>
                  
                  {/* Description - FIXED MOBILE TEXT ALIGNMENT */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed text-left md:text-justify">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Features Section - Minimalist Design with Mobile Scroll Stacking */}
          <div className="bg-white rounded-3xl p-8 md:p-12 mb-20" ref={featuresRef}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-8 py-4 shadow-sm">
                  <h2 className="text-xl font-medium text-gray-700">
                    What You Get
                  </h2>
                </div>
              </div>
              
              {/* Modern 3x2 Grid with Mobile Scroll Stacking Animation and Minimalist Icons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const isAnimated = cardAnimations[index] !== undefined ? cardAnimations[index] : false;
                  
                  return (
                    <div 
                      key={index} 
                      className={`feature-card bg-gray-50 rounded-2xl p-6 md:p-8 transition-all duration-700 ease-out group cursor-pointer border border-gray-100 md:hover:shadow-lg md:hover:-translate-y-1 ${
                        isAnimated 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-8 scale-95 md:opacity-100 md:translate-y-0 md:scale-100'
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                        zIndex: features.length - index, // Stacking effect
                        position: 'relative'
                      }}
                    >
                      {/* Minimalist Icon Container - No colored background */}
                      <div className="bg-white rounded-xl p-3 md:p-4 inline-block mb-4 md:mb-6 shadow-sm">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-black" strokeWidth={1} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-medium text-[#5A1717] mb-3 md:mb-4">
                        {feature.title}
                      </h3>
                      
                      {/* Description - FIXED MOBILE TEXT ALIGNMENT */}
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed text-left md:text-justify">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Process Section - Enhanced with step-by-step animation */}
          <div className="max-w-4xl mx-auto mb-20" ref={processRef}>
            <div className="text-center mb-12">
              <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-8 py-4 shadow-sm">
                <h2 className="text-xl font-medium" style={{ color: '#3e4a5b' }}>
                  The Process
                </h2>
              </div>
            </div>
            <div className="space-y-8">
              {process.map((item, index) => {
                const isAnimated = processAnimations[index] !== undefined ? processAnimations[index] : false;
                
                return (
                  <div 
                    key={index} 
                    className={`process-step flex items-start gap-6 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-700 ease-out ${
                      isAnimated 
                        ? 'opacity-100 translate-x-0 scale-100' 
                        : 'opacity-0 translate-x-8 scale-95'
                    }`}
                    style={{
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="bg-[#fcf2f8] text-gray-600 rounded-full w-12 h-12 flex items-center justify-center font-medium flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      {/* Title - Changed to black (#000000) */}
                      <h3 className="text-xl font-medium text-black mb-3">{item.title}</h3>
                      {/* Description - FIXED MOBILE TEXT ALIGNMENT */}
                      <p className="text-gray-600 leading-relaxed text-left md:text-justify">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Projects Section - Updated with specific images */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-medium text-[#5A1717] mb-8 md:mb-12 text-center">
              Recent Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {portfolioItems.map((item, index) => (
                <div key={index} className="group cursor-pointer" onClick={() => navigate(`/project/${item.title.toLowerCase()}`)}>
                  <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        console.log(`Failed to load image: ${item.image}`);
                        // Fallback styling for broken images
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-[#5A1717] mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{item.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#FBEAEA] to-[#FFF5F5] rounded-2xl p-12">
            <h2 className="text-2xl md:text-3xl font-medium text-[#5A1717] mb-6">
              Ready to Start Your Project?
            </h2>
            {/* CTA Description - FIXED MOBILE TEXT ALIGNMENT */}
            <p className="text-gray-600 mb-8 text-left md:text-justify">
              Let's discuss your vision and create a website that truly represents your brand and drives results.
            </p>
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-2 py-1 shadow-sm animate-pulse-gentle">
              <a
                href="https://cal.com/themelissedesign/discoverycall"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-2 text-sm font-medium text-[#5A1717] transition-all duration-300 rounded-full hover:text-black hover:bg-[#FBEAEA]/30 hover:scale-105 hover:shadow-sm inline-block"
              >
                Book a Discovery Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDesignPage;