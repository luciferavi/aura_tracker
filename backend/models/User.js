const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    goals: {type:String},

    photo: { type: String }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
