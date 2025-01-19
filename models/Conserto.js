const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tecnico = require('./Tecnico');

const Conserto = sequelize.define('Conserto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numeroOS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  protocolo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nomeCliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefoneCliente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  equipamentoUtilizado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricaoProblema: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pendente"
  }
});

// Associação com Técnico
Conserto.belongsTo(Tecnico, { as: "responsavel" });

module.exports = Conserto;