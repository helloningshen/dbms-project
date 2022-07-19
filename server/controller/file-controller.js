


import multiparty from 'multiparty';
import fs from 'fs';
import { fileTypeFromBuffer } from 'file-type'
import { uploadFile } from '../aws.config.js';
import { FileModel } from "../models/file-model.js"
import crypto from 'crypto'
import aws from 'aws-sdk'

function uploadDoc(request, response) {
  const form = new multiparty.Form()
  form.parse(request, async (error, fields, files) => {
    if (error) {
      return response.status(500).send(error);
    };
    try {
      const path = files.file[0].path;

      console.log(files.file[0])
      const buffer = fs.readFileSync(path);
      const type = await fileTypeFromBuffer(buffer);
      const fileName = `uploads/${Date.now().toString()}`;
      const data = await uploadFile(buffer, fileName, type);
      data.originalFileName = files.file[0].originalFilename
      return response.status(200).send(data);
    } catch (err) {
      console.log(err)
      return response.status(500).send(err);
    }
  });
}

function saveInfo(request, response) {
  const payload = request.body;
  payload.id = crypto.randomBytes(16).toString("hex");
  FileModel.insert(payload, (err, data) => {
    if (err)
      return response.status(500).send({ message: "Error" });
    else return response.send(data);
  });
}




function fetchDocs(request, response) {
  FileModel.findAll((err, data) => {
    data = Object.values(JSON.parse(JSON.stringify(data)))
    if (err) return response.status(500).send({ message: err.message || "Some error occurred while retrieving files." });
    return response.status(200).send(data);
  });
}


function downloadOne(request, response) {

  FileModel.findOne(request.params.id, async (err, data) => {
    if (err) {
      console.log(err)
      return res.status(404).send({ message: `Not found  with id ${req.params.id}.` });
    }
    else {
      aws.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        signatureVersion: 'v4',
        region: 'ap-south-1',

      });

      const s3 = new aws.S3()
      const myBucket = process.env.S3_BUCKET
      const myKey = data.s3Key;
      const signedUrlExpireSeconds = 60 * 5

      const url = s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds,
      });


      return response.status(200).send({ url })
    }
  });
}



function deleteOne(request, response) {
  FileModel.findOne(request.params.id, async (err, data) => {
    if (err) return response.status(404).send({ msg: "no item found" })


    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      Bucket: process.env.S3_BUCKET,
    });

    s3.deleteObject({ Bucket: process.env.S3_BUCKET, Key: data.s3Key }, (err, data) => {
      console.error(err);
      console.log(data);
    });
  })



  FileModel.deleteOne(request.params.id, async (err, data) => {
    if (err) return response.status(500).send({ msg: "Something went wrong." })
    return response.status(200).send({ msg: "File successfully deleted." })
  })
}
export { uploadDoc, saveInfo, fetchDocs, downloadOne, deleteOne }