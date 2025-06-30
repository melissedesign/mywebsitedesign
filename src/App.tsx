import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import WhySection from './components/WhySection';
import About from './components/About';
import TestimonialCarousel from './components/TestimonialCarousel';
import PhotoCarousel from './components/PhotoCarousel';
import GetInTouch from './components/GetInTouch';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage';
import ServicePage from './components/ServicePage';
import WebDesignPage from './components/WebDesignPage';
import BrandingPage from './components/BrandingPage';
import ContactPage from './components/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import { restoreScrollPosition } from './utils/scrollPosition';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Handle page refresh - scroll to top
  useEffect(() => {
    // Check if we should restore scroll position (coming back from project page)
    const shouldRestore = sessionStorage.getItem('mainPageScroll');
    
    if (shouldRestore) {
      // Restore scroll position
      restoreScrollPosition();
    } else {
      // Ensure page starts at top on initial load/refresh
      if (window.scrollTo) {
        window.scrollTo(0, 0);
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Preloader />
        <ScrollToTop />
        <Header scrolled={scrolled} />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Portfolio />
              <Features />
              <WhySection />
              <About />
              <TestimonialCarousel />
              <PhotoCarousel />
              <GetInTouch />
            </main>
          } />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/web-design" element={<WebDesignPage />} />
          <Route path="/branding-communication" element={<BrandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;