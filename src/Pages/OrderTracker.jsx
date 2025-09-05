import React from "react";

const OrderTracker = () => {
  // Sample data with multiple orders
  const ordersData = [
    {
      orderId: "1023498789",
      items: [
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
      ],
      trackingSteps: [
        { step: 1, status: "Order Confirmed", date: "Feb 18, 2025", active: true },
        { step: 2, status: "Shipped", date: "Feb 19, 2025", active: true },
        { step: 3, status: "In Transit", date: "Feb 20, 2025", active: true },
        { step: 4, status: "Out for Delivery", date: "Feb 21, 2025", active: false },
        { step: 5, status: "Delivered", date: "Feb 22, 2025", active: false },
      ],
    },
    {
      orderId: "1023498790",
      items: [
        {
          id: 3,
          name: "USB-C Cable",
          image: "https://via.placeholder.com/80",
          quantity: 3,
          price: 12.99,
        },
      ],
      trackingSteps: [
        { step: 1, status: "Order Confirmed", date: "Feb 17, 2025", active: true },
        { step: 2, status: "Shipped", date: "Feb 18, 2025", active: true },
        { step: 3, status: "In Transit", date: "Feb 19, 2025", active: false },
        { step: 4, status: "Out for Delivery", date: "Feb 20, 2025", active: false },
        { step: 5, status: "Delivered", date: "Feb 21, 2025", active: false },
      ],
    },
  ];

  return (
    <div className=" min-h-screen p-4 sm:p-6 mt-30 md:mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Your Orders
        </h2>
        {ordersData.map((order, index) => (
          <div
            key={order.orderId}
            className={`bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 ${
              index !== ordersData.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Order #{order.orderId}
            </h3>
            <div className="flex flex-col lg:flex-row lg:space-x-6">
              {/* Ordered Products List */}
              <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Ordered Items
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  {order.items.map((item) => (
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
                          <h5 className="text-base sm:text-lg font-medium text-gray-900">
                            {item.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-base sm:text-lg font-medium text-gray-900 mt-2 sm:mt-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">
                        Subtotal
                      </span>
                      <span className="text-base font-medium text-gray-900">
                        ${order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-base font-medium text-gray-900">
                        Shipping
                      </span>
                      <span className="text-base font-medium text-gray-900">$5.00</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${(order.items.reduce((total, item) => total + item.price * item.quantity, 0) + 5).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Tracker */}
              <div className="w-full lg:w-1/3">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Delivery Status
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ol className="relative">
                    {order.trackingSteps.map((step, stepIndex) => (
                      <li
                        key={step.step}
                        className={`flex items-start space-x-4 pb-6 last:pb-0 ${
                          step.active ? "text-indigo-600" : "text-gray-500"
                        } ${
                          stepIndex !== order.trackingSteps.length - 1
                            ? "after:content-[''] after:w-0.5 after:bg-gray-300 after:absolute after:top-10 after:left-3 after:h-[calc(100%-2.5rem)]"
                            : ""
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-1 ${
                            step.active
                              ? "bg-indigo-600 text-white"
                              : "border-2 border-indigo-600 bg-transparent"
                          }`}
                        >
                          {step.step}
                        </span>
                        <div>
                          <span className="text-sm font-medium block">
                            {step.status}
                          </span>
                          <span className="text-sm font-normal text-gray-500">
                            {step.date}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;