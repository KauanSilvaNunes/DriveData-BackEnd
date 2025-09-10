const express=require("express");
const router=express.Router();
const pecasController = require("../controllers/pecasController");
const manutencoesController = require("../controllers/manutencoesController");
const automovelController = require("../controllers/automovelController");


router.get("/automoveis",automovelController.buscarAutomovel)
router.get("/pecas",pecasController.todasPecas)
router.get("/manutencoes",manutencoesController.buscarManutencoes)
router.post("/manutencoes",manutencoesController.criarManutencao)
router.delete("/manutencoes/:id",manutencoesController.deletarManutencao)
module.exports = router