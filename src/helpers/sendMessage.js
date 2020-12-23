const boot = require('../config/boot')

async function send(req, res, Clients){
    let ctr = 0;
    await Clients.forEach((element, index, array) => {
        ctr++
        setTimeout(function() {
            boot.sendText('5524' + element.numero + '@c.us', element.message).then((result) => {
                console.log('Sending message: ', result);
            }).catch((erro) => {
                console.error('Error when sending menssage: ', erro); //return object error
            })
        }, 1000 * index)

        if (ctr === array.length) {
            res.redirect('/')
        }

    })
}


exports.send = send