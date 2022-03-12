const mySql = require('mysql2');

const mySqlCon = mySql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0,
    multipleStatements: true,
});

module.exports = { mySqlCon };
