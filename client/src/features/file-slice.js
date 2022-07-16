import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import images from "../Jsons/Images.json"

const baseURL = "http://localhost:5000"

const urls = {
  fetchAll: `${baseURL}/docs`,
  insert: `${baseURL}/upload`,
  download: `${baseURL}/download`,
  info: `${baseURL}/info/save`,
}


const initialState = {
  docs: [],
  doc: {},
  formSubmitting: false,
  isLoading: false,
  url: {},
  uploaded: false,
  currentUrl: ""
};




export const fetchDocs = createAsyncThunk(
  'fetchDocs',
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(urls.fetchAll);
      resp.data.forEach(file => {
        file.thumbnail = images.categories.all[Math.floor(Math.random() * 6)];
        return file;
      })
      console.log(resp.data)
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
      console.log(payload)
      const res = await axios.post(urls.info, payload);
      console.log(res)
    } catch (err) { console.log(err) }
  }
)


export const downloadOne = createAsyncThunk(
  'file/download',
  async (payload, thunkAPI) => {
    try {
      console.log("called")
      const result = await axios.get(`${urls.download}/${payload.id}`);
      return result.data.url
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







const fileSlice = createSlice({
  name: 'fileops',
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.formSubmitting = false
    },
  },


  extraReducers: {
    [fetchDocs.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchDocs.fulfilled]: (state, action) => {
      // state.isLoading = false;
      state.docs = action.payload;
    },
    [fetchDocs.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [uploadDoc.pending]: (state) => {

    },

    [uploadDoc.fulfilled]: (state, action) => {
      state.url = action.payload
      state.uploaded = true
    },

    [saveInfo.pending]: (state) => {
      state.formSubmitting = true
      state.success = false
    },
    [saveInfo.fulfilled]: (state, action) => {
      state.success = true
      state.formSubmitting = true
      state.url = {}
      console.log("s", state.docs)
    },

    [saveInfo.rejected]: state => {
      state.success = false
      state.formSubmitting = true
      // },
    },

    [fetchOne.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.url = action.payload
    },
    [downloadOne.fulfilled]: (state, action) => {
      state.currentUrl = action.payload
    }
  },
});

// console.log(cartSlice);
export const { downloadDoc, stopLoading, openPdfViewer } =
  fileSlice.actions;

export default fileSlice.reducer;