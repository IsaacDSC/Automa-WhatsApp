const express = require('express')
const router = express.Router()
const boot = require('../config/boot')
const Clients = []
const path = require('path')
const fs = require('fs')
const folder = path.resolve(__dirname + '', '../', 'public', 'images')

router.get('/', (req, res) => {
    res.render('index/index', { clients: Clients })
})

router.post('/resultados', async (req, res) => {
    const corpo = await req.body
    fs.writeFile('dados.json', JSON.stringify(corpo), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    res.send(corpo)
})
router.get('/clients/register', (req, res) => {
    res.render('clients/register')
})

router.post('/clients/register', (req, res) => {
    const Desc = req.body.cursos
    var re = /\s*\r\n\s*/;
    var numerosLists = req.body.clients.split(re);

    for (let i = 0; i < numerosLists.length; i++) {
        console.log('cadastrando: ' + numerosLists[i])
        Clients.push({
            index: i,
            desc: Desc,
            message: req.body.message,
            numero: numerosLists[i]
        })
    }

    //console.log(Clients)
    res.redirect('/views')
})

router.get('/views', (req, res) => {
    Clients.forEach((element, index) => {
        console.log(index, element)
    })
    res.render('clients/views', { element: Clients })
})

router.get('/enviar', async (req, res) => {
     
    let ctr = 0;
    await Clients.forEach((element, index, array) => {
        ctr++
        
        setTimeout(function () {
            boot.sendText('55' + element.numero + '@c.us', element.message).then((result) => {
                console.log('Result: ', result);
                
            }).catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            })
        }, 1000 * index)

        if (ctr === array.length) {
            res.redirect('/')
        }

    })
})

router.get('/image', async (req, res) => {
    let contador = 0;

fs.readdir(folder, (err, paths) => {
        Clients.forEach((element, index, array) => {
            setTimeout(function () {
                paths.forEach((e, index, array) => {
                    contador++
                    boot.sendImage('55' + element.numero + '@c.us', folder + '/' + e, 'nome').then((result) => {
                        console.log('Result: ', result); //return object success
                    }).catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    })

                    if (contador === array.length) {
                        res.redirect('/')
                    }
                })
            }, 2000 * index)
        })
    })
})

module.exports = router