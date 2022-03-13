const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DBNAME ? process.env.MYSQL_DBNAME : 'code-food-db',
    process.env.MYSQL_USER ? process.env.MYSQL_USER : 'root',
    process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : 'root',
    {
        host: process.env.MYSQL_HOST ? process.env.MYSQL_HOST : 'localhost',
        port: process.env.MYSQL_PORT ? process.env.MYSQL_PORT : '3306',
        dialect: 'mysql',
        timezone: '+07:00',
        define: {
            timestamps: false,
        },
    },
);

module.exports = { sequelize };
