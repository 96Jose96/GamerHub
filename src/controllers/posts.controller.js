const Post = require('../models/posts.model.js')

const PostsControllers = {
    async createPost (req, res) {
        try {
            const { title, content, image } = req.body

            const newPost = new Post ({
                title,
                content,
                image,
                //agregar autor cuando esté FIREBASE
            })
            const savedPost = await newPost.save()
            res.status(201).json(savedPost)
        } catch (error) {
            res.status(500).json({ error: 'Create post FAILED' })
        }
    },

    async getAllPosts (req, res) {
        try {
            const posts = await Post.find()
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json({ error: 'Get all posts FAILED' })
        }
    }
}