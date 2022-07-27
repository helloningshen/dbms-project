import React, { useEffect } from 'react'
import Nav from './components/nav/nav';
import ContainerCard from './components/container-card/container-card';
import ArchiveContent from './components/archive/archive-content';
import MainLayout from "./components/layout"
import styles from "./css/archive.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { storeArchive } from '../features/file-slice';
const Archive = () => {

	const { archive } = useSelector(store => store.fileList)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(storeArchive())
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
					<ArchiveContent />
				</div>
			</MainLayout>
		</>
	)
}


export default Archive;
