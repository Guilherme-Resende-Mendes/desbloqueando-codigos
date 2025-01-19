const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");

const TecnicoController = require("./controllers/TecnicoController");
const PecaController = require("./controllers/PecaController");
const ConsertoController = require("./controllers/ConsertoController");
const RelatorioController = require("./controllers/RelatorioController");

const app = express();
app.use(bodyParser.json());

// Rotas
app.use("/tecnicos", TecnicoController);
app.use("/peca", PecaController);
app.use("/consertos", ConsertoController);
app.use("/relatorios", RelatorioController);
app.use(express.static('public'));

// Sincronizar banco de dados
// Mova a sincronização para antes de iniciar o servidor
sequelize.sync({ force: false }) 
  .then(() => {
    console.log("Banco sincronizado");

    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Erro ao sincronizar banco:", err));