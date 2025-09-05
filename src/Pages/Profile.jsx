import React, { useState } from "react";

const Profile = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const toggleEditPersonal = () => {
    setIsEditingPersonal(!isEditingPersonal);
  };

  const toggleEditAddress = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  return (
    <div className="bg-white p-4 sm:p-6 text-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Personal Information</span>
              <div className="space-x-2">
                <button
                  onClick={toggleEditPersonal}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                  disabled={isEditingPersonal}
                >
                  Edit
                </button>
                <button
                  onClick={toggleEditPersonal}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                  disabled={!isEditingPersonal}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 p-3">
              <div className="mb-5 w-full sm:w-1/2">
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  disabled={!isEditingPersonal}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                />
              </div>
              <div className="mb-5 w-full sm:w-1/2">
                <label
                  htmlFor="last-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  disabled={!isEditingPersonal}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                />
              </div>
            </div>
            <div className="mb-5 p-3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                disabled={!isEditingPersonal}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
              />
            </div>
            <div className="mb-5 p-3">
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                disabled={!isEditingPersonal}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Address</span>
              <div className="space-x-2">
                <button
                  onClick={toggleEditAddress}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                  disabled={isEditingAddress}
                >
                  Edit
                </button>
                <button
                  onClick={toggleEditAddress}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                  disabled={!isEditingAddress}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="mb-5 p-3">
              <label
                htmlFor="street"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Street Address
              </label>
              <input
                type="text"
                id="street"
                disabled={!isEditingAddress}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 p-3">
              <div className="mb-5 w-full sm:w-1/2">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  disabled={!isEditingAddress}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                />
              </div>
              <div className="mb-5 w-full sm:w-1/2">
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  disabled={!isEditingAddress}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
                />
              </div>
            </div>
            <div className="mb-5 p-3">
              <label
                htmlFor="zip"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zip"
                disabled={!isEditingAddress}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;