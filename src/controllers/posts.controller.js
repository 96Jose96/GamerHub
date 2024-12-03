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
            res.status(500).json({ message: 'Get all posts FAILED' })
        }
    },

    async getMyPosts (req, res) {
        const idToken = req.headers.authorization?.split(' ')[1]

        if (!idToken) {
            return res.status(401).json({ message: 'Unauthorized. No token provided' })
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken)
            const uid = decodedToken.uid

            const user = await User.findOne({ uid })

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const myPosts = await Post.find({ author: user.username })

            res.status(200).json({
                message: 'Get posts sucessfully',
                posts: myPosts
            })
        } catch (error) {
            console.error('Get posts FAILED', error)
            res.status(500).json({ message: 'Get posts FAILED' })
        }
    },

    async updatePost (req, res) {
        const { postId, title, content, image } = req.body
        const idToken = req.headers.authorization?.split(' ')[1]

        if (!idToken) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' })
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken)
            const uid = decodedToken.uid
            const user = await User.findOne({ uid })

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const post = await Post.findOne({ _id: postId, author: user.username })

            if (!post) {
                return res.status(404).json({ message: 'Not authorized to edit this post' })
            }

            post.title = title || post.title
            post.content = content || post.content
            post.image = image || post.image

            const updatedPost = await post.save()
            
            res.status(200).json({ message: 'Post updated successfully', post: updatedPost })
        } catch (error) {
            res.status(500).json({ message: 'Update post FAILED' })
        }
    },

    async deletePost(req, res) {
        const idToken = req.headers.authorization?.split(' ')[1]

        if (!idToken) {
            return res.status(401).json({ message: 'Unauthorized. No token provided' })
        }
    
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken)
            const uid = decodedToken.uid
    
            const user = await User.findOne({ uid })
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
    
            const postId = req.params.id
    
            if (!postId) {
                return res.status(400).json({ message: 'Post ID is required' })
            }
    
            const post = await Post.findOne({ _id: postId, author: user.username })
    
            if (!post) {
                return res.status(404).json({ message: 'Post not found or not authorized to delete it' })
            }
    
            await Post.deleteOne({ _id: postId })
            return res.status(200).json({ message: 'Post deleted OK' })
    
        } catch (error) {
            console.error('Delete post failed', error)
            return res.status(500).json({ message: 'Delete post FAILED' })
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