describe('Testes para a página de Gerenciar Peças', () => {
  beforeEach(() => {
    // Visita a página antes de cada teste
    cy.visit('http://localhost:3000/gerenciar-pecas.html'); // Substitua pelo caminho correto do seu arquivo HTML

    // Mock da resposta da API para carregar peças
    cy.intercept('GET', '/pecas', {
      statusCode: 200,
      body: [
        { id: 1, descricao: 'Peça 1', codigo: 'P001', qtdeEstoque: 10, fornecedor: 'Fornecedor A' },
        { id: 2, descricao: 'Peça 2', codigo: 'P002', qtdeEstoque: 20, fornecedor: 'Fornecedor B' },
      ],
    }).as('getPecas');
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

  it('Deve carregar a lista de peças corretamente', () => {
    // Verifica se a lista de peças foi preenchida corretamente
    cy.wait('@getPecas');
    cy.get('#lista-pecas li').should('have.length', 2);
    cy.get('#lista-pecas li').first().should('contain', 'Peça 1');
    cy.get('#lista-pecas li').first().should('contain', 'Código: P001');
    cy.get('#lista-pecas li').first().should('contain', 'Quantidade em Estoque: 10');
    cy.get('#lista-pecas li').first().should('contain', 'Fornecedor: Fornecedor A');
  });

  it('Deve atualizar o estoque de uma peça', () => {
    // Mock da resposta da API para atualizar estoque
    cy.intercept('PUT', '/pecas/1/estoque', {
      statusCode: 200,
      body: { message: 'Estoque atualizado com sucesso!' },
    }).as('atualizarEstoque');

    // Clica no botão "Atualizar Estoque" da primeira peça
    cy.get('#lista-pecas li').first().contains('button', 'Atualizar Estoque').click();

    // Preenche o prompt com a nova quantidade
    cy.on('window:prompt', (prompt) => {
      expect(prompt).to.equal('Digite a nova quantidade de estoque:');
      return '15';
    });

    // Verifica se a requisição foi feita corretamente
    cy.wait('@atualizarEstoque').its('request.body').should('deep.equal', { quantidade: 15 });

    // Verifica se a mensagem de sucesso foi exibida
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Estoque atualizado com sucesso!');
    });

    // Verifica se a lista de peças foi recarregada
    cy.wait('@getPecas');
  });

  it('Deve excluir uma peça', () => {
    // Mock da resposta da API para excluir peça
    cy.intercept('DELETE', '/pecas/1', {
      statusCode: 200,
      body: { message: 'Peça excluída com sucesso!' },
    }).as('excluirPeca');

    // Clica no botão "Excluir" da primeira peça
    cy.get('#lista-pecas li').first().contains('button', 'Excluir').click();

    // Confirma a exclusão no alerta
    cy.on('window:confirm', (confirm) => {
      expect(confirm).to.equal('Tem certeza que deseja excluir a peça com ID 1?');
      return true;
    });

    // Verifica se a requisição foi feita corretamente
    cy.wait('@excluirPeca');

    // Verifica se a mensagem de sucesso foi exibida
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Peça excluída com sucesso!');
    });

    // Verifica se a lista de peças foi recarregada
    cy.wait('@getPecas');
  });

  it('Deve atualizar o estoque via formulário', () => {
    // Mock da resposta da API para atualizar estoque
    cy.intercept('PUT', '/pecas/1/estoque', {
      statusCode: 200,
      body: { message: 'Estoque atualizado com sucesso!' },
    }).as('atualizarEstoqueForm');

    // Preenche o formulário de atualização de estoque
    cy.get('#peca-id').type('1');
    cy.get('#quantidade').type('25');
    cy.get('#atualizar-estoque-form').submit();

    // Verifica se a requisição foi feita corretamente
    cy.wait('@atualizarEstoqueForm').its('request.body').should('deep.equal', { quantidade: 25 });

    // Verifica se a mensagem de sucesso foi exibida
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Estoque atualizado com sucesso!');
    });

    // Verifica se a lista de peças foi recarregada
    cy.wait('@getPecas');
  });
});