import React from 'react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-16 md:py-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Services Heading */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-sm">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-700">
                Services
              </h2>
            </div>
          </div>
          
          {/* Two Equal-Width Service Blocks - Improved Mobile Spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            
            {/* Web Design Solutions Block */}
            <Link
              to="/web-design"
              className="group block bg-[#fff7fc] rounded-[20px] md:rounded-[24px] p-6 md:p-8 lg:p-10 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer h-full"
            >
              {/* Tag - Updated to "01" */}
              <div className="mb-4 md:mb-6">
                <span className="bg-[#f2f2f2] text-[#888888] px-3 py-2 rounded-lg text-xs font-medium">
                  01
                </span>
              </div>

              {/* Main Title - Updated to match "Modern, responsive websites" style */}
              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-light text-gray-800 mb-3 md:mb-4 leading-tight">
                Web Design
              </h3>

              {/* Subtitle */}
              <p className="text-[16px] md:text-[18px] font-normal text-black opacity-70 mb-4 md:mb-6 leading-relaxed">
                Modern interfaces built to connect and convert.
              </p>

              {/* Explore More Button - Left-aligned on mobile */}
              <div className="mb-6 md:mb-8 flex justify-start">
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-normal rounded-full transition-all duration-300 border border-transparent hover:border-gray-600 shadow-sm hover:shadow-md text-xs py-2 px-6 md:text-base md:py-3 md:px-6">
                  Explore More
                </button>
              </div>

              {/* Bullet Points - Fixed alignment */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-x-6 md:gap-y-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Responsive layouts</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">UX Optimization</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Smooth Animations</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">SEO Structure</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Custom Interfaces</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Unique design</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Branding & Communication Solutions Block */}
            <Link
              to="/branding-communication"
              className="group block bg-white rounded-[20px] md:rounded-[24px] p-6 md:p-8 lg:p-10 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer h-full border border-gray-100"
            >
              {/* Tag - Updated to "02" */}
              <div className="mb-4 md:mb-6">
                <span className="bg-[#f2f2f2] text-[#888888] px-3 py-2 rounded-lg text-xs font-medium">
                  02
                </span>
              </div>

              {/* Main Title - Updated to match "Modern, responsive websites" style */}
              <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-light text-gray-800 mb-3 md:mb-4 leading-tight">
                Branding & Communication
              </h3>

              {/* Subtitle */}
              <p className="text-[16px] md:text-[18px] font-normal text-black opacity-70 mb-4 md:mb-6 leading-relaxed">
                Crafting cohesive brand stories.
              </p>

              {/* Explore More Button - Left-aligned on mobile */}
              <div className="mb-6 md:mb-8 flex justify-start">
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-normal rounded-full transition-all duration-300 border border-transparent hover:border-gray-600 shadow-sm hover:shadow-md text-xs py-2 px-6 md:text-base md:py-3 md:px-6">
                  Explore More
                </button>
              </div>

              {/* Bullet Points - Fixed alignment */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-x-6 md:gap-y-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Logo design</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Visual identity</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Corporate communication</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Brand guidelines</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Social media design kits</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-3 text-lg flex-shrink-0 leading-none">•</span>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">Brand enhancement</span>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;