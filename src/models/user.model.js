const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    uid: {
        type: String, required: true, unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileimage: {
        type: String,
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)