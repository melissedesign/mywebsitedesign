import React, { useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Video } from 'lucide-react';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Check if we're on ABISS, KōLegal, Linven, SUBLEE2 project pages, service pages, or contact page
  const isAbissProject = location.pathname === '/project/abiss';
  const isKolegalProject = location.pathname === '/project/kolegal';
  const isLinvenProject = location.pathname === '/project/linven';
  const isSublee2Project = location.pathname === '/project/sublee2' || location.pathname === '/project/SUBLEE2';
  const isWebDesignPage = location.pathname === '/web-design';
  const isBrandingPage = location.pathname === '/branding-communication';
  const isContactPage = location.pathname === '/contact';
  
  // On ABISS, KōLegal, Linven, SUBLEE2, Web Design, Branding, or Contact pages: use white styling only when not scrolled (hero section)
  // On other pages: use standard styling
  const useWhiteTheme = (isAbissProject || isKolegalProject || isLinvenProject || isSublee2Project || isWebDesignPage || isBrandingPage) && !scrolled;

  // Handle clicking outside mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        mobileMenuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    // Cleanup event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Portfolio', to: '/#portfolio' },
    { name: 'About', to: '/#about' },
    { name: 'Testimonials', to: '/#testimonials' },
    { name: 'Contact', to: '/contact' }, // New contact page link
  ];

  const serviceItems = [
    { name: 'Web Design', to: '/web-design' },
    { name: 'Branding & Communication', to: '/branding-communication' },
  ];

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Updated to use new logo filename */}
            <HashLink to="/#" className="flex items-center">
              <img
                src="/images/logothemelissedesign.png"
                alt="TheMelisseDesign Logo"
                className={`h-12 md:h-16 w-auto object-contain transition-all duration-300 ${
                  useWhiteTheme ? 'filter brightness-0 invert' : ''
                }`}
              />
            </HashLink>

            {/* Desktop navigation */}
            <nav className="hidden md:block">
              <div className={`border rounded-full px-2 py-1 shadow-sm transition-all duration-300 ${
                useWhiteTheme 
                  ? 'bg-white/10 backdrop-blur-md border-white/20' 
                  : 'bg-white border-[#f0ebee]'
              }`}>
                <div className="flex space-x-1 items-center">
                  {/* Services Dropdown */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center ${
                      useWhiteTheme
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-gray-700 hover:text-black hover:bg-[#f0ebee]/30'
                    } hover:scale-105 hover:shadow-sm`}>
                      Services
                      <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-2 w-56 bg-white border border-[#f0ebee] rounded-2xl shadow-lg transition-all duration-200 ${
                      servicesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}>
                      <div className="py-2">
                        {serviceItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className="block px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-black hover:bg-[#f0ebee]/30 mx-2 rounded-xl"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Other Navigation Items */}
                  {navItems.map((item) => (
                    item.to.startsWith('/#') ? (
                      <HashLink
                        key={item.name}
                        to={item.to}
                        scroll={scrollWithOffset}
                        className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                          useWhiteTheme
                            ? 'text-white/90 hover:text-white hover:bg-white/10'
                            : 'text-gray-700 hover:text-black hover:bg-[#f0ebee]/30'
                        } hover:scale-105 hover:shadow-sm`}
                      >
                        {item.name}
                      </HashLink>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                          useWhiteTheme
                            ? 'text-white/90 hover:text-white hover:bg-white/10'
                            : 'text-gray-700 hover:text-black hover:bg-[#f0ebee]/30'
                        } hover:scale-105 hover:shadow-sm`}
                      >
                        {item.name}
                      </Link>
                    )
                  ))}

                  {/* Camera Icon */}
                  <div className="relative ml-2">
                    <a
                      href="https://cal.com/themelissedesign/discoverycall"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-10 h-10 rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border ${
                        useWhiteTheme
                          ? 'bg-white/10 hover:bg-white/20 border-white/20'
                          : 'bg-white hover:bg-[#f0ebee]/30 border-[#f0ebee]'
                      }`}
                      aria-label="Book your free discovery call"
                    >
                      <Video className={`w-4 h-4 ${useWhiteTheme ? 'text-white' : 'text-[#5A1717]'}`} />
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Mobile Camera Icon */}
              <a
                href="https://cal.com/themelissedesign/discoverycall"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-10 h-10 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border ${
                  useWhiteTheme
                    ? 'bg-white/10 hover:bg-white/20 border-white/20'
                    : 'bg-white hover:bg-gray-50 border-[#f0ebee]'
                }`}
                aria-label="Book your free discovery call"
              >
                <Video className={`w-4 h-4 ${useWhiteTheme ? 'text-white' : 'text-[#5A1717]'}`} />
              </a>

              <button
                ref={mobileMenuButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-full transition-all ${
                  useWhiteTheme
                    ? 'hover:bg-white/10 text-white'
                    : 'hover:bg-white/80 text-gray-700'
                } hover:shadow-sm`}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-sm">
              <div className="flex flex-col space-y-1">
                {/* Mobile Services Section */}
                <div className="px-4 py-2">
                  <span className="text-sm font-medium text-gray-700 mb-2 block px-2 py-2 rounded-xl hover:bg-[#f0ebee]/30 transition-all duration-300">Services</span>
                  <div className="pl-4 space-y-1">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className="block px-2 py-2 text-sm font-medium text-gray-700 transition-all duration-300 rounded-xl hover:text-black hover:bg-[#f0ebee]/30"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Mobile Navigation Items */}
                {navItems.map((item) => (
                  item.to.startsWith('/#') ? (
                    <HashLink
                      key={item.name}
                      to={item.to}
                      scroll={scrollWithOffset}
                      className="relative px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 rounded-xl hover:text-black hover:bg-[#f0ebee]/30"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </HashLink>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="relative px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 rounded-xl hover:text-black hover:bg-[#f0ebee]/30"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;