const mysql = require("mysql2/promise");
const dbsecret = require("../config/bithi_db.json");

const pool = mysql.createPool(dbsecret);

module.exports = pool;