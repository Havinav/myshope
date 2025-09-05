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
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      let customMessage = ""; // To store custom text for mobile/mobiles

      try {
        let categoryData = decodedCategory.split("_");
        let allProducts = [];

        // First attempt: Fetch products by category
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

        // Fallback: If no products found, try search API
        if (allProducts.length === 0) {
          let fallbackCategory = decodedCategory;
          // Check for mobile or mobiles and add custom text
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

        // Update state with fetched products
        setProducts(allProducts);
        setFilteredProducts(allProducts);

        // Set custom message or error if no products are found
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

  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by price range
    updatedProducts = updatedProducts.filter(
      (product) =>
        product.price >= priceRange.min &&
        product.price <= (priceRange.max || Infinity)
    );

    // Filter by minimum rating
    updatedProducts = updatedProducts.filter(
      (product) => product.rating >= minRating
    );

    // Sort products
    if (sortOption === "priceLowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "ratingHighToLow") {
      updatedProducts.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(updatedProducts);
  }, [products, priceRange, minRating, sortOption]);

  const handleProductClick = (id) => {
    navigate(`/product-details/${id}`);
  };

  const handlePriceFilter = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value === "" ? (name === "min" ? 0 : Infinity) : Number(value),
    }));
  };

  const handleRatingFilter = (rating) => {
    setMinRating(rating);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="mt-34 md:mt-25 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Filter and Sort Section */}
      <div className="bg-white text-black p-4 rounded-lg shadow mb-2">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Filter by Price</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="min"
                placeholder="Min Price"
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={handlePriceFilter}
                value={priceRange.min === 0 ? "" : priceRange.min}
                min="0"
                aria-label="Minimum price filter"
              />
              <input
                type="number"
                name="max"
                placeholder="Max Price"
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={handlePriceFilter}
                value={priceRange.max === Infinity ? "" : priceRange.max}
                min="0"
                aria-label="Maximum price filter"
              />
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Filter by Rating</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((rating) => (
                <button
                  key={rating}
                  className={`px-3 py-1 rounded-lg ${
                    minRating === rating
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  } transition-colors duration-200`}
                  onClick={() => handleRatingFilter(rating)}
                  aria-label={`Filter by ${rating} star rating or higher`}
                >
                  {rating}★+
                </button>
              ))}
              <button
                className={`px-3 py-1 rounded-lg ${
                  minRating === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } transition-colors duration-200`}
                onClick={() => handleRatingFilter(0)}
                aria-label="Clear rating filter"
              >
                All
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Sort By</h3>
            <select
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={sortOption}
              onChange={handleSortChange}
              aria-label="Sort products"
            >
              <option value="default">Default</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="ratingHighToLow">Rating: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      {/* Loading, Error, and Empty States */}
      {loading && (
        <div className="text-center text-gray-500 text-lg">
          Loading products...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-lg">Error: {error}</div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No products found for "{decodedCategory}"
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 transition-shadow duration-200"
            >
              <div
                className="flex justify-center items-center h-48 p-6"
                onClick={() => handleProductClick(product.id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleProductClick(product.id)
                }
                aria-label={`View details for ${product.title}`}
              >
                <img
                  className="w-full h-full object-contain cursor-pointer"
                  src={product.thumbnail}
                  alt={product.title || "Product image"}
                />
              </div>
              <div className="px-5 pb-5 flex flex-col gap-3">
                <h5
                  className="text-lg font-medium text-gray-900 cursor-pointer line-clamp-2 min-h-[2.5em]"
                  onClick={() => handleProductClick(product.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleProductClick(product.id)
                  }
                  title={product.title} // Full title on hover for long titles
                >
                  {product.title}
                </h5>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.round(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {product.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200"
                    aria-label={`Add ${product.title} to cart`}
                      
                  >
                   ADD TO CART
                  </button>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
