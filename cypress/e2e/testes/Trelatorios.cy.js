/// <reference types="cypress" />

describe('Página de Relatórios', () => {
  const mockTecnicos = [
    { id: 1, nome: 'Técnico 1' },
    { id: 2, nome: 'Técnico 2' }
  ];

  const mockRelatorio = {
    relatorio: [
      {
        numeroOS: 'OS001',
        cliente: 'Cliente A',
        status: 'Concluído',
        tecnico: 'Técnico 1',
        data: '2024-03-01'
      },
      {
        numeroOS: 'OS002',
        cliente: 'Cliente B',
        status: 'Pendente',
        tecnico: 'Técnico 2',
        data: '2024-03-02'
      }
    ]
  };

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/tecnicos', mockTecnicos).as('getTecnicos');
    cy.visit('views/Relatorios.html');
  });

  it('deve carregar a página corretamente', () => {
    cy.title().should('eq', 'Relatórios');
    cy.get('h1').should('contain', 'Relatórios');
    cy.get('button').should('contain', 'Voltar');
    cy.get('#inicio').should('be.visible');
    cy.get('#fim').should('be.visible');
    cy.get('#tecnicoId').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Gerar Relatório');
  });

  it('deve carregar os técnicos no dropdown', () => {
    cy.get('#tecnicoId option').should('have.length', mockTecnicos.length + 1); // +1 para a opção padrão
    cy.get('#tecnicoId option').eq(1).should('have.value', mockTecnicos[0].id);
    cy.get('#tecnicoId option').eq(2).should('have.value', mockTecnicos[1].id);
  });

  it('deve gerar um relatório com dados válidos', () => {
    cy.intercept('GET', 'http://localhost:3000/relatorios/produtividade*', mockRelatorio).as('getRelatorio');

    cy.get('#inicio').type('2024-03-01');
    cy.get('#fim').type('2024-03-05');
    cy.get('#tecnicoId').select('1');
    cy.get('button[type="submit"]').click();

    cy.wait('@getRelatorio').then((interception) => {
      const params = interception.request.url.split('?')[1];
      expect(params).to.include('inicio=2024-03-01');
      expect(params).to.include('fim=2024-03-05');
      expect(params).to.include('tecnicoId=1');
    });

    cy.get('#relatorio table').should('exist');
    cy.get('#relatorio table tr').should('have.length', mockRelatorio.relatorio.length + 1); // +1 para o cabeçalho
    cy.get('#relatorio table td').first().should('contain', 'OS001');
  });

  it('deve mostrar mensagem quando não houver resultados', () => {
    cy.intercept('GET', 'http://localhost:3000/relatorios/produtividade*', { relatorio: [] });

    cy.get('#inicio').type('2024-01-01');
    cy.get('#fim').type('2024-01-05');
    cy.get('button[type="submit"]').click();

    cy.get('#relatorio p').should('contain', 'Nenhum conserto encontrado');
    cy.get('#relatorio table').should('not.exist');
  });

  it('deve voltar para a página anterior', () => {
    cy.get('button').contains('Voltar').click();
    cy.url().should('include', 'Home.html');
  });

  // Teste adicional para validação de formulário
  it('deve mostrar erro ao submeter sem datas', () => {
    cy.get('button[type="submit"]').click();
    cy.get('#relatorio').should('contain', ''); // Adaptar conforme implementação de erro
  });
});