const { HomeController } = require('../controllers/Home.controller.js')
const express = require('express')
const homeRouter = express.Router()

homeRouter.get('/', HomeController.getHomeNews)

module.exports = homeRouter