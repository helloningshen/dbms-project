const conn = require("../config/db-config")

const FileOperations = function ({ id, filename, name, author, type, semester, desc, file, uploadedBy, date }) {
  this.id = id;
  this.filename = filename
  this.name = name;
  this.author = author;
  this.type = type;
  this.semester = semester;
  this.desc = desc;
  this.file = file;
  this.uploadedBy = uploadedBy;
  this.createdDate = date;
}

FileOperations.insert = async (newFile, result) => {

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

FileOperations.findOne = async (id, result) => {
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
  conn.query(`SELECT * FROM files WHERE id = ${id}`, response)
}


FileOperations.findAll = async (result) => {
  let query = "SELECT * FROM files;";
  const response = (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  }
  conn.query(query, response);
}

FileOperations.updateById = async (file, result) => {

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



FileOperations.remove = async (id, result) => {
  const response = (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  }
  conn.query("DELETE FROM files WHERE id = ?", id, response)
}


module.exports = { FileOperations }