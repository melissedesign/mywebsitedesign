import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Mail, AlertCircle, Loader2 } from 'lucide-react';
import Cal, { getCalApi } from "@calcom/embed-react";

const GetInTouch: React.FC = () => {
  // Cal.com initialization
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "discoverycall" });
      cal("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view",
        styles: {
          branding: {
            brandColor: "#5A1717"
          }
        }
      });
    })();
  }, []);

  return (
    <section id="get-in-touch" className="py-12 md:py-16 lg:py-20 bg-white">
      {/* Increased horizontal padding */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Optimized mobile heading */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-sm">
              <h2 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-700">
                Get In Touch
              </h2>
            </div>
          </div>

          {/* Discovery Call Section - Full Width and Centered */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border border-gray-100">
              {/* Profile Image - Updated to use new filename */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto mb-6 md:mb-8 border-4 border-[#FBEAEA]">
                <img
                  src="/images/melissewebdesigner.png"
                  alt="Melisse"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              <h3 className="text-xl md:text-2xl font-medium text-[#5A1717] mb-4 md:mb-6 text-center">
                Book a Call
              </h3>

              {/* Duration */}
              <div className="flex items-center justify-center text-gray-600 mb-6 md:mb-8">
                <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                <span className="text-sm md:text-base">30 minutes</span>
              </div>

              {/* Cal.com Embedded Calendar - Enhanced for Better Scrolling */}
              <div className="mb-8 md:mb-10">
                <div className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-200 shadow-inner">
                  <h4 className="text-lg font-medium text-[#5A1717] mb-4 text-center">Select Your Preferred Time</h4>
                  
                  {/* Calendar Container with Proper Scrolling */}
                  <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div 
                      className="w-full overflow-auto"
                      style={{ 
                        height: "600px",
                        maxHeight: "80vh",
                        WebkitOverflowScrolling: "touch" // Enable smooth scrolling on iOS
                      }}
                    >
                      <Cal
                        namespace="discoverycall"
                        calLink="themelissedesign/discoverycall"
                        style={{ 
                          width: "100%", 
                          minHeight: "600px",
                          height: "auto",
                          border: "none",
                          borderRadius: "0"
                        }}
                        config={{ 
                          layout: "month_view",
                          hideEventTypeDetails: false,
                          theme: "light"
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Mobile Scroll Hint */}
                  <div className="mt-4 text-center md:hidden">
                    <p className="text-xs text-gray-500">
                      Scroll within the calendar to see more dates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;