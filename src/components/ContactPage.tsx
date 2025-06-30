import React, { useState, useEffect, useRef } from 'react';
import { Mail, User, MessageSquare, ChevronDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const ContactPage: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: ''
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Ref for dropdown to handle outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);

  const services = [
    { value: 'web-design', label: 'Web Design' },
    { value: 'branding-communication', label: 'Branding & Communication' }
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle dropdown toggle
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle service selection
  const handleServiceSelect = (service: { value: string; label: string }) => {
    setFormData(prev => ({
      ...prev,
      service: service.value
    }));
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Submit form to Formspree
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !formData.service) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mkgbrwez', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          service: services.find(s => s.value === formData.service)?.label || formData.service
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Success - show success message and reset form
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', service: '' });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = services.find(s => s.value === formData.service);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-8 py-4 shadow-sm mb-6">
              <h1 className="text-2xl md:text-3xl font-medium text-gray-700">
                Contact
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to shape your brand together? Let's start the conversation.
            </p>
          </div>

          {/* Contact Form Container */}
          <div className="max-w-2xl mx-auto">
            
            {/* Success State - Full Width Block */}
            {submitStatus === 'success' ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-12 md:p-16 text-center border border-green-200 shadow-sm">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-medium text-green-800 mb-4">
                    Message Sent Successfully!
                  </h2>
                  <p className="text-green-700 text-lg mb-8">
                    Thank you for reaching out. We will get back to you soon.
                  </p>
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setSubmitStatus('idle');
                        setFormData({ name: '', email: '', message: '', service: '' });
                      }}
                      className="w-full px-6 py-3 bg-white text-green-700 rounded-xl hover:bg-green-50 transition-colors font-medium border border-green-200"
                    >
                      Send Another Message
                    </button>
                    <div className="text-center">
                      <a
                        href="https://cal.com/themelissedesign/discoverycall"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                      >
                        Or schedule a call directly
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Contact Form - Only show when not in success state */
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                
                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl flex items-center">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-4 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium text-lg">Error sending message</p>
                      <p className="text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-3">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full bg-gray-50 text-gray-900 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-300 border border-gray-200 focus:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg transition-colors"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-3">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full bg-gray-50 text-gray-900 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-300 border border-gray-200 focus:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg transition-colors"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  {/* Service Interest Dropdown - SIMPLE INLINE DROPDOWN FOR ALL DEVICES */}
                  <div>
                    <label htmlFor="service" className="block text-lg font-medium text-gray-700 mb-3">
                      Service Interest <span className="text-red-500">*</span>
                    </label>
                    <div 
                      className="relative" 
                      ref={dropdownRef}
                    >
                      <button
                        type="button"
                        onClick={handleDropdownToggle}
                        disabled={isSubmitting}
                        className="w-full bg-gray-50 text-gray-900 rounded-xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-gray-300 border border-gray-200 focus:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between text-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="listbox"
                      >
                        <span className={selectedService ? 'text-gray-900' : 'text-gray-500'}>
                          {selectedService ? selectedService.label : 'Select a service'}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Simple Inline Dropdown - Same for all devices */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] overflow-hidden">
                          {services.map((service, index) => (
                            <button
                              key={service.value}
                              type="button"
                              onClick={() => handleServiceSelect(service)}
                              className={`w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors text-lg focus:outline-none focus:bg-gray-50 border-none bg-white ${
                                index === services.length - 1 ? '' : 'border-b border-gray-100'
                              }`}
                              role="option"
                              aria-selected={formData.service === service.value}
                            >
                              {service.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-3">
                      What your brand is currently missing? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        rows={6}
                        className="w-full bg-gray-50 text-gray-900 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-300 border border-gray-200 focus:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical text-lg transition-colors"
                        placeholder="Tell us about your project and what you're looking to achieve"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button - Updated with neutral colors */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !formData.service}
                      className="w-full px-8 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center text-lg shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Alternative Contact Methods - Only show when not in success state */}
          {submitStatus !== 'success' && (
            <div className="max-w-2xl mx-auto mt-12">
              <div className="text-center">
                <h2 className="text-xl font-medium text-gray-700 mb-6">
                  Or
                </h2>
                <div className="inline-block bg-white border border-[#FBEAEA] rounded-full px-2 py-1 shadow-sm animate-pulse-gentle">
                  <a
                    href="https://cal.com/themelissedesign/discoverycall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-6 py-3 text-lg font-medium text-gray-700 transition-all duration-300 rounded-full hover:text-black hover:bg-[#FBEAEA]/30 hover:scale-105 hover:shadow-sm inline-block"
                  >
                    Book a Discovery Call
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;