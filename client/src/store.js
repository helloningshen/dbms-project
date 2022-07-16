import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './features/file-slice';
import modalReducer from './features/modal-slice';
import toastReducer from "./features/toast-slice"
import authReducer from "./features/auth-slice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    fileList: fileReducer,
    modal: modalReducer,
    toast: toastReducer
  },
});

export default store

