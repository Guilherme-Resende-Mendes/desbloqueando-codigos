describe('Testes da página Home', () => {
    it('Deve navegar para a página "Relatorios" ao clicar no botão "Relatórios"', () => {
      cy.visit('http://localhost:3000/Home.html');
      cy.get('button').contains('Relatórios').click();
      cy.url().should('include', 'Relatorios.html');
    });
  
    it('Deve navegar para a página "Cadastros" ao clicar no botão "Cadastros"', () => {
      cy.visit('http://localhost:3000/Home.html');
      cy.get('button').contains('Cadastros').click();
      cy.url().should('include', 'Cadastros.html');
    });
  
    it('Deve navegar para a página "gerenciarTecnicos" ao clicar no botão "Tecnicos"', () => {
      cy.visit('http://localhost:3000/Home.html');
      cy.get('button').contains('Tecnicos').click();
      cy.url().should('include', 'gerenciarTecnicos.html');
    });
  
    it('Deve navegar para a página "gerenciarPecas" ao clicar no botão "Pecas"', () => {
      cy.visit('http://localhost:3000/Home.html');
      cy.get('button').contains('Pecas').click();
      cy.url().should('include', 'gerenciarPecas.html');
    });
  
    it('Deve navegar para a página "gerenciarConsertos" ao clicar no botão "Consertos"', () => {
      cy.visit('http://localhost:3000/Home.html');
      cy.get('button').contains('Consertos').click();
      cy.url().should('include', 'gerenciarConsertos.html');
    });
  });