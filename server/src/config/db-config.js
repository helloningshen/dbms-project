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

  return connection
}


let conn = dbConfig()


module.exports = conn