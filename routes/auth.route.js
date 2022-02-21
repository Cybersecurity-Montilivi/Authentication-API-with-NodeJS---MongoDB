const express = require("express");
const { login } = require("../service/auth.service")
const expressSanitizer = require('express-sanitizer');

const authRouter = express.Router();


authRouter.post('/', async (req, res) => {
    //Sanejar l'entrada
    const username = req.body.username
    const password = req.body.password

    const token = await login(username, password)

    if (token) {
        return res.send({ token })
    }
    return res.status(403).send('Invalid username or password')

})

module.exports = authRouter
