const { Sequelize } = require('sequelize');
const sequelize = require('../utils/sequelize').sequelize;
const { DataTypes } = Sequelize;
const Recipes = require('./recipes');
const moment = require('moment');

const Ingredients = sequelize.define('ingredients', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Recipes,
            key: 'id',
        },
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
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

module.exports = Ingredients;
