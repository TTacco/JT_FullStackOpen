const blogRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  const result = await blog.save()
  response.status(201).json(result)

})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})


  

module.exports = blogRouter