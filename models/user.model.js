const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    hashPassword: String,
    salt: String
});

const bcrypt = require('bcrypt');

modelUser.methods.setPassword = function (yourPassword) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(yourPassword, salt, (err, hash) => {
            console.log("Usuari creat" + userSchema + " password: " + password + " salt:"
                + salt)
            this.yourPassword, this.salt
        });
    })
}

//https://medium.com/@manishsundriyal/a-quick-way-for-hashing-passwords-using-bcrypt-with-nodejs-8464f9785b67

//https://www.loginradius.com/blog/async/hashing-user-passwords-using-bcryptjs/


const modelUser = mongoose.model('User', userSchema);

module.exports = modelUser