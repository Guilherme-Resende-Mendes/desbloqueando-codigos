const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tecnico = sequelize.define('Tecnico', {
  nome: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, unique: true, allowNull: false },
  especialidades: { type: DataTypes.JSON, allowNull: true },
  numero: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  logradouro: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Tecnico;