import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import ProductCarousel from './ProductCarousel';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import {  ToastContainer } from 'react-toastify';

const ProductDetail = () => {
   const navigate = useNavigate();
  const disptch = useDispatch();
  const { id } = useParams();
  const numericId = parseInt(id); // Convert '79' to 79
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await axios.get(`https://dummyjson.com/products/${numericId}`);
        setProduct(resp.data);
      } catch {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    if (numericId) {
      fetchProduct();
    }
  }, [numericId]);

  const handleAddToCart = (product) => {
    disptch(addToCart(product))
  };

  // Safely prepare image list
  const imageList = product && Array.isArray(product.images) ? product.images : [];

  return (
    <div className="mt-35 md:mt-25 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">
      {loading && (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      )}
      {error && (
        <div className="text-center text-red-500 text-lg">Error: {error}</div>
      )}
      {product && (
        <div>
          <button type="button" onClick={()=>navigate(`/s/${product.category}`)}
          className="flex gap-2 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <FaArrowLeft className='mt-1'/> Back
          </button>
          
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md p-6">
          
          {/* Product Card: Image and Details */}
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Image Carousel */}
            <div className="md:w-1/2">
              <ProductCarousel imageList={imageList} />
            </div>
            {/* Product Details */}
            <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col gap-4">
              <h1
                className="text-2xl md:text-3xl font-bold text-gray-900 line-clamp-2"
                title={product.title}
              >
                {product.title}
              </h1>
              <p className="text-gray-700 text-base">{product.description}</p>
              <p className="text-2xl font-semibold text-green-600">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-1" aria-label={`Rating ${product.rating.toFixed(1)} out of 5`}>
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.round(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                  {product.rating.toFixed(1)} / 5
                </span>
              </div>
              <p className="text-gray-600">
                Category: <span className="font-medium">{product.category}</span>
              </p>
              <p className="text-gray-600">
                Brand: <span className="font-medium">{product.brand}</span>
              </p>
              <p className="text-gray-600">
                Stock: <span className="font-medium">{product.availabilityStatus}</span>
              </p>
              <p className="text-sm text-gray-600">
                        Discount:{" "}
                        <span className="font-medium">
                          {product.discountPercentage.toFixed(2)}%
                        </span>
                      </p>
                       <p className="text-sm text-gray-600">
                        ReturnPolicy:{" "}
                        <span className="font-medium">
                          {product.returnPolicy}
                        </span>
                      </p>
             
              {/* Add to Cart Button */}
              <div className="flex gap-4">
                <button
                  className="text-white bg-yellow-600 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 transition-colors duration-200"
                  onClick={()=>handleAddToCart(product)}
                  aria-label={`Add ${product.title} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          {/* Reviews Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                    role="article"
                    aria-label={`Review by ${review.reviewerName || 'Anonymous'}`}
                  >
                    <p className="text-gray-800 font-medium">{review.reviewerName || 'Anonymous'}</p>
                    <div className="flex items-center gap-2 my-1" aria-label={`Review rating ${review.rating} out of 5`}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(review.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600">{review.rating} / 5</span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                 
                ))
                
              ) : (
                <p className="text-gray-600 col-span-full">No reviews available.</p>
              )}
            </div>
          </div>
        </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default ProductDetail;