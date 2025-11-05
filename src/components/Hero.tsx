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
      {/* Background Image avec overlay très subtil */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <img
            src="/images/homepagepicture.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Overlay très léger pour contraste */}
        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[100dvh] w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
              
              {/* 🎨 TITRE ULTRA-FIN & ÉLÉGANT */}
              <h1 className="text-[3rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight">
                {/* Texte blanc fin */}
                <span className="block text-white font-extralight tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                  Grow. Engage.
                </span>
                
                {/* Mot animé - Blanc avec effet subtle */}
                <span
                  className={`block text-white font-thin italic tracking-widest transition-all duration-700 ease-out ${
                    isAnimating 
                      ? 'opacity-0 transform translate-y-4 blur-sm'