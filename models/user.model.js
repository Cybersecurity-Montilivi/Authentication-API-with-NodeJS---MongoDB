const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError = new Error("Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length")

const userSchema = new Schema({
    username: String,
    hashPassword: String,
    salt: String
});


const passwordSchema = Joi.object().keys({
    password: Joi.string().regex(strongPasswordRegex).error(stringPassswordError).required()
});

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.hashPassword)
}

userSchema.methods.setPassword = async function (password) {
    this.salt = await bcrypt.genSalt(10);
    this.hashPassword = await bcrypt.hash(password, this.salt);
}

userSchema.methods.passwordValidate = async function (password) {

    const notValid = passwordSchema.validate({ password: password }).error;

    if (notValid) {
        return false
    } else {
        return true
    }
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