const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Peca = sequelize.define('Peca', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  qtdeEstoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fornecedor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Peca;
