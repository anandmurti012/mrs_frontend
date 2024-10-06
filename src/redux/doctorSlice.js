// src/redux/doctorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctorName: '',
    bookingTime: '',
    userName:',',
    pAddress:'',
    pPhone:'',
};

const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        setDoctorDetails: (state, action) => {
            state.doctorName = action.payload.doctorName;
            state.bookingTime = action.payload.bookingTime;
            state.userName = action.payload.userName;
            state.pAddress = action.payload.pAddress;
            state.pPhone = action.payload.pPhone;
        },
        clearDoctorDetails: (state) => {
            state.doctorName = '';
            state.bookingTime = '';
            state.userName='';
            state.pPhone='';
            state.pAddress='';
        },
    },
});

export const { setDoctorDetails, clearDoctorDetails } = doctorSlice.actions;
export default doctorSlice.reducer;
