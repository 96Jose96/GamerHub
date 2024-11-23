const Post = require('../models/posts.model.js')

const PostsControllers = {
    async createPost (req, res) {
        try {
            const { title, content, image } = req.body

            const newPost = new Post ({
                title,
                content,
                image,
                //agregar autor cuando esté FIREBASE aquí y en modelo
            })
            const savedPost = await newPost.save()
            res.status(201).json(savedPost)
        } catch (error) {
            res.status(500).json({ error: 'Create post FAILED', message: error.message  })
        }
    },

    async getAllPosts (req, res) {
        try {
            const posts = await Post.find()
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json({ error: 'Get all posts FAILED', message: error.message })
        }
    },

    async updatePost (req, res) {
        try {
            const { id } = req.params
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { $set: req.body },
                { new: true }
            )

            if (!updatedPost) {
                res.status(404).json({ error: 'This post does not exist', message: error.message })
            } else {
                res.status(200).json(updatedPost)
            }
        } catch (error) {
            res.status(500).json({ error: 'Update post FAILED', message: error.message })
        }
    },

    async deletePost (req, res) {
        try {
            const { id } = req.params
            const deletedPost = await Post.findByIdAndDelete(id)
            if (!deletedPost) {
                res.status(404).json({ error: 'This post does not exist', message: error.message })
            } else {
                res.status(200).json({ message: 'Post deleted OK' })
            }
        } catch (error) {
            res.status(500).json({ error: 'Post delete FAILED', message: error.message })
        }
    }
}

module.exports = { PostsControllers }