import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './features/file-slice';
const store = configureStore({
  reducer: {
    fileList: fileReducer,
  },
});

export default store

