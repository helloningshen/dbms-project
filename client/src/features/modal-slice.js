import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  open: false,
}



export const modalSlice = createSlice({
  name: "modalops",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.open = false
    },
    openModal: (state) => {
      state.open = true
    }
  }
})


export const { closeModal, openModal } = modalSlice.actions

export default modalSlice.reducer