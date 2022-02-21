const express = require("express");
const { createUser } = require("../service/user.service")
const expressSanitizer = require('express-sanitizer');

const userRouter = express.Router()

const User = require("../models/user.model");

userRouter.post("/", async (req, res) => {
    //sanitize
    const username = req.body.username
    const password = req.body.password

    const newUser = await createUser(username, password)

    const userToReturn = { ...newUser }
    delete userToReturn.hash
    delete userToReturn.salt

    console.log(userToReturn)

    res.status(200).send(userToReturn)

});


userRouter.get("/:username", async (req, res) => {
    var username = req.params.username;

    var dbRes = await User.find({ 'username': username }, function (err, dbres) {
        if (err) {
            console.log("El usuari no existeix");
            res.send("El usuari no existeix");
            return handleError(err);
        }
        else {
            res.send(dbres);
        }

    })
});


userRouter.delete("/:username", async (req, res) => {
    var username = req.params.username;

    User.deleteMany({ 'username': username }, function (err) {
        if (err) {
            console.log(err);
            return handleError(err);
        }
        else res.status(200).send(username + ' deleted')
    });



});


userRouter.get("/users", async (req, res) => {
    var dbRes = await User.find({});
    res.send(dbRes)
});


module.exports = userRouter