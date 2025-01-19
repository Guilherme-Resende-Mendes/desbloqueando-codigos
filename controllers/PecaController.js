const express = require('express');
const router = express.Router();
const Peca = require('../models/Peca');

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

router.put('/:id/estoque', async (req, res) => {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;
      const peca = await Peca.findByPk(id);
      if (!peca) {
        return res.status(404).json({ error: 'Peça não encontrada' });
      }
      peca.qtdeEstoque = quantidade;
      await peca.save();
      res.json({ message: 'Estoque atualizado com sucesso!', peca });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar estoque', details: error.message });
    }
  });

module.exports = router;