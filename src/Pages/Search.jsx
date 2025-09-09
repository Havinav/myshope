import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams();
  const decodedCategory = category ? decodeURIComponent(category).trim() : "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [brand, setBrand] = useState([]);
  const [brandSelected, setBrandSelected] = useState("");

  const fetchProducts = useCallback(async () => {
    if (!decodedCategory) {
      setError("Please provide a valid search term or category.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let allProducts = [];
      const categoryData = decodedCategory.split("_").filter(Boolean); // Remove empty strings

      if (categoryData.length > 0) {
        const responses = await Promise.all(
          categoryData.map(async (cat) => {
            try {
              const resp = await axios.get(
                `https://dummyjson.com/products/category/${cat}`
              );
              return resp.data.products || [];
            } catch (err) {
              console.error(`Failed to fetch category ${cat}:`, err.message);
              return [];
            }
          })
        );
        allProducts = responses.flat();
      }

      // Fallback to search if no products found in categories
      if (allProducts.length === 0) {
        const searchTerm = decodedCategory.toLowerCase();
        const isMobileSearch = ["mobile", "mobiles"].includes(searchTerm);
        const query = isMobileSearch ? "smartphone" : searchTerm;

        try {
          const resp = await axios.get(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
          );
          allProducts = resp.data.products || [];
        } catch (err) {
          console.error(`Failed to fetch search results for ${query}:`, err.message);
          setError("No products found for this category or search term.");
        }
      }

      setProducts(allProducts);
      setFilteredProducts(allProducts);

      const brandItems = [
        ...new Set(
          allProducts
            .map((item) => item.brand)
            .filter(Boolean) // Remove undefined or null brands
        ),
      ];
      setBrand(brandItems);

      if (allProducts.length === 0) {
        setError("No products found for this category or search term.");
      }
    } catch {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [decodedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let updatedProducts = [...products];

    // Validate price range
    const minPrice = Math.max(0, priceRange.min);
    const maxPrice = Math.max(minPrice, priceRange.max);
    updatedProducts = updatedProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Filter by rating
    updatedProducts = updatedProducts.filter(
      (product) => product.rating >= minRating
    );

    // Filter by brand
    if (brandSelected) {
      updatedProducts = updatedProducts.filter(
        (product) => product.brand === brandSelected
      );
    }

    // Sort products
    if (sortOption === "price-low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [priceRange, minRating, sortOption, products, brandSelected]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value) >= 0 ? Number(value) : 0;
    setPriceRange((prev) => ({ ...prev, [name]: numValue }));
  };

  const handleRatingChange = (e) => {
    setMinRating(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value || e); // Support both select and button clicks
  };

  const handleBrandChange = (brand) => {
    setBrandSelected(brandSelected === brand ? "" : brand);
  };

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 1000 });
    setMinRating(0);
    setSortOption("default");
    setBrandSelected("");
  };

  return (
    <div className="mt-32 md:mt-25 md:px-6 max-w-7xl mx-auto min-h-screen text-black">
      {loading && (
        <div className="text-center text-gray-600 py-4">
          <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="ml-2">Loading...</span>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Filter Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Price</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                placeholder="Min"
                min="0"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                placeholder="Max"
                min="0"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
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

          {brand.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-2">Brand</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleBrandChange("")}
                  className={`text-sm text-left px-2 py-1 rounded-md ${
                    brandSelected === ""
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-600"
                  } hover:bg-blue-50 transition-colors`}
                  aria-pressed={brandSelected === ""}
                >
                  All Brands
                </button>
                {brand.map((b) => (
                  <button
                    key={b}
                    onClick={() => handleBrandChange(b)}
                    className={`text-sm text-left px-2 py-1 rounded-md ${
                      brandSelected === b
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-600"
                    } hover:bg-blue-50 transition-colors`}
                    aria-pressed={brandSelected === b}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product List */}
        <div className="w-full bg-white p-4 shadow-md rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg font-bold text-gray-800 capitalize">
              {decodedCategory || "Products"}
            </h2>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <label className="text-sm font-semibold text-gray-700">
                Sort By:
              </label>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="space-y-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="transition-shadow cursor-pointer border-b border-gray-200 py-4 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-shrink-0 w-full sm:w-48">
                      <img
                        className="w-full h-40 sm:h-48 object-contain mb-2 sm:mb-0"
                        src={product.thumbnail}
                        alt={product.title || "Product image"}
                        onError={(e) => (e.target.src = "/fallback-image.png")} // Fallback image
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-md font-bold text-gray-800 truncate">
                        {product.title}
                      </h3>
                      <p className="text-sm">
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
                      <p className="text-sm">
                        Brand:{" "}
                        <span className="font-medium">
                          {product.brand || "N/A"}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-bold">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => dispatch(addToCart(product))}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          disabled={!product.stock}
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/product-details/${product.id}`)
                          }
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 rounded-md hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600 py-4">
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