const express = require("express");
const { createUser } = require("../service/user.service")
const expressSanitizer = require('express-sanitizer');

const userRouter = express.Router()

const User = require("../models/user.model");

userRouter.post("/", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const newUser = await createUser(username, password)

    if (newUser == "userExists") {
        res.send("Error creating user, the user exists ")
    }
    if (newUser == "invalidPassword") {
        res.send("Error creating user, the password  must contains 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter")
    }
    else {
        const userToReturn = { ...newUser }
        delete userToReturn.hash
        delete userToReturn.salt

        res.status(200).send(userToReturn)
    }

});


userRouter.get("/:username", async (req, res) => {
    var username = req.params.username;

    var dbRes = await User.find({ 'username': username }, function (err, dbres) {
        if (err) {
            res.send("The user don't exists");
            return handleError(err);
        }
        else {
            res.send(dbres);
        }

    })
});


userRouter.delete("/:username", async (req, res) => {
    var username = req.params.username;
    //TO DO VERIFICAR SI LUSUARI EXISTEIX PERQUE SINO SEMPRE POSA USER X DELETED
    User.deleteMany({ 'username': username }, function (err) {
        if (err) {
            res.send("Error deleting user, probably user d'ont exists")
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