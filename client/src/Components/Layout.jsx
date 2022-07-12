import React from 'react';
import styles from "./Layout.module.css"

const MainLayout = ({ children }) => {
    return (
        <div className={styles["container"]}>
            {children}
        </div>
    )
}

export default MainLayout;