const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DBNAME,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        timezone: '+07:00',
        define: {
            timestamps: false,
        },
    },
);

module.exports = { sequelize };
