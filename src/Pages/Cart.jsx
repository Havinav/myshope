import React from "react";

const Cart = () => {
  // Sample cart data (empty or with products)
  const cartItems = [
    // Comment out to test empty cart
    {
      id: 1,
      name: "Wireless Headphones",
      image: "https://via.placeholder.com/80",
      quantity: 1,
      price: 99.99,
    },
    {
      id: 2,
      name: "Smartphone Case",
      image: "https://via.placeholder.com/80",
      quantity: 2,
      price: 19.99,
    },
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className=" min-h-screen p-4 sm:p-6 mt-30 md:mt-25">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Shopping Cart
        </h2>
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Your Cart is Empty
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Looks like you haven't added any items to your cart yet.
            </p>
            <a
              href="/shop"
              className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Shop Now
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
              <div className="bg-white rounded-lg shadow-sm p-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 py-4 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                      />
                      <div>
                        <h4 className="text-base sm:text-lg font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <button
                          className="text-sm text-red-600 hover:text-red-800 mt-1"
                          onClick={() => alert(`Remove ${item.name} from cart`)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg font-medium text-gray-900 mt-2 sm:mt-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
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
                    <span className="text-base text-gray-600">Shipping</span>
                    <span className="text-base font-medium text-gray-900">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  className="w-full mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={() => alert("Proceed to checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;