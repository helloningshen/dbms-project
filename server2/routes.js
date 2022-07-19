import express from 'express'
import { deleteOne, downloadOne, fetchDocs, saveInfo, uploadDoc } from "./controller/file-controller.js"
import { registerUser, loginUser } from "./controller/auth-controller.js"

const router = express.Router();



router.post("/user/login", loginUser);
router.post("/user/register", registerUser);


router.get("/docs", fetchDocs)
router.post("/info/save", saveInfo);
router.post("/upload", uploadDoc)
router.get("/download/:id", downloadOne)
router.delete("/delete/:id", deleteOne)
export default router;