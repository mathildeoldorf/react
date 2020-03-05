
// Import library into node document
const express = require('express');

//initialize the library
const app = express();

// implement GET on this endpoint - 2 arguments: 1) endpoint and 2) callback function
    // when the client reaches the endpoint, then it returns a response
    // recieves request and returns a response
app.get("/", (req, res) =>{
    return res.send({message: 'response is here'});
}
);

app.get("/about", (req, res) => {
    return res.send({name: 'Mathilde'});
});

// Set app up with a port
app.listen(8080);