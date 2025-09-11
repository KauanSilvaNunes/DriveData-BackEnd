const authRepository=require("../repository/autenticacaoRepository"); 

const getLogin= async (req,res) => {
    const {autenticador}=req.body;

    try{
        const user= await authRepository.validateUser(autenticador);

        if (!user){
            return res.status(401).json({mmensagem:"Usuario não autenticado !"})
        }

        req.session.user = {id: user.ID, autenticador: user.numero_autenticador}
        res.status(200).json({mensagem:"Login realizado com sucesso",user})

    }catch(err){
        console.log(err);
        res.status(500).json("Erro no servidor ao tentar fazer o login !")
    }
}

module.exports={getLogin}