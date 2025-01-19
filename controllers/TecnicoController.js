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
    console.error('Erro ao cadastrar técnico:', error);
    res.status(500).json({ error: 'Erro ao cadastrar técnico', details: error.message });
  }
});

// Listar técnicos
router.get('/', async (req, res) => {
  try {
    const tecnicos = await Tecnico.findAll();
    res.json(tecnicos);
  } catch (error) {
    console.error('Erro ao listar técnicos:', error);
    res.status(500).json({ error: 'Erro ao listar técnicos', details: error.message });
  }
});

router.put('/:id/especialidades', async (req, res) => {
  try {
    const { id } = req.params;
    const { especialidades } = req.body;
    const tecnico = await Tecnico.findByPk(id);
    if (!tecnico) {
      return res.status(404).json({ error: 'Técnico não encontrado' });
    }
    tecnico.especialidades = especialidades;
    await tecnico.save();
    res.json({ message: 'Especialidades atualizadas com sucesso!', tecnico });
  } catch (error) {
    console.error('Erro ao atualizar especialidades:', error); // Log do erro no servidor
    res.status(500).json({ error: 'Erro ao atualizar especialidades', details: error.message });
  }
});

// ... outras rotas para atualizar e excluir técnicos (com tratamento de erros)

module.exports = router;