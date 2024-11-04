// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for persistence
import doctorReducer from './doctorSlice';

// Combine reducers if you have more than one, or use a single reducer directly
const rootReducer = combineReducers({
  doctor: doctorReducer,
  // Add other reducers here if needed
});

// Configure persistence
const persistConfig = {
  key: 'mrshospital',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create the persistor object
export const persistor = persistStore(store);
