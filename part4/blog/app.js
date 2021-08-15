const express = require('express')
const cors = require('cors')
const blogRouter = require('./controllers/blog-controller')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app