const path = require('path');
const express = require('express');
const multer = require('multer');

const { FileOperations } = require("../models/file.model")
const testRouter = express.Router();

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
        fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
            return cb(
                new Error(
                    'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
                )
            );
        }
        cb(undefined, true); // continue with upload
    }
});

testRouter.post(
    '/uploads',
    upload.single('file'),
    async (req, res) => {

        console.log("hit")
        try {
            const { name, author, description } = req.body;
            const { path, mimetype } = req.file;


            console.log(req.file)
            // const file = {
            //     id: crypto.randomBytes(16).toString("hex"),
            //     name,
            //     author,
            //     description,
            //     file_path: path,
            //     file_mimetype: mimetype
            // }


            // FileOperations.insert(file, (err, data) => {
            //     if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Tutorial." });
            //     else res.send(data);
            // });


        } catch (error) {
            res.status(400).send('Error while uploading file. Try again later.');
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
);

testRouter.get('/getAllFiles', async (req, res) => {
    try {
        const files = await File.find({});
        const sortedByCreationDate = files.sort(
            (a, b) => b.createdAt - a.createdAt
        );
        res.send(sortedByCreationDate);
    } catch (error) {
        res.status(400).send('Error while getting list of files. Try again later.');
    }
});

testRouter.get('/download/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        res.set({
            'Content-Type': file.file_mimetype
        });
        res.sendFile(path.join(__dirname, '..', file.file_path));
    } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
    }
});

module.exports = { testRouter };
