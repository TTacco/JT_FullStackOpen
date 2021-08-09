require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PhoneNumber = require('./models/phonenumber')

app.use(express.json())

/* app.use((request, response) => {
  console.log(request.body)
  if (request.body.content === undefined) {    
    return response.status(400).json({ error: 'content missing' })  
  }
}) */

app.use(morgan((tokens, req, res) => {
  if(!(typeof req.params === 'object' && req.params !== null && !Array.isArray(req.params)))
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(data.find(d => Number(d.id) === Number(req.params.id)))
  ].join(' ')
}))

app.use(express.static('build'))
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)



//app.use(unknownEndpoint)

console.log("INITIALIZING");

app.get('/', (request, response) => {
  response.send(`<div>BLINDBLINDBLIND</div>`)
})

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${data.length} people</div>
                    <div>${new Date()}</div>`);
})

app.get('/api/persons', (request, response) => {
  PhoneNumber.find({}).then(numbers => {
    response.json(numbers)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  PhoneNumber.findById(request.params.id)
    .then(number => {
      if (number) {        
        response.json(number)      
      } 
      else {        
        response.status(404).end()      
      }    
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  PhoneNumber.findByIdAndDelete(request.params.id)
    .then(number => {
      if (number) {        
        response.status(204).end()
      } 
      else {        
        response.status(404).end()      
      }    
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response) => {

  if (!request.body.name || !request.body.number){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  else if(data.filter(p => (p.name === request.body.name)).length){
    return response.status(400).json({ 
      error: 'user already exists' 
    })
  }

  const newPerson = new PhoneNumber({
    id: Math.floor(1000 * Math.random()),
    name: request.body.name,
    number: request.body.number
  })

  //data = data.concat(newPerson)
  newPerson.save().then(result => {
    response.json(newPerson);
  })

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})