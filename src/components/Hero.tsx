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
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <img
            src="/images/homepagepicture.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-20 flex items-center justify-center min-h-[100dvh] w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
              <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight font-hero">
                <span className="text-white font-light">Grow. Engage. </span>
                <span
                  className={`text-white font-light transition-all duration-600 ease-in-out inline-block ${
                    isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                  }`}
                >
                  {currentWord}.
                </span>
              </h1>

              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-hero-alt font-light">
                  Attract clients by elevating your brand.
                </p>
              </div>

              <div className="pt-6 md:pt-8">
                <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-full px-2 py-1 shadow-sm inline-block">
                  <HashLink
                    to="/#get-in-touch"
                    scroll={scrollWithOffset}
                    className="relative px-4 md:px-6 py-2 text-xs md:text-sm font-medium text-white transition-all duration-300 rounded-full hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-sm inline-flex items-center"
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
