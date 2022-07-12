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


  var sql = `CREATE TABLE IF NOT EXISTS files (id varchar(250) not null, name VARCHAR(255), author VARCHAR(255), primary key(id))`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Name:files created!");
  });

  return connection
}


let conn = dbConfig()


module.exports = conn