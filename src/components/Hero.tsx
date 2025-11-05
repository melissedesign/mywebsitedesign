import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const Hero: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('Convert');
  const [isAnimating, setIsAnimating] = useState(false);

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentWord(prev => prev === 'Convert' ? 'Connect' : 'Convert');
        setIsAnimating(false);
      }, 300);

    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="absolute inset-0">
          <img
            src="/images/homepagepicture.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full blur-3xl animate-pulse-gentle"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full blur-3xl animate-pulse-gentle" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-20 flex items-center justify-center min-h-[100dvh] w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
              <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight font-hero">
                <span className="text-black font-light">Grow. Engage. </span>
                <span
                  className={`text-[#5A1717] font-light transition-all duration-600 ease-in-out inline-block ${
                    isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                  }`}
                >
                  {currentWord}.
                </span>
              </h1>

              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-500 leading-relaxed font-hero-alt font-light">
                  Attract clients by elevating your brand.
                </p>
              </div>

              <div className="pt-6 md:pt-8">
                <div className="bg-white border border-[#FBEAEA] rounded-full px-2 py-1 shadow-sm inline-block">
                  <HashLink
                    to="/#get-in-touch"
                    scroll={scrollWithOffset}
                    className="relative px-4 md:px-6 py-2 text-xs md:text-sm font-medium text-gray-700 transition-all duration-300 rounded-full hover:text-black hover:bg-[#FBEAEA]/30 hover:scale-105 hover:shadow-sm inline-flex items-center"
                  >
                    <span>Get in touch</span>
                    <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
