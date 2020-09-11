const express = require('express')
const router = express.Router()

const Clients = []

router.get('/', (req, res) => {
    res.render('index/index')
})

router.get('/clients/register', (req, res) => {
    res.render('clients/register')
})

router.post('/clients/register', (req, res) => {

})


module.exports = router