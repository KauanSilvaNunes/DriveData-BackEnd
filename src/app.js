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

app.use(
  session({
    secret: "segredo-simples",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);


app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao destruir a sessão:", err);
      return res.status(500).json({ mensagem: "Erro ao fazer logout" });
    }

    // Remove o cookie da sessão
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      sameSite: "lax", // mesmo valor usado no login
      secure: false    // true se for https
    });

    res.status(200).json({ mensagem: "Logout realizado com sucesso!" });
  });
});

app.get("/check-auth", (req, res) => {
  if (req.session && req.session.user) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

const { getLogin } = require("./domain/authentication/controller/authController");
const rotas = require("./domain/pecas/routes/routesDriveData");



app.post("/login", getLogin);

app.use("/", authMiddleware, rotas);

// require("./domain/pecas/services/arduinoReader");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor funcionando na porta 3000!");
});
