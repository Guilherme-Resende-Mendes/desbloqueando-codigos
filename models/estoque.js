const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Peca = require('./Peca');

const Estoque = sequelize.define('Estoque', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pecas: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

module.exports = Estoque;