const db = require("../../../config/db");

class PecasRepository {
  
  async todasPecas() {
    const [row] = await db.query("SELECT * FROM pecas;");
    return row;
  }

}
module.exports = new PecasRepository();