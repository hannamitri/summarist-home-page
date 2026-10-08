import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthModalOpen: boolean;
  authMode: "login" | "register";
}

const initialState: AuthState = {
  isAuthModalOpen: false,
  authMode: "login",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },

    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },

    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
    setUser: (state, action) => {
  state.user = action.payload;
},
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  setAuthMode,
  setUser,
} = authSlice.actions;

interface AuthState {
  isAuthModalOpen: boolean;
  authMode: "login" | "register";
  user: {
    uid: string;
    email: string | null;
  } | null;
}

export default authSlice.reducer;