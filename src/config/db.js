const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),

  connectTimeout: 20000, // ✅ IMPORTANT FIX

  ssl: {
    rejectUnauthorized: false, // ✅ REQUIRED for Railway
  },

  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();