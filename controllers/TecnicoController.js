const express = require('express');
const router = express.Router();
const Tecnico = require('../models/Tecnico');

// Cadastrar técnico
router.post('/', async (req, res) => {
  try {
    const { nome, cpf, especialidades, numero, email, logradouro } = req.body;
    const novoTecnico = await Tecnico.create({ nome, cpf, especialidades, numero, email, logradouro });
    res.status(201).json({ message: 'Técnico cadastrado!', tecnico: novoTecnico });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar técnico', details: error.message });
  }
});

// Listar técnicos
router.get('/', async (req, res) => {
  const tecnicos = await Tecnico.findAll();
  res.json(tecnicos);
});

// ... outras rotas para atualizar e excluir técnicos

module.exports = router;