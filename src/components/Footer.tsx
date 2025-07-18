import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-b from-white via-[#FFF5F5] to-[#FBEAEA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center">
            <h3 className="font-medium text-[#5A1717] mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <HashLink to="/#" className="text-gray-600 hover:text-[#237870] transition-colors">
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink to="/#features" className="text-gray-600 hover:text-[#237870] transition-colors">
                  Services
                </HashLink>
              </li>
              <li>
                <HashLink to="/#portfolio" className="text-gray-600 hover:text-[#237870] transition-colors">
                  Portfolio
                </HashLink>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="font-medium text-[#5A1717] mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <HashLink to="/#get-in-touch" className="text-gray-600 hover:text-[#237870] transition-colors">
                  Contact
                </HashLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo, Email and Copyright */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/images/logothemelissedesign.png"
              alt="logothemelissedesign.png"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>
          
          {/* Email Contact */}
          <div className="mb-4">
            <a 
              href="mailto:contact@themelissedesign.com"
              className="text-gray-600 hover:text-[#237870] transition-colors text-sm"
            >
              contact@themelissedesign.com
            </a>
          </div>
          
          {/* Copyright and Design Credit */}
          <div className="space-y-1">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} TheMelisseDesign. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Designed by TheMelisseDesign
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;