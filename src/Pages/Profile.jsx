// src/Profile.js
import React from "react";
import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
 const user = useSelector((state) => state.user.userData);
 
  return (
    <div class="h-full text-black  p-4 md:p-8">
      <div class="border-b-2 block md:flex">
        <div class="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div class="flex justify-between">
            <span class="text-xl font-semibold block"> Profile</span>
            <a
              href="#"
              class="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            >
              Edit
            </a>
          </div>

          <span class="text-gray-600">
            This information is secret so be careful
          </span>
          <div class="w-full p-8 mx-2 flex justify-center">
            <img
              id="showImage"
              class="max-w-xs w-32 items-center border"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
              alt=""
            />
          </div>
        </div>

        <div class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div class="rounded  shadow p-6">
            <div class="pb-6">
              <label for="name" class="font-semibold text-gray-700 block pb-1">
                Name
              </label>
              <div class="flex">
                <input
                  disabled
                  id="username"
                  class="border-1  rounded-r px-4 py-2 w-full"
                  type="text"
                  value={user?.username}
                />
              </div>
            </div>
            <div class="pb-4">
              <label for="about" class="font-semibold text-gray-700 block pb-1">
                Email
              </label>
              <input
                disabled
                id="email"
                class="border-1  rounded-r px-4 py-2 w-full"
                type="email"
                value={user?.email}
              />
            </div>
            <div class="pb-4">
              <label for="about" class="font-semibold text-gray-700 block pb-1">
                Mobile Number
              </label>
              <input
                disabled
                id="email"
                class="border-1  rounded-r px-4 py-2 w-full"
                type="email"
                value={user?.mobile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
