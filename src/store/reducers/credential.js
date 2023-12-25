// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  credentials: [],
  isDataLoading: false
};

// ==============================|| SLICE - CREDENTIALS ||============================== //

const credentials = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.credentials = action.payload.credentials;
    },

    changeLoadingStatus(state, action) {
      state.isDataLoading = action.payload.isDataLoading;
    },
  }
});

export default credentials.reducer;

export const { setCredentials, changeLoadingStatus } = credentials.actions;
