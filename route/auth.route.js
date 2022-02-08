const express = require("express");
const Router = express.Router

authRouter.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

})

module.exports = authRouter