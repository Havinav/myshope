import React from "react";
import { useNavigate } from "react-router-dom";

const Cateogery = () => {
  const navigate = useNavigate();
  const categories = [
    {
      category: "smartphones_mobile-accessories_tablets",
      name: "Mobiles",
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/5f2ee7f883cdb774.png?q=100",
    },
    {
      category:
        "mens-shirts_mens-shoes_mens-watches_womens-bags_womens-dresses_womens-jewellery_womens-shoes_womens-watches",
      name: "Fashion",
      image:
        "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/thumbnail.webp",
    },

    {
      category: "home-decoration_furniture_kitchen-accessories_fragrances",
      name: "Home & Furniture",
      image:
        "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
    },
    {
      category: "skin-care_beauty",
      name: "Beauty",
      image:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    },
    {
      category: "groceries",
      name: "Grocery",
      image: "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
    },

    {
      category: "sports-accessories",
      name: "Sports",
      image:
        "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/1.webp",
    },
    {
      category: "sunglasses",
      name: "Sunglasses",
      image:
        "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp",
    },
    {
      category: "laptops",
      name: "Laptops",
      image:
        "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
    },
  ];
  const handleCategoryClick = (category) => {
    // Navigate to the search page with the selected category as a query parameter
    navigate(`/s/${category}`);
  };
  return (
    <div className="flex justify-center items-center bg-white text-black font-bold ">
      <div className="w-5/5 grid grid-cols-2 md:grid-cols-8 gap-4 p-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() => handleCategoryClick(category.category)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-fit object-contain rounded-lg"
            />
            <span className="text-sm text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cateogery;
