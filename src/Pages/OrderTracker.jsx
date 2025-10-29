// OrderTracker.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const OrderTracker = () => {
  const user = useSelector((state) => state.user.userData);
  const [orders, setOrders] = useState([]);
  const [paymentCache, setPaymentCache] = useState({});
  const [loading, setLoading] = useState(false);

  // ── Status steps with image URLs ─────────────────────────────────────
  const statusSteps = [
    {
      id: "Order Placed",
      label: "Order Placed",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ppG9lIR3EZrrl_eg0YbRwvX82rJ0_WsYJw&s",
    },
    {
      id: "Order Processing",
      label: "Order Processing",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRliF12RAFx-IN-AuHqk2ULsBuTJ8DuxHCg8w&s",
    },
    {
      id: "Order Shipped",
      label: "Order Shipped",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFMtvO4De1-dA7YAcUVhayfnxJoFLpFcKV4Q&s",
    },
    {
      id: "Order Delivered",
      label: "Order Delivered",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwX8q2cP5utn1NBjhGofXdctqt7BGkxbPjYA&s",
    },
  ];

  // ── Mount: fetch orders + payments ───────────────────────────────────
  useEffect(() => {
    if (user?.id) fetchOrdersAndPayments();
    else
      toast.error("Please log in to view your orders", {
        position: "bottom-center",
        autoClose: 4000,
        theme: "dark",
      });
  }, [user?.id]);

  // ── Fetch orders + auto-fetch payments ───────────────────────────────
  const fetchOrdersAndPayments = async () => {
    setLoading(true);
    try {
      const ordersRef = collection(db, "order", user.id, "orders");
      const snap = await getDocs(ordersRef);
      const raw = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      const sorted = raw.sort((a, b) => {
        const da = a.orderDate ? new Date(a.orderDate) : new Date(0);
        const db = b.orderDate ? new Date(b.orderDate) : new Date(0);
        return db - da;
      });

      setOrders(sorted);

      const txIds = [...new Set(sorted.map((o) => o.txId).filter(Boolean))];
      await Promise.all(txIds.map(fetchPayment));
    } catch (err) {
      console.error("fetchOrdersAndPayments error:", err);
      toast.error("Failed to load orders", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch single payment (cached) ───────────────────────────────────
  const fetchPayment = async (txId) => {
    if (!txId || paymentCache[txId]) return;

    try {
      const payDoc = await getDoc(doc(db, "payment", user.id));
      if (payDoc.exists() && payDoc.data().transactionId === txId) {
        const data = payDoc.data();
        setPaymentCache((c) => ({ ...c, [txId]: data }));
      }
    } catch (err) {
      console.error("fetchPayment error:", err);
    }
  };

  // ── Format ISO date ─────────────────────────────────────────────────
  const formatDate = (iso) => {
    if (!iso) return "----";
    return new Date(iso).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ── Timeline: Show date only if past or today ───────────────────────
  const renderStatusTracker = (order) => {
    const timestamps = order.statusTimestamps || {};
    const now = new Date();

    return (
      <ol className="flex flex-row md:flex-row items-center justify-center gap-4 md:gap-4 relative">
        {/* Dashed line (desktop) */}
        <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 border-t border-dashed border-gray-400 pointer-events-none"></div>

        {statusSteps.map((step, index) => {
          const iso = timestamps[step.label];
          const isPastOrToday = iso && new Date(iso) <= now;
          const isCurrent = order.status === step.label;

          return (
            <li key={index} className="flex flex-col items-center flex-1 z-10">
              {/* Image Icon */}
              <div
                className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all ${
                  isPastOrToday || isCurrent
                    ? "border-green-600 shadow-lg"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={step.url}
                  alt={step.label}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Label */}
              <h5
                className={`mt-3 text-center text-sm font-medium ${
                  isPastOrToday || isCurrent ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.label}
              </h5>

              {/* Date: Show only if past or today */}
              <p className="mt-1 text-xs text-gray-600">
                {isPastOrToday ? formatDate(iso) : "----"}
              </p>

              
            </li>
          );
        })}
      </ol>
    );
  };

  // ── Payment Info ───────────────────────────────────────────────────
  const renderPaymentInfo = (order) => {
    const payment = paymentCache[order.txId];

    if (!payment) {
      return <span className="text-xs text-gray-400">Loading payment…</span>;
    }

    return (
      <div className="text-sm space-y-1 font-bold">
        <p>
          <strong className="text-gray-500">Method:</strong>{" "}
          <span className="text-red-600">{payment.method?.toUpperCase() || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">Paid on:</strong>{" "}
          <span className="text-red-600">{formatDate(payment.date)}</span>
        </p>
        <p>
          <strong className="text-gray-500">Tx ID:</strong>{" "}
          <span className="text-orange-700">{payment.transactionId}</span>
        </p>
        <p>
          <strong className="text-gray-500">Total :</strong>{" "}
          <span className="text-orange-700">$ {payment.amount?.toFixed(2)}</span>
        </p>
      </div>
    );
  };

  // ── Main Render ─────────────────────────────────────────────────────
  return (
    <div className="mt-28 md:mt-20 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-sm font-medium text-gray-700 animate-pulse">
              Fetching your orders...
            </p>
          </div>
        )}

        {/* No orders */}
        {orders.length === 0 && !loading && (
          <p className="text-center text-gray-600">
            No orders yet.{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Start shopping
            </Link>
          </p>
        )}

        {/* Orders */}
        {orders.map((order) => (
          <div
            key={order.id}
            className="mb-10 bg-white  rounded-xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b bg-gray-100">
              <h2 className="text-md font-bold text-gray-900">
                Order ID:{" "}
                <span className="text-indigo-600">#{order.orderId}</span>
              </h2>
              <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                Ordered on: <strong>{formatDate(order.orderDate)}</strong>
              </div>
            </div>

            {/* Body: 4-column layout */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-6  justify-between">
              {/* 1. Product */}
              <div className="flex items-start gap-4">
                <img
                  src={order.thumbnail}
                  alt={order.title}
                  className="w-20 h-20 md:w-28 md:h-28 object-contain rounded-lg shadow"
                  onError={(e) => (e.target.src = "/fallback-image.png")}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{order.title}</h3>
                  <p className="text-sm text-gray-600">
                    Qty: <strong>{order.quantity}</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Unit: ${order.price.toFixed(2)}
                  </p>
                  {order.discountPercentage && (
                    <p className="text-xs text-green-600">
                      -{order.discountPercentage.toFixed(1)}% off
                    </p>
                  )}
                </div>
              </div>

              {/* 2. Address */}
              <div>
                <p className="font-medium text-gray-800 mb-1">Deliver to:</p>
                <p className="text-sm text-gray-600">
                  {order.address.doorNo}, {order.address.street},
                  <br />
                  {order.address.city}, {order.address.district},
                  <br />
                  {order.address.state} - {order.address.pincode}
                </p>
                {order.returnPolicy && (
                  <p className="text-xs text-gray-500 mt-2">
                    Return Policy: {order.returnPolicy}
                  </p>
                )}
              </div>

              {/* 3. Payment Details */}
              <div>
                <p className="font-medium text-gray-800 mb-1">Payment Details:</p>
                {renderPaymentInfo(order)}
              </div>

              {/* 4. Empty (for spacing) */}
              <div className="hidden md:block"></div>
            </div>

            {/* Status Tracker */}
            <div className="border-t p-6 bg-gray-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-6 text-center md:text-left">
                Order Status
              </h4>
              {renderStatusTracker(order)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;