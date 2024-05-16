import { configureStore } from "@reduxjs/toolkit";
import apiDataSlice from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    apiData: apiDataSlice,
  },
});
