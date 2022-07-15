import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import images from "../Jsons/Images.json"
import download from "downloadjs"

import { closeModal, openModal } from './modal-slice';
const baseURL = "http://localhost:5000"

const urls = {
  fetchAll: `${baseURL}/get/files`,
  insert: `${baseURL}/upload`,
  download: `${baseURL}/file/download`,
  success: false,
  url: {}
}


const initialState = {
  files: [],
  file: {},
  formSubmitting: false,
  isLoading: false,
};


export const submitFile = createAsyncThunk(
  'file/submitFile',

  async (payload, thunkAPI) => {
    setTimeout(() => {
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
    }, 3000)
  }
)

export const downloadOne = createAsyncThunk(
  'file/download',
  async (payload, thunkAPI) => {
    try {
      const result = await axios.get(`${urls.download}/${payload.id}`, { responseType: 'blob' });
      const split = payload.path.split('/');
      const filename = split[split.length - 1];
      download(result.data, filename, payload.mimetype);
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);



export const fetchOne = createAsyncThunk(
  'file/display',
  async (payload, thunkAPI) => {
    try {
      console.log("fetching")
      const result = await axios.get(`${urls.download}/${payload.id}`, { responseType: 'blob' });
      console.log(result, result.data.size)
      const res = { size: result.data.size, type: result.data.type }
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);





export const getFiles = createAsyncThunk(
  'file/getFiles',
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(urls.fetchAll);

      resp.data.forEach(file => {
        file.thumbnail = images.categories.all[Math.floor(Math.random() * 6)];
        return file;
      })

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
    stopLoading: (state) => {
      state.formSubmitting = false
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
      console.log("pen")
      state.formSubmitting = true
      state.success = false
    },
    [submitFile.fulfilled]: (state) => {
      console.log("ful")
      state.success = true
      state.formSubmitting = true
    },
    [submitFile.rejected]: state => {
      state.success = false
      state.formSubmitting = true
    },


    [fetchOne.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.url = action.payload
    },

  },
});

// console.log(cartSlice);
export const { stopLoading, openPdfViewer } =
  fileSlice.actions;

export default fileSlice.reducer;