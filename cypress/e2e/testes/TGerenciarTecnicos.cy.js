/// <reference types="cypress" />

describe('Página de Gerenciamento de Técnicos', () => {
  const mockTecnicos = [
    {
      id: 1,
      nome: 'João Silva',
      cpf: '123.456.789-00',
      especialidades: ['Elétrica', 'Hidráulica']
    },
    {
      id: 2,
      nome: 'Maria Souza',
      cpf: '987.654.321-00',
      especialidades: ['Ar Condicionado']
    }
  ];

  beforeEach(() => {
    cy.intercept('GET', '/tecnicos', mockTecnicos).as('getTecnicos');
    cy.visit('views/gerenciarTecnicos.html');
  });

  it('deve carregar a página corretamente', () => {
    cy.title().should('eq', 'Gerenciar Técnicos');
    cy.get('h1').should('contain', 'Gerenciar Técnicos');
    cy.get('#lista-tecnicos').should('exist');
  });

  it('deve exibir a lista de técnicos corretamente', () => {
    cy.get('#lista-tecnicos li').should('have.length', mockTecnicos.length);
    
    cy.get('#lista-tecnicos li').first().should('contain', 'João Silva');
    cy.get('#lista-tecnicos li').first().should('contain', '123.456.789-00');
    cy.get('#lista-tecnicos li').first().should('contain', 'Elétrica, Hidráulica');
    
    cy.get('#lista-tecnicos li').eq(1).should('contain', 'Maria Souza');
    cy.get('#lista-tecnicos li').eq(1).should('contain', 'Ar Condicionado');
  });

  it('deve atualizar especialidades de um técnico', () => {
    const novasEspecialidades = 'Ar Condicionado, Refrigeração';
    
    cy.intercept('PUT', '/tecnicos/1/especialidades', {
      statusCode: 200,
      body: { message: 'Especialidades atualizadas' }
    }).as('updateEspecialidades');

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(novasEspecialidades);
      cy.stub(win, 'alert').as('alert');
    });

    cy.get('#lista-tecnicos li').first()
      .contains('button', 'Atualizar Especialidades').click();

    cy.get('@alert').should('be.calledWith', 'Especialidades atualizadas com sucesso!');
    cy.wait('@updateEspecialidades').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        especialidades: ['Ar Condicionado', 'Refrigeração']
      });
    });
  });

  it('deve excluir um técnico', () => {
    cy.intercept('DELETE', '/tecnicos/2', {
      statusCode: 200,
      body: { message: 'Técnico excluído' }
    }).as('deleteTecnico');

    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
      cy.stub(win, 'alert').as('alert');
    });

    cy.get('#lista-tecnicos li').eq(1)
      .contains('button', 'Excluir').click();

    cy.get('@alert').should('be.calledWith', 'Técnico excluído com sucesso!');
    cy.wait('@deleteTecnico');
  });

  it('deve lidar com erro ao carregar técnicos', () => {
    cy.intercept('GET', '/tecnicos', {
      statusCode: 500,
      body: { error: 'Erro no servidor' }
    });

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });

    cy.reload();
    cy.get('@alert').should('be.calledWith', 'Erro ao carregar técnicos: Error: Erro ao listar técnicos: Internal Server Error');
  });
});