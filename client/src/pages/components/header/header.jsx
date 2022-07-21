import styles from "../../css/header.module.css"
import ContainerCard from '../container-card/container-card';
import Nav from "../nav/nav"


const Header = () => {
  return (
    <header className={`${styles.header} flex justify-content-center`}>
      <ContainerCard className="flex flex-column">
        <div className={styles["blur-circle-shape"]}></div>
        <Nav />
        <div className={`${styles["headings-header"]} flex justify-content-center flex-column `}>

        </div>
      </ContainerCard>
    </header>

  )
}

export default Header