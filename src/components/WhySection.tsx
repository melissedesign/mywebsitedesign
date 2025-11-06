import React from 'react';

const WhySection: React.FC = () => {
  // Curated selection of 8 high-impact images from all projects for optimal visual balance
  const orbitalImages = [
    // ABISS project - 2 key visuals
    '/images/Abiss/abisswebdesign.png',
    '/images/Abiss/abisslogodesign.png',

    // Linven project - 2 key visuals
    '/images/Linven/taglinvenprintdesign.png',
    '/images/Linven/linvenvisual.png',

    // KōLegal project - 2 key visuals
    '/images/KoLegal/kolegallogodesign.png',
    '/images/KoLegal/kolegalprintdesign.png',

    // SUBLEE2 project - 2 key visuals
    '/images/Sublee/subleelogodesign.png',
    '/images/Sublee/subleeeventpass.png'
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Section Header - Fully responsive with mobile-first approach */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-sm mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700">
                Why TheMelisseDesign?
              </h2>
            </div>
            {/* Centered subtitle text - responsive font size */}
            <div className="flex justify-center px-4">
              <p className="text-gray-500 text-base sm:text-[17px] md:text-[18px] font-normal max-w-2xl text-center leading-relaxed">
                Discover what makes our creative collaboration unique.
              </p>
            </div>
          </div>

          {/* Three Cards Layout - Responsive grid with mobile optimization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

            {/* Card 1 - Seamless Collaboration - Fully responsive */}
            <div className="bg-[#fcf2f8] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden min-h-[480px] sm:min-h-[520px] md:h-[600px] flex flex-col">
              {/* Image anchored to top - responsive height */}
              <div className="h-[60%] sm:h-[62%] md:h-[65%] relative">
                <img
                  src="/images/collaborationfreelanceintokyo.png"
                  alt="Seamless collaboration - Two hands reaching toward each other"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

              {/* Text content at bottom - responsive padding */}
              <div className="h-[40%] sm:h-[38%] md:h-[35%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <h3 className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[48px] font-normal text-black mb-3 sm:mb-4 leading-[1.1] tracking-[-0.02em]">
                  Seamless<br />collaboration
                </h3>
                <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.5] font-normal">
                  Smooth and transparent process from vision to delivery.
                </p>
              </div>
            </div>

            {/* Card 2 - Optimized Circular Orbit Animation - Fully responsive */}
            <div className="bg-[#fcf2f8] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-12 min-h-[480px] sm:min-h-[520px] md:h-[600px] flex flex-col">
              <div className="flex-1 flex flex-col">
                {/* Circular orbit animation container - responsive sizing */}
                <div className="flex-1 flex items-center justify-center mb-6 sm:mb-8">
                  <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]">
                    {/* Rotating container that holds 8 carefully selected images */}
                    <div className="absolute inset-0 animate-spin-slow">
                      {/* 8 images positioned in a perfect circle - responsive sizing */}
                      {orbitalImages.map((image, index) => {
                        const angle = (index * 360) / 8;
                        // Responsive radius based on screen size
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                        const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 768;
                        const radius = isMobile ? 80 : isTablet ? 95 : 110;
                        const imageSize = isMobile ? 40 : isTablet ? 45 : 50;

                        return (
                          <div
                            key={index}
                            className="absolute w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px]"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                            }}
                          >
                            <div className="w-full h-full rounded-full overflow-hidden shadow-sm">
                              <img
                                src={image}
                                alt={`Project visual ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                                fetchPriority="low"
                                onError={(e) => {
                                  console.log(`Failed to load image: ${image}`);
                                  (e.target as HTMLElement).parentElement!.style.display = 'none';
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom text - Responsive font size */}
                <div className="flex items-center justify-center">
                  <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.5] font-normal text-center">
                    Over 65+ visuals crafted
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Modern, Impactful Websites - Fully responsive */}
            <div className="bg-[#fcf2f8] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-12 min-h-[480px] sm:min-h-[520px] md:h-[600px] flex flex-col">
              <div className="flex-1 flex flex-col">
                {/* Main headline display - responsive alignment and sizing */}
                <div className="flex-1 flex items-center justify-center sm:justify-end mb-6 sm:mb-8">
                  <div className="text-center sm:text-right">
                    <div className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-normal text-black leading-[0.9] tracking-[-0.03em]">
                      Modern,<br />responsive<br />websites
                    </div>
                  </div>
                </div>

                {/* Subtitle content - Responsive alignment */}
                <div className="text-center sm:text-right">
                  <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.5] font-normal">
                    Sleek, functional websites that reflect your brand and convert visitors into clients.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
