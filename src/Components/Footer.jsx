import React from "react";
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaL } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="hover:text-blue-400 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-blue-400 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a
                  href="/faq"
                  className="hover:text-blue-400 transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="hover:text-blue-400 transition-colors"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="hover:text-blue-400 transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:text-blue-400 transition-colors"
                >
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/gopal-pandilla/"
                target="_blank"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>
            <br />
            <div className="text-sm md:text-base space-x-3">
              Contact US
              <p className="space-x-2">
                <p className="text-sm md:text-base">Name: Gopal</p>
                <p className="text-sm md:text-base">Phone: +91-9493384380</p>
                <p className="text-sm md:text-base">
                  Email: GOPAL.TECH22@GMAIL.COM
                </p>
              </p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Newsletter
            </h3>
            <p className="text-sm md:text-base mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Newsletter submitted");
              }}
            >
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-l-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium rounded-r-md px-4 py-2 text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} MyShoee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
