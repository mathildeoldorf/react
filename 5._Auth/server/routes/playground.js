const router = require('express').Router();

// Using next() as custom middleware printing a timestamp - order is important
router.use((req, res, next) => {
    console.log("Timestamp", new Date());

    // instead of giving a response, it keeps going to the next path in line
    next();
    // res.redirect('/secondpath');
    // res.send({response: "first path"});
});

router.get("/secondpath", (req, res, next) => {
    console.log('hit the second path for the first time');
    next();
});

router.get("/secondpath", (req, res) => {
    console.log('hit the second path for the second time');
    res.send({response: "second path"});
});

module.exports = router;