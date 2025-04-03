describe('Testes da página de Login', () => {
  it('Deve fazer login com sucesso', () => {
    cy.visit('Login.html');
    cy.get('#usuario').type('admin');
    cy.get('#senha').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'Home.html');
  });

  it('Deve exibir mensagem de erro ao inserir credenciais inválidas', () => {
    cy.visit('Login.html');
    cy.get('#usuario').type('usuarioInvalido');
    cy.get('#senha').type('senhaIncorreta');
    cy.get('button[type="submit"]').click();
    cy.get('#error-message').should('be.visible');
  });
});