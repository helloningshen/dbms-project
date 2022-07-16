import express from 'express'
import { downloadOne, fetchDocs, saveInfo, uploadDoc } from "./controller/file-controller.js"


const router = express.Router();


router.get("/docs", fetchDocs)
router.post("/info/save", saveInfo);
router.post("/upload", uploadDoc)
router.get("/download/:id", downloadOne)

export default router;