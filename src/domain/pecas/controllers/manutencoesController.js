const manutencoesRepository = require("../repositorys/manutencoesRepository")

class manutencoesController{
    async buscarManutencoes(req,res){
        try{
            const dados= await manutencoesRepository.buscarManutencoes();
            res.status(200).json(dados)
        }catch(erro){
            res.status(500).json({erro:"Erro ao buscar manutenções"})
        }
    }

    async criarManutencao(req,res){
        try{
            const date= req.body;
            const dado= await manutencoesRepository.criarManutencao(date);
            res.status(201).json(dado);
        }catch(erro_criar){
            res.status(500).json({erro:"Erro ao criar uma nova manutenção:",erro_criar})
        }
    }

}

module.exports= new manutencoesController(); 