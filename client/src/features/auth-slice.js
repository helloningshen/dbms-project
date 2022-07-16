import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const baseURL = "http://localhost:5000"

const urls = {
  register: `${baseURL}/user/register`,
  login: `${baseURL}/user/login`
}



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
      console.log(res)
      return res.data;
    } catch (err) { console.log(err) }
  }
)

export const login = createAsyncThunk(
  'login',
  async (payload, thunkAPI) => {
    try {
      console.log(payload)
      const res = await axios.post(urls.login, payload);
      console.log(res.data)
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
    }
  },
  extraReducers: {
    [register.fulfilled]: (state) => {
      state.registerSubmittingForm = false
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload
      // localStorage.clear()
      localStorage.setItem("user", JSON.stringify(action.payload))
      state.loginSubmittingForm = false
    }
  }
})


export const { startLoginLoading, startRegisterLoading } = authSlice.actions

export default authSlice.reducer