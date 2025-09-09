import React, { useState } from "react";


const Payment = () => {
  // Fetch totalPrice from Redux cartSlice
  //const { totalPrice } = useSelector((state) => state.cart);

  // State for selected payment method
  const [paymentMethod, setPaymentMethod] = useState("");

  // Handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    // Placeholder for payment processing logic
    //console.log(`Processing payment of ₹${totalPrice.toFixed(2)} via ${paymentMethod}`);
    // Add API call or Redux action here (e.g., dispatch(completeOrder()))
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Total Amount */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800">
          Total Amount: ₹{100.0}
        </h3>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-700">Select Payment Method</h4>
        <div className="space-y-3">
          {/* Credit Card */}
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="paymentMethod"
              value="credit_card"
              checked={paymentMethod === "credit_card"}
              onChange={handlePaymentMethodChange}
              className="h-5 w-5 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-700">Credit/Debit Card</span>
          </label>

          {/* UPI */}
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={handlePaymentMethodChange}
              className="h-5 w-5 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-700">UPI</span>
          </label>

          {/* Cash on Delivery */}
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={handlePaymentMethodChange}
              className="h-5 w-5 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-700">Cash on Delivery</span>
          </label>
        </div>

        {/* Conditional Fields for Credit Card */}
        {paymentMethod === "credit_card" && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Conditional Fields for UPI */}
        {paymentMethod === "upi" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              UPI ID
            </label>
            <input
              type="text"
              placeholder="example@upi"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;