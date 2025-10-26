// src/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, setUserLoggedIn } from "../slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const Login = ({ loginData, setLoginFlag }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(loginData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [clientError, setClientError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation: check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation: check for non-empty
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClientError("");
    setLoading(true); // Show loading

    if (validateForm()) {
      try {
        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Optionally fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        let userData = { email: user.email };
        if (userDoc.exists()) {
          userData = { ...userData, ...userDoc.data(),  };
          console.log("User data from Firestore:", userDoc.data());
        }
        userData.id = user.uid;
        // Dispatch Redux actions
        dispatch(setUserLoggedIn(true));
        dispatch(loginUser(userData)); // Pass user data (email, username, etc.)

        setIsOpen(false);
        setLoginFlag(false);
        toast.success("Login successful!", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } catch (error) {
        // Handle Firebase errors
        let errorMessage = "Login failed. Please check your credentials.";
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          errorMessage = "Incorrect email or password.";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Too many attempts. Please try again later.";
        }

        toast.error(errorMessage, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } finally {
        setLoading(false); // Hide loading
      }
    } else {
      setLoading(false); // Hide loading if validation fails
    }
  };
  const closePopUp = () => {
    setIsOpen(false);
    setLoginFlag(false);
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
    setLoginFlag(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 text-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xs mx-4 md:max-w-md">
            {/* Close Button */}
            <div className="flex justify-end pt-3 pr-3">
              <button
                onClick={togglePopup}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close login popup"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                className="h-12 w-16 md:h-14 md:w-18"
                src="data:image/png;base64,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"
                alt="Logo"
              />
            </div>
            {clientError && (
              <div className="text-center">
                <span className="text-red-500 font-bold">{clientError}</span>
              </div>
            )}
            <div className="px-5 pb-5 md:px-6 md:pb-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    aria-describedby="email-error"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    aria-describedby="password-error"
                  />
                  {errors.password && (
                    <p id="password-error" className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full bg-blue-600 text-white font-medium rounded-md py-1.5 md:py-2 text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
              <div>
                <p className="text-xs text-gray-500 mt-3">
                  You don't have an account?{" "}
                  <Link onClick={()=>closePopUp()}
                    className="text-blue-600 hover:underline cursor-pointer"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Login;