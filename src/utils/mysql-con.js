const mySql = require('mysql2');

const mySqlCon = mySql.createPool({
    host: process.env.MYSQL_HOST ? process.env.MYSQL_HOST : 'localhost',
    port: process.env.MYSQL_PORT ? process.env.MYSQL_PORT : '3306',
    user: process.env.MYSQL_USER ? process.env.MYSQL_USER : 'root',
    password: process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : 'root',
    database: process.env.MYSQL_DBNAME ? process.env.MYSQL_DBNAME : 'code-food-db',
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0,
    multipleStatements: true,
});

module.exports = { mySqlCon };
