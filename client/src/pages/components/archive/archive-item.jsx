import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DownloadIcon from '@mui/icons-material/Download';
import Button from "@mui/material/Button"
import ClearIcon from '@mui/icons-material/Clear';

import Modal from "../modal"
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux"
import { downloadOne, deleteItem, fetchDocs } from "../../../features/file-slice";
import { closeDownloadModal, openDownloadModal } from "../../../features/modal-slice"

import { ToastContainer, toast } from "react-toastify"


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

  const [auth, setAuth] = useState();
  useEffect(() => {
    let u = localStorage.getItem("user")
    if (u === "undefined" || u === null) return;
    u = JSON.parse(u);
    if (u.accessToken) setAuth(true)
  }, [])



  const handleDelete = (id) => {
    dispatch(deleteItem(id))
    dispatch(fetchDocs())
    toast.success("Successfully deleted")
    location.reload()
  }


  useEffect(() => {
    console.log(item, item.bookType)
  }, [])
  return (
    <React.Fragment>
      <ToastContainer />
      <Modal open={downloadModal} btn={"Download File."}>
        <div>
          <a href={currentUrl} target="_blank" onClick={handleCloseModal}>Download Your file</a>
        </div>
      </Modal>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 24, padding: 12, background: "#90e0ef" }}>
        <a>  &rarr; {item.name.toUpperCase()}</a>
        <p style={{ fontStyle: "italic", color: "#e36414" }}>Author: {item.author}</p>

        <div style={{ display: "flex", justifyContent: "right" }}>
          <button style={{ background: "none", marginTop: 10 }} onClick={() => downloadDocument(id, url)}>
            <DownloadIcon style={{ color: "purple", fontSize: "24" }} />
          </button>
          <Link style={{ marginLeft: 10, marginTop: 8 }} to={`/single/${id}`}>
            <ChromeReaderModeIcon />
          </Link>
          {
            auth &&
            <Button onClick={() => handleDelete(id)}>
              <DeleteIcon style={{ color: "red" }} />
            </Button>
          }
        </div>
      </div >
    </React.Fragment>)
}

export default Item