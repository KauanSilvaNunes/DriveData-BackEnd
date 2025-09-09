const pecasRepository = require("../repositorys/pecasRepository")

class PecasController{
    async todasPecas(req,res){
        try{
            const dados= await pecasRepository.todasPecas();
            res.status(200).json(dados)
        }catch(err){
            console.log(err);
            res.status(500).json({erro:"Erro ao buscar as peças"})
        }
    }

    async buscarManutencoes(req,res){
        try{
            const dados= await pecasRepository.buscarManutencoes();
            res.status(200).json(dados)
        }catch(erro){
            res.status(500).json({erro:"Erro ao buscar manutenções"})
        }
    }
}

module.exports= new PecasController(); 