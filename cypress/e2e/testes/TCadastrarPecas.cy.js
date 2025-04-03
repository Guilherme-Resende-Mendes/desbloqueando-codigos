describe('Testes para a página de Gerenciar Peças', () => {
    beforeEach(() => {
      // Mock da resposta da API para carregar peças
      cy.intercept('GET', '/pecas', {
        statusCode: 200,
        body: [
          { id: 1, descricao: 'Peça 1', codigo: 'P001', qtdeEstoque: 10, fornecedor: 'Fornecedor A' },
          { id: 2, descricao: 'Peça 2', codigo: 'P002', qtdeEstoque: 20, fornecedor: 'Fornecedor B' },
        ],
      }).as('getPecas');
  
      cy.visit('http://localhost:3000/gerenciarPecas.html');
      cy.wait('@getPecas'); // Espera a requisição ser concluída
    });
  
    it('Deve carregar a página corretamente', () => {
      // Verifica se o título da página está correto
      cy.title().should('eq', 'Gerenciar Peças');
  
      // Verifica se o botão "Voltar para a página anterior" está presente
      cy.contains('button', 'Voltar para a página anterior').should('be.visible');
  
      // Verifica se a lista de peças está presente
      cy.get('#lista-pecas').should('be.visible');
  
      // Verifica se o formulário de atualização de estoque está presente
      cy.get('#atualizar-estoque-form').should('be.visible');
    });
  
    it('Deve atualizar o estoque de uma peça', () => {
      // Mock da resposta da API para atualizar estoque
      cy.intercept('PUT', '/pecas/1/estoque', {
        statusCode: 200,
        body: { message: 'Estoque atualizado com sucesso!' },
      }).as('atualizarEstoque');
    
      // Substitui window.alert por um stub
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
    
      // Define a resposta ao prompt antes de clicar no botão
      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns('15');
      });
    
      // Clica no botão "Atualizar Estoque" da primeira peça
      cy.get('#lista-pecas li').first().contains('button', 'Atualizar Estoque').click();
    
      // Aguarda a requisição e verifica se o alerta foi chamado corretamente
      cy.wait('@atualizarEstoque').then(() => {
        cy.wrap(alertStub).should('be.calledWith', 'Estoque atualizado com sucesso!');
      });
    });    
  
    it('Deve excluir uma peça', () => {
      // Mock da resposta da API para excluir peça
      cy.intercept('DELETE', '/pecas/1', {
        statusCode: 200,
        body: { message: 'Peça excluída com sucesso!' },
      }).as('excluirPeca');
  
      // Substitui window.confirm por um stub
      const confirmStub = cy.stub().returns(true); // Simula o usuário confirmando
      cy.on('window:confirm', confirmStub);
  
      // Clica no botão "Excluir" da primeira peça
      cy.get('#lista-pecas li').first().contains('button', 'Excluir').click();
  
      // Verifica se o confirm foi exibido corretamente
      cy.wait('@excluirPeca').then(() => {
        expect(confirmStub).to.be.calledWith('Tem certeza que deseja excluir a peça com ID 1?');
      });
    });
  });