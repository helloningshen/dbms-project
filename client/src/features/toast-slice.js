import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  show: false,
  loginToast: false,
}



export const toastSlice = createSlice({
  name: "taostops",
  initialState,
  reducers: {
    showToast: (state) => {
      state.show = true
    },
    showLoginToast: (state) => {
      state.loginToast = true
    }
  }
})


export const { showToast, showLoginToast } = toastSlice.actions

export default toastSlice.reducer