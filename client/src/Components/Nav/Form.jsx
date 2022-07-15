import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux'
import { stopLoading, submitFile } from '../../features/file-slice';
import styles from "./Form.module.css"
import { closeModal } from '../../features/modal-slice';
import { ToastContainer } from 'react-toastify'
import { notify } from "../../utilities/notify"

const Form = () => {

  const dispatch = useDispatch()
  const { success, formSubmitting } = useSelector(store => store.fileList)

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [description, setDesc] = useState("");
  const [semester, setSem] = useState("");
  const [uploadedBy, setUploadedBy] = useState("Anonymous");
  const [newFile, setNewFile] = useState("");


  const submitForm = () => {
    const payload = {
      name,
      author,
      type,
      description,
      semester,
      uploadedBy,
      file: newFile,
    }
    dispatch(submitFile(payload))
    setTimeout(() => {
      dispatch(stopLoading())
      dispatch(closeModal())
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

              label="Type of the Book (Dept)"
              type="text"
              autoComplete=""
              variant="standard"
              value={type}
              onChange={(e) => setType(e.target.value)}

            />

            <TextField
              id="semester"
              label="Semester (optional)"
              type="text"
              autoComplete=""
              variant="standard"
              value={semester}
              onChange={(e) => setSem(e.target.value)}

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

            <TextField
              id="uploadedBy"
              label="Uploaded By"
              type="text"
              autoComplete=""
              variant="standard"
              disabled={true}
              value={uploadedBy}
              onChange={(e) => setUploadedBy(e.target.value)}

            />

            <div className={styles["upload-file"]}>
              <label>Browse File</label>
              <input type="file" name="pdfFile" onChange={(e) => setNewFile(e.target.files[0])} />

            </div>

            <div style={{ display: "flex", textAlign: "center", justifyContent: "center", paddingTop: 16 }}>
              <LoadingButton
                size="large"
                color="secondary"
                onClick={submitForm}
                loading={formSubmitting}
                loadingPosition="center"
                variant="contained"
              >
                Start Upload
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