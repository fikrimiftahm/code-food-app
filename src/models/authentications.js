const { Sequelize } = require('sequelize');
const sequelize = require('../utils/sequelize').sequelize;
const { DataTypes } = Sequelize;

const Authentications = sequelize.define('authentications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
}, {
    freezeTableName: true,
});

module.exports = Authentications;
