import React from 'react';
import styles from "./DragDrop.module.css"
import { uploadDoc } from '../../features/file-slice';
import { useDispatch } from 'react-redux';

const DragDrop = () => {
  const dispatch = useDispatch()

  const uploadFile = (e) => {
    dispatch(uploadDoc({ file: e.target.files[0] }))
  }

  return (
    <input type="file" onChange={(e) => uploadFile(e)} />

  )
}

export default DragDrop