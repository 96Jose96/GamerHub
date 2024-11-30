const express = require('express')
const newsRouter = express.Router()
const { NewsControllers } = require('../controllers/news.controller.js')


newsRouter.get('/news', NewsControllers.getNews)
newsRouter.get('/news/:id', NewsControllers.getNewsById)
newsRouter.get('/', NewsControllers.getHomeNews)

module.exports = newsRouter