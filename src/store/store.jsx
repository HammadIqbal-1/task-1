import { configureStore } from "@reduxjs/toolkit";
import wishListSlice from "./wishListSlice";

export const store = configureStore({
  reducer: {
    wishList: wishListSlice,
  },
});
