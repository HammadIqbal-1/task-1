import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList(state, action) {
      state.wishList.push(action.payload);
    },
    removeFromWishList(state, action) {
      state.wishList = state.wishList.filter((e) => e.id !== action.payload.id);
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
