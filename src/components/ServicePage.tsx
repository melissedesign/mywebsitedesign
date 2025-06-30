import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { scrollToTop } from '../utils/scrollToTop';

const ServicePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  const services = {
    'website-design': {
      title: 'Website Design',
      description: 'Modern, responsive websites that elevate your brand. I create strategic, functional websites that help businesses succeed online.',
      process: [
        {
          title: 'Discovery',
          description: 'Understanding your business goals, target audience, and unique requirements'
        },
        {
          title: 'Design',
          description: 'Creating wireframes and visual designs that align with your brand'
        },
        {
          title: 'Development',
          description: 'Building your website with clean, efficient code'
        },
        {
          title: 'Launch',
          description: 'Testing and deploying your website with ongoing support'
        }
      ],
      features: [
        'Responsive design for all devices',
        'SEO optimization',
        'Fast loading speeds',
        'Content management system',
        'Analytics integration',
        'Security features'
      ]
    },
    'branding': {
      title: 'Branding & Identity',
      description: 'From logos to full brand guidelines, I help you stand out with a consistent and polished visual presence that resonates with your audience.',
      process: [
        {
          title: 'Research',
          description: 'Analyzing your market, competitors, and target audience'
        },
        {
          title: 'Strategy',
          description: 'Developing your brand positioning and messaging'
        },
        {
          title: 'Design',
          description: 'Creating your visual identity elements'
        },
        {
          title: 'Guidelines',
          description: 'Documenting brand standards for consistent application'
        }
      ],
      features: [
        'Logo design',
        'Color palette selection',
        'Typography system',
        'Brand guidelines',
        'Marketing materials',
        'Social media templates'
      ]
    },
    'presentation-design': {
      title: 'Presentation Design',
      description: 'Professional presentations that communicate your message with impact and visual clarity, helping you stand out in every meeting.',
      process: [
        {
          title: 'Content Review',
          description: 'Understanding your message and presentation goals'
        },
        {
          title: 'Structure',
          description: 'Organizing content for maximum impact'
        },
        {
          title: 'Design',
          description: 'Creating visually engaging slides'
        },
        {
          title: 'Delivery',
          description: 'Preparing presentation-ready files with notes'
        }
      ],
      features: [
        'Custom slide designs',
        'Data visualization',
        'Animation effects',
        'Speaker notes',
        'Multiple format exports',
        'Template creation'
      ]
    }
  };

  const service = services[id as keyof typeof services];

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/#features')}
          className="flex items-center text-gray-600 hover:text-[#237870] transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Services
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-medium text-[#5A1717] mb-6">
            {service.title}
          </h1>

          <p className="text-xl text-gray-600 mb-16">
            {service.description}
          </p>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-[#5A1717] mb-8">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.process.map((step, index) => (
                <div key={index} className="bg-[#FBEAEA]/10 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-[#5A1717] text-white rounded-full flex items-center justify-center mr-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-medium text-[#5A1717]">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div>
            <h2 className="text-2xl font-medium text-[#5A1717] mb-8">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center bg-white rounded-lg p-4 shadow-sm">
                  <div className="w-2 h-2 bg-[#5A1717] rounded-full mr-4"></div>
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;