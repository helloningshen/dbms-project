import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = "http://localhost:5000"

const urls = {
  fetchAll: `${baseURL}/get/files`,
  insert: `${baseURL}/create/file`
}


const initialState = {
  files: [],
  formSubmitting: false,
};


export const submitFile = createAsyncThunk(
  'file/submitFile',

  async (payload, thunkAPI) => {
    try {
      const { name, author, type, description, semester, uploadedBy, file } = payload;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);
      formData.append("name", name);
      formData.append("author", author);
      formData.append("type", type)
      formData.append("description", description)
      formData.append("semester", semester);
      formData.append("uploadedBy", uploadedBy)

      fetch(urls.insert, {
        method: "POST",
        body: formData,
      })
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue("Something went wrong.")
    }
  }

)


export const getFiles = createAsyncThunk(
  'file/getFiles',
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(urls.fetchAll);
      return resp.data;

    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const fileSlice = createSlice({
  name: 'fileops',
  initialState,
  reducers: {
    clearFiles: (state) => {
      state.cartItems = [];
    },
    removeFile: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
  },
  extraReducers: {
    [getFiles.pending]: (state) => {
      state.isLoading = true;
    },
    [getFiles.fulfilled]: (state, action) => {
      // state.isLoading = false;
      state.files = action.payload;
    },
    [getFiles.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [submitFile.pending]: (state) => {
      console.log("pending")
      state.formSubmitting = true
    },
    [submitFile.fulfilled]: (state) => {
      console.log("full")
      state.formSubmitting = false
    },
    [submitFile.rejected]: state => {
      console.log("rej")
      state.formSubmitting = false
    }
  },
});

// console.log(cartSlice);
export const { clearFiles, removeFile, increase, decrease } =
  fileSlice.actions;

export default fileSlice.reducer;