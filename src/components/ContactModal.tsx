import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, User, MessageSquare, ChevronDown, CheckCircle, AlertCircle, Loader2, Video } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

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

  const services = [
    { value: 'web-design', label: 'Web Design' },
    { value: 'branding-communication', label: 'Branding & Communication' }
  ];

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', message: '', service: '' });
      setSubmitStatus('idle');
      setErrorMessage('');
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  // Handle page behavior and focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store original body overflow style
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyWidth = document.body.style.width;
    
    // Disable scrolling behind the modal
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Tab key navigation within modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus first element when modal opens
    setTimeout(() => {
      firstFocusableRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore normal page scrolling when modal is closed
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.width = originalBodyWidth;
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle service selection
  const handleServiceSelect = (service: { value: string; label: string }) => {
    setFormData(prev => ({
      ...prev,
      service: service.value
    }));
    setIsDropdownOpen(false);
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

      // Success - show success message
      setSubmitStatus('success');
      
      // Auto-close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Calendly link click
  const handleCalendlyClick = () => {
    window.open('https://cal.com/themelissedesign/discoverycall', '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  const selectedService = services.find(s => s.value === formData.service);

  return (
    <div 
      className="fixed inset-0 z-[9999]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      aria-describedby="contact-modal-description"
    >
      <div 
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl overflow-hidden w-full"
        style={{
          maxWidth: '500px',
          width: '100%',
          height: 'auto',
          maxHeight: '90vh',
          margin: 0,
          padding: 0,
          transform: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Top Right Corner */}
        <button
          ref={firstFocusableRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#5A1717] focus:ring-offset-2 z-10"
          aria-label="Close contact form"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 id="contact-modal-title" className="text-2xl font-semibold text-gray-800">
            Get In Touch
          </h2>
          <p id="contact-modal-description" className="text-gray-600 mt-2">
            Let's discuss your project and bring your vision to life
          </p>
        </div>

        {/* Content - Scrollable area */}
        <div 
          className="overflow-y-auto px-6"
          style={{ 
            maxHeight: 'calc(90vh - 160px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-green-800 font-medium">Message sent successfully!</p>
                <p className="text-green-700 text-sm">Thank you for reaching out. We will get back to you soon.</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Error sending message</p>
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 text-gray-900 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5A1717] border border-gray-200 focus:border-[#5A1717] disabled:opacity-50 disabled:cursor-not-allowed text-base"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            {/* 2. Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 text-gray-900 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5A1717] border border-gray-200 focus:border-[#5A1717] disabled:opacity-50 disabled:cursor-not-allowed text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* 3. Service Interest Dropdown */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Service Interest <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 text-gray-900 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#5A1717] border border-gray-200 focus:border-[#5A1717] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between text-base"
                >
                  <span className={selectedService ? 'text-gray-900' : 'text-gray-500'}>
                    {selectedService ? selectedService.label : 'Select a service'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {services.map((service) => (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => handleServiceSelect(service)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg text-base"
                      >
                        {service.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 4. Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                What your brand is currently missing? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full bg-gray-50 text-gray-900 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5A1717] border border-gray-200 focus:border-[#5A1717] disabled:opacity-50 disabled:cursor-not-allowed resize-vertical text-base"
                  placeholder="Tell us about your project and what you're looking to achieve"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer with Three Buttons */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white hover:bg-gray-100 rounded-lg transition-colors font-medium border border-gray-200 text-sm"
          >
            Cancel
          </button>

          {/* Send Message Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || submitStatus === 'success' || !formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !formData.service}
            className="flex-1 px-4 py-2 bg-[#5A1717] text-white rounded-lg hover:bg-[#4a1515] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center text-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Sent!
              </>
            ) : (
              'Send Message'
            )}
          </button>
          
          {/* Video Call Button */}
          <button
            ref={lastFocusableRef}
            onClick={handleCalendlyClick}
            disabled={isSubmitting}
            className="px-3 py-2 bg-white hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
            aria-label="Book a call"
          >
            <Video className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;