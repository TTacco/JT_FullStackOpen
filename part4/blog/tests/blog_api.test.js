const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
require('express-async-errors')

beforeEach(async () => {  
  await Blog.deleteMany({})  

  const blogMap = helper.placeholderBlogs.map(blog => new Blog(blog))
  const blogPromises = blogMap.map(blogPromise => blogPromise.save())
  await Promise.all(blogPromises)
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
    blog.likes = 0
    await blog.save('/api/blogs')
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