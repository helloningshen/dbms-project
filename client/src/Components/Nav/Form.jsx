import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux'
import { stopLoading, saveInfo } from '../../features/file-slice';
import { closeFormModal } from '../../features/modal-slice';
import { ToastContainer } from 'react-toastify'
import { notify } from "../../utilities/notify"
import DragDrop from './DragDrop';



const Form = () => {
  const dispatch = useDispatch()
  const { success, formSubmitting, uploaded, url } = useSelector(store => store.fileList)
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDesc] = useState("");


  const submitForm = () => {
    const payload = {
      name,
      author,
      url: url.Location,
      originalFileName: url.originalFileName,
      s3Key: url.Key,
    }
    dispatch(saveInfo(payload))
    setTimeout(() => {
      dispatch(stopLoading())
      dispatch(closeFormModal())
      const text = success ? "File Upload completed successfully." : "Something is wrong with the upload. Please Try again."
      notify(text)
    }, 2000)
  }

  return (
    <>
      <div className="textfields">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: "35ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <h1>Provide Information about the book.</h1>
          <div>

            <TextField
              id="bookName"
              label="Name"
              type="text"
              autoComplete=""
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />


            <TextField
              id="authorName"
              label="Author Name"
              type="text"
              autoComplete=""
              variant="standard"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}

            />

            <TextField
              id="description"
              label="Description"
              type="text"
              autoComplete=""
              variant="standard"
              value={description}
              onChange={(e) => setDesc(e.target.value)}

            />



            {
              !uploaded ? <div style={{ display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center", paddingTop: 16 }}>
                <DragDrop />
              </div> : <h1>File is uploaded</h1>
            }

            <div style={{ display: "flex", textAlign: "center", justifyContent: "center", paddingTop: 16 }}>
              <LoadingButton
                size="large"
                color="secondary"
                onClick={submitForm}
                loading={formSubmitting}
                loadingPosition="center"
                variant="contained"
                disabled={url.Location ? false : true}
              >
                Save Info
              </LoadingButton>
            </div>
          </div>
        </Box>
      </div>
      <ToastContainer />
    </>
  )
}


export default Form