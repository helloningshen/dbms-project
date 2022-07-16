import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  show: true,
}



export const toastSlice = createSlice({
  name: "taostops",
  initialState,
  reducers: {
    showToast: (state) => {
      state.show = true
    }
  }
})


export const { showToast } = toastSlice.actions

export default toastSlice.reducer