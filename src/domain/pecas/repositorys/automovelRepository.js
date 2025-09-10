const db = require("../../../config/db");

class AutomoveisRepository {

    async buscarAutomoveis() {
        const [row] = await db.query("Select * from automovel;");
        return row;
    }


}

module.exports= new AutomoveisRepository();