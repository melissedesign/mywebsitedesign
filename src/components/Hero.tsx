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
      {/* Background Image avec overlay subtil */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <img
            src="/images/homepagepicture.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 🎨 CHANGEMENT 1: Overlay plus léger et moderne */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[100dvh] w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            
            {/* 🎨 CHANGEMENT 2: Conteneur avec glassmorphism */}
            <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              
              {/* 🎨 CHANGEMENT 3: Titre en BLANC avec ombre */}
              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight font-hero">
                <span className="text-white font-light drop-shadow-lg">Grow. Engage. </span>
                <span
                  className={`text-[#FBEAEA] font-light transition-all duration-600 ease-in-out inline-block drop-shadow-lg ${
                    isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
                  }`}
                >
                  {currentWord}.
                </span>
              </h1>

              {/* 🎨 CHANGEMENT 4: Sous-titre en blanc */}
              <div className="max-w-4xl mx-auto">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed font-hero-alt font-light drop-shadow-md">
                  Attract clients by elevating your brand.
                </p>
              </div>

              {/* 🎨 CHANGEMENT 5: Bouton plus visible */}
              <div className="pt-6 md:pt-8">
                <HashLink
                  to="/#get-in-touch"
                  scroll={scrollWithOffset}
                  className="inline-flex items-center px-8 py-4 text-base md:text-lg font-medium text-white bg-[#5A1717] hover:bg-[#7A2727] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <span>Get in touch</span>
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </HashLink>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;