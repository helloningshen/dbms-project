import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton';
import Button from "../Components/Elements/Button/Button"
import styles from "./Login.module.css"

export default function Login() {

  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true)
  }
  return (
    <div className={styles["content"]}>
      <div className={styles["login_form"]}>
        <Link to="/">
          <Button theme="primary">back</Button>

        </Link>
        <div className={styles["details"]}>
          <div className={styles["welcome"]}>Welcome Back!</div>
          <div className={styles["wrap"]}>
            <label>Email</label><br />
            <input type="text" className={styles["input"]} />
          </div>
          <div className={styles["wrap"]}>
            <label>Password</label><br />
            <input type="password" className={styles["input"]} data-type="password" />
          </div>
          <div className={styles["wrap"]}>
            <label>Forgot password?</label>
          </div>
          <div className={styles["wrap"]}>
            <div className={styles["btns"]}>

              <LoadingButton
                className={styles["sign"]}
                size="large"
                color="secondary"
                onClick={handleClick}
                loading={loading}
                loadingPosition="center"
                variant="contained"
              >
                Login
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}