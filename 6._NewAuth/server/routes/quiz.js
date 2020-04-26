const router = require('express').Router()

router.get('/quizzes', (req, res) => {
    res.send('Welcome to the quizpage');
})

router.get('/quizzes/:id', (req, res) => {
    const quizID = req.params.id
    res.send('Welcome to single quiz page ' + quizID)
})

module.exports = router