import dotenv from "dotenv";
import mariadb from 'mariadb';
dotenv.config();

const conn = mariadb.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
});

module.exports.conn = conn;