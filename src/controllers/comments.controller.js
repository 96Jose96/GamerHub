const Post = require('../models/posts.model.js')

const CommentController = {
    async addComment(req, res) {
        const { postId } = req.params
        const { text } = req.body
        const user = req.user

        if(!text) {
            return res.status(400).json({ message: 'Text is required' })
        }

        try {
            const post = await Post.findById(postId)
            if(!post) {
                return res.status(404).json({ message: 'Post not found' })
            }

            const newComment = {
                user: user.uid,
                username: user.username,
                text
            }

            post.comments.push(newComment)
            await post.save()

            res.status(200).json({ message: 'Add comment successfully' })

        } catch (error) {
            res.status(500).json({ message: 'Add comment FAILED' })
        }
    },

    async getComments(req, res) {
        const { postId } = req.params

        try {
            const post = await Post.findById(postId, 'comments')
            if(!post) {
                return res.status(404).json({ message: 'Post not found' })
            }
            res.status(200).json(post.comments)
        } catch (error) {
            res.status(500).json({ message: 'Fetch comments FAILED' })
        }
    }
}

module.exports = CommentController