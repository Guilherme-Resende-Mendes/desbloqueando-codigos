const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");

const TecnicoController = require("./controllers/TecnicoController");
const PecaController = require("./controllers/PecaController");
const ConsertoController = require("./controllers/ConsertoController");
const RelatorioController = require("./controllers/RelatorioController");
const EstoqueController = require("./controllers/EstoqueController");

const app = express();
app.use(bodyParser.json());

// Rotas
app.use("/tecnicos", TecnicoController);
app.use("/pecas", PecaController);
app.use("/consertos", ConsertoController);
app.use("/relatorios", RelatorioController);
app.use("/estoque", EstoqueController);

// Sincronizar banco de dados
sequelize.sync({ force: false })
  .then(() => console.log("Banco sincronizado"))
  .catch((err) => console.error("Erro ao sincronizar banco:", err));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));