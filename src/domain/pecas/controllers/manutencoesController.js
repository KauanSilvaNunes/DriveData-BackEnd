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

    async deletarManutencao(req,res){
        try{
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ mensagem: "ID inválido" });
              }
            const resultado = await manutencoesRepository.deletarManutencao(id)
            
            if(!resultado){
                return res
                 .status(404)
                 .json({mensagem:"Manutenção não encontrada para deletar!"})
            }
            return res.status(200).json({mensagem:"Manutenção deletada com sucesso!"})
        }catch(err){
            return res.status(500).json({mensagem: "Erro ao deletar manutenção"})
        }
    }

}

module.exports= new manutencoesController(); 