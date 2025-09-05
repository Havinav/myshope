import React from 'react';
import Slider from 'react-slick';


const ProductCarousel = ({ imageList }) => {
  
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    accessibility: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false, // Hide arrows on mobile for cleaner UI
        },
      },
    ],
  };

  // Handle empty or invalid imageList
  if (!imageList || !Array.isArray(imageList) || imageList.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Slider {...settings} aria-label="Product image carousel">
        {imageList.map((image, index) => (
          <div key={index} className="px-2">
            <img
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-full h-64 md:h-96 object-contain rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;