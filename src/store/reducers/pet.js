// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  pets: [],
  petsForAppointment: [],
  updatePet: {},
  petCount: 0,
  isDataLoading: false
};

// ==============================|| SLICE - USER ||============================== //

const pet = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setDataList(state, action) {
      state.pets = action.payload.pets;
      state.petCount = action.payload.petCount;
    },
    setPetForAppointment(state, action) {
      state.petsForAppointment = action.payload.pets;
    },
    setEditPetDetails(state, action) {
      state.updatePet = action.payload.pet;
    },
    changeLoadingStatus(state, action) {
      state.isDataLoading = action.payload.isDataLoading;
    },
  }
});

export default pet.reducer;

export const { setDataList, setEditPetDetails, changeLoadingStatus, setPetForAppointment } = pet.actions;
