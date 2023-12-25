// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  users: [],
  updateUser: {},
  listUserForAppointment: [],
  listUserForPet: [],
  userCount: 0,
  isDataLoading: false
};

// ==============================|| SLICE - USER ||============================== //

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserList(state, action) {
      state.users = action.payload.users;
      state.userCount = action.payload.userCount;
    },

    setAppointmentUserList(state, action) {
      state.listUserForAppointment = action.payload.users;
    },

    setPetCreateUserList(state, action) {
      state.listUserForPet = action.payload.users;
    },

    setEditUserDetails(state, action) {
      state.updateUser = action.payload.user;
    },

    changeLoadingStatus(state, action) {
      state.isDataLoading = action.payload.isDataLoading;
    },
  }
});

export default user.reducer;

export const { 
  setUserList, 
  setEditUserDetails, 
  changeLoadingStatus, 
  setAppointmentUserList, 
  setPetCreateUserList 
} = user.actions;
