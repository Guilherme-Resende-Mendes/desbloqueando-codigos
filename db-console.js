const sequelize = require('./config/database'); // Import your Sequelize instance
const Tecnico = require('./models/Tecnico'); // Import your models
const Peca = require('./models/Pecas'); // Import your Peca model
// ... importe outros modelos

const repl = require('repl'); // Import the REPL module

// Connect to the database
sequelize.authenticate()
  .then(async () => {  // Adicione async aqui
    console.log('Connection has been established successfully.');

    // Sincronize os modelos com o banco de dados
    await sequelize.sync({ force: false }); // Adicione esta linha

    // Start an interactive REPL session
    const r = repl.start('> ');
    r.context.sequelize = sequelize; // Add Sequelize to the REPL context
    r.context.Tecnico = Tecnico; // Add your models to the REPL context
    // ... add other models as needed
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });