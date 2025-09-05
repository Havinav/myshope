import React from "react";
import Cateogery from "./Cateogery";
import { useNavigate } from "react-router-dom";

const Data1 = () => {
  const navigate = useNavigate();
  const electronicsData = [
    {
      cateogery: "laptops",
      image:
        "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp",
      name: "Asus ZenBook Pro Duo",
    },
    {
      cateogery: "mobile-accessories_smartphones",
      image:
        "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp",
      name: "Amazon Echo Plus",
    },
    {
      cateogery: "smartphones",
      image:
        "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp",
      name: "iPhone 13 Pro",
    },
    {
      cateogery: "tablets",
      image:
        "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp",
      name: "ipad Mini 2021",
    },
  ];

  const beautyData = [
    {
      cateogery: "beauty",
      image:
        "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
      name: "Powder Canister",
    },
    {
      cateogery: "beauty",
      image:
        "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
      name: "Red Lipstick",
    },
    {
      cateogery: "tops",
      image:
        "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/1.webp",
      name: "Girl Summer Dress",
    },
    {
      cateogery: "tops",
      image:
        "https://cdn.dummyjson.com/product-images/tops/gray-dress/thumbnail.webp",
      name: "Gray Dress",
    },
  ];
  const seasonData = [
    {
      cateogery: "sunglasses",
      image:
        "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp",
      name: "Sunglasses",
    },
    {
      cateogery: "watch",
      image:
        "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp",
      name: "Brown Leather Belt Watch",
    },
    {
      cateogery: "shoe",
      image:
        "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp",
      name: "Nike Air Jordan 1 Red And Black",
    },
    {
      cateogery: "shirt",
      image:
        "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp",
      name: "Black Pumps Heeled Shoes",
    },
  ];
  const womenData = [
    {
      cateogery: "top",
      image:
        "https://cdn.dummyjson.com/product-images/tops/tartan-dress/thumbnail.webp",
      name: "Tartan Dress",
    },
    {
      cateogery: "bag",
      image:
        "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/thumbnail.webp",
      name: "Women Handbag Black",
    },
    {
      cateogery: "womens-jewellery",
      image:
        "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/thumbnail.webp",
      name: "Tropical Earring",
    },
    {
      cateogery: "watch",
      image:
        "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/thumbnail.webp",
      name: "Women's Wrist Watch",
    },
  ];
  const othersData = [
    {
      image:
        "https://cdn.dummyjson.com/product-images/vehicle/pacifica-touring/thumbnail.webp",
      name: "Pacifica Touring",
    },
    {
      cateogery: "tablets",
      image:
        "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/thumbnail.webp",
      name: "Samsung Galaxy Tab",
    },
    {
      cateogery: "sports",
      image:
        "https://cdn.dummyjson.com/product-images/sports-accessories/volleyball/thumbnail.webp",
      name: "Volleyball",
    },
    {
      cateogery: "mobile-accessories",
      image:
        "https://cdn.dummyjson.com/product-images/mobile-accessories/tv-studio-camera-pedestal/thumbnail.webp",
      name: "TV Studio Camera Pedestal",
    },
  ];
  const topDealsData = [
    {
      cateogery: "beauty",
      image:
        "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
      name: "Red Nail Polish",
    },
    {
      cateogery: "fragrances",
      image:
        "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp",
      name: "Gucci Bloom Eau De",
    },
    {
      cateogery: "furniture",
      image:
        "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp",
      name: "Wooden Bathroom Sink",
    },
    {
      cateogery: "groceries",
      image:
        "https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp",
      name: "Strawberry",
    },
  ];
  const groceriesData = [
    {
      cateogery: "groceries",
      image:
        "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp",
      name: "Soft Drinks",
    },
    {
      cateogery: "groceries",
      image:
        "https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp",
      name: "Strawberry",
    },
    {
      cateogery: "groceries",
      image:
        "https://cdn.dummyjson.com/product-images/groceries/fish-steak/1.webp",
      name: "Fish Steak",
    },
    {
      cateogery: "groceries",
      image:
        "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp",
      name: "Ice Cream",
    },
  ];
  const homeData = [
    {
      cateogery: "furniture",
      image:
        "https://rukminim2.flixcart.com/image/240/240/j5ihlzk0/bed-mattress/2/y/c/6-48-75-skbnnldb75x48x06-bonnell-spring-peps-original-imaevnpjqz2mwyrz.jpeg?q=60",
      name: "Mattresses",
    },
    {
      cateogery: "furniture",
      image:
        "https://rukminim2.flixcart.com/image/240/240/l4d2ljk0/sofa-sectional/x/j/l/left-facing-180-34-aqua-blue-241-3-polyester-80-steffan-l-sheped-original-imagf9zer8ptqhrh.jpeg?q=60",
      name: "Sofa",
    },
    {
      cateogery: "furniture",
      image:
        "https://rukminim2.flixcart.com/image/240/240/jm9hfgw0/bed/h/g/g/king-na-rosewood-sheesham-bkwl05nhbs0401d1p-flipkart-perfect-original-imaf97cwhvgnwg95.jpeg?q=60",
      name: "Beds",
    },
    {
      cateogery: "furniture",
      image:
        "https://rukminim2.flixcart.com/image/240/240/xif0q/office-study-chair/z/t/2/1-teak-sagun-58-42-js-29-beaatho-121-92-original-imagrwgshgp2bhwv.jpeg?q=60",
      name: "Office Study Chair",
    },
  ];
  const womenFashionData = [
    {
      cateogery: "dress",
      image:
        "https://rukminim2.flixcart.com/image/240/240/xif0q/dress/8/x/u/l-aa-0171white-pink-floral-yoke-dress-aayu-original-imaggd2hszpruetz.jpeg?q=60",
      name: "Women Dresses",
    },
     {
      cateogery: "watch",
      image:
        "https://rukminim2.flixcart.com/image/420/420/xif0q/watch/t/l/n/2-kimy-fashionable-led-wristwatch-green-pink-kimy-boys-girls-original-imahf54akehfwjcf.jpeg?q=60",
      name: "watche's",
    },
     {
      cateogery: "dress",
      image:
        "https://rukminim2.flixcart.com/image/420/420/l2f20sw0/sari/f/3/j/free-3157-mysore-black-kanooda-prints-unstitched-original-imagdrk4ts47r9jv.jpeg?q=60",
      name: "Womens Saree's",
    },
     {
      cateogery: "shirt's",
      image:
        "https://rukminim2.flixcart.com/image/240/240/k2z1t3k0/jacket/z/v/x/m-9298233-mast-harbour-original-imafm78vbfvdzph7.jpeg?q=60",
      name: "Men Shirt's",
    },
  ];
  const handleSearch = (category) => {
    navigate(`/s/${category}`);
  };
  return (
    <div className="  ">
      <div className="bg-white text-black font-bold">
        <div className="p-2">
          <span className="text-2xl font-bold text-black p-2">
            Best of Electronics
          </span>
        </div>
        <div className="w-5/5 grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {electronicsData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              onClick={() => handleSearch(item.cateogery)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-42 h-42 mb-2"
              />
              <span className="text-sm text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="bg-white text-black font-bold">
        <div className="p-2">
          <span className="text-2xl font-bold text-black p-2">
            Best of Grocery's
          </span>
        </div>
        <div className="w-5/5 grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {groceriesData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              onClick={() => handleSearch(item.cateogery)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-42 h-42 mb-2"
              />
              <span className="text-sm text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <br />
       <div className=" text-black font-bold gap-3 grid grid-cols-1 md:grid-cols-3 ">
        <div className="bg-white p-2">
          <span className="text-2xl font-bold text-black p-2">
            Women's Sepecial
          </span>
          <div>
            <div className="w-5/5 grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
              {womenFashionData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  onClick={() => handleSearch(item.cateogery)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-42 h-42 mb-2"
                  />
                  <span className="text-sm text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-2">
          <span className="text-2xl font-bold text-black p-2">
            Furniture's Deal
          </span>
          <div>
            <div className="w-5/5 grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
              {homeData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSearch(item.cateogery)}
                  className="flex flex-col items-center  p-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-42 h-42 mb-2"
                  />
                  <span className="text-sm text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-2">

          <div>
            <div className="md:h-10">
              <img src="https://rukminim2.flixcart.com/www/1060/1560/promos/26/09/2023/6c3c5fe2-c236-4fa2-8d97-595e1e01da01.jpg?q=60"
              alt="images" className="md:h-127 w-full cursor-pointer"/>
            </div>
          </div>
        </div>
        &nbsp;
      </div>
      
      <div className=" text-black font-bold gap-3 grid grid-cols-1 md:grid-cols-3 ">
        <div className="bg-white p-2">
          <span className="text-2xl font-bold text-black p-2">
            Season's Top Picks
          </span>
          <div>
            <div className="w-5/5 grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
              {seasonData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center "
                  onClick={() => handleSearch(item.cateogery)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-42 h-42 mb-2"
                  />
                  <span className="text-sm text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-2">
          <span className="text-2xl font-bold text-black p-2">
            Women's Fashion
          </span>
          <div>
            <div className="w-5/5 grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
              {womenData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSearch(item.cateogery)}
                  className="flex flex-col items-center  p-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-42 h-42 mb-2"
                  />
                  <span className="text-sm text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-2">
          <span className="text-2xl font-bold text-black p-2">
            Explore More Categories
          </span>
          <div>
            <div className="w-5/5 grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
              {othersData.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSearch(item.cateogery)}
                  className="flex flex-col items-center  p-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-42 h-42 mb-2"
                  />
                  <span className="text-sm text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        &nbsp;
      </div>
      <div className="bg-white text-black font-bold">
        <div className="p-2">
          <span className="text-2xl font-bold text-black p-2">
            Top Deals On Popular Products
          </span>
        </div>
        <div className="w-5/5 grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {topDealsData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              onClick={() => handleSearch(item.cateogery)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-42 h-42 mb-2"
              />
              <span className="text-sm text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="bg-white text-black font-bold">
        <div className="p-2">
          <span className="text-2xl font-bold text-black p-2">
            Beauty, Tops & More
          </span>
          <div>
            <div className="w-5/5 grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
              {beautyData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  onClick={() => handleSearch(item.cateogery)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-42 h-42 mb-2"
                  />
                  <span className="text-sm text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data1;
