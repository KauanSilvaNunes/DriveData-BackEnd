require("dotenv").config({path:"../.env"})
const express=require("express")
const rotas = require("./domain/pecas/routes/pecasRoutes")

const app=express()
const cors=require("cors")
app.use(cors())
app.use(express.json())

app.use("/",rotas)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Servidor funcionando na porta 3000!")
})