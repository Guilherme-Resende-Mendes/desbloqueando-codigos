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

// Método estático para criar uma nova peça
Peca.criarPeca = async function (descricao, codigo, qtdeEstoque, fornecedor) {
  return await Peca.create({ descricao, codigo, qtdeEstoque, fornecedor });
};

// Métodos de instância
Peca.prototype.getDescricao = function () {
  return this.descricao;
};

Peca.prototype.getCodigo = function () {
  return this.codigo;
};

Peca.prototype.adicionarPeca = function (qtde) {
  this.qtdeEstoque += qtde;
  return this.save();
};

Peca.prototype.retirarPeca = function (qtde) {
  if (this.qtdeEstoque >= qtde) {
    this.qtdeEstoque -= qtde;
    return this.save();
  } else {
    throw new Error('Quantidade insuficiente em estoque');
  }
};

Peca.prototype.apagarPeca = function () {
  return this.destroy();
};

module.exports = Peca;