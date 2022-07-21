import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { downloadOne, fetchDocs, deleteItem } from "../../../../features/file-slice";
import { closeDownloadModal, openDownloadModal } from "../../../../features/modal-slice"

import Modal from "../../modal"
import style from "../../../css/masonry.module.css"

import Button from "@mui/material/Button"
import ClearIcon from '@mui/icons-material/Clear';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import DownloadIcon from '@mui/icons-material/Download';
import { ToastContainer, toast } from 'react-toastify'

const colors = ["#a2d2ff", "#ffafcc", "#f1faee", "#e63946", "#fca311", "#00f5d4", "#011627"]



const Masonry2 = ({ filename, originalFileName, authorName, id, url }) => {
  const dispatch = useDispatch()
  const { downloadModal } = useSelector(store => store.modal)
  const { currentUrl } = useSelector(store => store.fileList)

  const downloadDocument = (id, url) => {
    dispatch(downloadOne({ id, path: url, mimetype: "application/pdf" }))
    dispatch(openDownloadModal())
  }
  const handleCloseModal = () => dispatch(closeDownloadModal())



  const handleDelete = (id) => {
    console.log("handling delete")
    dispatch(deleteItem(id))
    dispatch(fetchDocs())
    toast.success("Successfully deleted")
  }

  return (
    <>
      <ToastContainer />
      <Modal open={downloadModal} btn={"Download File."}>
        <div>
          <a href={currentUrl} target="_blank" onClick={handleCloseModal}>Click to Download: {originalFileName} </a>
        </div>
      </Modal>
      <div className={style["content"]}>
        <div className={style["photos"]}>
          <div className={style["thumbnails"]} style={{ background: colors[Math.floor(Math.random() * 6)] }}>
            <div className={style["black"]}></div>
            <div className={style["title"]}>
              <h1>{filename}</h1>
              <p style={{ marginTop: 8, float: "right", fontStyle: "italic" }}>Author: {authorName}</p>
            </div>
          </div>
        </div>

        <div className={style["feature-btn"]}>
          <Button onClick={() => downloadDocument(id, url)}>
            <DownloadIcon />
          </Button>
          <Link to={`/single/${id}`}>
            <ChromeReaderModeIcon />
          </Link>
          <Button onClick={() => handleDelete(id)}>
            <ClearIcon style={{ color: "red" }} />
          </Button>
        </div>
      </div>
    </>
  )
}



export default Masonry2