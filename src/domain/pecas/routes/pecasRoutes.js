const express=require("express");
const router=express.Router();
const pecasController = require("../controllers/pecasController");

router.get("/pecas",pecasController.todasPecas)
router.get("/",pecasController.buscarManutencoes)
module.exports = router