const path = require('path')
const boot = require('../config/boot')
const folder = path.resolve(__dirname + '', '../', 'public', 'propaganda')



async function send(req, res, Clients){
    let ctr = 0
    await Clients.forEach((element, index, array) => {
        ctr++
        setTimeout(function() {
            boot.sendImage('5524' + element.numero + '@c.us', folder + '/' + '23.12.2020.jpeg', element.message).then((result) => {
                console.log('sending img: ' + result)
                console.log('caminho absoluto Imagem: ' + folder + '/' + '23.12.2020.jpeg', )
                console.log('message: ' + element.message)
                console.log('para: ' + element.numero)
            }).catch((err) => {
                console.log('error sending img clients: ' + err)
            })
        }, 2000 * index)


        if (ctr === array.length) {
            res.redirect('/sendMessage')
        }
    })
}


exports.send = send