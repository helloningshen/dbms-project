import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from "./components/button/custom-button"
import styles from "./css/login.module.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid"

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, startLoginLoading } from "../features/auth-slice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { loginSubmittingForm, loginMessage } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = () => {
    dispatch(startLoginLoading())
    const payload = {
      email,
      password,
    }
    dispatch(login(payload))
  }
  return (
    <>
      {/* <ToastContainer /> */}
      <div className={styles["content"]}>
        <div className={styles["login_form"]}>
          <Link to="/">
            <Button theme="primary">
              <ArrowBackIosIcon />
            </Button>
          </Link>
          <h1 style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}>Sign In</h1>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: '100vh' }}
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 2, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <h1 style={{ color: "red" }}>{loginMessage}</h1>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <TextField
                required
                id="outlined-required"
                label="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <div>
              <LoadingButton
                className={styles["sign"]}
                size="large"
                color="secondary"
                onClick={handleSubmit}
                loading={loginSubmittingForm}
                loadingPosition="center"
                variant="contained"
              >
                Login
              </LoadingButton>


            </div>
            <div style={{ position: "absolute", bottom: 50, right: 50 }}>
              <Link to="/register">Don't have an account? Register</Link>
            </div>
          </Grid>
        </div >
      </div >
    </>
  )
}


