import { useState } from "react";
import MasonryLayout from '../Components/MasonryLayout/MasonryLayout';
import ContainerCard from '../Components/ContainerCard/ContainerCard';
import Header from "../Components/Header/Header";
import images from "../Jsons/Images.json"
import { useSelector } from "react-redux";


const Dashboard = () => {
    const { docs } = useSelector((store) => store.fileList);
    const [categoryImage, setCategoryImage] = useState(images.categories.all)
    const takeDdTitle = (ddTitle) => {
        setCategoryImage(() => {
            let categoryChoose = Object.keys(images.categories).filter(item => {
                const titleSplited = ddTitle.toLowerCase().split(" ")[0]
                return item.toLowerCase().includes(titleSplited)
            })
            return [...images.categories[categoryChoose]]
        })
    }

    return (
        <>
            <Header />
            <div className="flex justify-content-center" style={{ marginTop: "50px", padding: '50px' }}>
                <div style={{ color: "white" }}>
                </div>
                <ContainerCard>

                    <MasonryLayout images={categoryImage} docs={docs} />
                </ContainerCard>
            </div>
        </>
    )
}

export default Dashboard