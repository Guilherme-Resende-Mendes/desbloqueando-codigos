const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tecnico = sequelize.define('Tecnico', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  especialidades: {
    type: DataTypes.JSON,
    allowNull: true
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  logradouro: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Métodos da classe (instâncias)
Tecnico.prototype.getNome = function() {
  return this.nome;
};

Tecnico.prototype.getCPF = function() {
  return this.cpf;
};

Tecnico.prototype.getID = function() {
  return this.id;
};

Tecnico.prototype.addEspecialidade = function(especialidade) {
  if (this.especialidades) {
    this.especialidades.push(especialidade);
  } else {
    this.especialidades = [especialidade];
  }
  return this.save();
};

Tecnico.prototype.retirarEspecialidade = function(especialidade) {
  if (this.especialidades) {
    this.especialidades = this.especialidades.filter(esp => esp !== especialidade);
  }
  return this.save();
};

Tecnico.prototype.mandarEmail = function() {
  // Implemente a lógica para enviar email aqui
  console.log(`Enviando email para ${this.email}`);
};

Tecnico.prototype.apagarRegistro = function() {
  return this.destroy();
};

// Método estático para criar um novo técnico
Tecnico.criarTecnico = async function(nome, cpf, especialidades, numero, email, logradouro) {
  return await Tecnico.create({ nome, cpf, especialidades, numero, email, logradouro });
};

module.exports = Tecnico;