import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  formModal: false,
  downloadModal: false,
}



export const modalSlice = createSlice({
  name: "modalops",
  initialState,
  reducers: {
    closeDownloadModal: (state) => {
      state.downloadModal = false
    },
    openDownloadModal: (state) => {
      state.downloadModal = true
    },

    closeFormModal: (state) => {
      state.formModal = false
    },
    openFormModal: (state) => {
      state.formModal = true
    }

  }
})


export const { closeFormModal, openFormModal, closeDownloadModal, openDownloadModal } = modalSlice.actions

export default modalSlice.reducer