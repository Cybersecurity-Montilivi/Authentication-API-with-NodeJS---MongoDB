const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const userSchema = new Schema({
    username: String,
    hashPassword: String,
    salt: String
});

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.hashPassword)
}

userSchema.methods.setPassword = async function (password) {
    this.salt = await bcrypt.genSalt(10);
    this.hashPassword = await bcrypt.hash(password, this.salt);
}

userSchema.methods.passwordValidate = async function (password) {
    var mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");

    if (mediumRegex.test(password))
        return true
    else
        return false
}

userSchema.methods.generateToken = async function () {
    return jwt.sign(
        {
            userID: this._id,
            username: this.username,
        }, process.env.JWT_SECRET)

}

const modelUser = mongoose.model('User', userSchema);

module.exports = modelUser