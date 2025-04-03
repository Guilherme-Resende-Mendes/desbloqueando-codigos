describe('Testes para a página de Gerenciar Consertos', () => {
  beforeEach(() => {
    // Mock da resposta da API para carregar consertos
    cy.intercept('GET', '/consertos', {
      statusCode: 200,
      body: [
        {
          id: 1,
          numeroOS: '123',
          nomeCliente: 'Cliente A',
          equipamentoUtilizado: 'Equipamento 1',
          status: 'Pendente',
          responsavel: { nome: 'Técnico 1' },
        },
        {
          id: 2,
          numeroOS: '456',
          nomeCliente: 'Cliente B',
          equipamentoUtilizado: 'Equipamento 2',
          status: 'Em Andamento',
          responsavel: null,
        },
      ],
    }).as('getConsertos');

    // Visita a página antes de cada teste
    cy.visit('http://localhost:3000/gerenciarConsertos.html');
    cy.wait('@getConsertos'); // Espera a requisição ser concluída
  });

  it('Deve carregar a página corretamente', () => {
    // Verifica se o título da página está correto
    cy.title().should('eq', 'Gerenciar Consertos');

    // Verifica se o botão "Voltar para a página anterior" está presente
    cy.contains('button', 'Voltar para a página anterior').should('be.visible');

    // Verifica se a lista de consertos está presente
    cy.get('#lista-consertos').should('be.visible');
  });

  it('Deve carregar a lista de consertos corretamente', () => {
    // Verifica se a lista de consertos foi preenchida corretamente
    cy.get('#lista-consertos li').should('have.length', 2);

    // Verifica os detalhes do primeiro conserto
    cy.get('#lista-consertos li')
      .first()
      .should('contain', 'OS nº 123')
      .and('contain', 'Cliente: Cliente A')
      .and('contain', 'Equipamento: Equipamento 1')
      .and('contain', 'Status: Pendente')
      .and('contain', 'Responsável: Técnico 1');

    // Verifica os detalhes do segundo conserto
    cy.get('#lista-consertos li')
      .eq(1)
      .should('contain', 'OS nº 456')
      .and('contain', 'Cliente: Cliente B')
      .and('contain', 'Equipamento: Equipamento 2')
      .and('contain', 'Status: Em Andamento')
      .and('contain', 'Responsável: Não atribuído');
  });

  it('Deve atualizar o status de um conserto', () => {
    // Mock da resposta da API para atualizar status
    cy.intercept('PUT', '/consertos/1/status', {
      statusCode: 200,
      body: { message: 'Status atualizado com sucesso!' },
    }).as('atualizarStatus');

    // Substitui window.prompt por um stub
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Concluído');
    });

    // Substitui window.alert por um stub
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    // Clica no botão "Atualizar Status" do primeiro conserto
    cy.get('#lista-consertos li').first().contains('button', 'Atualizar Status').click();

    // Verifica se a requisição foi feita corretamente
    cy.wait('@atualizarStatus').then((interception) => {
      expect(interception.request.body).to.deep.equal({ novoStatus: 'Concluído' });
    });

    // Verifica se o alerta foi exibido corretamente
    cy.wrap(alertStub).should('be.calledWith', 'Status atualizado com sucesso!');
  });

  it('Deve excluir um conserto', () => {
    // Mock da resposta da API para excluir conserto
    cy.intercept('DELETE', '/consertos/1', {
      statusCode: 200,
      body: { message: 'Conserto excluído com sucesso!' },
    }).as('excluirConserto');

    // Substitui window.confirm por um stub
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
    });

    // Substitui window.alert por um stub
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    // Clica no botão "Excluir" do primeiro conserto
    cy.get('#lista-consertos li').first().contains('button', 'Excluir').click();

    // Verifica se a requisição foi feita corretamente
    cy.wait('@excluirConserto');

    // Verifica se o alerta foi exibido corretamente
    cy.wrap(alertStub).should('be.calledWith', 'Conserto excluído com sucesso!');
  });
});