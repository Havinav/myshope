import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const QuantityButton = ({ initialValue = 1, min = 1, max = 6, productId, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(productId, newQuantity);
    } else {
      toast.warn(`Maximum quantity is ${max}`, { toastId: `quantity-max-${productId}` });
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(productId, newQuantity);
    } else {
      toast.warn(`Minimum quantity is ${min}`, { toastId: `quantity-min-${productId}` });
    }
  };

  // Handle direct input
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      setQuantity(numValue);
      onQuantityChange?.(productId, numValue);
      console.log(productId, numValue);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      const numValue = Number(quantity);
      if (isNaN(numValue) || numValue < min || numValue > max) {
        setQuantity(initialValue);
        toast.error(`Please enter a number between ${min} and ${max}`, {
          toastId: `quantity-error-${productId}`,
        });
      } else {
        toast.info(`Quantity set to ${numValue}`, { toastId: `quantity-set-${productId}` });
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-l-md p-2 h-10 w-10 flex items-center justify-center transition-colors duration-200"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
        </svg>
      </button>
      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-16 h-10 text-center border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label={`Quantity for product ${productId}`}
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-r-md p-2 h-10 w-10 flex items-center justify-center transition-colors duration-200"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      <ToastContainer/>
    </div>
  );
};

export default QuantityButton;