const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    goals: {type:String},
    points: { type: Number, default: 0 },  // Add points field

    photo: { type: String },
    batchYear: { type: String },  // New field for Batch Year
    branch: { type: String }  
});
const User = mongoose.model('User', userSchema);

module.exports = User;
