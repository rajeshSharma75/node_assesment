
  const {DB_HOST, DB_USER_NAME, DB_PASSWORD, DB_NAME} = process.env;
  const mysql = require("mysql");

  const connPool = mysql.createPool({
    host     : DB_HOST,
    user     : DB_USER_NAME,
    password : DB_PASSWORD,
    database : DB_NAME,
  })

  module.exports = connPool;