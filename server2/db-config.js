import mysql from 'mysql2'
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
          name VARCHAR(255) not null, 
          originalFileName varchar(225) not null,
          author VARCHAR(255),
          url varchar(225) not null,
          s3Key varchar(225) not null,
          primary key(id))`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table Name:files created!");
  });

  return connection
}
let conn = dbConfig()

export { conn }