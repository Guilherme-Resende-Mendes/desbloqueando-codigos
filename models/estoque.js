const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estoque = sequelize.define('Estoque', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pecaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Estoque;