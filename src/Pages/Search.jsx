import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams();
  const decodedCategory = category ? decodeURIComponent(category).trim().toLowerCase() : "";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(1000); // Single state for max price
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [brands, setBrands] = useState([]);
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
      const categoryData = decodedCategory.split("_").filter(Boolean);

      const categoryMap = {
        laptops: "laptops",
        mobile: "smartphones",
        mobiles: "smartphones",
      };

      if (categoryData.length > 0) {
        const responses = await Promise.all(
          categoryData.map(async (cat) => {
            const apiCategory = categoryMap[cat.toLowerCase()] || cat;
            try {
              const resp = await axios.get(
                `https://dummyjson.com/products/category/${encodeURIComponent(apiCategory)}`
              );
              return resp.data.products || [];
            } catch (err) {
              console.error(`Failed to fetch category ${apiCategory}:`, err.message);
              return [];
            }
          })
        );
        allProducts = responses.flat();
      }

      if (allProducts.length === 0) {
        const searchTerm = decodedCategory.toLowerCase();
        const query = categoryMap[searchTerm] || searchTerm;
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

      // Set max price dynamically based on fetched products
      const maxProductPrice = allProducts.length > 0
        ? Math.ceil(Math.max(...allProducts.map((p) => p.price)))
        : 1000;
      setMaxPrice(maxProductPrice);

      setProducts(allProducts);
      setFilteredProducts(allProducts);

      const brandItems = [
        ...new Set(allProducts.map((item) => item.brand).filter(Boolean)),
      ];
      setBrands(brandItems);

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

    // Filter by price (min is always 0, max is maxPrice)
    updatedProducts = updatedProducts.filter(
      (product) => product.price <= maxPrice
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
  }, [maxPrice, minRating, sortOption, brandSelected, products]);

  const handlePriceChange = (e) => {
    const value = Number(e.target.value) >= 0 ? Number(e.target.value) : 0;
    setMaxPrice(value);
  };

  const handleRatingChange = (e) => {
    setMinRating(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrandSelected(e.target.value);
  };

  const resetFilters = () => {
    setMaxPrice(products.length > 0 ? Math.ceil(Math.max(...products.map((p) => p.price))) : 1000);
    setMinRating(0);
    setSortOption("default");
    setBrandSelected("");
  };

  return (
    <div className="mt-32 md:mt-28 px-4 md:px-6 max-w-7xl mx-auto text-black">
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
        <div className="w-full md:w-1/4 bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>

          {/* Price Filter (Single Slider) */}
          <div className="mb-6">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Max Price</h3>
            <div className="relative">
              <input
                type="range"
                name="max"
                value={maxPrice}
                onChange={handlePriceChange}
                min="0"
                max={products.length > 0 ? Math.ceil(Math.max(...products.map((p) => p.price))) : 1000}
                step="10"
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
              {/* Tooltip for Max Price */}
              <div
                className="absolute text-sm bg-gray-800 text-white px-2 py-1 rounded"
                style={{
                  left: `${(maxPrice / (products.length > 0 ? Math.ceil(Math.max(...products.map((p) => p.price))) : 1000)) * 100}%`,
                  transform: "translateX(-50%)",
                  top: "-2.5rem",
                }}
              >
                ${maxPrice}
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-6">
                <span>$0</span>
                <span>${products.length > 0 ? Math.ceil(Math.max(...products.map((p) => p.price))) : 1000}</span>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
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

          {/* Brand Filter */}
          {brands.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Brand</h3>
              <select
                value={brandSelected}
                onChange={handleBrandChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Product List */}
        <div className="w-full bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg font-bold text-gray-800 capitalize">
              {decodedCategory || "Products"}
            </h2>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <label className="text-sm font-semibold text-gray-700">Sort By:</label>
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
                        onError={(e) => (e.target.src = "/fallback-image.png")}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-md font-bold text-gray-800 truncate">
                        {product.title}
                      </h3>
                      <p className="text-sm">
                        Rating: <span className="font-medium">{product.rating.toFixed(1)} / 5</span>
                      </p>
                      <p className="text-sm">
                        Discount: <span className="font-medium">{product.discountPercentage.toFixed(2)}%</span>
                      </p>
                      <p className="text-sm">
                        Stock: <span className="font-medium">{product.stock ? "In Stock" : "Out of Stock"}</span>
                      </p>
                      <p className="text-sm">
                        Brand: <span className="font-medium">{product.brand || "N/A"}</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => dispatch(addToCart(product))}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          disabled={!product.stock}
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => navigate(`/product-details/${product.id}`)}
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