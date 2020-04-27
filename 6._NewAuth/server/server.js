const express = require("express")
const cors = require("cors")
const session = require("express-session")
const app = express()

const userRoute = require("./routes/user")
const indexRoute = require("./routes/index")
const quizRoute = require("./routes/quiz")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true, cookie: { secure:true } }))
app.use("/assets", express.static("assets"))
app.use(cors())

// SETUP THE DATABASE
const { Model } = require("objection")
const Knex = require("knex")
const KnexFile = require("./knexfile.js")

// SETUP REQUEST LIMIT ON AUTH ROUTES
const rateLimit = require('express-rate-limit')
const authlimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // reset interval
    max: 100 // requests pr IP pr interval
})


// KNEX CONNECTION WITH CREDENTIALS FROM CONFIG
const knex = Knex(KnexFile.development)

// GIVE KNEX CONNECTION INSTANCE TO OBJECTION
Model.knex(knex)

// ROUTES 
app.use(userRoute, authlimiter)
app.use(indexRoute)
app.use(quizRoute)

// START THE SERVER
const port = process.env.PORT || 9090
const server = app.listen(port, (error) => {
    if(error){
        console.log("Error running the server")
    }
    console.log("Server running on port", server.address().port)
})

// PROTECT THE DATABASE FROM CRASH WHEN EXPERIENCING ERRORS
process.on("uncaughtException", (err, data) => {
    if(err){console.log("critical error, yet system kept running"); return
    }
})