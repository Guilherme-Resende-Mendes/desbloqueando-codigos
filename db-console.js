const sequelize = require('./config/database'); // Importa a configuração do Sequelize
const Tecnico = require('./models/Tecnico'); // Importa o modelo Técnico
const Peca = require('./models/Peca'); // Importa o modelo Peca
const Conserto = require('./models/Conserto'); // Importa o modelo Peca

const repl = require('repl'); // Importa o módulo REPL

// Conecta ao banco de dados
sequelize.authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');

    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: false });

    // Inicia uma sessão REPL
    const r = repl.start('> ');
    r.context.sequelize = sequelize; // Adiciona o Sequelize ao contexto do REPL
    r.context.Tecnico = Tecnico; // Adiciona o modelo Técnico ao contexto do REPL
    r.context.Peca = Peca; // Adiciona o modelo Peca ao contexto do REPL
    r.context.Conserto = Conserto; // Adiciona o modelo Conserto ao contexto do REPL

    console.log('REPL iniciado. Você pode usar "Tecnico", "Peca" e "sequelize".');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
