import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import QuantityButton from "./QuantityButton";
import { removeProduct, updateProductQuantity } from "../slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity || 1 }), {})
  );

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (quantities[item.id] || 1),
    0
  );
  const discountAmount = subtotal * 0.1;
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = 5.0;
  const total = discountedSubtotal + shipping;

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    dispatch(updateProductQuantity({id:productId,quantity}))
  };
 const removeCart = (productId) =>{
  dispatch(removeProduct(productId))
 }
  return (
    <div className="min-h-screen p-4 sm:p-6 mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Your Cart is Empty
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Looks like you haven't added any items to your cart yet.
            </p>
            <a
              href="/"
              className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Shop Now
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            {/* Cart Items */}
            <div className="w-full  mb-6 lg:mb-0">
              <div className="bg-white rounded-lg shadow-sm p-4 ">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 py-4 last:border-b-0"
                    aria-live="polite"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                      />
                      <div>
                        <h4 className="text-base sm:text-lg font-medium text-gray-900">
                          {item.title}
                        </h4>
                       
                        <button
                          className="text-sm text-red-600 hover:text-red-800 mt-1"
                          onClick={() => removeCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <QuantityButton
                        initialValue={quantities[item.id] || 1}
                        min={1}
                        max={item.stock || 100}
                        productId={item.id}
                        onQuantityChange={handleQuantityChange}
                      />
                      <p className="text-base sm:text-lg font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Details */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Price Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="text-base font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Discount (10%)</span>
                    <span className="text-base font-medium text-green-600">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Shipping</span>
                    <span className="text-base font-medium text-gray-900">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link to={'/checkout'}>
                <button
                  className="w-full mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Proceed to Checkout
                </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
        <ToastContainer/>
    </div>
  );
};

export default Cart;