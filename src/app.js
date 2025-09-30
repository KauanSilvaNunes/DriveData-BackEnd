require("dotenv").config({ path: "../.env" });
const session = require("express-session");
const express = require("express");
const authMiddleware = require("./domain/authentication/middleware/authMiddleware");

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

const { getLogin } = require("./domain/authentication/controller/authController");
const rotas = require("./domain/pecas/routes/routesDriveData");

app.use(
  session({
    secret: "segredo-simples",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.post("/login", getLogin);

app.use("/", authMiddleware, rotas);

// require("./domain/pecas/services/arduinoReader");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor funcionando na porta 3000!");
});
