// Address.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const Address = ({ onClose, onSave }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const [formData, setFormData] = useState({
    doorNo: "",
    street: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch address on mount
  useEffect(() => {
    if (user?.id) {
      fetchAddress();
    } else if (!onClose) {
      // Only redirect if not in modal
      toast.error("Please log in to manage your address", {
        position: "bottom-center",
        autoClose: 4000,
        theme: "dark",
      });
      navigate("/login");
    }
  }, [user?.id, navigate, onClose]);

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "addresses", user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "doorNo",
      "street",
      "city",
      "district",
      "state",
      "pincode",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        errors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .trim()} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save address to Firestore
  const saveAddress = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    setSaving(true);
    try {
      await setDoc(doc(db, "addresses", user.id), formData, { merge: true });
      toast.success("Address saved successfully", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
      });
      if (onSave) onSave(); // Trigger fetchAddress in Cart.jsx
      if (onClose) onClose(); // Close modal in Cart.jsx
      else navigate("/cart"); // Redirect to cart if standalone
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="font-manrope mt-22 md:mt-23 p-6 text-black bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {formData.doorNo ? "Edit Address" : "Add Address"}
      </h2>
      {loading ? (
        <div className="text-center">
          <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : (
        <form onSubmit={saveAddress} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Door No
              </label>
              <input
                type="text"
                name="doorNo"
                value={formData.doorNo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter door number"
              />
              {formErrors.doorNo && (
                <p className="text-red-500 text-sm mt-1">{formErrors.doorNo}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter street name"
              />
              {formErrors.street && (
                <p className="text-red-500 text-sm mt-1">{formErrors.street}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city"
            />
            {formErrors.city && (
              <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter district"
            />
            {formErrors.district && (
              <p className="text-red-500 text-sm mt-1">{formErrors.district}</p>
            )}
          </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter state"
            />
            {formErrors.state && (
              <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pincode"
            />
            {formErrors.pincode && (
              <p className="text-red-500 text-sm mt-1">{formErrors.pincode}</p>
            )}
          </div>
          </div>
          <div className="pt-4 flex justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saving || loading}
            >
               {formData.doorNo ? "Update" : "Save"}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => (onClose ? onClose() : navigate("/cart"))}
              disabled={saving || loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Address;
