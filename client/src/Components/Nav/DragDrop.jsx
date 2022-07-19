import React from 'react';
import styles from "./DragDrop.module.css"
import { uploadDoc } from '../../features/file-slice';
import { useDispatch, useSelector } from 'react-redux';
import CircularIndeterminate from '../Loading';

const DragDrop = () => {
  const dispatch = useDispatch()

  const { isUploading } = useSelector(store => store.fileList)

  const uploadFile = (e) => {
    dispatch(uploadDoc({ file: e.target.files[0] }))
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <input type="file" onChange={(e) => uploadFile(e)} disabled={isUploading} />
      {isUploading ? <CircularIndeterminate /> : ""}
    </div>
  )
}

export default DragDrop