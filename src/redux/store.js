// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './doctorSlice';

export const store = configureStore({
    reducer: {
        doctor: doctorReducer,
    },
});
