import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Gallery from './Gallery';
import { scrollToTop } from '../utils/scrollToTop';
import { restoreScrollPosition } from '../utils/scrollPosition';
import Cal, { getCalApi } from "@calcom/embed-react";

const ProjectPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animateWords, setAnimateWords] = useState(false);
  const [calLoaded, setCalLoaded] = useState(false);
  const [calError, setCalError] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  // Cal.com initialization with proper error handling and unique namespace
  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    
    const initializeCal = async () => {
      try {
        // Clear any existing Cal instances first
        if (window.Cal) {
          window.Cal.destroy?.();
        }
        
        // Use a unique namespace for each project page to avoid conflicts
        const namespace = `project-${id}-${Date.now()}`;
        const cal = await getCalApi({ namespace });
        
        if (mounted) {
          cal("ui", { 
            hideEventTypeDetails: false, 
            layout: "month_view",
            styles: {
              branding: {
                brandColor: "#5A1717"
              }
            }
          });
          
          // Add a small delay to ensure calendar is fully initialized
          setTimeout(() => {
            if (mounted) {
              setCalLoaded(true);
              setCalError(false);
            }
          }, 1000);
        }
      } catch (error) {
        console.error('Failed to initialize Cal.com:', error);
        
        if (retryCount < maxRetries && mounted) {
          retryCount++;
          console.log(`Retrying Cal.com initialization (${retryCount}/${maxRetries})`);
          setTimeout(initializeCal, 1000 * retryCount);
        } else if (mounted) {
          setCalError(true);
          setCalLoaded(false);
        }
      }
    };

    // Add a delay to ensure the component is fully mounted and DOM is ready
    const timer = setTimeout(initializeCal, 800);

    return () => {
      mounted = false;
      clearTimeout(timer);
      // Clean up Cal instance when component unmounts
      if (window.Cal) {
        window.Cal.destroy?.();
      }
    };
  }, [id]);

  // Start word animation after component mounts
  useEffect(() => {
    if (id === 'abiss' || id === 'kolegal' || id === 'linven' || id === 'sublee2' || id === 'SUBLEE2') {
      const timer = setTimeout(() => {
        setAnimateWords(true);
      }, 500); // Start animation after 500ms
      return () => clearTimeout(timer);
    }
  }, [id]);

  const handleBackToPortfolio = () => {
    navigate('/', { replace: true });
    // Restore scroll position after navigation
    setTimeout(() => {
      restoreScrollPosition();
    }, 100);
  };

  const projects = [
    {
      id: 'linven',
      title: 'Linven',
      description: 'Linven is a luxury bedding brand inspired by Mediterranean culture, combining traditional craftsmanship with a modern, elegant touch. I was in charge of the full branding and website design from the first visual concepts to the final digital experience.',
      challenge: 'The goal was to build a complete and consistent brand identity that captured the calm, natural beauty of linen and the warmth of Mediterranean living. Everything had to feel refined, harmonious, and timeless while also setting the tone for a premium e-commerce experience.',
      solution: 'I created the entire visual identity: logo, color palette, typography, and print materials like business cards and product tags. Once the brand look was defined, I designed and built a responsive website that highlighted the textures, quality, and lifestyle behind the brand. All while ensuring a smooth and intuitive user experience.',
      results: 'The branding and website gave Linven a clear and consistent identity. The design reflects the brand\'s values and offers a smooth and elegant experience for users.',
      technologies: ['UX/UI Design', 'Responsive Web Design', 'Cloudinary', 'HTML/CSS', 'Adobe Creative Cloud'],
      heroImage: '/images/linvenherosectionmin.png',
      heroText: 'Linven, a Mediterranean-inspired bedding brand.',
      // Mobile-optimized hero text with better line breaks and proper grammar
      heroTextMobile: {
        line1: 'Linven',
        line2: 'A Mediterranean-Inspired',
        line3: 'Bedding Brand'
      },
      images: [
        '/images/taglinvenprintdesign.png',
        '/images/linvenvisual.png',
        '/images/businesscardlinven.png',
        '/images/linvenlogodesign.png',
      ]
    },
    {
      id: 'abiss',
      title: 'ABISS',
      description: 'ABISS represents a new standard in luxury sun protection, where premium skincare meets environmental consciousness. As the lead designer, I developed a comprehensive brand identity that communicates both sophistication and sustainability.',
      challenge: 'The challenge was to create a visual identity for a high-end sunscreen brand that would stand out in a crowded market while emphasizing both luxury and environmental responsibility. The design needed to reflect the product\'s premium quality and SPF 50+ protection while maintaining eco-conscious values.',
      solution: 'I developed a complete brand identity system that balances luxury with sustainability. The design features a warm, earthy color palette accented with subtle gold elements, creating a sense of natural luxury. The minimalist logo design reflects the product\'s purity, while the packaging solutions merge premium aesthetics with eco-friendly materials.',
      results: 'The brand identity has successfully positioned ABISS as a premium player in the sustainable luxury skincare market. The cohesive design system effectively communicates both quality and environmental responsibility, resonating strongly with the target audience of conscious luxury consumers.',
      technologies: ['Brand Identity', 'Packaging Design', 'Visual Design', 'Adobe Creative Cloud'],
      heroImage: '/images/abissherosection.png',
      heroText: 'ABISS, a premium natural skincare brand.',
      // Mobile-optimized hero text with better line breaks and proper grammar
      heroTextMobile: {
        line1: 'ABISS',
        line2: 'A Premium Natural',
        line3: 'Skincare Brand'
      },
      images: [
        '/images/abissmockup.png',
        '/images/bagdesignabiss.png',
        '/images/logodesignabiss.png',
        '/images/webdesignforabisstokyo.png',
        '/images/brandingdesignandlogoforabiss.png'
      ]
    },
    {
      id: 'kolegal',
      title: 'KōLegal',
      description: 'KōLegal represents a sophisticated brand identity designed for a Japanese law firm, embodying the core values of strength, integrity, and professionalism. The project encompassed creating a complete visual identity that reflects the firm\'s commitment to excellence while maintaining a modern and trustworthy image.',
      challenge: 'The challenge was to develop a brand identity that would effectively communicate the firm\'s Japanese heritage and legal expertise while maintaining a contemporary and approachable aesthetic. The design needed to balance professionalism with accessibility, creating a visual language that would resonate with both corporate clients and individual stakeholders.',
      solution: 'The logo design embraces minimalism with clean lines and subtle details that reflect simplicity and precision, conveying authority and reliability. The typography selection emphasizes modern professionalism, enhancing the brand\'s clear and elegant communication style. A rich brown color palette was carefully chosen to evoke warmth, stability, and trust, aligning perfectly with the firm\'s commitment to professionalism and integrity.',
      results: 'The minimalist brand identity successfully positions KōLegal as a modern, trustworthy law firm while honoring its Japanese heritage. The clean design system and sophisticated color palette effectively communicate the firm\'s values of precision, reliability, and professionalism, resonating strongly with their target audience.',
      technologies: ['Brand Identity', 'Logo Design', 'Typography', 'Print Design', 'Adobe Creative Cloud'],
      heroImage: '/images/herojapaneselawfirmwebdesign.png',
      heroText: 'KōLegal, a modern Japanese law firm.',
      // Mobile-optimized hero text with better line breaks and proper grammar
      heroTextMobile: {
        line1: 'KōLegal',
        line2: 'A Modern Japanese',
        line3: 'Law Firm'
      },
      // Keep the original two-line layout for desktop compatibility
      heroTextLines: ['KōLegal, a modern', 'Japanese law firm.'],
      images: [
        '/images/japaneselawfirmpng.png',
        '/images/kolegalprintdesign.png',
        '/images/kolegallogodesign.png'
      ]
    },
    {
      id: 'sublee2',
      altId: 'SUBLEE2', // Support both lowercase and uppercase URLs
      title: 'SUBLEE2',
      description: 'SUBLEE2 is an innovative IT company committed to providing forward-thinking technology solutions. With a focus on efficiency and modernity, the company integrates cutting-edge technology with a professional, reliable approach to meet the evolving needs of businesses.',
      challenge: 'The challenge was to design a strong, modern brand identity and a clean web interface that reflects SUBLEE2\'s tech-forward values while remaining accessible and professional. The visual direction needed to convey both innovation and trust.',
      solution: 'The brand identity was designed, including logo concept, color palette, and typography. Additionally, a custom ID badge system was created for internal branding, and a responsive web experience was developed with a sleek, structured layout that enhances usability and reflects the brand\'s digital-first mindset.',
      results: 'The new brand identity helped SUBLEE2 establish a clear and confident market presence. The website has seen increased traffic and longer visit durations. The branding materials, including the ID badges, reinforced the company\'s internal culture and professional image during some events.',
      technologies: ['UX/UI Design', 'Web Design', 'Brand Identity','Adobe Creative Cloud'],
      // Updated hero image for SUBLEE2
      heroImage: '/images/heroitcompanydesign.png',
      heroText: 'Branding for a Tech Company',
      // Mobile-optimized hero text with better line breaks and proper grammar
      heroTextMobile: {
        line1: 'Branding for',
        line2: 'a Tech Company.'
      },
      images: [
        '/images/subleelogodesign.png',
        '/images/iicompanyeventpass.png',
        '/images/usbsublee.png',
        '/images/digitalcompanyprintbook.png'
      ]
    }
  ];

  // Find project by ID (support both lowercase and uppercase)
  const project = projects.find(p => 
    p.id.toLowerCase() === id?.toLowerCase() || 
    (p.altId && p.altId.toLowerCase() === id?.toLowerCase())
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  // Enhanced hero title rendering with mobile-specific optimization for all projects
  const renderHeroTitle = () => {
    // Check if project has mobile-optimized text
    if (project.heroTextMobile) {
      return (
        <>
          {/* Mobile version - Clean lines with better typography and proper grammar */}
          <div className="block md:hidden">
            <h1 className="text-2xl sm:text-3xl font-extralight text-white leading-tight tracking-wide text-center">
              {/* Render each line */}
              {Object.values(project.heroTextMobile).map((line, lineIndex) => (
                <div key={lineIndex} className="block mb-1">
                  <span
                    className={`inline-block transition-all duration-700 ease-out ${
                      animateWords 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: animateWords ? `${lineIndex * 150}ms` : '0ms'
                    }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </h1>
          </div>

          {/* Desktop version - original layout */}
          <div className="hidden md:block">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight text-white leading-tight tracking-wide text-center">
              {/* For KōLegal, use the two-line desktop layout if available */}
              {project.id === 'kolegal' && project.heroTextLines ? (
                project.heroTextLines.map((line, lineIndex) => (
                  <div key={lineIndex} className="block">
                    {line.split(' ').map((word, wordIndex) => (
                      <span
                        key={`${lineIndex}-${wordIndex}`}
                        className={`inline-block mr-3 transition-all duration-700 ease-out ${
                          animateWords 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-4'
                        }`}
                        style={{
                          transitionDelay: animateWords ? `${(lineIndex * 3 + wordIndex) * 150}ms` : '0ms'
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                ))
              ) : (
                // Single line for other projects
                project.heroText.split(' ').map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block mr-3 transition-all duration-700 ease-out ${
                      animateWords 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: animateWords ? `${index * 150}ms` : '0ms'
                    }}
                  >
                    {word}
                  </span>
                ))
              )}
            </h1>
          </div>
        </>
      );
    } else {
      // Fallback for projects without mobile optimization
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - For projects with hero images (now includes SUBLEE2) */}
      {(project.id === 'abiss' || project.id === 'kolegal' || project.id === 'linven' || project.id === 'sublee2') && project.heroImage && (
        <div className="relative h-screen w-full overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${project.heroImage})`
            }}
          />
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                {renderHeroTitle()}
              </div>
            </div>
          </div>
          
          {/* Back Button - Positioned over hero with white styling */}
          <div className="absolute top-20 md:top-24 left-4 sm:left-6 lg:left-8 z-20">
            <button
              onClick={handleBackToPortfolio}
              className="flex items-center text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Back to Portfolio
            </button>
          </div>
        </div>
      )}

      {/* Regular Header for other projects (none currently) */}
      {project.id !== 'abiss' && project.id !== 'kolegal' && project.id !== 'linven' && project.id !== 'sublee2' && (
        <div className="pt-16 md:pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <button
              onClick={handleBackToPortfolio}
              className="flex items-center text-gray-600 hover:text-[#237870] transition-colors mb-6 md:mb-8 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Back to Portfolio
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Optimized mobile typography */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Title - Only show for non-hero projects or below hero for hero projects */}
          {project.id !== 'abiss' && project.id !== 'kolegal' && project.id !== 'linven' && project.id !== 'sublee2' && (
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-[#5A1717] mt-2 mb-8 md:mb-12">
              {project.title}
            </h1>
          )}

          {/* Main project image - Skip for hero projects since we have hero */}
          {project.id !== 'abiss' && project.id !== 'kolegal' && project.id !== 'linven' && project.id !== 'sublee2' && (
            <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-8 md:mb-12">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Project Title for hero projects (after hero) - SIGNIFICANTLY INCREASED SPACING */}
          {(project.id === 'abiss' || project.id === 'kolegal' || project.id === 'linven' || project.id === 'sublee2') && (
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#5A1717] mb-20 md:mb-24 text-center">
              {project.title}
            </h1>
          )}

          {/* Project details - Optimized mobile typography - FIXED MOBILE TEXT ALIGNMENT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-xl md:text-2xl font-medium text-[#5A1717] mb-3 md:mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 text-left md:text-justify text-sm md:text-base">
                {project.description}
              </p>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-medium text-[#5A1717] mb-3 md:mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Challenge and Solution - Optimized mobile typography - FIXED MOBILE TEXT ALIGNMENT */}
          <div className="space-y-8 md:space-y-12 mb-12 md:mb-16">
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#5A1717] mb-3 md:mb-4">The Challenge</h2>
              <p className="text-gray-600 leading-relaxed text-left md:text-justify text-sm md:text-base">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#5A1717] mb-3 md:mb-4">The Solution</h2>
              <p className="text-gray-600 leading-relaxed text-left md:text-justify text-sm md:text-base">{project.solution}</p>
            </div>
          </div>

          {/* Project Gallery */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-medium text-[#5A1717] mb-6 md:mb-8">Project Gallery</h2>
            <Gallery 
              images={project.id === 'abiss' || project.id === 'kolegal' || project.id === 'linven' || project.id === 'sublee2' ? project.images : project.images.slice(1)}
              className="max-w-4xl mx-auto"
              projectId={project.id}
            />
          </div>

          {/* Results - Optimized mobile typography - FIXED MOBILE TEXT ALIGNMENT */}
          <div className="bg-gray-50 rounded-xl md:rounded-2xl p-6 md:p-8 mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-medium text-[#5A1717] mb-3 md:mb-4">The Results</h2>
            <p className="text-gray-600 leading-relaxed text-left md:text-justify text-sm md:text-base">{project.results}</p>
          </div>

          {/* Embedded Cal.com Calendar Section - Fixed with proper initialization */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border border-gray-100">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#5A1717] mb-4 md:mb-6 text-center">
                Ready to Start Your Project?
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 text-center">
                Inspired by this case study? Let's discuss how we can create something equally impactful for your brand.
              </p>

              {/* Cal.com Embedded Calendar with improved error handling */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 shadow-inner">
                <h3 className="text-lg font-medium text-[#5A1717] mb-4 text-center">Select Your Preferred Time</h3>
                
                {/* Calendar Container with proper scrolling and error handling */}
                <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div 
                    className="w-full overflow-auto cal-container"
                    style={{ 
                      height: "600px",
                      maxHeight: "80vh",
                      WebkitOverflowScrolling: "touch"
                    }}
                  >
                    {calLoaded && !calError ? (
                      <Cal
                        namespace={`project-${id}-${Date.now()}`}
                        calLink="themelissedesign/discoverycall"
                        style={{ 
                          width: "100%", 
                          minHeight: "600px",
                          height: "auto",
                          border: "none",
                          borderRadius: "0"
                        }}
                        config={{ 
                          layout: "month_view",
                          hideEventTypeDetails: false,
                          theme: "light"
                        }}
                      />
                    ) : calError ? (
                      // Error state with direct link
                      <div className="flex flex-col items-center justify-center h-full space-y-4">
                        <div className="text-center">
                          <h4 className="text-lg font-medium text-[#5A1717] mb-2">Calendar Loading Issue</h4>
                          <p className="text-gray-600 mb-4">Please use the direct link below to book your call</p>
                          <a
                            href="https://cal.com/themelissedesign/discoverycall"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-[#5A1717] text-white rounded-lg hover:bg-[#4a1515] transition-colors"
                          >
                            Book on Cal.com
                          </a>
                        </div>
                      </div>
                    ) : (
                      // Loading state
                      <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-8 h-8 border-2 border-gray-300 border-t-[#5A1717] rounded-full animate-spin"></div>
                          <p className="text-gray-600 text-sm">Loading calendar...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Mobile Scroll Hint */}
                <div className="mt-4 text-center md:hidden">
                  <p className="text-xs text-gray-500">
                    Scroll within the calendar to see more dates
                  </p>
                </div>

                {/* Fallback link in case calendar fails */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-2">
                    Having trouble with the calendar?
                  </p>
                  <a
                    href="https://cal.com/themelissedesign/discoverycall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#5A1717] text-white rounded-lg hover:bg-[#4a1515] transition-colors text-sm"
                  >
                    Book directly on Cal.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;