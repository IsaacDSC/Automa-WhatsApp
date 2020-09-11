const express = require('express')
const router = express.Router()

const Clients = []

router.get('/', (req, res) => {
    res.render('index/index', { clients: Clients })
})

router.get('/clients/register', (req, res) => {
    res.render('clients/register')
})

router.post('/clients/register', (req, res) => {
    var re = /\s*\r\n\s*/;
    var numerosLists = req.body.clients.split(re);

    for (let i = 0; i < numerosLists.length; i++) {
        console.log('cadastrando: ' + numerosLists[i])
        Clients.push({
            index: i,
            numero: numerosLists[i]
        })
    }

    //console.log(Clients)
    res.redirect('/')
})

router.get('/clients', (req, res) => {

})


module.exports = router