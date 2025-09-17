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


    async buscarAutomoveisPorID (req,res) {
        try{
            const id=parseInt(req.params.id)
            const dados= await automovelRepository.buscarAutomoveisPorID((id));
            res.status(200).json(dados)
        }catch(erro){
            res.status(500).json({err:"Erro ao buscar os automomóveis"})
        }
    }

     async adicionarAutomovel(req,res){
        try{
            const date= req.body;
            const dado= await automovelRepository.adicionarAutomovel(date);
            res.status(201).json(dado);
        }catch(erro_criar){
            res.status(500).json({erro:"Erro ao adicionar um automovel:",erro_criar})
        }
    }

}

module.exports= new automovelController();