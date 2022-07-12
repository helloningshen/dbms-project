import { useState } from "react";

// import styles of this component
import styles from "./Dashboard.module.css"
// import other components to use
import MasonryLayout from '../Components/MasonryLayout/MasonryLayout';
import ContainerCard from '../Components/ContainerCard/ContainerCard';
import Dropdown from '../Components/Elements/Dropdown/Dropdown';
import Header from "../Components/Header/Header";

// import json files 
import images from "../Jsons/Images.json"
import { useEffect } from "react";

// App component
const Dashboard = () => {


    const ddItems = [
        {
            id: 1,
            title: "All Books",
            active: true
        },
        {
            id: 2,
            title: "Topic Images",
            active: false
        },
        {
            id: 3,
            title: "Nature Images",
            active: false
        },
        {
            id: 4,
            title: "NFT Images",
            active: false
        },
        {
            id: 5,
            title: "Space Images",
            active: false
        }
    ]

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
                <ContainerCard>
                    <div className={`${styles["gallery-setting"]} flex justify-content-between align-items-center`}>
                        <h1>All Books</h1>
                        <Dropdown title="All Books" items={ddItems} liftingDdTextUp={takeDdTitle} />
                    </div>
                    <MasonryLayout images={categoryImage} />
                </ContainerCard>
            </div>
        </>
    )
}

export default Dashboard