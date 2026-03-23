import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { storage } from "../../utils/storage";

const initialAuth = storage.get("writeease_auth", {
  user: null,
  onboardingSeen: false
});

const persistAuth = (state) =>
  storage.set("writeease_auth", {
    user: state.user,
    onboardingSeen: state.onboardingSeen
  });

export const syncCurrentUser = createAsyncThunk("auth/sync", authService.sync);
export const fetchCurrentUser = createAsyncThunk("auth/me", authService.me);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialAuth,
    loading: false,
    error: null
  },
  reducers: {
    clearUser(state) {
      state.user = null;
      persistAuth(state);
    },
    setOnboardingSeen(state, action) {
      state.onboardingSeen = action.payload;
      persistAuth(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        persistAuth(state);
      })
      .addCase(syncCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        persistAuth(state);
      });
  }
});

export const { clearUser, setOnboardingSeen } = authSlice.actions;
export default authSlice.reducer;
