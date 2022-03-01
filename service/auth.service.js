const User = require("../models/user.model")
const { getUser } = require('./user.service')

const login = async (username, password) => {
    const user = await User.findOne({ username: username })

    const isAuthenticated = await user.verifyPassword(password)
    if (!isAuthenticated) {
        console.log("Password no coincideix")
        return null
    }

    return await user.generateToken();

}

const verifyToken = async (token) => {
    console.log(token + " token")
    var decoded = jwt.verify(token, proces.env.JWT_SECRET)
    console.log(decoded + " usuari decoded")
    return user = await getUser(decoded.userId);

};

module.exports = { login, verifyToken };