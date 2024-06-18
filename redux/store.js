import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import userSlice from "./userSlice";
import authReducer from '@/redux/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      modals: modalReducer,
      user: userSlice,
      auth: authReducer,
    },
  });
};

