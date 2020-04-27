const express = require("express")
const server = express()

// Middleware TO SERVE STATICALLY HTML
server.use(express.static('public'))

server.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/staticallyservedhtml.html")
})

// SERVER SIDE RENDERING HTML
const fs = require("fs")
const ssrPage = fs.readFileSync("public/sshhtml.html", "utf8")

server.get("/ssr", (req, res) => {
    return res.send(ssrPage )
})

server.listen(80, (error) => {
    if(error){
        console.log(error)
    }
    console.log("Server is running on port", 80)
})

// improve this after!