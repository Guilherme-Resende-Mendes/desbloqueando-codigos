// tests/conserto.test.js

const { expect } = require('chai');
const Conserto = require('../models/Conserto');
const Tecnico = require('../models/Tecnico');

describe('Modelo Conserto', () => {
  let tecnico;

  before(async () => {
    tecnico = await Tecnico.create({
      nome: 'Fulano de Tal',
      cpf: '12345678901',
      especialidades: ['eletrônica'],
      numero: '987654321',
      email: 'fulano@email.com',
      logradouro: 'Rua Teste, 123'
    });
  });

  it('deve criar um conserto com dados válidos', async () => {
    const conserto = await Conserto.create({
      numeroOS: 1,
      protocolo: 'PROT123',
      nomeCliente: 'Cliente A',
      telefoneCliente: '987654321',
      equipamentoUtilizado: 'Notebook',
      descricaoProblema: 'Tela quebrada',
      responsavelId: tecnico.id
    });
    expect(conserto.numeroOS).to.equal(1);
    expect(conserto.nomeCliente).to.equal('Cliente A');
  });

  // ... outros testes para o modelo Conserto
});