import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import appReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    app: appReducer
  }
});
