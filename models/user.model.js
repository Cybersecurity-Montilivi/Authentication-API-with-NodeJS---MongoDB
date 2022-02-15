const mongoose = require('mongoose')

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String
});

const modelUser = mongoose.model('User', userSchema);

module.exports = modelUser