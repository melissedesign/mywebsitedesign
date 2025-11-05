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
      {/* 🎨 Background Image avec overlay élégant */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <img
            src="/images/homepagepicture.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Overlay gradient subtil pour plus de contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[100dvh] w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
              
              {/* 🎨 TITRE ÉLÉGANT - Texte blanc avec effet luxe */}
              <h1 className="text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight font-hero">
                <span className="text-white font-light drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  Grow. Engage. 
                </span>
                <br className="hidden sm:inline" />
                {/* 🎨 MOT ANIMÉ - Effet doré/champagne élégant */}
                <span
                  className={`inline-block font-light bg-gradient-to-r from-[#D4AF37] via-[#F4E4C1] to-[#D4AF37] bg-clip-text text-transparent transition-all duration-600 ease-in-out ${
                    isAnimating ? 'opacity-0 transform translate-y-2 scale-95' : 'opacity-100 transform translate-y-0 scale-100'
                  }`}
                  style={{
                    textShadow: '0 0