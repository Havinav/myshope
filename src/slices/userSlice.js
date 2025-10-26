// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoggedIn: sessionStorage.getItem("userData") ? true : false,
  userData: sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    loginUser: (state, action) => {
      state.isUserLoggedIn = true;
      state.userData = action.payload;
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.isUserLoggedIn = false;
      state.userData = null;
      sessionStorage.removeItem("userData"); // Clear sessionStorage on logout
    },
    restoreUser: (state, action) => {
      state.isUserLoggedIn = true;
      state.userData = action.payload;
    },
  },
});

export const { setUserLoggedIn, loginUser, logoutUser, restoreUser } = userSlice.actions;
export default userSlice.reducer;