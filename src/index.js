const express = require('express')
require('dotenv').config()
const app = express()
const { dbConnection } = require('./config/ddbb_config.js')
const { loadNewsCache } = require('./controllers/news.controller.js')
const router = require('./routes/newsRoutes.js')

dbConnection()

loadNewsCache()
setInterval(loadNewsCache, 3600000)


app.use('/', router)

app.listen(process.env.PORT, () => console.log(`Server listen on port ${process.env.PORT}`))