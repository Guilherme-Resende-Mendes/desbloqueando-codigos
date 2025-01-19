// tests/peca.test.js

const { expect } = require('chai');
const Peca = require('../models/Peca');

describe('Modelo Peca', () => {
  it('deve criar uma peça com dados válidos', async () => {
    const peca = await Peca.create({
      descricao: 'Placa mãe',
      codigo: 'PM123',
      qtdeEstoque: 10,
      fornecedor: 'Fornecedor A'
    });
    expect(peca.descricao).to.equal('Placa mãe');
    expect(peca.codigo).to.equal('PM123');
  });

  it('não deve criar uma peça com código duplicado', async () => {
    try {
      await Peca.create({
        descricao: 'Memória RAM',
        codigo: 'PM123', // Código duplicado
        qtdeEstoque: 5,
        fornecedor: 'Fornecedor B'
      });
    } catch (error) {
      expect(error.name).to.equal('SequelizeUniqueConstraintError');
    }
  });

  // ... outros testes para o modelo Peca
});