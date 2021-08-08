require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PhoneNumber = require('./models/phonenumber')

app.use(express.json())

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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//app.use(unknownEndpoint)

console.log("INITIALIZING");


let data= [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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

app.get('/api/persons/:id', (request, response) => {
    PhoneNumber.findById(request.params.id).then(note => {
      response.json(note)
    })

    if(person){
        response.send(person);
    }
    else{
        return response.status(404).send();
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  data = data.filter(d => d.id !== id)

  response.status(204).end()
})

const generateID = () => {
  const len = data.length+1; 
  return len + Math.floor(Math.random() * (len+5));  
}

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