const User = require("../models/user.model")
const jwt = require('jsonwebtoken')
const { getUser } = require('./user.service')

require("dotenv").config();

const login = async (username, password) => {

    const user = await User.findOne({ username: username })

    if (user == null) {
        return null
    } else {
        const isAuthenticated = await user.verifyPassword(password)

        if (!isAuthenticated) {
            return null
        }

        return await user.generateToken();

    }

}

const verifyToken = async (token) => {
    var decoded = jwt.verify(token, process.env.JWT_SECRET)
    return user = await getUser(decoded.userID);

};

module.exports = { login, verifyToken };