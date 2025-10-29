// CheckOut.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItemsAsync, removeProductAsync } from "../slices/cartSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const {
    products: cartItems,
    loading: cartLoading,
    error: cartError,
  } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(null); // null indicates not yet fetched
  const [addressLoading, setAddressLoading] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default to Credit/Debit Card
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Fetch cart items and address on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItemsAsync(user.id));
      fetchAddress();
    } else {
      toast.error("Please log in to proceed to checkout", {
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
        setAddress({});
        toast.warn("No address found. Please add an address.", {
          position: "bottom-center",
          autoClose: 4000,
          theme: "dark",
        });
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

  // Calculate price details
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  // Handle payment method change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setErrors({}); // Clear errors when switching methods
    setPaymentDetails({
      cardNumber: "",
      expiry: "",
      cvv: "",
      upiId: "",
    }); // Reset form
  };

  // Handle payment form changes
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate payment details
  const validatePayment = () => {
    const newErrors = {};
    if (paymentMethod === "card") {
      if (
        !paymentDetails.cardNumber ||
        !/^\d{16}$/.test(paymentDetails.cardNumber)
      ) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }
      if (
        !paymentDetails.expiry ||
        !/^\d{2}\/\d{2}$/.test(paymentDetails.expiry)
      ) {
        newErrors.expiry = "Expiry must be in MM/YY format";
      }
      if (!paymentDetails.cvv || !/^\d{3}$/.test(paymentDetails.cvv)) {
        newErrors.cvv = "CVV must be 3 digits";
      }
    } else if (paymentMethod === "upi") {
      if (
        !paymentDetails.upiId ||
        !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/.test(paymentDetails.upiId)
      ) {
        newErrors.upiId = "Invalid UPI ID (e.g., user@bank)";
      }
    }
    return newErrors;
  };

  // Handle confirm payment
  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    if (!address || Object.keys(address).length === 0) {
      toast.error("Please add a delivery address", {
        position: "bottom-center",
        autoClose: 4000,
        theme: "dark",
      });
      setPaymentModalOpen(false);
      return;
    }
    const paymentErrors = validatePayment();
    if (Object.keys(paymentErrors).length === 0) {
      setPaymentLoading(true);
      try {
        const txId = `TXN${Math.floor(Math.random() * 1000000)}`;
        const paymentInfo = {
          ...paymentDetails,
          method: paymentMethod,
          amount: total,
          date: new Date().toISOString(),
          transactionId: txId,
        };
        await setDoc(doc(db, "payment", user.id), paymentInfo);
        saveOrderDetails(txId);
        setPaymentModalOpen(false);
        setPaymentDetails({ cardNumber: "", expiry: "", cvv: "", upiId: "" });
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          timer: 1000,
        });
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          navigate("/orders");
        }, 5000); // Show confetti for 3 seconds before redirect
      } catch (error) {
        console.error("Error processing payment:", error);
        toast.error("Failed to process payment", {
          position: "bottom-center",
          autoClose: 2000,
          theme: "dark",
        });
      } finally {
        setPaymentLoading(false);
      }
    } else {
      setErrors(paymentErrors);
    }
  };

  // Save order details
  const saveOrderDetails = async (txId) => {
    const now = new Date();
    const orderPlaced = now.toISOString();
    // Helper to add days and return ISO string
    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toISOString();
    };

    const statusTimestamps = {
      "Order Placed": orderPlaced,
      "Order Processing": addDays(now, 1),
      "Order Shipped": addDays(now, 2),
      "Order Delivered": addDays(now, 3),
    };
    try {
      for (const item of cartItems) {
        const orderId = `OD${Math.floor(Math.random() * 10000000000)}`;
        const orderDetails = {
          ...item,
          orderId: orderId,
          userId: user.id,
          address: address,
          paymentMode: paymentMethod.toUpperCase(),
          txId: txId,
          orderDate: orderPlaced,
          updateDate: orderPlaced,
          status: "Order Placed",
          statusTimestamps,
        };
        await setDoc(
          doc(db, "order", user.id, "orders", orderId),
          orderDetails
        );
        Swal.fire({
          icon: "success",
          title: `Order placed successfully!`,
          timer: 1000,
        });

        dispatch(removeProductAsync({ productId: item.id, userId: user.id }));
      }
    } catch (error) {
      console.error("Error saving order details:", error);
      throw error; // Re-throw to handle in handleConfirmPayment
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 mt-20 md:mt-16">
      {/* Full-page loading spinner */}
      {paymentLoading && (
        <div className="fixed inset-0  bg-opacity-100 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Confetti animation */}
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="max-w-7xl mx-auto">
        {(cartLoading || addressLoading) && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full animate-indeterminate"></div>
          </div>
        )}
        {cartError && (
          <div className="text-center text-red-500 bg-red-100 p-4 rounded-md mb-6">
            {cartError}
          </div>
        )}

        {cartItems.length === 0 && !cartLoading ? (
          <div className="text-center text-gray-600 bg-white p-6 rounded-lg shadow-md">
            Your cart is empty.
            <Link to="/s" className="text-blue-500 hover:underline ml-2">
              Shop now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left/Top Section: Address and Products */}
            <div className="lg:w-2/3 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Delivery Address
                </h2>
                {address && Object.keys(address).length > 0 ? (
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {user?.username || "Guest User"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {address.doorNo}, {address.street}, {address.city},{" "}
                      {address.district}, {address.state} - {address.pincode}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 text-sm">No address provided</p>
                    <Link
                      to="/cart"
                      className="mt-2 inline-block text-blue-500 hover:underline text-sm"
                    >
                      Add Address
                    </Link>
                  </div>
                )}
              </div>

              {/* Cart Products */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Items ({cartItems.length})
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 py-4"
                    >
                      <div className="flex gap-4 w-full sm:w-auto">
                        <img
                          className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded"
                          src={item.thumbnail}
                          alt={item.title}
                          onError={(e) =>
                            (e.target.src = "/fallback-image.png")
                          }
                        />
                        <div className="flex-1">
                          <h3 className="text-md font-semibold text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.brand || "No Brand"}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${item.price.toFixed(2)} x {item.quantity} = $
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.discountPercentage && (
                            <p className="text-sm text-green-600">
                              Discount: {item.discountPercentage.toFixed(2)}%
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            Delivery by{" "}
                            {item.shippingInformation || "7-10 days"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right/Bottom Section: Order Summary and Payment */}
            <div className="lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-500 mb-4">
                Order Summary
              </h2>
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

              {/* Payment Section */}
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 shadow-lg shadow-pink-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => setPaymentModalOpen(true)}
                  disabled={
                    cartLoading ||
                    addressLoading ||
                    cartItems.length === 0 ||
                    !address ||
                    Object.keys(address).length === 0
                  }
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {paymentModalOpen && (
          <div className="fixed inset-0 text-black bg-opacity-100 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg transform transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Method
              </h2>
              <form onSubmit={handleConfirmPayment} className="space-y-4">
                {/* Payment Method Radio Buttons */}
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={handlePaymentMethodChange}
                      className="mr-2"
                      disabled={cartLoading || addressLoading}
                    />
                    Credit/Debit Card
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={handlePaymentMethodChange}
                      className="mr-2"
                      disabled={cartLoading || addressLoading}
                    />
                    UPI
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={handlePaymentMethodChange}
                      className="mr-2"
                      disabled={cartLoading || addressLoading}
                    />
                    Cash on Delivery
                  </label>
                </div>

                {/* Payment Method Forms */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.cardNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        disabled={cartLoading || addressLoading}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiry"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={paymentDetails.expiry}
                          onChange={handlePaymentChange}
                          className={`mt-1 block w-full rounded-md border ${
                            errors.expiry ? "border-red-500" : "border-gray-300"
                          } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                          placeholder="MM/YY"
                          maxLength="5"
                          disabled={cartLoading || addressLoading}
                        />
                        {errors.expiry && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.expiry}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentDetails.cvv}
                          onChange={handlePaymentChange}
                          className={`mt-1 block w-full rounded-md border ${
                            errors.cvv ? "border-red-500" : "border-gray-300"
                          } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                          placeholder="123"
                          maxLength="3"
                          disabled={cartLoading || addressLoading}
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === "upi" && (
                  <div>
                    <label
                      htmlFor="upiId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      value={paymentDetails.upiId}
                      onChange={handlePaymentChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.upiId ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                      placeholder="user@bank"
                      disabled={cartLoading || addressLoading}
                    />
                    {errors.upiId && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.upiId}
                      </p>
                    )}
                  </div>
                )}
                {paymentMethod === "cod" && (
                  <div className="text-gray-600 text-sm">
                    You will pay ${total.toFixed(2)} in cash upon delivery.
                  </div>
                )}

                {/* Modal Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
                      cartLoading || addressLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={cartLoading || addressLoading}
                  >
                    Confirm Payment
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => setPaymentModalOpen(false)}
                    disabled={cartLoading || addressLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
