import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

import styles from "../../css/nav.module.css"
import Button1 from "../button/custom-button"
import Modal from "../modal"
import Form from './form'

import { HambergerMenu } from "iconsax-react"
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button"

import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../../../features/auth-slice"
import { openFormModal } from '../../../features/modal-slice'


const Nav = () => {
	const [auth, setAuth] = useState();
	const [user, setUser] = useState({});
	const { formModal } = useSelector(store => store.modal)
	const dispatch = useDispatch()
	const handleOpenModal = () => {
		dispatch(openFormModal())
	}

	useEffect(() => {
		let u = localStorage.getItem("user")
		if (u === "undefined" || u === null) return;

		u = JSON.parse(u);
		setUser(u)
		if (u.accessToken) setAuth(true)
	}, [])


	const handleLogout = () => {
		dispatch(logout())
		location.reload()
	}

	return (
		<nav className={`${styles.nav} flex align-items-center`}>
			<h1 className={styles["nav-title"]}>Book Gallery</h1>
			<ul className={`flex align-items-center ${styles["navbar-nav"]}`}>
				<li className={`${styles["nav-item"]} ${styles.active}`}>
					<Link to="/" className={`${styles["nav-link"]}`}>Home</Link>
				</li>

				<li className={styles["nav-item"]} >
					<Link to="/archive" className={styles["nav-link"]}>
						Archive
					</Link>
				</li>

				<li className={`${styles["nav-item"]} ${styles["d-none-1100"]}`}>
					<Link to="/about" className={styles["nav-link"]}>About</Link>
				</li>
			</ul>
			<div className={`flex ${styles["navbar-buttons"]}`}>
				<Modal open={formModal} btn="Upload Button">
					<Form />
				</Modal>
				<Button1 theme="primary" onClick={() => handleOpenModal()}>Upload</Button1>

				{
					!auth && <>	<Link to="/signin">
						<Button1 theme="transparent">Login</Button1>
					</Link>

						<Link to="/register">
							<Button1 theme="matrix">Sign up</Button1>
						</Link></>
				}
				{
					auth &&
					<>
						<Button variant="outlined">
							<span style={{ paddingRight: 20, color: "white" }}>{user.data.email}</span>
						</Button>
						<Button1 theme="danger" onClick={handleLogout}>
							<LogoutIcon style={{ fontSize: "20", textAlign: "center" }} />
						</Button1>
					</>
				}

			</div>

			<div className={styles["navbar-responsive-menu"]}>
				<Button1 theme="transparent">
					<HambergerMenu size="32" color="var(--white-100)" />
				</Button1>
			</div>
		</nav >
	)
}

export default Nav