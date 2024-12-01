const { Timestamp } = require('firebase-admin/firestore')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema ({
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true }
    }],
    author: {
        type: String,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)