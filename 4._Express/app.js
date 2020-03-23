
// const express = require('express');
// const app = express();
// app.get("/", (req, res) =>{
//     return res.send({message: 'response is here'});
// }
// );
// app.get("/about", (req, res) => {
//     return res.send({name: 'Mathilde'});
// });
// app.listen(8080);


// Import library into node document
const express = require("express");
//initialize the library
const app = express();

// Importing a library to parse the response body as json
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));

//serving client files with express.static middleware - inbuilt middleware security measure
// making sure the client only has access to the public folder
app.use(express.static("public"));

let arrPersons = [
    {"id":1, "name":"A", "gender":"female" },
    {"id":2, "name":"B", "gender":"male" },
    {"id":3, "name":"C", "gender":"female" },
    {"id":4, "name":"D" }
] 
let currentID = 4;




app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/index.html"); 

});


// implement GET on this endpoint - 2 arguments: 1) endpoint and 2) callback function
    // when the client reaches the endpoint, then it returns a response
    // recieves request and returns a response
app.get("/pathvariable/:customvalue/:multiple", (req, res) => {
    const customvalue = req.params.customvalue; // get the values of the url parameters from the request
    const anothervalue = req.params.multiple;
    
    res.send({"customvalue is": customvalue,
     "anothervalue is ": anothervalue});
})

app.get("/time", (req, res) => {
    let today = new Date();
    const localeTime = today.toLocaleString();
    const time = today.getHours()+':'+today.getMinutes();
    console.log(localeTime); 
    res.send({  "today is ":today.toDateString(),
                "the time is": time,
                "weekday ": today.toLocaleDateString("en-us", { weekday:"long" }) 
    });
})

app.get("/persons", (req, res) => {
    res.send(arrPersons);
})
app.get("/persons/:id", (req, res) => {
    const id = req.params.id;

    // search the array of persons and if the id macthes, save the person into a variable and return that person
    const foundPerson =  arrPersons.find(person=>{
        if(id == Number(person.id)){
            return person
        }
    });
    res.send(foundPerson);
})

app.get("/search/", (req, res) => {
    console.log(req.query);
    return res.send({
        "search query": req.query
     });
})

app.post("/persons/", (req, res) => {
    console.log(req.body)
    const newPerson = req.body
    newPerson.id = ++currentID
    arrPersons.push(newPerson)
    return res.send({"response": 1, newPerson})
})

app.put("/persons/:id", (req, res) => {
    const id = req.params.id;
    const changedValue = req.body.name;
    const personIndex = arrPersons.findIndex(person => person.id === Number(id))
    arrPersons[personIndex] = {...arrPersons[personIndex], ...req.body}
    return res.send(arrPersons[personIndex])
})

app.delete("/persons/:id", (req, res) => {
    const id = req.params.id;
    arrPersons = arrPersons.filter( (person) =>  person.id != Number(req.params.id)
    )
    res.send(arrPersons)
})

// Set app up with a port
app.listen(9090, (err) => {
    if (err) {
        console.log("error")
    }
    console.log("server running")
})
