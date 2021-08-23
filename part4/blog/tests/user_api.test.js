const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')
const api = supertest(app)

const placeholderUsers = [
  {
    username: 'johndoe1234',
    name: 'John Doe',
  },
  {
    username: 'janeboe1010',
    name: 'Jane Boe',
  }
]

beforeAll(async () => {
  await User.deleteMany({})

  const userObjects = placeholderUsers.map(user => new User(user)) 
  const userPromises = userObjects.map(user => user.save())
  await Promise.all(userPromises)
})

test('USER GET Request', async () => {
  const res = await api.get('/api/users')

  console.log(res.body)
})

test('USER POST Request', async () => {
  const res = await api.post('/api/users').send({username: 'ExampleUserName', name: '13 angels standing guard around side your bed', password: 'ExamplePassword'})
  
  console.log(res.body)
})

test('USER POST Request entry already exists', async () => {
  const res = await api.post('/api/users/').send({username: 'johndoe1234', name: 'Example Name', password: 'ExamplePassword'})
    
  console.log(res.body)
})


describe('USER Creation and Login', () => {
  test('Create new user', async () => {
    const response = await api.post('/api/users/create').send({
      username: 'ExampleUserName',
      name: 'Example Name',
      password: 'pras'
    })

    console.log('New User Created', response.body)
  }) 

  test('Login user', async () => {
    const response = await api.post('/api/users/login').send({
      username: 'ExampleUserName',
      password: 'pras',
    })

    console.log('User logged in', response.body)
    
  }) 
})

afterAll(() => {
  mongoose.connection.close()
})

