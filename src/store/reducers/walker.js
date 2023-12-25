// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  walkers: [],
  updateWalker: {},
  walkerCount: 0,
  isDataLoading: false
};

// ==============================|| SLICE - USER ||============================== //

const walker = createSlice({
  name: 'walker',
  initialState,
  reducers: {
    setDataList(state, action) {
      state.walkers = action.payload.walkers;
      state.walkerCount = action.payload.walkerCount;
    },
    setEditWalkerDetails(state, action) {
      state.updateWalker = action.payload.walker;
    },
    changeLoadingStatus(state, action) {
      state.isDataLoading = action.payload.isDataLoading;
    },
  }
});

export default walker.reducer;

export const { setDataList, changeLoadingStatus, setEditWalkerDetails } = walker.actions;
