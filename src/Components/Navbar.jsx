import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Pages/Login";
import { IoBag } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [userLogged] = useState(true);
  const [loginFlag, setLoginFlag] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginFlag(true);
  };

  const handleSearchTerm = () => {
    if (searchTerms !== "" && searchTerms !== undefined) {
      navigate(`/s/${searchTerms}`);
    }
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear auth token, update userLogged state)
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-blue-500 shadow-md z-50">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                className="h-12 w-16 md:h-14 md:w-18 rounded-2xl"
                src="data:image/png;base64,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"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Search Bar (Visible on Desktop, Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 mx-2 max-w-xs">
            <input
              type="text"
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              placeholder="Search..."
              className="w-full border text-black bg-white font-bold border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearchTerm}
              type="button"
              className="ml-2 bg-white text-black font-medium rounded-md px-4 py-1.5 text-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Search
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2 md:gap-4 relative">
            <Link to="/cart">
              <span className="flex font-bold text-white gap-1 items-center">
                <IoBag className="text-lg" />
                <p>Bag 0</p>
              </span>
            </Link>
            {userLogged ? (
              <div className="relative">
                <div
                  className="flex font-bold text-white gap-1 items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaRegUserCircle className="text-lg" />
                  Gopal
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/orders"
                      className="block font-bold px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                    <Link
                      to="/account"
                      className="block font-bold px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      User Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block font-bold w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="flex font-bold text-white gap-1 items-center cursor-pointer"
                onClick={handleLoginClick}
              >
                <FaRegUserCircle className="text-lg" />
                Login
              </div>
            )}
          </div>
        </div>

        {/* Search Bar for Mobile */}
        <div className="md:hidden px-4 pb-4">
          <div className="flex max-w-xs mx-auto">
            <input
              type="text"
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              placeholder="Search..."
              className="w-full border bg-white text-black border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={handleSearchTerm}
              className="ml-2 bg-white text-black font-medium rounded-md px-4 py-1.5 text-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Search
            </button>
          </div>
        </div>

        {/* Login Popup */}
        {loginFlag && <Login loginData={loginFlag} setLoginFlag={setLoginFlag} />}
      </div>
    </div>
  );
};

export default Navbar;