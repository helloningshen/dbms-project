import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { register, startRegisterLoading } from "../features/auth-slice"


import Button from "./components/button/custom-button"
import styles from "./css/login.module.css"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid"
import LoadingButton from '@mui/lab/LoadingButton';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

  const { authMessage } = useSelector(store => store.auth)
  const { registerSubmittingForm } = useSelector(store => store.auth)

  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [warning, setWarning] = useState("")



  const handleSubmit = () => {


    if (!email.includes("@")) {
      return setWarning("Email is invalid")
    } else setWarning("")

    if (password.length < 5) {
      return setWarning("Password is too short");
    } else setWarning("")


    if (password != confirmPassword) {
      return setWarning("Password does not match.")
    } else setWarning("")


    dispatch(startRegisterLoading())
    const payload = {
      email,
      password,
    }
    dispatch(register(payload))
  }

  return (
    <>
      <div className={styles["content"]}>
        <div className={styles["login_form"]}>
          <Link to="/">
            <Button theme="transparent">
              <ArrowBackIosIcon />
            </Button>
          </Link>
          <h1 style={{ marginBottom: 20, textAlign: "center", fontSize: 25, fontWeight: "bold" }}>Register</h1>
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
            <h1 style={{ color: "red" }}>{authMessage}</h1>
            <h1 style={{ color: "red" }}>{warning}</h1>
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
              <TextField
                required
                id="outlined-required"
                label="Confirm Password"
                value={confirmPassword}
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <LoadingButton
                className={styles["sign"]}
                size="large"
                color="secondary"
                onClick={handleSubmit}
                loading={registerSubmittingForm}
                loadingPosition="center"
                variant="contained"
              >
                Register
              </LoadingButton>
            </div>
            <div style={{ position: "absolute", bottom: 25, right: 50 }}>
              <Link to="/signin" style={{}}>Have an Account? Login</Link>
            </div>
          </Grid>
        </div >
      </div >
    </>
  )
}


