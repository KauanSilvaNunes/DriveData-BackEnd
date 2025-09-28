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

    async atualizarAutomovel(req, res) {
  try {
    const id = parseInt(req.params.id);
    const dados = req.body;

    const automovel = { ...dados, ID_Automovel: id };

    const atualizado = await automovelRepository.atualizarAutomovel(automovel);

    if (!atualizado) {
      return res.status(404).json({ erro: "Automóvel não encontrado" });
    }

    res.status(200).json(atualizado);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao atualizar automóvel", detalhe: erro });
  }
}

}

module.exports= new automovelController();