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

// Atualizar especialidades do técnico
router.put('/:id/especialidades', async (req, res) => {
  const { id } = req.params;
  const { especialidades } = req.body;
  
  let attempt = 0;
  const maxAttempts = 3;
  const delay = 1000; // Delay de 1 segundo entre tentativas

  while (attempt < maxAttempts) {
    try {
      const tecnico = await Tecnico.findByPk(id);
      if (!tecnico) {
        return res.status(404).json({ error: 'Técnico não encontrado' });
      }

      tecnico.especialidades = especialidades;
      await tecnico.save();
      return res.json({ message: 'Especialidades atualizadas com sucesso!' });

    } catch (error) {
      if (error.name === 'SequelizeTimeoutError' && error.original.code === 'SQLITE_BUSY') {
        // Espera e tenta novamente
        attempt++;
        if (attempt >= maxAttempts) {
          return res.status(500).json({ error: 'Erro ao atualizar especialidades após várias tentativas' });
        }
        console.log('Banco de dados ocupado, tentando novamente...');
        await new Promise(resolve => setTimeout(resolve, delay)); // Espera antes de tentar novamente
      } else {
        return res.status(500).json({ error: 'Erro ao atualizar especialidades', details: error.message });
      }
    }
  }
});

// Excluir técnico
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tecnico = await Tecnico.findByPk(id);
    if (!tecnico) {
      return res.status(404).json({ error: 'Técnico não encontrado.' });
    }

    await tecnico.apagarRegistro();
    res.json({ message: 'Técnico excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir técnico:', error);
    res.status(500).json({ error: 'Erro ao excluir técnico', details: error.message });
  }
});

module.exports = router;
