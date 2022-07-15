import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './features/file-slice';
import modalReducer from './features/modal-slice';
import toastReducer from "./features/toast-slice"

const store = configureStore({
  reducer: {
    fileList: fileReducer,
    modal: modalReducer,
    toast: toastReducer
  },
});

export default store

