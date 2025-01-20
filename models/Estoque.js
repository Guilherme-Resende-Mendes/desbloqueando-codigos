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

// Cria um novo estoque
Estoque.criarEstoque = async function (pecas) {
  try {
    const novoEstoque = await Estoque.create({ pecas });
    return novoEstoque;
  } catch (error) {
    console.error('Erro ao criar estoque:', error);
    throw error;
  }
};

// Lê os dados de um estoque pelo ID
Estoque.lerEstoque = async function (id) {
  try {
    const estoque = await Estoque.findByPk(id);
    if (!estoque) {
      throw new Error('Estoque não encontrado');
    }
    return estoque;
  } catch (error) {
    console.error('Erro ao ler estoque:', error);
    throw error;
  }
};

// Atualiza o estoque com novas peças
Estoque.prototype.atualizarEstoque = async function (novasPecas) {
  try {
    this.pecas = novasPecas;
    await this.save();
  } catch (error) {
    console.error('Erro ao atualizar estoque:', error);
    throw error;
  }
};

// Exclui um estoque pelo ID
Estoque.excluirEstoque = async function (id) {
  try {
    const estoque = await Estoque.findByPk(id);
    if (!estoque) {
      throw new Error('Estoque não encontrado');
    }
    await estoque.destroy();
  } catch (error) {
    console.error('Erro ao excluir estoque:', error);
    throw error;
  }
};

module.exports = Estoque;