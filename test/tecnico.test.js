// tests/tecnico.test.js

const { expect } = require('chai');
const Tecnico = require('../models/Tecnico');

describe('Modelo Tecnico', () => {
  it('deve criar um técnico com dados válidos', async () => {
    const tecnico = await Tecnico.create({
      nome: 'Fulano de Tal',
      cpf: '12345678901',
      especialidades: ['eletrônica', 'informática'],
      numero: '987654321',
      email: 'fulano@email.com',
      logradouro: 'Rua Teste, 123'
    });
    expect(tecnico.nome).to.equal('Fulano de Tal');
    expect(tecnico.cpf).to.equal('12345678901');
  });

  it('não deve criar um técnico com CPF duplicado', async () => {
    try {
      await Tecnico.create({
        nome: 'Ciclano de Tal',
        cpf: '12345678901', // CPF duplicado
        especialidades: ['mecânica'],
        numero: '123456789',
        email: 'ciclano@email.com',
        logradouro: 'Rua Teste, 456'
      });
    } catch (error) {
      expect(error.name).to.equal('SequelizeUniqueConstraintError');
    }
  });

  // ... outros testes para o modelo Tecnico
});