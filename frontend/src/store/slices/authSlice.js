import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { storage } from "../../utils/storage";

const initialAuth = storage.get("writeease_auth", {
  user: null,
  token: null,
  onboardingSeen: false
});

const persistAuth = (state) =>
  storage.set("writeease_auth", {
    user: state.user,
    token: state.token,
    onboardingSeen: state.onboardingSeen
  });

const toErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.register(payload);
    } catch (error) {
      return rejectWithValue(toErrorMessage(error, "Unable to create account"));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.login(payload);
    } catch (error) {
      return rejectWithValue(toErrorMessage(error, "Unable to sign in"));
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/me",
  async (_payload, { rejectWithValue }) => {
    try {
      return await authService.me();
    } catch (error) {
      return rejectWithValue(toErrorMessage(error, "Unable to fetch user"));
    }
  }
);

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
      state.token = null;
      state.error = null;
      persistAuth(state);
    },
    setOnboardingSeen(state, action) {
      state.onboardingSeen = action.payload;
      persistAuth(state);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        persistAuth(state);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        persistAuth(state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        persistAuth(state);
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        persistAuth(state);
      });
  }
});

export const { clearUser, setOnboardingSeen } = authSlice.actions;
export default authSlice.reducer;
