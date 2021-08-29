const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find()
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  
  const decodedToken = jwt.verify(token, process.env.SECRET)  
  if (!token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  
  const user = await User.findById(request.user.id)

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  }

  const blog = new Blog(newBlog)
  await blog.save()

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
  //response.json(populatedBlogs)

})

blogRouter.delete('/:id', async (request, response, next) => {
  if (!request.token || !request.user.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  

  const blogToRemove = await Blog.findById(request.params.id)
  if(blogToRemove.user && blogToRemove.user.toString() === request.user.id.toString()){
    blogToRemove.remove()
    response.status(204).end()
  }
  else{
    response.status(404).end()
  }
})


  

module.exports = blogRouter