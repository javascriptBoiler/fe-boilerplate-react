// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  appointment: [],
  updateAppointment: {},
  appointmentCount: 0,
  isDataLoading: false
};

// ==============================|| SLICE - APOINTMENT ||============================== //

const appointment = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setDataList(state, action) {
      state.appointment = action.payload.appointment;
      state.appointmentCount = action.payload.appointmentCount;
    },
    setEditAppointmentDetails(state, action) {
      state.updateAppointment = action.payload.appointment;
    },
    changeLoadingStatus(state, action) {
      state.isDataLoading = action.payload.isDataLoading;
    },
  }
});

export default appointment.reducer;

export const { setDataList, changeLoadingStatus, setEditAppointmentDetails } = appointment.actions;
