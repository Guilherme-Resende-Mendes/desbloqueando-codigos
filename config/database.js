const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Nome do arquivo do banco de dados (desenvolvimento)
  logging: false // Desativa os logs SQL no console (opcional)
});

module.exports = sequelize;