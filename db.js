const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tenis_local',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306 // Revisar el puerto al encender XAMPP
});

module.exports = pool;