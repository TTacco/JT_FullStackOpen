const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('express-async-errors')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/create', async(request, response) => {
  const body = request.body  

  if(!(body.username && body.password.length > 3)){
    return response.status(401).json({
      error: 'Either username does not exist or the password is incorrect, try again'
    })
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  await user.save()
})

//User Logging In
userRouter.post('/login', async (request, response) => {
  const body = request.body

  const user = await User.findOne({username: body.username})
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = userRouter