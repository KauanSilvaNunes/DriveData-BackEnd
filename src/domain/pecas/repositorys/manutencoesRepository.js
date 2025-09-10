const db = require("../../../config/db");

class manutencoesRepository {

  async buscarManutencoes() {
    const [row] = await db.query(`
      SELECT 
        i.ID, 
        a.nome_automovel AS Nome_automovel, 
        p.nome_peca AS Nome_peca, 
        DATE_FORMAT(i.data_maxima, '%d/%m/%Y') AS data_maxima,
        i.quilometragem_maxima, 
        i.quilometragem_instalacao, 
        DATE_FORMAT(i.data_instalacao, '%d/%m/%Y') AS data_instalacao
      FROM manutencao i
      LEFT JOIN pecas p ON i.ID_pecas = p.ID
      LEFT JOIN automovel a ON i.ID_automovel = a.ID;
    `);
    return row;}

  async criarManutencao (manutencao) {
    const [result] = await db.query("INSERT INTO manutencao (ID_automovel, ID_pecas, data_maxima, quilometragem_maxima, quilometragem_instalacao, data_instalacao) VALUES (?,?,?,?,?,?)",[manutencao.ID_automovel,manutencao.ID_pecas,manutencao.data_maxima,manutencao.quilometragem_maxima,manutencao.quilometragem_instalacao,manutencao.data_instalacao]);
    return {id: result.insertId, ...manutencao};
  }

  async deletarManutencao(id) {
    const [result] = await db.query("DELETE FROM manutencao where id = ?",[id]);

    if (result.affectedRows ===0){
      return null
    }

    return true;

  }

}


module.exports = new manutencoesRepository();