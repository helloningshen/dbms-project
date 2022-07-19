import { useState } from "react";
import MasonryLayout from './components/masonry/masonry-layout';
import ContainerCard from './components/container-card/container-card'
import Header from "./components/header/header";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";


const Dashboard = () => {
    const { docs, success } = useSelector((store) => store.fileList);
    return (
        <>

            {success && <ToastContainer />}
            <Header />
            <div className="flex justify-content-center" style={{ marginTop: "50px", padding: '50px' }}>
                <div style={{ color: "white" }}>
                </div>
                <ContainerCard>

                    <MasonryLayout docs={docs} />
                </ContainerCard>
            </div>
        </>
    )
}

export default Dashboard