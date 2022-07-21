import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { downloadOne } from "../features/file-slice";
import { useNavigate } from 'react-router-dom'
import PdfViewerComponent from "./components/pdf-viewer";
import styles from "./css/single-page.module.css";


function PdfViewer() {
  const { currentUrl } = useSelector(store => store.fileList)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    const id = window.location.pathname.split("/")[2]
    dispatch(downloadOne({ id }))
  }, [currentUrl])



  return (
    <div className={styles["App"]}>
      <button className={styles["App-button"]} onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className={styles["App-viewer"]}>
        {currentUrl && <PdfViewerComponent document={currentUrl} />}
      </div>
    </div>
  );
}

export default PdfViewer;
