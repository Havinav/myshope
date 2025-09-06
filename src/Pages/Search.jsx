import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const decodedCategory = category ? decodeURIComponent(category) : "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      let customMessage = "";
      try {
        let categoryData = decodedCategory.split("_");
        let allProducts = [];

        const response = await Promise.all(
          categoryData.map(async (cat) => {
            try {
              const resp = await axios.get(
                `https://dummyjson.com/products/category/${cat}`
              );
              return resp.data.products || [];
            } catch (err) {
              console.error(`Failed to fetch ${cat}:`, err.message);
              return [];
            }
          })
        );
        allProducts = response.flat();

        if (allProducts.length === 0) {
          let fallbackCategory = decodedCategory;
          if (
            fallbackCategory.toLowerCase() === "mobile" ||
            fallbackCategory.toLowerCase() === "mobiles"
          ) {
            try {
              const resp = await axios.get(
                `https://dummyjson.com/products/search?q=smartphone`
              );
              allProducts = resp.data.products || [];
            } catch (err) {
              console.error(
                `Failed to fetch search results for ${fallbackCategory}:`,
                err.message
              );
              setError(
                customMessage ||
                  "No products found for this category or search term."
              );
            }
          } else {
            try {
              const resp = await axios.get(
                `https://dummyjson.com/products/search?q=${fallbackCategory}`
              );
              allProducts = resp.data.products || [];
            } catch (err) {
              console.error(
                `Failed to fetch search results for ${fallbackCategory}:`,
                err.message
              );
              setError(
                customMessage ||
                  "No products found for this category or search term."
              );
            }
          }
        }

        setProducts(allProducts);
        setFilteredProducts(allProducts);

        if (allProducts.length === 0 && !error) {
          setError(
            customMessage ||
              "No products found for this category or search term."
          );
        }
      } catch {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (decodedCategory) {
      fetchProducts();
    }
  }, [decodedCategory]);

  // Filter and sort products
  useEffect(() => {
    let updatedProducts = [...products];

    // Apply price filter
    updatedProducts = updatedProducts.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply rating filter
    updatedProducts = updatedProducts.filter(
      (product) => product.rating >= minRating
    );

    // Apply sorting
    if (sortOption === "price-low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [priceRange, minRating, sortOption, products]);

  // Handle filter changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleRatingChange = (e) => {
    setMinRating(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortOption(e);
  };

  return (
    <div className="mt-32 md:mt-25  md:px-6 max-w-7xl mx-auto min-h-screen text-black">
      {loading && <div className="text-center text-gray-600">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Price</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                placeholder="Min"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                placeholder="Max"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="text-black">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Rating</h3>
            <select
              value={minRating}
              onChange={handleRatingChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>All Ratings</option>
              <option value={1}>1 Star & Up</option>
              <option value={2}>2 Stars & Up</option>
              <option value={3}>3 Stars & Up</option>
              <option value={4}>4 Stars & Up</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="w-full bg-white p-4 shadow-md rounded-lg">
          <div className="w-full bg-white p-6 shadow-md rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800 capitalize">
                {decodedCategory || "Products"}
              </h2>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <label className="text-sm font-semibold text-gray-700">
                  Sort By:
                </label>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => handleSortChange("default")}
                    className={`text-sm ${
                      sortOption === "default"
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600"
                    } hover:text-blue-500 transition-colors`}
                    aria-pressed={sortOption === "default"}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => handleSortChange("price-low-high")}
                    className={`text-sm ${
                      sortOption === "price-low-high"
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600"
                    } hover:text-blue-500 transition-colors`}
                    aria-pressed={sortOption === "price-low-high"}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => handleSortChange("price-high-low")}
                    className={`text-sm ${
                      sortOption === "price-high-low"
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600"
                    } hover:text-blue-500 transition-colors`}
                    aria-pressed={sortOption === "price-high-low"}
                  >
                    Price: High to Low
                  </button>
                </div>
              </div>
            </div>
          </div>
          &nbsp;
          {/* Product Grid */}
          <div className="">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className=" hover:bg-gray-100 transition-shadow cursor-pointer"
                  onClick={() => navigate(`/product-details/${product.id}`)}
                >
                  <div className="flex justify-between space-y-2">
                    <div>
                      <img
                        className="w-full h-48 object-contain mb-4"
                        src={product.thumbnail}
                        alt={product.title || "Product image"}
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-md font-bold   text-gray-800 truncate">
                        {product.title}
                      </h3>

                      <p className="">
                        Rating:{" "}
                        <span className="font-medium">
                          {product.rating.toFixed(1)} / 5
                        </span>
                      </p>
                      <p className="text-sm">
                        Discount:{" "}
                        <span className="font-medium">
                          {product.discountPercentage.toFixed(2)}%
                        </span>
                      </p>
                      <p className="text-sm">
                        Stock:{" "}
                        <span className="font-medium">
                          {product.stock ? "In Stock" : "Out of Stock"}
                        </span>
                      </p>
                      <p className="text-sm ">
                        Brand:{" "}
                        <span className="font-medium">
                          {product.brand || "N/A"}
                        </span>
                      </p>

                      <p className="text-sm">
                        Category:{" "}
                        <span className="font-medium">
                          {product.category || "N/A"}
                        </span>
                      </p>
                       <p className="text-sm ">
                        ReturnPolicy:{" "}
                        <span className="font-medium">
                          {product.returnPolicy}
                        </span>
                      </p>
                    </div>

                    <div className="p-4">
                      <p className="text-lg font-bold ">
                        $ {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
