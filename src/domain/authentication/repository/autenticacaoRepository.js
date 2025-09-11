const db =require("../../../config/db.js");

class AutenticacaoUsuario{

    async getUserAll(){
        const [rows]= await db.query("SELECT * FROM autenticacao")
        return rows;
    }

    async getUserByAuth (autenticador) {
        const [rows] = await db.query("SELECT * FROM autenticacao WHERE numero_autenticador = ?", [autenticador]);
        return rows[0];
    }

    async validateUser(autenticador) {
        const user = await this.getUserByAuth(autenticador);
        if (!user) return null;

        if (user.numero_autenticador === autenticador) {
            return user
        }

        return null
    }

}

module.exports = new AutenticacaoUsuario();