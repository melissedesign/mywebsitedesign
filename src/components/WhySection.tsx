import React from 'react';

const WhySection: React.FC = () => {
  const orbitalImages = [
    '/images/Abiss/abisswebdesign.png',
    '/images/Abiss/abisslogodesign.png',
    '/images/Linven/taglinvenprintdesign.png',
    '/images/Linven/linvenvisual.png',
    '/images/KoLegal/kolegallogodesign.png',
    '/images/KoLegal/kolegalprintdesign.png',
    '/images/Sublee/subleelogodesign.png',
    '/images/Sublee/subleeeventpass.png'
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-sm mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700">
                Why TheMelisseDesign?
              </h2>
            </div>
            <div className="flex justify-center px-4">
              <p className="text-gray-500 text-base sm:text-[17px] md:text-[18px] font-normal max-w-2xl text-center leading-relaxed">
                Discover what makes our creative collaboration unique.
              </p>
            </div>
          </div>

          {/* Three Cards Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

            {/* Card 1 - Seamless Collaboration */}
            <div className="bg-[#fcf2f8] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden min-h-[480px] sm:min-h-[520px] md:h-[600px] flex flex-col">
              <div className="flex-[0_0_55%] sm:flex-[0_0_58%] md:flex-[0_0_60%] relative">
                <img
                  src="/images/collaborationfreelanceintokyo.png"
                  alt="Seamless collaboration - Two hands reaching toward each other"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>

              <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-start pt-8 md:pt-10 lg:pt-12">
                <h3 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-normal text-black mb-3 sm:mb-4 leading-[1.1] tracking-[-0.02em]">
                  Seamless<br />collaboration
                </h3>
                <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] font-normal">
                  Smooth and transparent process from vision to delivery.
                </p>
              </div>
            </div>

            {/* Card 2 - Orbital Animation */}
            <div className="bg-[#fcf2f8] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-12 min-h-[480px] sm:min-h-[520px] md:h-[600px] flex flex-col">
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
                  <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px]">
                    <div className="absolute inset-0 animate-spin-slow">
                      {orbitalImages.map((image, index) => {
                        const angle = (index * 360) / 8;
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                        const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 768;
                        const radius = isMobile ? 85 : isTablet ? 105 : 120;

                        return (
                          <div
                            key={index}
                            className="absolute w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px]"
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

                <div className="flex items-center justify-center pt-4 pb-2">
                  <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] font-normal text-center">
                    Over 65+ visuals crafted
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Modern Responsive Websites */}
            <div className="bg-[#fcf2f8] rounded-[24px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 min-h-[480px] sm:min-h-[520px] md:h-[600px] flex flex-col">
              <div className="flex-1 flex flex-col justify-end pb-2 md:pb-4">
                {/* Main headline - Right-aligned, black text matching Card 1 style */}
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <div className="text-right">
                    <h3 className="text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-normal text-black leading-[1.1] tracking-[-0.02em]">
                      Modern,<br />responsive<br />websites
                    </h3>
                  </div>
                </div>

                {/* Subtitle - Right-aligned, matching Card 1 paragraph style */}
                <div className="text-right">
                  <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] font-normal">
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
