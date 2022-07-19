import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { urls, initialState } from "./helper/util"

export const fetchDocs = createAsyncThunk(
  'fetchDocs',
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(urls.fetchAll);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);


export const uploadDoc = createAsyncThunk(
  'uploadDoc',
  async (payload, thunkAPI) => {
    try {
      const { file } = payload;
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(urls.insert, formData)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue("Something went wrong.")
    }
  }
)


export const saveInfo = createAsyncThunk(
  'saveInfo',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(urls.info, payload);
    } catch (err) { console.log(err) }
  }
)


export const downloadOne = createAsyncThunk(
  'file/download',
  async (payload, thunkAPI) => {
    try {
      const result = await axios.get(`${urls.download}/${payload.id}`);
      return result.data.url
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);


export const deleteItem = createAsyncThunk(
  "delete",
  async (id, thunkAPI) => {
    try {
      console.log("requesting", id)
      const res = await axios.delete(`${urls.delete}/${id}`)
      console.log(res)
    } catch (err) { }
  }
)





const fileSlice = createSlice({
  name: 'fileops',
  initialState,
  reducers: {
    stopFormLoader: (state) => {
      state.formSubmitting = false
    },

    storeArchive: (state, action) => {
      state.archive = state.docs.filter(file => file.bookType != "other")
    },
  },

  extraReducers: {
    [fetchDocs.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchDocs.fulfilled]: (state, action) => {
      state.docs = action.payload;
    },
    [fetchDocs.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [uploadDoc.pending]: (state) => {

    },

    [uploadDoc.pending]: (state, action) => {
      state.isUploading = true
    },
    [uploadDoc.fulfilled]: (state, action) => {
      state.url = action.payload
      state.uploaded = true
      state.isUploading = false
    },

    [uploadDoc.rejected]: (state) => {
      state.isUploading = false
    },

    [saveInfo.pending]: (state) => {
      state.formSubmitting = true
      state.success = false
    },
    [saveInfo.fulfilled]: (state, action) => {
      state.success = true
      state.formSubmitting = false
      state.url = {}
    },

    [saveInfo.rejected]: state => {
      state.success = false
      state.formSubmitting = false
    },


    [downloadOne.fulfilled]: (state, action) => {
      state.currentUrl = action.payload
    }
  },
});

// console.log(cartSlice);
export const { downloadDoc, stopFormLoader, openPdfViewer, storeArchive } =
  fileSlice.actions;

export default fileSlice.reducer;