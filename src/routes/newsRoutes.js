const express = require('express')
const router = express.Router()
const { NewsControllers } = require('../controllers/news.controller.js')


router.get('/news', NewsControllers.getNews)
router.get('/news/:id', NewsControllers.getNewsById)

module.exports = router