import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div className="flex-grow flex flex-col justify-center items-center px-4 md:px-6 mt-16 md:mt-20">
        <img
          src="data:image/png;base64,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"
          className="h-24 w-32 md:h-32 md:w-40 mb-6"
          alt="MyShoee Logo"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 text-center max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <button
            className="bg-blue-600 text-white font-medium rounded-md py-2 px-6 text-sm md:text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Return to homepage"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;