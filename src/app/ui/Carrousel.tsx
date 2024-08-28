"use client";

import React, { useState } from 'react';

const images = [
  'https://picsum.photos/seed/mengano/600/400',
  'https://picsum.photos/seed/ciruelo/600/400',
  'https://picsum.photos/seed/machop/600/400',
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-full">
      <div className="overflow-hidden w-full h-full">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 p-2 rounded-md overflow-hidden"
            >
              <img
                src={image}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-700 text-white"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-700 text-white"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;