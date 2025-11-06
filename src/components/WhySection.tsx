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
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-8 sm:px-8 lg:px-12">
         <div className="max-w-[1400px] mx-auto">
          
          {/* Section Header - Enhanced with larger font and padding - Increased mobile spacing */}
          <div className="text-center mb-16 md:mb-12">
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-8 py-4 shadow-sm mb-6 md:mb-6">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
                Why TheMelisseDesign?
              </h2>
            </div>
            {/* Centered subtitle text */}
            <div className="flex justify-center">
              <p className="text-gray-500 text-[18px] font-normal max-w-2xl text-center">
                Discover what makes our creative collaboration unique.
              </p>
            </div>
          </div>
          
           {/* Three Cards Layout - Exact spacing and proportions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card 1 - Seamless Collaboration - Updated background color and image */}
            <div className="bg-[#fcf2f8] rounded-[32px] overflow-hidden h-[600px] flex flex-col">
              {/* Image anchored to top - takes up ~65% of card height */}
              <div className="h-[65%] relative">
                <img
                  src="/images/collaborationfreelanceintokyo.png"
                  alt="collaborationfreelanceintokyo.png"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text content at bottom - takes up ~35% with proper padding */}
              <div className="h-[35%] p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-[42px] lg:text-[48px] font-normal text-black mb-4 leading-[1.1] tracking-[-0.02em]">
                  Seamless<br />collaboration
                </h3>
                <p className="text-gray-600 text-[16px] leading-[1.5] font-normal text-justify">
                  Smooth and transparent process from vision to delivery.
                </p>
              </div>
            </div>

            {/* Card 2 - Optimized Circular Orbit Animation with 8 curated images */}
            <div className="bg-[#fcf2f8] rounded-[32px] p-8 lg:p-12 h-[600px] flex flex-col">
              <div className="flex-1 flex flex-col">
                {/* Circular orbit animation container */}
                <div className="flex-1 flex items-center justify-center mb-8">
                  <div className="relative w-[280px] h-[280px]">
                    {/* Rotating container that holds 8 carefully selected images */}
                    <div className="absolute inset-0 animate-spin-slow">
                      {/* 8 images positioned in a perfect circle for optimal visual balance */}
                      {orbitalImages.map((image, index) => {
                        const angle = (index * 360) / 8; // Evenly distribute 8 images around circle
                        const radius = 110; // Distance from center
                        
                        return (
                          <div
                            key={index}
                            className="absolute w-[50px] h-[50px]"
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
                                onError={(e) => {
                                  console.log(`Failed to load image: ${image}`);
                                  // Hide the container if image fails to load
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
                
                {/* Bottom text - Updated to reflect curated selection */}
                <div className="flex items-center justify-center">
                  <p className="text-gray-600 text-[16px] leading-[1.5] font-normal text-center">
                    Over 65+ visuals crafted
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Modern, Impactful Websites - Right-aligned text */}
            <div className="bg-[#fcf2f8] rounded-[32px] p-8 lg:p-12 h-[600px] flex flex-col">
              <div className="flex-1 flex flex-col">
                {/* Main headline display - right-aligned to match subtitle */}
                <div className="flex-1 flex items-center justify-end mb-8">
                  <div className="text-right">
                    <div className="text-[64px] lg:text-[72px] font-normal text-black leading-[0.9] tracking-[-0.03em]">
                      Modern,<br />responsive<br />websites
                    </div>
                  </div>
                </div>
                
                {/* Subtitle content - Right-aligned to match title */}
                <div className="text-right">
                  <p className="text-gray-600 text-[16px] leading-[1.5] font-normal text-right">
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