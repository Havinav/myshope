// Cart.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItemsAsync,
  removeProductAsync,
} from "../slices/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Address from "./Address";

const Cart = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(null); // null indicates not yet fetched
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressFlag, setAddressFlag] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const { products: cartItems, loading, error } = useSelector(
    (state) => state.cart
  );

  // Fetch cart items and address on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItemsAsync(user.id));
      fetchAddress();
    } else {
      toast.error("Please log in to view your cart", {
        position: "bottom-center",
        autoClose: 4000,
        theme: "dark",
      });
    }
  }, [dispatch, user?.id]);

  // Fetch address
  const fetchAddress = async () => {
    setAddressLoading(true);
    try {
      const docRef = doc(db, "addresses", user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAddress({ ...docSnap.data(), userId: user.id });
      } else {
        setAddress({}); // Empty address indicates no address exists
        setAddressFlag(true); // Prompt user to add address
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Failed to fetch address", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setAddressLoading(false);
    }
  };

  // Handle product deletion
  const handleRemoveProduct = (productId) => {
    dispatch(removeProductAsync({ productId: Number(productId), userId: user.id }));
  };

  // Calculate price details
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-25 md:mt-18 font-manrope">
      <div className="max-w-7xl mx-auto">
        {(loading || addressLoading) && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full animate-indeterminate"></div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 bg-red-100 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {cartItems.length === 0 && !loading ? (
          <div className="text-center text-gray-600 bg-white p-6 rounded-lg shadow-md">
            Your cart is empty.
            <Link to="/" className="text-blue-500 hover:underline ml-2">
              Shop now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart Items (Left/Top on Mobile) */}
              <div className="lg:w-2/3 p-4 sm:p-1">
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-black">
                          Deliver to:{" "}
                          <span className="font-semibold">
                            {user?.username || "Guest User"}
                          </span>
                        </h2>
                        {address && Object.keys(address).length > 0 ? (
                          <p className="text-gray-600 text-sm font-normal">
                            {address.doorNo}, {address.street}, {address.city}, {address.district}, {address.state} - {address.pincode}
                          </p>
                        ) : (
                          <p className="text-gray-600 text-sm font-normal">
                            No address provided
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setAddressFlag(true)}
                        type="button"
                        className="mt-2 sm:mt-0 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5"
                        disabled={loading || addressLoading}
                      >
                        Change Address
                      </button>
                    </div>
                  </div>
                  <div className="flex bg-white rounded-lg shadow-md flex-col gap-4">
                    {cartItems.map((item) => (
                      <div key={item.id}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
                          <div className="flex gap-4">
                            <img
                              className="w-40 h-40 object-contain"
                              src={item.thumbnail}
                              alt={item.title}
                              onError={(e) => (e.target.src = "/fallback-image.png")}
                            />
                            <div className="p-3">
                              <span className="font-semibold text-black">{item.title}</span>
                              <p className="font-semibold text-gray-600">{item.brand}</p>
                              <p className="font-semibold text-black">
                                ${item.price.toFixed(2)} | Discount: {item.discountPercentage?.toFixed(2) || 0}%
                              </p>
                              <button
                                className="mt-2 text-red-500 hover:bg-red-100 hover:text-red-600 p-1 rounded-md"
                                onClick={() => handleRemoveProduct(item.id)}
                                disabled={loading}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          <div className="p-4 text-black">
                            <span className="text-sm font-normal">
                              Delivery by {item.shippingInformation || "7-10 days"}
                            </span>
                          </div>
                        </div>
                        <hr className="border-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Details (Right/Bottom on Mobile) */}
              <div className="lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-500 mb-4">PRICE DETAILS</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-black">
                    <span>Price ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link to="/checkout">
                  <button
                    className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cartItems.length === 0 || loading || addressLoading}
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Address Modal */}
        {addressFlag && (
          <div className="fixed inset-0 text-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg transform transition-all duration-300">
              <Address
                onClose={() => setAddressFlag(false)}
                onSave={fetchAddress}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;