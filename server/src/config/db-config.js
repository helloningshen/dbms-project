require('dotenv').config();

const mysql = require("mysql")

const dbConfig = () => {

  let connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQLUSERNAME,
    password: process.env.MYSQLPASSWORD,
    database: process.env.DATABASE
  });


  connection.connect((err) => {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

  var sql = `CREATE TABLE IF NOT EXISTS files 
          (id varchar(250) not null, 
          filename varchar(255) not null,
          name VARCHAR(255) not null, 
          author VARCHAR(255),
          semester varchar(50), 
          description varchar(225), 
          type varchar(50), 
          uploadedBy varchar(50), 
          file blob not null,
          file_path varchar(225) not null,
          file_mimetype varchar(225),
          createdDate Date, 
          primary key(id))`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Name:files created!");
  });

  return connection
}
let conn = dbConfig()


module.exports = conn