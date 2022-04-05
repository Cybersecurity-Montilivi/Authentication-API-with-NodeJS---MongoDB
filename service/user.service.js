const User = require("../models/user.model")

const createUser = async (username, password) => {

    const userExists = await User.findOne({ username: username })

    if (userExists) {
        return "userExists"
    }
    const newUser = new User({ username })

    var pwdvalidate = await newUser.passwordValidate(password)

    if (pwdvalidate == false) {
        return "invalidPassword"
    }

    await newUser.setPassword(password);

    return await newUser.save();

}

const getUser = async (id) => {
    return await User.findById(id);
}

module.exports = { createUser, getUser }