const axios = require('axios')
require('dotenv').config()

const url = `${process.env.API_URL}${process.env.API_KEY}`

let newsCache = []

const loadNewsCache = async (req, res) => {
    try {
        const data = await axios.get(url)
        newsCache = data.data.articles.map((article, index) => ({
         id: index + 1,
         ...article,
        }))
        console.log('Load news cache OK')
    } catch (error) {
        console.log('Load news cache FAILED')
    }
 }

const NewsControllers = {

    async getNews (req, res) {
       try {
           res.status(200).json(newsCache)
       } catch (error) {
           res.status(500).json({ error: 'Get news FAILED', message: error.message })
       }
    },

    async getNewsById (req, res) {
        try {
            const { id } = req.params
            const newById = newsCache.find(item => item.id === parseInt(id))

            if (!newById) {
                res.status(404).json({ error: 'New not found', message: error.message })
            } else {
                res.status(200).json(newById)
            }
        } catch (error) {
            res.status(500).json({ error: 'Get new by id FAILED', message: error.message })
        }
    },

    async getHomeNews (req, res) {
        try {
            let homeNews = newsCache.slice(0, 4)
            res.status(200).json(homeNews)
        } catch (error) {
            res.status(500).json({ message: 'Error cargando' })
        }
    }
}

module.exports = {
    NewsControllers,
    loadNewsCache,
}