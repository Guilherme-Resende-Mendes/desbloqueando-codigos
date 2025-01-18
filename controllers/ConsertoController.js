const express = require("express");
const Conserto = require("../models/Conserto");
const Tecnico = require("../models/Tecnico");
const router = express.Router();

// Registrar um conserto
router.post("/", async (req, res) => {
  try {
    const { numeroOS, nomeCliente, telefoneCliente, equipamentoUtilizado, descricaoProblema, responsavelId } = req.body;
    const novoConserto = await Conserto.create({
      numeroOS,
      nomeCliente,
      telefoneCliente,
      equipamentoUtilizado,
      descricaoProblema,
      responsavelId,
    });
    res.status(201).json({ message: "Conserto registrado!", conserto: novoConserto });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar conserto", details: error.message });
  }
});

// Listar todos os consertos
router.get("/", async (req, res) => {
  const consertos = await Conserto.findAll({ include: [{ model: Tecnico, as: "responsavel" }] });
  res.json(consertos);
});

// Atualizar status de um conserto
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { novoStatus } = req.body;
    const conserto = await Conserto.findByPk(id);

    if (!conserto) return res.status(404).json({ error: "Conserto não encontrado" });

    conserto.status = novoStatus;
    await conserto.save();
    res.json({ message: "Status atualizado com sucesso!", conserto });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar status", details: error.message });
  }
});

// Excluir um conserto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const conserto = await Conserto.findByPk(id);

    if (!conserto) return res.status(404).json({ error: "Conserto não encontrado" });

    await conserto.destroy();
    res.json({ message: "Conserto excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir conserto", details: error.message });
  }
});

module.exports = router;