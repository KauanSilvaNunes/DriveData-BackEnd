const automovelRepository = require("../repositorys/automovelRepository");

class automovelController{

    async buscarAutomovel (req,res) {
        try{
            const dados= await automovelRepository.buscarAutomoveis();
            res.status(200).json(dados)
        }catch(erro){
            res.status(500).json({err:"Erro ao buscar os automomóveis"})
        }
    }

}

module.exports= new automovelController();