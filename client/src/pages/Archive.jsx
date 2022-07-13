import React from 'react'
import Nav from '../Components/Nav/Nav';
import ContainerCard from '../Components/ContainerCard/ContainerCard';
import ArchiveContent from './archive/ArchiveContent';
import MainLayout from "../Components/Layout"
import styles from "./Archive.module.css"

const Archive = () => {
	return (
		<>
			<header className={`${styles.header} flex justify-content-center`}>
				<ContainerCard className="flex flex-column">
					<div className={styles["blur-circle-shape"]}></div>
					<Nav />
				</ContainerCard>
			</header>
			<MainLayout>

				<div className={` ${styles["services-inner"]}`}>
					<ArchiveContent />
				</div>
			</MainLayout>
		</>
	)
}


export default Archive;
