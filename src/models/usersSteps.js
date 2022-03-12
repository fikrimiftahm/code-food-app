const { Sequelize } = require('sequelize');
const sequelize = require('../utils/sequelize').sequelize;
const { DataTypes } = Sequelize;
const Users = require('./users');
const Recipes = require('./recipes');
const moment = require('moment');

const UsersSteps = sequelize.define('users_steps', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id',
        },
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Recipes,
            key: 'id',
        },
    },
    status: {
        type: DataTypes.STRING,
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

module.exports = UsersSteps;
