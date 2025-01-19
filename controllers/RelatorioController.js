const express = require("express");
const Conserto = require("../models/Conserto");
const Tecnico = require("../models/Tecnico");
const router = express.Router();

// Gerar relatório de produtividade
router.get("/produtividade", async (req, res) => {
  try {
    const { inicio, fim, tecnicoId } = req.query;

    const filtros = {
      where: {},
      include: [{ model: Tecnico, as: "responsavel" }],
    };

    if (inicio && fim) filtros.where.createdAt = { $between: [new Date(inicio), new Date(fim)] };
    if (tecnicoId) filtros.where.responsavelId = tecnicoId;

    const consertos = await Conserto.findAll(filtros);

    const relatorio = consertos.map((conserto) => ({
      numeroOS: conserto.numeroOS,
      cliente: conserto.nomeCliente,
      status: conserto.status,
      tecnico: conserto.responsavel?.nome || "Não atribuído",
    }));

    res.json({ message: "Relatório gerado com sucesso!", relatorio });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar relatório", details: error.message });
  }
});

router.get('/exportar', (req, res) => {
    const { relatorio, formato } = req.query;
    if (formato === 'CSV') {
      const csvData = gerarRelatorioCSV(relatorio);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="relatorio.csv"');
      res.send(csvData);
    } else if (formato === 'PDF') {
      const pdfData = gerarRelatorioPDF(relatorio);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="relatorio.pdf"');
      res.send(pdfData);
    } else {
      res.status(400).json({ error: 'Formato inválido' });
    }
  });

module.exports = router;