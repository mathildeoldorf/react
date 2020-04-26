const router = require("express").Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/user/login", async (req, res) => {
    const { username, password} = req.body;

    if (username && password) {
        const users = await User.query().select().where({ username:username }).limit(1);
        const user = users[0];

        if(!user){
            return res.status(404).send({response: "Wrong username"});
        }

        bcrypt.compare(password, user.password, (error, isSame) => {
            if(error){ // bcrypt library related error, not about the comparison
                return res.status(500).send({});
            }
            if (!isSame){
                return res.status(404).send({});
            }
            else{
                return res.status(200).send({ username: user.username });
            }
        })
    }
    else {
        return res.status(404).send({ message: "Missing username or password" });
    }
});

// users/register
router.post("/user/register", (req, res) => {
    const { username, password, repeatPassword } = req.body;
    if(username && password && repeatPassword && password === repeatPassword ){

        if(password.length < 8){
            return res.status(404).send({ response: "Password not fullfilling the requirements "});
        } else {
            bcrypt.hash(password, 10, async (error, hashedPassword ) => {
                if(error){console.log("error hashing")}

                console.log("hashed succesfully", hashedPassword);

                try{

                    const existingUser = await User.query().select().where({ username: username }).limit(1);

                    if(existingUser[0]){
                        return res.status(404).send({  });
                    } else {
                        const newUser = await User.query().insert({
                            username: username,
                            password: hashedPassword
                        });
                        return res.status(200).send({ response: newUser.username });
                    }
                    
                }
                catch(error){
                    return res.status(500).send({ response: "Something went wrong with the database" });
                }
                
            }); 
        }

    } 
    else if(password !== repeatPassword){
        return res.status(404).send({response: "Password and repeat password is not the same"});
    }
    else {
        return res.status(404).send({ response: "Missing fields" });
    }

});

module.exports = router;