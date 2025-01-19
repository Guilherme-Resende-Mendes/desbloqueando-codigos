const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const path = require('path'); // Importe o módulo path

const TecnicoController = require("./controllers/TecnicoController.js");
const PecaController = require("./controllers/PecaController.js");
const ConsertoController = require("./controllers/ConsertoController.js");
const RelatorioController = require("./controllers/RelatorioController.js");

const app = express();
app.use(bodyParser.json());

// Rotas
app.use("/tecnicos", TecnicoController);
app.use("/pecas", PecaController);
app.use("/consertos", ConsertoController);
app.use("/relatorios", RelatorioController);
app.use(express.static('views'));


// Sincronizar banco de dados ANTES de definir as rotas
sequelize.sync({ force: false })
  .then(() => {
    console.log("Banco sincronizado");

    // Rota para servir o arquivo HTML (após a sincronização)
    app.get('/login', (req, res) => {
      res.sendFile(path.join(__dirname, 'views', 'Login.html'));
    });

    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}/login`));
  })
  .catch((err) => console.error("Erro ao sincronizar banco:", err));