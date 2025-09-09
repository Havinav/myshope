import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  isUserLoggedIn: false,
  userData: null,
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Rename reducer to describe action (setUserLoggedIn)
    setUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload; // Expect boolean payload
    },
  
    loginUser: (state, action) => {
      state.isUserLoggedIn = true;
      state.userData = action.payload;
    },
    logoutUser: (state) => {
      state.isUserLoggedIn = false;
      state.userData = null;
    },
  },
});


export const { setUserLoggedIn, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;