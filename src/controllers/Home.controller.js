const axios = require('axios')
require('dotenv').config()

const url = `${process.env.API_URL}${process.env.API_KEY}`

let homeNewsCache = []

const loadIndexNewsCache = async (req, res) => {
    try {
        const data = await axios.get(url)
        homeNewsCache = data.data.articles.map((article, index) => ({
         id: index + 1,
         ...article,
        }))
        console.log('Load news cache OK')
    } catch (error) {
        console.log('Load news cache FAILED')
    }
 }

 const HomeController = {
    async getHomeNews (req, res) {
        try {
            let homeNews = homeNewsCache.slice(0, 4)
            res.status(200).json(homeNews)
        } catch (error) {
            res.status(500).json({ message: 'Error cargando' })
        }
    }
 }

module.exports = {
    HomeController,
    loadIndexNewsCache
}