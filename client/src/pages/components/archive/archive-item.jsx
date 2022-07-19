import React from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import Modal from "../modal"

import { useDispatch, useSelector } from "react-redux"
import { downloadOne } from "../../../features/file-slice";
import { closeDownloadModal, openDownloadModal } from "../../../features/modal-slice"




const Item = ({ item }) => {

  const dispatch = useDispatch()
  const { downloadModal } = useSelector(store => store.modal)
  const { currentUrl } = useSelector(store => store.fileList)

  const handleCloseModal = () => dispatch(closeDownloadModal())
  const { id, url } = item;


  const downloadDocument = (id, url) => {
    dispatch(downloadOne({ id, path: url, mimetype: "application/pdf" }))
    dispatch(openDownloadModal())
  }

  return (
    <React.Fragment>
      <Modal open={downloadModal} btn={"Download File."}>
        <div>
          <a href={currentUrl} target="_blank" onClick={handleCloseModal}>Download Your file</a>
        </div>
      </Modal>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 24, padding: 12, background: "#90e0ef" }}>
        <a>  &rarr; {item.name.toUpperCase()}</a>
        <p style={{ fontStyle: "italic", color: "#e36414" }}>Author: {item.author}</p>
        <button onClick={() => downloadDocument(id, url)}>
          <DownloadIcon style={{ color: "blue", fontSize: "24" }} />
        </button>
      </div >
    </React.Fragment>)
}

export default Item