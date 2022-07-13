import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import styles from "./Dropdown.module.css"
import { ArrowUp3 } from "iconsax-react"
import { PropTypes } from 'prop-types';
import Button from "../Button/Button"
import file, { getFiles } from "../../../features/file-slice"

// Dropdown Component
const Dropdown = ({ title, liftingDdTextUp }) => {
  const { files } = useSelector((store) => store.fileList);
  const [ddTitle, setDdTitle] = useState(title)

  const ddItem = (ddId, ev) => {
    const ddTitle = ev.target.innerHTML
    activeDropDownItem(ddId)
    setDdTitle(ddTitle)
    liftingDdTextUp && liftingDdTextUp(ddTitle)
  }

  const activeDropDownItem = (dropdownItemId) => {
    setDdItem(prev => {
      prev.forEach(item => item.active = false)
      const myDd = prev.find(ddId => ddId.id === dropdownItemId)
      myDd.active = true
      return [...prev]
    })
  }

  return (
    <div className={styles["dropdown"]}>
      <Button theme="transparent" className="flex align-items-center">
        {ddTitle}
        <span className={styles["dropdown-arrow-icon"]}>
          <ArrowUp3 color="var(--green-400)" />
        </span>
      </Button>
      <ul className={styles["dropdown-menu"]}>
        {files.map(item => (
          <li
            key={item.id}
            className={`${styles["dropdown-item-menu"]}`}
            onClick={(ev) => ddItem(item.id, ev)}>
            {item.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

// validate dropdown component props
Dropdown.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  liftingDdTextUp: PropTypes.func
}

export default Dropdown