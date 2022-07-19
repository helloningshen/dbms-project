import React, { useEffect } from 'react'
import Nav from '../Components/Nav/Nav';
import ContainerCard from '../Components/ContainerCard/ContainerCard';
import ArchiveContent2 from './archive/ArchiveContent2';
import MainLayout from "../Components/Layout"
import styles from "./Archive.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { storeArchive } from '../features/file-slice';
const Archive = () => {

	const { archive } = useSelector(store => store.fileList)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(storeArchive())
		console.log("archive", archive)
	}, [])

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
					<ArchiveContent2 />
				</div>
			</MainLayout>
		</>
	)
}


export default Archive;
