const express = require("express");
const userRouter = express.Router()
const app = express();


app.post("/user", async (req, res) => {
    //sanitize
    const username = req.body.username
    const password = req.body.password
    //Crear usuari nou desde el servei

    const newUser = await createUser(username, password)
});

module.exports = { userRouter }