import { configureStore } from "@reduxjs/toolkit";
import wishListSlice from "./wishListSlice";
import actionSlice from "./actionSlice";
import dynmaicSlice from "./dynmaicSlice";

export const store = configureStore({
  reducer: {
    wishList: wishListSlice,
    apiData: actionSlice,
    dynamicData: dynmaicSlice,
  },
});
