const { Sequelize } = require('sequelize');
const sequelize = require('../utils/sequelize').sequelize;
const { DataTypes } = Sequelize;
const Categories = require('./categories');
const RecipesReactions = require('./recipesReactions');
const moment = require('moment');

const Recipes = sequelize.define('recipes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categories,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
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

Recipes.associate = (models) => {
    Recipes.belongsTo(Categories, { as: 'recipeCategory', targetKey: 'id', foreignKey: 'category_id' });
    Recipes.hasMany(RecipesReactions);
};

module.exports = Recipes;
