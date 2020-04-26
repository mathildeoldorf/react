const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/assets', express.static('assets'))


/* Setup the database */
const { Model } = require('objection')
const Knex = require('knex')
const knexFile = require('./knexfile.js')

// knex connection with the credentials
const knex = Knex(knexFile.development)

// Give the knex instance to objection.
Model.knex(knex)

/* Set up routes with our server instance */
const usersRoute = require('./routes/user.js')
// const playgroundRoute = require('./routes/playground.js')

app.use(usersRoute)
// app.use(playgroundRoute)

// Limit the amount of requests on the auth routes - using npm library called express rate limiter
// importing - everytime the connection is reset, the limitation is reset
const rateLimit = require('express-rate-limit')

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes // resets in an interval
  max: 4 // limit each IP to 4 requests per windowMs // limit amount of requests
})

// define routes that should use the authentication limiter
app.use('/user/login', authLimiter)

app.use('/user/register', authLimiter)

/* Start the server */

const port = process.env.PORT || 9090

const server = app.listen(port, (error) => {
  if (error) {
    console.log('Error running Express')
  }
  console.log('Server is running on port', server.address().port)
})

