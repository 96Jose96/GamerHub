const express = require('express')
require('dotenv').config()
const app = express()
const { dbConnection } = require('./config/ddbb_config.js')
const { loadNewsCache } = require('./controllers/news.controller.js')
const newsRouter = require('./routes/newsRoutes.js')
const postsRouter = require('./routes/postsRoutes.js')
const verifyToken = require('./middlewares/authMiddleware.js')

dbConnection()

loadNewsCache()
setInterval(loadNewsCache, 3600000)

app.use(express.json())

app.use('/', newsRouter)

app.use(verifyToken)
app.use('/', postsRouter)


app.listen(process.env.PORT, () => console.log(`Server listen on port ${process.env.PORT}`))