const db = require("../../../config/db");

class AutomoveisRepository {

    async buscarAutomoveis() {
        const [row] = await db.query("Select * from automovel;");
        return row;
    }

    async buscarAutomoveisPorID(id) {
        const [row] = await db.query("Select * from automovel WHERE ID_Autenticacao=?;",[id]);
        return row[0];
    }

     async adicionarAutomovel (automovel) {
    const [result] = await db.query("INSERT INTO automovel (ID_Autenticacao,nome_automovel,ID_Icone,quilometragem) VALUES (?,?,?,?)",[automovel.ID_Autenticacao,automovel.nome_automovel,automovel.ID_Icone,automovel.quilometragem]);
    return {id: result.insertId, ...automovel};
  }

  async atualizarAutomovel(automovel) {
  const [result] = await db.query(
    `UPDATE automovel 
     SET nome_automovel = ?, ID_Icone = ?, quilometragem = ? 
     WHERE ID = ?`,
    [automovel.nome_automovel, automovel.ID_Icone, automovel.quilometragem, automovel.ID]
  );

  return result.affectedRows > 0 
    ? { ...automovel } 
    : null;
}
}

module.exports= new AutomoveisRepository();