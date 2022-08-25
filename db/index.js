// Use the MariaDB Node.js Connector
const mariadb = require('mariadb');
require('dotenv').config();

// Create a connection pool
const pool = mariadb.createPool({
        host: 'localhost',
        port: 3306,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
});


// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
    pool: pool
});