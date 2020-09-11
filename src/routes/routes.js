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
    //    res.send(req.body.clients)
    const clientes = req.body.clients
    Clients.push(clientes).then(() => {
        res.redirect('/clients')
    })
})

router.get('/clients', (req, res) => {
    res.send(Clients)
})


module.exports = router