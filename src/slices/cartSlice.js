// cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc, getDocs, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Adjust the path to your Firebase config
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// Async thunk to add a product to Firestore
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ product, userId }, { rejectWithValue }) => {
    try {
     
      const productData = {
        ...product,
        quantity: 1,
        userId,
        id: product.id, // Ensure the product ID is included
      };
      await setDoc(doc(db, "cart", userId, "items", product.id.toString()), productData);
      return productData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch cart items from Firestore
export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchCartItemsAsync",
  async (userId, { rejectWithValue }) => {
    try {
     
      const cartCollectionRef = collection(db, "cart", userId, "items");
      const querySnapshot = await getDocs(cartCollectionRef);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to remove a product from Firestore
export const removeProductAsync = createAsyncThunk(
  "cart/removeProductAsync",
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "cart", userId, "items", productId.toString());
      await deleteDoc(docRef);
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update product quantity in Firestore
export const updateProductQuantityAsync = createAsyncThunk(
  "cart/updateProductQuantityAsync",
  async ({ productId, quantity, userId }, { rejectWithValue }) => {
    try {
     
      const docRef = doc(db, "cart", userId, "items", productId.toString());
      await updateDoc(docRef, { quantity });
      return { id: productId, quantity };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optional: Clear cart locally (e.g., for logout)
    clearCart: (state) => {
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add to cart
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const productFlag = state.products.some((product) => product.id === action.payload.id);
        if (!productFlag) {
          state.products.push({ ...action.payload, id: action.payload.id });
          toast.success("Product added to cart.", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.info("Product already exists in cart.", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to add to cart: ${action.payload}`, {
          position: "bottom-center",
          autoClose: 4000,
          theme: "dark",
        });
      });

    // Fetch cart items
    builder
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.map((item) => ({
          ...item,
          id: item.id, // Map productId to id for consistency
        }));
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to fetch cart: ${action.payload}`, {
          position: "bottom-center",
          autoClose: 4000,
          theme: "dark",
        });
      });

    // Remove product
    builder
      .addCase(removeProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const productId = action.payload;
        state.products = state.products.filter((p) => p.id !== productId);
      })
      .addCase(removeProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to remove from cart: ${action.payload}`, {
          position: "bottom-center",
          autoClose: 4000,
          theme: "dark",
        });
      });

    // Update quantity
    builder
      .addCase(updateProductQuantityAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { id, quantity } = action.payload;
        const item = state.products.find((item) => item.id === id);
        if (item) {
          item.quantity = quantity;
          toast.success(`Updated quantity to ${quantity}`, {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .addCase(updateProductQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to update quantity: ${action.payload}`, {
          position: "bottom-center",
          autoClose: 4000,
          theme: "dark",
        });
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;