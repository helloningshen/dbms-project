import styles from "./Header.module.css"
import ContainerCard from '../ContainerCard/ContainerCard';
import Nav from "../Nav/Nav"
import BrickLayout from "../BrickLayout/BrickLayout";
import HeaderBoxes from "./HeaderBoxes/HeaderBoxes";
import { SearchNormal1 } from "iconsax-react";
import { Setting4 } from "iconsax-react";
import JsonHeader from '../../Jsons/HeaderBoxes.json';

const Header = () => {
  return (
    <header className={`${styles.header} flex justify-content-center`}>
      <ContainerCard className="flex flex-column">
        <div className={styles["blur-circle-shape"]}></div>
        <Nav />
        <div className={`${styles["headings-header"]} flex justify-content-center flex-column `}>
          <h2 className={styles["heading-header-title"]}>"A word after a word after a word is power." – Margaret Atwood 😎🤘</h2>

        </div>
      </ContainerCard>
    </header>

  )
}

export default Header