import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productFlag = Array.isArray(state.products)
        ? state.products.some((product) => product.id === action.payload.id)
        : false;
      if (productFlag) {
        Swal.fire({
          title: "MyShopee",
          text: "Product already in cart",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          title: "MyShopee",
          text: "Product added to cart",
          showConfirmButton: false,
          timer: 1000,
        });
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProduct: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        state.products.splice(productIndex, 1);
        Swal.fire({
          title: "MyShopee",
          text: `${product.title} removed from cart`,
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          title: "MyShopee",
          text: "Product not found in cart",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
    updateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.products.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeProduct, updateProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;