import { useEffect, useState } from "react";
import MasonryLayout from '../Components/MasonryLayout/MasonryLayout';
import ContainerCard from '../Components/ContainerCard/ContainerCard';
import Header from "../Components/Header/Header";
import images from "../Jsons/Images.json"
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";


const Dashboard = () => {
    const { docs, success } = useSelector((store) => store.fileList);
    const [categoryImage, setCategoryImage] = useState(images.categories.all)
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