import React from 'react';
import styles from "../../css/upload.module.css"

const UploadFile = () => {
  return (
    <div id="uploadArea" className={styles["upload-area"]}>
      <div className={styles["upload-area__header"]}>
        <h1 className={styles["upload-area__title"]}>Upload your file</h1>
        <p className={styles["upload-area__paragraph"]}>
          File should be an image
          <strong className={styles["upload-area__tooltip"]}>
            Like
            <span className={styles["upload-area__tooltip-data"]}></span>
          </strong>
        </p>
      </div>

      <div id="dropZoon" className={`${styles["upload-area__drop-zoon"]} ${styles["drop-zoon"]}`}>
        <span className={styles["drop-zoon__icon"]}>
          <i className={`${styles['bx']} ${styles["bxs-file-image"]}`} ></i>
        </span>
        <p className={styles["drop-zoon__paragraph"]}>Drop your file here or Click to browse</p>
        <span id="loadingText" className={styles["drop-zoon__loading-text"]}>Please Wait</span>
        <img src="" alt="Preview Image" id="previewImage" className={styles["drop-zoon__preview-image"]} draggable="false" />
        <input type="file" id="fileInput" className={styles["drop-zoon__file-input"]} accept="image/*" />
      </div>

      <div id="fileDetails" className={`${styles["upload-area__file-details"]} ${styles["file-details"]}`}>
        <h3 className={styles["file-details__title"]}>Uploaded File</h3>

        <div id="uploadedFile" className={styles["uploaded-file"]}>
          <div className={styles["uploaded-file__icon-container"]}>
            <i className={` ${styles['bx']} ${styles["bxs-file-blank uploaded-file__icon"]}`}></i>
            <span className={styles["uploaded-file__icon-text"]}></span>
          </div>

          <div id="uploadedFileInfo" className={styles["uploaded-file__info"]}>
            <span className={styles["uploaded-file__name"]}>Proejct 1</span>
            <span className={styles["uploaded-file__counter"]}>0%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadFile