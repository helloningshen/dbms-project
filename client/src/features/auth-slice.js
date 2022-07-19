import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { urls } from "./helper/util"




const initialState = {
  users: [],
  user: {},
  registerSubmittingForm: false,
  loginSubmittingForm: false,
}


export const register = createAsyncThunk(
  "register",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(urls.register, payload)
      return res.data;
    } catch (err) { console.log(err) }
  }
)

export const login = createAsyncThunk(
  'login',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(urls.login, payload);
      return res.data;
    } catch (err) { console.log(err) }
  }
)




export const authSlice = createSlice({
  name: "authops",
  initialState,
  reducers: {
    startLoginLoading: (state) => {
      state.loginSubmittingForm = true
    },

    startRegisterLoading: (state) => {
      state.registerSubmittingForm = true
    },
    logout: (state) => {
      state.user = {}
      localStorage.clear()
    }
  },
  extraReducers: {
    [register.fulfilled]: (state) => {
      state.registerSubmittingForm = false
    },
    [login.fulfilled]: (state, action) => {

      state.user = action.payload
      console.log(action.payload)
      localStorage.setItem("user", JSON.stringify(action.payload))
      state.loginSubmittingForm = false

      window.location.href = "/"
    },

  }
})


export const { startLoginLoading, startRegisterLoading, logout } = authSlice.actions

export default authSlice.reducer