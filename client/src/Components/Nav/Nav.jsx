import React, { useEffect, useState } from 'react'
import styles from "./Nav.module.css"
import Button1 from "../Elements/Button/Button"
import Modal from "../Modal"
import Form from './Form'


import { Link } from "react-router-dom"
import { HambergerMenu } from "iconsax-react"
import { useDispatch, useSelector } from 'react-redux'
import { openFormModal } from '../../features/modal-slice'

const Nav = () => {
	const [auth, setAuth] = useState();
	const [user, setUser] = useState();
	const { formModal } = useSelector(store => store.modal)
	const dispatch = useDispatch()

	const handleOpenModal = () => {
		dispatch(openFormModal())
	}

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"))
		setUser(user)
		if (user.accessToken) setAuth(true)
	}, [])

	return (
		<nav className={`${styles.nav} flex align-items-center`}>
			<h1 className={styles["nav-title"]}>Gallery</h1>
			<ul className={`flex align-items-center ${styles["navbar-nav"]}`}>
				<li className={`${styles["nav-item"]} ${styles.active}`}>
					<Link to="/" className={`${styles["nav-link"]}`}>Home</Link>
				</li>

				<li className={styles["nav-item"]}>
					<Link to="/collections" className={styles["nav-link"]}>
						Collections
					</Link>
				</li>
				<li className={styles["nav-item"]}>
					<Link to="/authors" className={styles["nav-link"]}>
						Authors
					</Link>
				</li>


				<li className={styles["nav-item"]}>
					<Link to="/archive" className={styles["nav-link"]}>
						Archive
					</Link>
				</li>
				<li className={`${styles["nav-item"]} ${styles["d-none-1100"]}`}>
					<a href="" className={styles["nav-link"]}>Explore</a>
				</li>
				<li className={`${styles["nav-item"]} ${styles["d-none-1100"]}`}>
					<a href="" className={styles["nav-link"]}>Blog</a>
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
					<Button1 theme="matrix" >{user.data.email}</Button1>
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