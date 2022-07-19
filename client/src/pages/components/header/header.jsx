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
          <h2 className={styles["heading-header-title"]}>"A word after a word after a word is power." – Margaret Atwood 😎🤘</h2>

        </div>
      </ContainerCard>
    </header>

  )
}

export default Header