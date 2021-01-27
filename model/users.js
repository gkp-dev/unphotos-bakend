const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 75
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 75
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    }
})

UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this.id }, process.env.JWT_Private_Key, { expiresIn: '2h' })
}

const User = mongoose.model('user', UserSchema);

module.exports = User