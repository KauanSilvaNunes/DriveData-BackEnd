const db = require("../../../config/db");

class Pecas {
  
  async todasPecas() {
    const [row] = await db.query("SELECT * FROM pecas;");
    return row;
  }

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
}
module.exports = new Pecas();