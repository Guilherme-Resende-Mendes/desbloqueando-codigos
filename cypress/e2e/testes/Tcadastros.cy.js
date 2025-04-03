describe('Testes da página Cadastros', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Cadastros.html');
  });

  it('Deve redirecionar para a página "Home" ao clicar no botão "Voltar para a página anterior"', () => {
    cy.get('button').contains('Voltar para a página anterior').click();
    cy.url().should('include', 'Home.html');
  });

  describe('Formulário de Cadastro de Técnico', () => {
    it('Deve cadastrar um técnico com sucesso', () => {
      cy.intercept('POST', '/tecnicos', {
        statusCode: 201,
        body: {
          id: 1,
          nome: 'Novo Técnico',
          cpf: '123.456.789-00',
          especialidades: ['Especialidade 1', 'Especialidade 2'],
          numero: '1234-5678',
          email: 'novo.tecnico@email.com',
          logradouro: 'Rua Teste, 123'
        }
      }).as('cadastrarTecnico');

      cy.get('#nome').type('Novo Técnico');
      cy.get('#cpf').type('123.456.789-00');
      cy.get('#especialidades').type('Especialidade 1, Especialidade 2');
      cy.get('#numero').type('1234-5678');
      cy.get('#email').type('novo.tecnico@email.com');
      cy.get('#logradouro').type('Rua Teste, 123');
      cy.get('#form-tecnico button[type="submit"]').click();

      cy.wait('@cadastrarTecnico').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
      });
    });
  });

  describe('Formulário de Cadastro de Peça', () => {
    it('Deve cadastrar uma peça com sucesso', () => {
      cy.intercept('POST', '/pecas', {
        statusCode: 201,
        body: {
          id: 1,
          descricao: 'Nova Peça',
          codigo: '12345',
          qtdeEstoque: 10,
          fornecedor: 'Fornecedor Teste'
        }
      }).as('cadastrarPeca');

      cy.get('#descricao').type('Nova Peça');
      cy.get('#codigo').type('12345');
      cy.get('#qtdeEstoque').type('10');
      cy.get('#fornecedor').type('Fornecedor Teste');
      cy.get('#form-peca button[type="submit"]').click();

      cy.wait('@cadastrarPeca').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
      });
    });

  });

  describe('Formulário de Cadastro de Conserto', () => {
    it('Deve cadastrar um conserto com sucesso', () => {
      cy.intercept('POST', '/consertos', {
        statusCode: 201,
        body: {
          id: 1,
          numeroOS: 123,
          protocolo: 'ABC-123',
          nomeCliente: 'Cliente Teste',
          telefoneCliente: '98765-4321',
          equipamentoUtilizado: 'Equipamento Teste',
          descricaoProblema: 'Problema Teste',
          responsavelId: 1
        }
      }).as('cadastrarConserto');

      cy.get('#numeroOS').type('123');
      cy.get('#protocolo').type('ABC-123');
      cy.get('#nomeCliente').type('Cliente Teste');
      cy.get('#telefoneCliente').type('98765-4321');
      cy.get('#equipamentoUtilizado').type('Equipamento Teste');
      cy.get('#descricaoProblema').type('Problema Teste');
      cy.get('#responsavelId').select('Novo Técnico 10'); // Selecionar um técnico
      cy.get('#form-conserto button[type="submit"]').click();

      cy.wait('@cadastrarConserto').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
      });
    });
  });
});