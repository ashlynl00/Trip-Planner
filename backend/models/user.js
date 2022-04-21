const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true, required: true, minlength: 2},
    password: {type: String, required: true}
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;