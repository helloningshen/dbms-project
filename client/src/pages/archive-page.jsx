import React, { useEffect } from 'react'
import Nav from './components/nav/nav';
import ContainerCard from './components/container-card/container-card';
import ArchiveContent from './components/archive/archive-content';
import MainLayout from "./components/layout"
import styles from "./css/archive.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocs, storeArchive } from '../features/file-slice';
const Archive = () => {

	const { archive, docs } = useSelector(store => store.fileList)
	const dispatch = useDispatch()
	useEffect(() => {
		if (docs.length < 1) {
			dispatch(fetchDocs())
			dispatch(storeArchive())
		}
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
					{
						archive.length <= 0 ? <h1>Loading</h1> : <ArchiveContent />
					}
				</div>
			</MainLayout>
		</>
	)
}


export default Archive;
