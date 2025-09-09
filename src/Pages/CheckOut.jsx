import React from "react";
import { useSelector } from "react-redux";
import Payment from "./Payment";

const CheckOut = () => {
  // Fetch cart data from Redux store
  const cartItems = useSelector((state) => state.cart.products);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 mt-29 md:20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 1. Login Section */}
        <div className="bg-white text-black rounded-lg shadow-md">
          <div className="bg-blue-500 text-white font-bold p-4 rounded-t-lg">
            1. LOGIN
          </div>
          <div className="p-4">
            <p className="font-bold">Gopal</p>
            <p className="text-gray-600">+91 9493384380</p>
          </div>
        </div>

        {/* 2. Delivery Address Section */}
        <div className="bg-white text-black rounded-lg shadow-md">
          <div className="bg-blue-500 text-white font-bold p-4 rounded-t-lg">
            2. DELIVERY ADDRESS
          </div>
          <div className="p-4">
            <p className="font-bold text-gray-600">Kavali</p>
            <p className="text-gray-600">123 Example Street, Kavali, Andhra Pradesh, India</p>
          </div>
        </div>

        {/* 3. Order Summary Section */}
        <div className="bg-white text-black rounded-lg shadow-md">
          <div className="bg-blue-500 text-white font-bold p-4 rounded-t-lg">
            3. ORDER SUMMARY
          </div>
          <div className="p-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <p className="font-bold text-gray-800">{item.title}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                {/* Total */}
                <div className="flex justify-between pt-4">
                  <p className="font-bold text-gray-800">Total Items:</p>
                  <p className="font-bold text-gray-800">{100}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold text-gray-800">Total Price:</p>
                  <p className="font-bold text-gray-800">₹{10}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Payment Section */}
        <div className="bg-white text-black rounded-lg shadow-md">
          <div className="bg-blue-500 text-white font-bold p-4 rounded-t-lg">
            4. PAYMENT
          </div>
          <div className="p-4">
            <Payment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;