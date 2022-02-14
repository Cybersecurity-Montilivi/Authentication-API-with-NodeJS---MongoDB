const express = require("express");
const authRouter = express.Router()
const app = express();

const { login } = require("../service/auth.service")
const expressSanitizer = require('express-sanitizer');

//app.use(express.json());
//app.use(expressSanitizer());

authRouter.post('/login', async (req, res) => {
    //Sanejar l'entrada
    const username = req.body.username
    const password = req.body.password
    //Demanar l'auth
    const isAutenticated = await login(username, password)
    //Demanra autenticacio al servei
    return res.send(isAutenticated)

})

module.exports = authRouter
