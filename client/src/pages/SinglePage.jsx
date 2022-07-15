import { useEffect, useState } from "react";
import PdfViewerComponent from "../Components/PdfViewer";
import "./SinglePage.module.css";
import { useSelector } from 'react-redux'

function PdfViewer() {
  const { url } = useSelector(store => store.fileList)

  useEffect(() => {
    console.log(url)
  }, [url])
  const handleOpen = () => setDocument("document.pdf");

  return (
    <div className="App">
      <button className="App-button" onClick={handleOpen}>
        Open another document
      </button>
      <div className="App-viewer">
        {url && <PdfViewerComponent document={url} />}
      </div>
    </div>
  );
}

export default PdfViewer;
