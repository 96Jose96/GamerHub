const express = require('express')
const commentsRouter = express.Router()
const { CommentController } = require('../controllers/comments.controller.js')

commentsRouter.post('/posts/comments/:postId', CommentController.addComment)
commentsRouter.get('/posts/comment/:postId', CommentController.getComments)

module.exports = commentsRouter
