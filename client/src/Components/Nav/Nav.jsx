// import styles of this component
import React, { useEffect } from 'react'
import styles from "./Nav.module.css"

// import other components
import Button1 from "../Elements/Button/Button"
import Modal from "../Modal"
// import other react pkg to use
import { HambergerMenu } from "iconsax-react"
import { Link } from "react-router-dom"
import Form from './Form'
import Login from "../../pages/Login"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

// Nav component
const Nav = () => {


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
				<Modal
					btn="UPLOAD FILE"
				>
					<Form />
				</Modal>
				<Link to="/signin">
					<Button1 theme="transparent">Login</Button1>
				</Link>

				<Button1 theme="matrix">Sign up</Button1>
			</div>
			<div className={styles["navbar-responsive-menu"]}>
				<Button1 theme="transparent">
					<HambergerMenu size="32" color="var(--white-100)" />
				</Button1>
			</div>
		</nav>
	)
}

export default Nav