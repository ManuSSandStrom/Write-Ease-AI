import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    toast: null,
    quickActionsOpen: false
  },
  reducers: {
    showToast(state, action) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    },
    setQuickActionsOpen(state, action) {
      state.quickActionsOpen = action.payload;
    }
  }
});

export const { showToast, clearToast, setQuickActionsOpen } = uiSlice.actions;
export default uiSlice.reducer;

