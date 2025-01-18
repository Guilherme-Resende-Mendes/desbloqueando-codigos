const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estoque = sequelize.define('Estoque', {
  estoque: { type: DataTypes.JSON, allowNull: true },
});

module.exports = Estoque;