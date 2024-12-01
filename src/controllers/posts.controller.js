const express = require('express')
const Post = require('../models/posts.model.js')
const User = require('../models/user.model.js')
const admin = require('../config/fireBaseAdmin.js')

const PostsControllers = {
    async createPost (req, res) {
        const { title, content, image } = req.body
        const idToken = req.headers.authorization?.split(' ')[1]

        if (!idToken) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' })
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken)
            const uid = decodedToken.uid
            const user = await  User.findOne({ uid })

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const newPost = new Post({
                title,
                content,
                image,
                author: user.username
            })

            const savedPost = await newPost.save()

            res.status(201).json({
                message: 'Post created OK',
                post: savedPost
            })
        } catch (error) {
            console.error('Create post FAILED', error)
            res.status(500).json({ message: 'Create post FAILED' })
        }
    },

    async getAllPosts (req, res) {
        try {
            const posts = await Post.find().sort({ createdAt: -1 })
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
    },

    async likePost (req, res) {
        try {
            const { id } = req.params
            const post = await Post.find(id)
            if (!post) {
                res.status(404).json({ error: 'Post not found' })
            }
            if (post.likes.includes(req.user.id)) {
                post.likes = post.likes.filter(userId => userId.toString() !== req.user.id)
            } else {
                post.likes.push(req.user.id)
            }
            await post.save()
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json({ error: 'Like to post FAILED', message: error.message })
        }
    }
}

module.exports = { PostsControllers }