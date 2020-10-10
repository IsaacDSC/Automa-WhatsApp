const fs = require('fs');
const { create } = require('venom-bot');
const path = require('path')

//const public = require('@public/images')
let venom_client;
var status
let key = 0

const sendText = async(telephone, msg) => {
    if (!venom_client) {
        return
        //console.log('client ainda não criado!');
        //await client();
    }
    return await venom_client.sendText(telephone, msg);
}

const sendImage = async(telephone, url, nameImg) => {
    if (!venom_client) {
        return
        //console.log('client ainda não criado!');
        //await client();
    }
    return await venom_client.sendImage(telephone, url, nameImg);
}


const stopClient = async() => {
    if (venom_client) {
        //  await venom_client.close()
        key = 0
        return await venom_client.close().then(() => console.log('Cliente Desativado'))
    }
    return console.log('client ainda não criado!');
}





async function client() {
    //if (venom_client) return venom_client;
    if (key == 1) { return }
    key = 1
    venom_client = await create('Delivery', (base64Qr, asciiQR) => {
            // Mostra o Qr Code no Terminal
            console.log(asciiQR);

            // Cria o arquivo png
            let dir = path.resolve(__dirname, '..', 'public', 'images', 'qrCode.png')
            exportQR(base64Qr, dir);
        },
        (statusSession) => {
            status = statusSession
            console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail
        }, {
            logQR: true, // Logs QR automatically in terminal
            browserArgs: ['--no-sandbox'], // Parameters to be added into the chrome browser instance
            autoClose: false,
        });

    function exportQR(qrCode, path) {
        qrCode = qrCode.replace('data:image/png;base64,', '');
        const imageBuffer = Buffer.from(qrCode, 'base64');
        fs.writeFileSync(path, imageBuffer);
    }


    await start(venom_client)

}
async function start(client) {
    console.log('Iniciado Com Sucesso')

    client.onStateChange((state) => {
        console.log(state);
        if (state == 'CONFLICT' || state == 'UNPAIRED' || state == 'UNLAUNCHED') {
            client.useHere();
        }
    });

    client.onMessage(async(message) => {


    });
}




exports.sendImage = sendImage
exports.sendText = sendText
exports.client = client
exports.venom_client = venom_client
exports.stopClient = stopClient