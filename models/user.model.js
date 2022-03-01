const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

userSchema.methods.generateToken = async function () {
    return jwt.sign(
        {
            userID: this._id,
            username: this.username
        }, process.env.JWT_SECRET)

}

const modelUser = mongoose.model('User', userSchema);

module.exports = modelUser