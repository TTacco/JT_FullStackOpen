const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blogtest_helper')
require('express-async-errors')

const api = supertest(app)

const Blog = require('../models/blog')
    
beforeEach(async () => {  
  await Blog.deleteMany({})  

  const blogMap = helper.placeholderBlogs.map(blog => new Blog(blog))
  const blogPromises = blogMap.map(blogPromise => blogPromise.save())
  await Promise.all(blogPromises)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.placeholderBlogs.length)
})
  
test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs') 
  
  expect(response.body[0].author).toBe('Michael Chan')
})

test('BLOG Working Addition', async () => {
  const exampleObj = {
    title: 'Title Example',
    author: 'Author Example',
    url: 'URL Example',
    likes: 0
  }

  const blogToBeAdded = new Blog(exampleObj)
  const savedBlog = await blogToBeAdded.save()
  
  const blogsInDatabase = await helper.blogsInDB()
  expect(blogsInDatabase).toHaveLength(helper.placeholderBlogs.length + 1)

  expect(savedBlog).toBeDefined()
})

test('BLOG Invalid Addition', async () => {
  const emptyObj = {
    author: 'Author Field Only'
  }

  const errorBlog = new Blog(emptyObj)
  const savedBlog = await errorBlog.save()
  console.log(savedBlog)

  expect(savedBlog).toBe('Fornite')
})

test('BLOG Verify Likes Param', async () => {
  const id = helper.placeholderBlogs[helper.placeholderBlogs.length - 1]._id
  const blog = await Blog.findById(id)

  if(!blog.likes){
    await Blog.findByIdAndUpdate(id, {likes: 0})
  }

})

test('BLOG Update Likes Param', async () => {
  const newLikes = 5
  const id = helper.placeholderBlogs[helper.placeholderBlogs.length - 1]._id
  await Blog.findByIdAndUpdate(id, {likes: newLikes})

})

test('BLOG No Url and Title returns 404', async () => {
  const emptyObj = {
    author: 'OnlyAuthor'
  }

  const newObj = Blog(emptyObj) 
  const result = await newObj.save()

  expect(result).toBeDefined()
})

test('BLOG delete test', async () => {
  const id = helper.placeholderBlogs[0]._id
  console.log(id)
  await api.delete(`/api/blogs/${id}`)
  //console.log(api.delete(`api/blogs/${id}`))
})



afterAll(() => {
  mongoose.connection.close()
})