const automoveisRepository = require("../repositorys/automovelRepository")

class AutomoveisServices {

    validarAutomovel(data) {
 
    if (!data.nome_automovel || data.nome_automovel.trim() === "") {
      throw new Error("Nome do automvel é obrigatório.");
    }
 
 
    const validarQuilometragem = (valor) => {
      if (valor === undefined || valor === null || isNaN(Number(valor))) {
        throw new Error(`o valor da quilometragem deve ser numérico.`);
      }
      const num = Number(valor);
      if (num < 0 ) {
        throw new Error(`A quilometragem deve ser maior que 0`);
      }
      return parseFloat(num.toFixed(2));
    };
 
    return {
      ID_Autenticacao: data.ID_Autenticacao,
      nome_automovel:data.nome_automovel,
      ID_Icone:data.ID_Icone,
      quilometragem:validarQuilometragem(data.quilometragem)
    };
  }

//   Busca todos os automoveis:

  async buscarAutomoveis() {
    return await automoveisRepository.buscarAutomoveis();
  }

//   Busca automoveis por ID:

  async buscarAutomoveisPorID(id) {
    if (!id || isNaN(Number(id))) {
      throw new Error("ID inválido.");
    }
    return await automoveisRepository.buscarAutomoveisPorID(Number(id))
  }

//  Adicionar um novo automovel
  async adicionarAutomovel(data) {
    validado = this.validarAutomovel(data)
    return await automoveisRepository.adicionarAutomovel(validado)
  }

}

module.exports = new AutomoveisServices()