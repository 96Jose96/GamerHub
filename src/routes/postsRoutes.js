const express = require('express')
const postsRouter = express.Router()
const { PostsControllers } = require('../controllers/posts.controller.js')

postsRouter.get('/posts', PostsControllers.getAllPosts)
postsRouter.post('/posts/create', PostsControllers.createPost)
postsRouter.put('/posts/update/:id', PostsControllers.updatePost)
postsRouter.delete('/posts/delete/:id', PostsControllers.deletePost)

module.exports = postsRouter
