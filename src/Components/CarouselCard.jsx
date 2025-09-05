import React from 'react';
import Slider from 'react-slick';

const CarouselCard = () => {
  const data = [
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/705dfcfcdffd2671.jpg?q=60',
      alt: 'Promotional banner for electronics sale',
    },
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/edd13e546319db37.jpeg?q=60',
      alt: 'Promotional banner for fashion collection',
    },
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/78c3cfa787e8acbe.jpg?q=60',
      alt: 'Promotional banner for home appliances',
    },
    {
      image: 'https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1338bd4fc60390d8.jpg?q=60',
      alt: 'Promotional banner for grocery deals',
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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

  return (
    <div className=" max-w-7xl mx-auto px-5">
      <Slider {...settings} aria-label="Promotional carousel">
        {data.map((item, index) => (
          <div key={index} className="">
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-[200px] md:h-[200px] object-cover "
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselCard;