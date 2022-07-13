const express = require('express')
const crypto = require("crypto");


const { FileOperations } = require("../models/file.model")

const fileRouter = express.Router()


const createFile = async (req, res) => {
  if (!req.body) res.status(400).send({ err: "Content can not be empty!" });

  const { filename, name, author, semester, type, description, uploadedBy } = req.body


  const newFile = {
    id: crypto.randomBytes(16).toString("hex"),
    filename,
    name,
    author,
    semester,
    type,
    description,
    file: req.files.file,
    uploadedBy,
    createdDate: new Date(),
  }

  FileOperations.insert(newFile, (err, data) => {
    if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Tutorial." });
    else res.send(data);
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

const getFilesByTagName = () => { }

fileRouter.post("/create/file", createFile)
fileRouter.get("/get/file/:id", getFileById)
fileRouter.get("/get/files", getFiles)
fileRouter.put("/update/:id", updateFile)
fileRouter.delete("/delete/file/:id", deleteFile)
// fileRouter.findByTag("/get/file/:tagname/all", getFilesByTagName)


module.exports = { fileRouter };