import { useState, useEffect } from "react";
import MasonryLayout from '../Components/MasonryLayout/MasonryLayout';
import ContainerCard from '../Components/ContainerCard/ContainerCard';
import Dropdown from '../Components/Elements/Dropdown/Dropdown';
import Nav from '../Components/Nav/Nav'
import images from "../Jsons/Images.json"
import styles from "./Dashboard.module.css"

const Collections = () => {

    const ddItems = [
        {
            id: 1,
            title: "All Collections",
            active: true
        },
        {
            id: 2,
            title: "Arts",
            active: false
        },
        {
            id: 3,
            title: "Science",
            active: false
        },
        {
            id: 4,
            title: "Maths",
            active: false
        },
        {
            id: 5,
            title: "CS",
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
            <header className={`${styles.header} flex justify-content-center`}>
                <ContainerCard className="flex flex-column">
                    <div className={styles["blur-circle-shape"]}></div>
                    <Nav />
                </ContainerCard>
            </header>
            <div className="flex justify-content-center" style={{ marginTop: "50px", padding: '50px' }}>
                <ContainerCard>
                    <div className={`${styles["gallery-setting"]} flex justify-content-between align-items-center`}>
                        <h1>Collections</h1>
                        <Dropdown title="All Collections" items={ddItems} liftingDdTextUp={takeDdTitle} />
                    </div>
                    <MasonryLayout images={categoryImage} />
                </ContainerCard>
            </div>
        </>
    )
}

export default Collections