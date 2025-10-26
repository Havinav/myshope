// AddressForm.jsx
import { doc, setDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const Address = () => {
  const user = useSelector((state) => state.user.userData);
  const [formData, setFormData] = useState({
    doorNo: "",
    street: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    userId: user?.id || "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user?.id) return;
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const docSnap = await getDoc(doc(db, "addresses", user.id));
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setFormData({ ...docSnap.data(), userId: user.id });
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        toast.error("Failed to fetch address", {
          position: "bottom-center",
          autoClose: 2000,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, [user?.id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.doorNo) newErrors.doorNo = "Door number is required";
    if (!formData.street) newErrors.street = "Street/Apartment name is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        await setDoc(doc(db, "addresses", user.id), formData);
        toast.success("Address Saved Successfully", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error saving address:", error);
        toast.error("Failed to save address", {
          position: "bottom-center",
          autoClose: 2000,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full animate-progress"
              style={{ width: "100%" }}
            ></div>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Address
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Door Number */}
            <div>
              <label
                htmlFor="doorNo"
                className="block text-sm font-medium text-gray-700"
              >
                Door Number
              </label>
              <input
                type="text"
                id="doorNo"
                name="doorNo"
                value={formData.doorNo}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.doorNo ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                placeholder="Enter door number"
                disabled={loading}
              />
              {errors.doorNo && (
                <p className="mt-1 text-sm text-red-500">{errors.doorNo}</p>
              )}
            </div>

            {/* Street/Apartment Name */}
            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street/Apartment Name
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.street ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                placeholder="Enter street or apartment name"
                disabled={loading}
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-500">{errors.street}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                placeholder="Enter city"
                disabled={loading}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            {/* District */}
            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.district ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                placeholder="Enter district"
                disabled={loading}
              />
              {errors.district && (
                <p className="mt-1 text-sm text-red-500">{errors.district}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                placeholder="Enter state"
                disabled={loading}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <label
                htmlFor="pincode"
                className="block text-sm font-medium text-gray-700"
              >
                Pincode/Digital Code
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2`}
                placeholder="Enter pincode"
                maxLength="6"
                disabled={loading}
              />
              {errors.pincode && (
                <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              
            >
             Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;