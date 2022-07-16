// import styles of this component
import styles from "./MasonryBox.module.css"
import { PropTypes } from 'prop-types';
import { Link } from "react-router-dom"
import DownloadIcon from '@mui/icons-material/Download';
import Button from "@mui/material/Button"

import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import { useDispatch, useSelector } from "react-redux"
import { downloadOne, fetchOne } from "../../../features/file-slice";
import { closeDownloadModal, openDownloadModal } from "../../../features/modal-slice"
import Modal from "../../Modal"
const MasonryBox = ({ filename, wallSrc, userProf, authorName, type, id, url }) => {
  const { downloadModal } = useSelector(store => store.modal)
  const { currentUrl } = useSelector(store => store.fileList)
  const dispatch = useDispatch()


  const downloadDocument = (id, url) => {
    dispatch(downloadOne({ id, path: url, mimetype: "application/pdf" }))
    dispatch(openDownloadModal())
  }




  const handleCloseModal = () => dispatch(closeDownloadModal())

  return (
    <>
      <Modal open={downloadModal} btn={"Download File."}>
        <div>
          <a href={currentUrl} target="_blank" onClick={handleCloseModal}>Download Your file</a>
        </div>
      </Modal>
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
              <Button onClick={() => downloadDocument(id, url)}>
                <DownloadIcon />
              </Button>
            </div>

            <div style={{ float: "right", color: "white" }}>
              <Link to={`/single/${id}`}>
                <ChromeReaderModeIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
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