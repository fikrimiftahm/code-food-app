const { Sequelize } = require('sequelize');
const sequelize = require('../utils/sequelize').sequelize;
const { DataTypes } = Sequelize;
const moment = require('moment');

const LoginAttempts = sequelize.define('login_attempts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: moment(),
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: moment(),
        onUpdated: moment(),
        field: 'updated_at',
    },
}, {
    freezeTableName: true,
});

module.exports = LoginAttempts;
