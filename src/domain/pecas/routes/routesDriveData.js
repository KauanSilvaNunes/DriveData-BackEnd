const express=require("express");
const router=express.Router();
const pecasController = require("../controllers/pecasController");
const manutencoesController = require("../controllers/manutencoesController");
const automovelController = require("../controllers/automovelController");


router.get("/automoveis",automovelController.buscarAutomovel)
router.get("/pecas",pecasController.todasPecas)
router.get("/",manutencoesController.buscarManutencoes)
router.post("/manutencoes",manutencoesController.criarManutencao)
module.exports = router