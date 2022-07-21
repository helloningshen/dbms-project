import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stopFormLoader, saveInfo, fetchDocs } from '../../../features/file-slice';
import { closeFormModal } from '../../../features/modal-slice';

import DragDrop from './drag-drop';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify'


const Form = () => {
  const dispatch = useDispatch()
  const { formSubmitting, uploaded, url } = useSelector(store => store.fileList)
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDesc] = useState("");
  const [bookType, setBookType] = useState("")
  const [semester, setSemester] = useState("")

  const submitForm = () => {
    const payload = {
      name,
      author,
      url: url.Location,
      originalFileName: url.originalFileName,
      s3Key: url.Key,
      bookType: bookType == "academic" ? semester : "other"

    }

    dispatch(saveInfo(payload))
    dispatch(closeFormModal())
    dispatch(stopFormLoader())
    toast.success("File Upload completed successfully.");
    dispatch(fetchDocs())
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
          <h1 style={{ fontSize: 30, textAlign: "center", color: "#9b5de5" }}>Provide Book Information.</h1>
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
            <br />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Choose an option </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel onClick={e => setBookType(e.target.value)} value="academic" control={<Radio />} label="MCS/MCA" />
                <FormControlLabel onClick={e => setBookType(e.target.value)} value="other" control={<Radio />} label="others" />
                <div></div>
              </RadioGroup>
            </FormControl>

            {
              bookType == "academic" ?

                <TextField
                  id="semester"
                  label="Enter Semster (msc1 || msc2 || msc3)"
                  type="text"
                  autoComplete=""
                  variant="standard"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}

                /> : ""}
            <>
              <div style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center", paddingTop: "16" }}>

                {
                  !uploaded ?
                    <React.Fragment>
                      <h1 style={{ color: "#c77dff" }}>Choose a file to upload!</h1>
                      <br />
                      <DragDrop />
                    </React.Fragment>
                    : <h1 style={{ color: "#c2e812" }}> File is uploaded</h1>


                }
              </div>
            </>



            <div style={{ display: "flex", textAlign: "center", justifyContent: "center", paddingTop: "16" }}>
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
    </>
  )
}


export default Form