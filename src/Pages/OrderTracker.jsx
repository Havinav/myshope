// OrderTracker.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const OrderTracker = () => {
  const user = useSelector((state) => state.user.userData);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define order statuses
  const statusSteps = [
    { id: "Ordered", label: "Order Placed", icon: "🛒" },
    { id: "Processing", label: "Order Processing", icon: "⚙️" },
    { id: "Shipped", label: "Order Shipped", icon: "🚚" },
    { id: "Delivered", label: "Order Delivered", icon: "📦" },
  ];

  // Fetch orders on mount
  useEffect(() => {
    if (user?.id) {
      fetchOrders();
    } else {
      toast.error("Please log in to view your orders", {
        position: "bottom-center",
        autoClose: 4000,
        theme: "dark",
      });
    }
  }, [user?.id]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const ordersRef = collection(db, "order", user.id, "orders");
      const querySnapshot = await getDocs(ordersRef);
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort by orderDate (date and time) in descending order
      const sortedOrders = ordersData.sort((a, b) => {
        // Handle invalid or missing orderDate
        const dateA = a.orderDate ? new Date(a.orderDate) : new Date(0); // Epoch for missing dates
        const dateB = b.orderDate ? new Date(b.orderDate) : new Date(0);
        // Extract date components (year, month, day)
        const dateAYear = dateA.getFullYear();
        const dateAMonth = dateA.getMonth();
        const dateADay = dateA.getDate();
        const dateBYear = dateB.getFullYear();
        const dateBMonth = dateB.getMonth();
        const dateBDay = dateB.getDate();
        // Compare dates (year, month, day)
        if (dateAYear !== dateBYear) return dateBYear - dateAYear;
        if (dateAMonth !== dateBMonth) return dateBMonth - dateAMonth;
        if (dateADay !== dateBDay) return dateBDay - dateADay;
        // If dates are equal, compare times (full timestamp)
        return dateB - dateA;
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  // Render status tracker
  const renderStatusTracker = (order) => {
    const currentStatus = order.status;
    const currentIndex = statusSteps.findIndex((step) => step.label === currentStatus);

    return (
      <ol className="flex md:flex-row flex-col md:items-start items-center justify-between w-full md:gap-1 gap-4">
        {statusSteps.map((step, index) => (
          <li
            key={step.id}
            className={`group flex relative justify-start ${
              index < statusSteps.length - 1
                ? `after:content-[''] lg:after:w-11 md:after:w-5 after:w-5 after:h-0.5 md:after:border after:border-dashed md:after:bg-gray-500 after:inline-block after:absolute md:after:top-7 after:top-3 xl:after:left-44 lg:after:left-40 md:after:left-36`
                : ""
            }`}
          >
            <div className="w-full mr-1 block z-10 flex flex-col items-center justify-start gap-1">
              <div className="justify-center items-center gap-1.5 inline-flex">
                <h5
                  className={`text-center text-lg font-medium leading-normal font-manrope ${
                    index <= currentIndex ? "text-gray-900" : "text-gray-500"
                  } whitespace-nowrap`}
                >
                  {step.label} {step.icon}
                </h5>
                {index <= currentIndex && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="inline-block"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.83337 9.99992C1.83337 5.48959 5.48972 1.83325 10 1.83325C14.5104 1.83325 18.1667 5.48959 18.1667 9.99992C18.1667 14.5102 14.5104 18.1666 10 18.1666C5.48972 18.1666 1.83337 14.5102 1.83337 9.99992ZM14.3635 7.92721C14.6239 7.66687 14.6239 7.24476 14.3635 6.98441C14.1032 6.72406 13.6811 6.72406 13.4207 6.98441L9.82961 10.5755C9.53851 10.8666 9.3666 11.0365 9.22848 11.1419C9.17307 11.1842 9.13961 11.2029 9.1225 11.2107C9.1054 11.2029 9.07194 11.1842 9.01653 11.1419C8.87841 11.0365 8.7065 10.8666 8.4154 10.5755L7.13815 9.29825C6.8778 9.03791 6.45569 9.03791 6.19534 9.29825C5.93499 9.55861 5.93499 9.98071 6.19534 10.2411L7.50018 11.5459C7.75408 11.7999 7.98968 12.0355 8.20775 12.2019C8.44909 12.3861 8.74554 12.5469 9.1225 12.5469C9.49946 12.5469 9.79592 12.3861 10.0373 12.2019C10.2553 12.0355 10.4909 11.7999 10.7448 11.5459L14.3635 7.92721Z"
                      fill="#047857"
                    />
                  </svg>
                )}
              </div>
              <h6 className="text-center text-gray-500 text-base font-normal leading-relaxed font-manrope">
                {order.statusTimestamps?.[step.label]
                  ? new Date(order.statusTimestamps[step.label]).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "--"}
              </h6>
            </div>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="mt-29 md:mt-20">
      <div className="p-4">
        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full animate-indeterminate"></div>
          </div>
        )}
        <div>
          {orders.length === 0 && !loading ? (
            <p className="text-center text-gray-500 font-manrope">
              No orders found.{" "}
              <Link to="/s" className="text-blue-500 hover:underline">
                Shop now
              </Link>
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="mb-8 p-8 border rounded-xl shadow-md bg-white text-black font-manrope"
              >
                <h2 className="text-2xl font-semibold text-gray-900 leading-9 pb-5 border-b border-gray-200">
                  Order ID #{order.orderId}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
                  <div>
                    <img
                      src={order.thumbnail}
                      alt={order.title}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-md"
                      onError={(e) => (e.target.src = "/fallback-image.png")}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{order.title}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {order.quantity}</p>
                    <p className="text-gray-600 text-sm">
                      Price: ${order.price.toFixed(2)} x {order.quantity} = ${(order.price * order.quantity).toFixed(2)}
                    </p>
                    {order.discountPercentage && (
                      <p className="text-sm text-green-600">
                        Discount: {order.discountPercentage.toFixed(2)}%
                      </p>
                    )}
                    <p className="text-gray-600 text-sm">
                      Delivery by: {order.shippingInformation || "7-10 days"}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <span className="font-bold text-gray-500">
                      Payment Method: <span className="font-bold text-red-500">{String(order.paymentMode).toUpperCase()}</span>
                    </span>
                  </div>
                  <div className="flex justify-center items-center">
                    <span className="font-bold text-gray-900">
                      Total: ${(order.price * order.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Delivery to:</span>
                    <p className="text-gray-600 text-sm">
                      {order.address.doorNo}, {order.address.street}, {order.address.city}, {order.address.district}, {order.address.state} - {order.address.pincode}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Order Status</h4>
                  {renderStatusTracker(order)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;