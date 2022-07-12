import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from "@mui/material/Input"
import LoadingButton from '@mui/lab/LoadingButton';

const Form = () => {


  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

  return (
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
          />
          <TextField
            id="description"
            label="Description"
            type="text"
            autoComplete=""
            variant="standard"
          /> <TextField
            id="authorName"
            label="Author Name"
            type="text"
            autoComplete=""
            variant="standard"

          /> <TextField
            id=""
            label="Type of the Book (Dept)"
            type="text"
            autoComplete=""
            variant="standard"
          />
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
          </label>

          <div style={{ display: "flex", textAlign: "center", justifyContent: "center", paddingTop: 16 }}>
            <LoadingButton
              size="small"
              color="secondary"
              onClick={handleClick}
              loading={loading}
              loadingPosition="center"
              variant="contained"
            >
              Start Upload
            </LoadingButton>
          </div>
        </div>
      </Box>
    </div>
  )
}


export default Form