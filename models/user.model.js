const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: String,
    hashPassword: String,
    salt: String
});

const modelUser = mongoose.model('User', userSchema);

modelUser.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.hashPassword)
}

modelUser.methods.setPassword = async function (password) {
    this.salt = await bcrypt.genSalt(saltRounds);
    this.hash = await bcrypt.hash(password, this.salt);

}


module.exports = modelUser