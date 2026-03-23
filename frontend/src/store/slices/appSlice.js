import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appService } from "../../services/appService";

export const fetchTemplates = createAsyncThunk(
  "app/templates",
  appService.templates
);
export const fetchAnalytics = createAsyncThunk(
  "app/analytics",
  appService.analytics
);
export const fetchDocuments = createAsyncThunk(
  "app/documents",
  appService.documents
);

const appSlice = createSlice({
  name: "app",
  initialState: {
    templates: [],
    analytics: null,
    recentDocuments: [],
    documents: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload.templates;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload.analytics;
        state.recentDocuments = action.payload.recentDocuments;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.documents = action.payload.documents;
      });
  }
});

export default appSlice.reducer;

