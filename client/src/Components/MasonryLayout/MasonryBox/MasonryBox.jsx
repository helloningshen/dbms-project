// import styles of this component
import styles from "./MasonryBox.module.css"
import { PropTypes } from 'prop-types';
import DownloadIcon from '@mui/icons-material/Download';
import Button from "@mui/material/Button"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { downloadF } from "../../../features/file-slice"
import { downloadOne, fetchOne } from "../../../features/file-slice";


import store from "../../../store"
// MasonryBox component
const MasonryBox = ({ filename, wallSrc, userProf, authorName, type, id, path, mimetype }) => {

  const dispatch = useDispatch()
  const downloadFile = (id, path, mimetype) => {
    dispatch(downloadOne({ id, path, mimetype }))
  }
  const openSingle = (id, path, mimetype) => {
    dispatch(fetchOne({ id, path, mimetype }))
    // window.location.href = "/single"
  }
  return (
    <button onClick={() => openSingle(id, path, mimetype)}>
      <div className={styles["my-masonry"]}>
        <img src={wallSrc} style={{ width: "100%" }} alt="" />
        <div className={`${styles["my-masnry-description"]} flex`}>
          <div className={`${styles["my-masnry-user-box"]} flex align-items-center`}>
            <div className={styles["my-masnry-user-prof"]}>


              <img src={userProf} alt="" />
            </div>
            <div className={`${styles["my-masnry-user-prof-desc"]} flex flex-column`}>
              <h1>{filename}</h1>
              <h1>{authorName}</h1>
              <h3>{type}</h3>
            </div>

            <div style={{ float: "right", color: "red" }}>

              <Button onClick={() => downloadFile(id, path, mimetype)}>
                <DownloadIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

// validate MasonryBox component
MasonryBox.propTypes = {
  wallSrc: PropTypes.string.isRequired,
  userProf: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userJob: PropTypes.string.isRequired,
}

export default MasonryBox