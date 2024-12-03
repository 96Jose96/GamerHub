const express = require('express')
const postsRouter = express.Router()
const { PostsControllers } = require('../controllers/posts.controller.js')

postsRouter.get('/posts', PostsControllers.getAllPosts)
postsRouter.post('/posts/create', PostsControllers.createPost)
postsRouter.put('/posts/update', PostsControllers.updatePost)
postsRouter.delete('/posts/delete', PostsControllers.deletePost)

postsRouter.get('/my-posts', PostsControllers.getMyPosts)


//postsRouter.post('/like/:id', PostsControllers.likePost)

module.exports = postsRouter
