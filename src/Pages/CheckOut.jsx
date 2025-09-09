import React from "react";
import { useSelector } from "react-redux";
import Payment from "./Payment";

const CheckOut = () => {
  // Fetch cart data from Redux store
  const loggedUser = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.products);
  const user= loggedUser
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 mt-20 md:mt-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 1. Login Section */}
        <div className="bg-white text-black rounded-lg shadow-md">
          <div className="bg-blue-500 text-white font-bold p-4 rounded-t-lg">
            1. LOGIN
          </div>
          <div className="p-4">
            {loggedUser.isUserLoggedIn ? (
              <>
                <p className="font-bold">{user?.name || "Gopal"}</p>
                <p className="text-gray-600">
                  {user?.phone || "+91 9493384380"}
                </p>
              </>
            ) : (
              <p className="text-gray-600">
                Please log in to proceed with checkout.
                <button
                  className="ml-2 text-blue-500 underline"
                  onClick={() => {
                    // Redirect to login page or trigger login modal
                    // Example: window.location.href = "/login";
                    alert("Redirect to login page");
                  }}
                >
                  Log In
                </button>
              </p>
            )}
          </div>
        </div>

        {/* 2. Delivery Address Section */}
        <div
          className={`bg-white text-black rounded-lg shadow-md ${
            !loggedUser.isUserLoggedIn ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div
            className={`${
              loggedUser.isUserLoggedIn ? "bg-blue-500" : "bg-gray-400"
            } text-white font-bold p-4 rounded-t-lg`}
          >
            2. DELIVERY ADDRESS
          </div>
          <div className="p-4">
            {loggedUser.isUserLoggedIn ? (
              <>
                <p className="font-bold text-gray-600">Kavali</p>
                <p className="text-gray-600">
                  123 Example Street, Kavali, Andhra Pradesh, India
                </p>
              </>
            ) : (
              <p className="text-gray-600">
                Please log in to view this section.
              </p>
            )}
          </div>
        </div>

        {/* 3. Order Summary Section */}
        <div
          className={`bg-white text-black rounded-lg shadow-md ${
            !loggedUser.isUserLoggedIn ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div
            className={`${
              loggedUser.isUserLoggedIn ? "bg-blue-500" : "bg-gray-400"
            } text-white font-bold p-4 rounded-t-lg`}
          >
            3. ORDER SUMMARY
          </div>
          <div className="p-4">
            {loggedUser.isUserLoggedIn ? (
              cartItems.length === 0 ? (
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
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  {/* Total */}
                  <div className="flex justify-between pt-4">
                    <p className="font-bold text-gray-800">Total Items:</p>
                    <p className="font-bold text-gray-800">
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold text-gray-800">Total Price:</p>
                    <p className="font-bold text-gray-800">
                      ₹
                      {cartItems
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              )
            ) : (
              <p className="text-gray-600">
                Please log in to view this section.
              </p>
            )}
          </div>
        </div>

        {/* 4. Payment Section */}
        <div
          className={`bg-white text-black rounded-lg shadow-md ${
            !loggedUser.isUserLoggedIn ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div
            className={`${
              loggedUser.isUserLoggedIn ? "bg-blue-500" : "bg-gray-400"
            } text-white font-bold p-4 rounded-t-lg`}
          >
            4. PAYMENT
          </div>
          <div className="p-4">
            {loggedUser.isUserLoggedIn ? (
              <Payment />
            ) : (
              <p className="text-gray-600">
                Please log in to view this section.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
