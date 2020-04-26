const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")

const alphaCharacterValidation = /[a-zA-Z -]/
const alphaNumericCharacterValidation = /[a-zA-Z0-9]/
const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

let user
let sess

// ###################################### REGISTER

// router.post("/user/register", [
//     check("firstName").isAlpha().isLength({ max: 255 }),
//     check('lastName').isAlpha().isLength({ max: 255 }),
//     check('email').isEmail(),
//     check('password').isAlphanumeric().isLength({ min: 8}),
//     check('repeatPassword').isAlphanumeric()..isLength({ max: 8})
// ], (req, res) => {
//     const errors = validationResult(req)
//     const { firstName, lastName, email, password, repeatPassword } = req.body

//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() })
//     }

router.post("/user/register", async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body

    if(!firstName && !lastName && !email && !password && !repeatPassword){ 
        return res.status(400).send({ response: "Missing fields" }) 
    }
    if(!password.length === 8){
        return res.status(400).send({ response: "Password not fulfilling the requirements" })
    }
    if(password !== repeatPassword){ 
        return res.status(400).send({ response: "Passwords doesn't match" })
    }
    if(alphaCharacterValidation.test(firstName) === false && alphaCharacters.test(lastName) === false){
        return res.status(400).send({ response: "Not a valid datatype" })
    }
    if(alphaNumericCharacterValidation.test(password) === false && alphaNumericCharacters.test(repeatPassword) === false){
        return res.status(400).send({ response: "Not a valid datatype" })
    }
    if(emailValidation.test(email) === false){
        return res.status(400).send({ response: "Not a valid datatype" })
    }

    // email validation
    // string validation

    // if(typeof firstName !== 'string' && typeof(lastName) !== "string"){
    //     return res.status(400).send({ response: "Invalid name" })
    // }

    // console.log(JSON.parse(firstName), typeof firstName);

    try{
        user = await User.query().select().where({ email: email }).limit(1)
        if(user[0]){
            return res.status(400).send({ response: "User already exists" })
        }

        bcrypt.hash(password, 10, async (error, hashedPassword) => {
            if(error){
                console.log("Error hashing password")
                return res.status(404).send({ response: "Error hashing password" })
            }
            
            console.log("Hashed password succesfully", hashedPassword)

            user = await User.query().insert({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            })
            sess = req.session
            sess.user = user
            res.redirect("/user/profile")

            // return res.status(200).send({ response: "Registered " + user.email + " succesfully" })
        })
    }
    catch(error){
        return res.status(500).send({ response: "Error connecting to the database"})
    } 
})



// ###################################### LOGIN

router.post("/user/login", async (req, res) => {

    const { email, password } = req.body

    if(!email && !password){
        return res.status(400).send({ response: "Missing fields" }) 
    }
    if(!password.length === 8){
        return res.status(400).send({ response: "Password not fulfilling the requirements" })
    }
    if(alphaNumericCharacterValidation.test(password) === false){
        return res.status(400).send({ response: "Not a valid datatype" })
    }
    if(emailValidation.test(email) === false){
        return res.status(400).send({ response: "Not a valid datatype" })
    }

    const userReq = await User.query().select().where({ email:email }).limit(1)
    user = userReq[0]

    if(!user){
        return res.status(404).send({ response: "User not found" })
    }
    bcrypt.compare(password, user.password, (error, isSame) => {
        if(error){ // error in bcrypt
            return res.status(500).send({ response: "error" })
        }
        if (!isSame){
            return res.status(404).send({ response: "User not found" })
        }

        sess = req.session
        sess.user = user

        res.redirect("/user/profile")        
    })
})

// ###################################### LOGOUT

router.get("/user/logout", (req, res) => {
    // req.session.user = user
    // user.isOnline = 0
    console.log(user + " logging out, online status ");
    // req.session.destroy((err) => {
    //     if(err) {
    //         return res.status(500).send({ response: "error logging out" })
    //     }
    //     res.redirect("/")
    // })
})

// ###################################### PROFILE

router.get("/user/profile", async (req, res) => {
    const userID = user.ID

    if(!req.session){
        res.redirect("/")
    }

    const userReq = await User.query().select().where({ ID:userID }).limit(1)
    user = userReq[0]

    if(!user){
        req.session.reset();
        console.log("User not found")
        res.redirect("/user/login")
    }

    const onlineStatus = user.isOnline = 1

    res.locals.user = user; 
    res.status(200).send({ response: "Welcome to your profile " + user.email + ". Your online status is " + onlineStatus})
})

module.exports = router