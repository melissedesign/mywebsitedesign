import React from 'react';

interface GalleryProps {
  images: string[];
  className?: string;
  projectId?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, className = '', projectId }) => {
  // Special layout for ABISS project with 5 images
  if (projectId === 'abiss' && images.length === 5) {
    return (
      <div className={`space-y-8 ${className}`}>
        {/* First row - 2 images side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.slice(0, 2).map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-[4/3]">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Second row - 2 images side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.slice(2, 4).map((image, index) => (
            <div
              key={index + 2}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-[4/3]">
                <img
                  src={image}
                  alt={`Gallery image ${index + 3}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Third row - 1 centered image */}
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="aspect-[4/3]">
                <img
                  src={images[4]}
                  alt="Gallery image 5"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default grid layout for other projects
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div className="aspect-[4/3]">
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;