import { conn } from "../db-config.js"


const FileModel = function ({ id, name, author, type, semester, desc, uploadedBy, date, url }) {
  this.id = id;
  this.name = name;
  this.author = author;
  this.type = type;
  this.semester = semester;
  this.desc = desc;
  this.uploadedBy = uploadedBy;
  this.createdDate = date;
  this.url = url
}

FileModel.insert = async (newFile, result) => {

  const response = (err, res) => {
    if (err) {
      result(err, null)
      console.log(err)
      return
    }
    result(null, { ...newFile });
  }
  conn.query("INSERT INTO files SET ?", newFile, response);
}

FileModel.findOne = async (id, result) => {
  const response = (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  }
  conn.query(`SELECT * FROM files WHERE id = "${id}"`, response)
}


FileModel.findAll = async (result) => {
  let query = "SELECT * FROM files;";
  const response = (err, res) => {
    if (err) {
      console.log("error: ", err);
      const { FileModel } = require("./file-model")
      result(null, err);
      return;
    }
    result(null, res);
  }
  conn.query(query, response);
}

FileModel.updateById = async (file, result) => {

  const response = (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) return;
    result(null, { ...file });
  }
  conn.query("UPDATE files SET name = ?, author = ?  WHERE id = ?", [file.name, file.author, id], response);
}



FileModel.remove = async (id, result) => {
  const response = (err, res) => {
    if (err) {
      result(null, err);

      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  }
  conn.query("DELETE FROM files WHERE id = ?", id, response)
}


export { FileModel }