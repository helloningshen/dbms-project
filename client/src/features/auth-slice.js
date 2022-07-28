import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { urls } from "./helper/util"




const initialState = {
  users: [],
  user: {},
  registerSubmittingForm: false,
  loginSubmittingForm: false,
  authMessage: "",
  loginMessage: ""
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

    },
    logout: (state) => {
      state.user = {}
      localStorage.clear()
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.registerSubmittingForm = false

      if (action.payload == undefined) {
        state.authMessage = "Email Already in use."
      } else {
        window.location.href = "/signin"
      }
    },

    [login.pending]: (state) => {
      state.loginMessage = ""
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload == undefined) {
        state.loginMessage = "Incorrect info. Please try again."
      } else {
        state.user = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload))
        state.loginSubmittingForm = false
        console.log(action.payload)
        window.location.href = "/"
      }
    },
  }
})


export const { startLoginLoading, startRegisterLoading, logout } = authSlice.actions

export default authSlice.reducer