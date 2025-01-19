const express = require('express');
const peca = require('../models/Peca');
const router = express.Router();

// Criar peça
router.post("/", async (req, res) => {
  try {
    const { descricao, codigo, qtdeEstoque, fornecedor } = req.body;
    const Peca = await Peca.create({ descricao, codigo, qtdeEstoque, fornecedor });
    res.status(201).json(peca);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar peça", details: error.message });
  }
});

// Listar peças
router.get("/", async (req, res) => {
  const peca = await Peca.findAll();
  res.json(peca);
});

module.exports = router;