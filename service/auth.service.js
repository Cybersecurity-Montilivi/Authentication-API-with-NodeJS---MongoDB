const User = require("../models/user.model")
const jwt = require('jswonwebtoken')
const { getUser } = require('./user.service')

const login = async (username, password) => {
    //Cercar el user per username
    const user = await User.findOne({ username: username })

    //Comprovar que el password es correcte
    //Retornar la resposta

    const isAuthenticated = await user.verifyPassword(password)
    if (!isAuthenticated) {
        return null
    }
    return await user.generateToken();

}

const verifyToken = async (token) => {
    var decoded = jwt.verify(token, proces.env.JWT_SECRET)
    return user = await getUser(decoded.userId);

};

module.exports = { login, verifyToken };