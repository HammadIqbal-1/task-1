import { configureStore } from "@reduxjs/toolkit";
import wishListSlice from "./slices/wishListSlice";
import actionSlice from "./slices/actionSlice";
import dynmaicSlice from "./slices/dynmaicSlice";

export const store = configureStore({
  reducer: {
    wishList: wishListSlice,
    apiData: actionSlice,
    dynamicData: dynmaicSlice,
  },
});
