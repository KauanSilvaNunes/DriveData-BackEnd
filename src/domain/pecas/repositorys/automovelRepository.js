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


}

module.exports= new AutomoveisRepository();