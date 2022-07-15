const express = require('express')
const crypto = require("crypto");
const multer = require('multer')
const path = require('path')
const { FileOperations } = require("../models/file.model")

const fileRouter = express.Router()





const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    } path
    cb(undefined, true); // continue with upload
  }
});





const createFile = async (req, res) => {
  if (!req.body) res.status(400).send({ err: "Content can not be empty!" });
  try {



    // const { path, mimetype } = req.file;
    // const { filename, name, author, semester, type, description, uploadedBy } = req.body

    // const newFile = {
    //   id: crypto.randomBytes(16).toString("hex"),
    //   filename,
    //   name,
    //   author,
    //   semester,
    //   type,
    //   description,
    //   file: req.file,
    //   uploadedBy,
    //   file_path: path,
    //   file_mimetype: mimetype,
    //   createdDate: new Date(),
    // }

    // FileOperations.insert(newFile, (err, data) => {
    //   if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Tutorial." });
    //   else res.send(data);
    // });

  } catch (error) {
    res.status(400).send('Error while uploading file. Try again later.');
  }
}


const downloadById = (req, res) => {
  console.log("downloading")
  FileOperations.findOne(req.params.id, (err, data) => {
    if (err) {
      console.log(err)
      if (err.kind === "not_found") res.status(404).send({ message: `Not found Tutorial with id ${req.params.id}.` });
      else res.status(500).send({ message: "Error retrieving Tutorial with id " + req.params.id });

    }
    else {
      res.set({
        'Content-Type': data.file_mimetype
      });

      console.log(path.join(__dirname, '..', '..', data.file_path))
      res.sendFile(path.join(__dirname, '..', '..', data.file_path));
    }
  });
}



const getFileById = (req, res) => {
  FileOperations.findOne(req.params.id, (err, data) => {
    if (err)
      if (err.kind === "not_found") res.status(404).send({ message: `Not found Tutorial with id ${req.params.id}.` });
      else res.status(500).send({ message: "Error retrieving Tutorial with id " + req.params.id });
    else res.send(data);
  });
}


const getFiles = (req, res) => {
  console.log("fetching files.")

  FileOperations.findAll((err, data) => {
    data = Object.values(JSON.parse(JSON.stringify(data)))
    if (err) return res.status(500).send({ message: err.message || "Some error occurred while retrieving files." });
    res.status(200).send(data);
  });
}






const updateFile = (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });
  FileOperations.updateById(
    req.params.id, req.body,
    (err, data) => {
      if (err)
        if (err.kind === "not_found") res.status(404).send({ message: `Not found file with id ${req.params.id}.` });
        else res.status(500).send({ message: "Error updating Tutorial with id " + req.params.id });

      else res.send(data);
    }
  );
}

const deleteFile = (req, res) => {
  FileOperations.remove(req.params.id, (err, data) => {
    if (err)
      if (err.kind === "not_found") res.status(404).send({ message: `Not found File with id ${req.params.id}.` });
      else res.status(500).send({ message: "Could not delete Tutorial with id " + req.params.id });
    else res.send({ message: `File was deleted successfully!` });
  });
}

fileRouter.get("/file/download/:id", downloadById)
fileRouter.post("/upload", upload.single("file"), createFile)
fileRouter.get("/get/file/:id", getFileById)
fileRouter.get("/get/files", getFiles)
fileRouter.put("/update/:id", updateFile)
fileRouter.delete("/delete/file/:id", deleteFile)

module.exports = { fileRouter };