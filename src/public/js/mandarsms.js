function part_one() {
    var num1 = document.querySelector('#num1').value
    var DDD = document.querySelector('#DDD').value
    if (DDD == 'null') {
        alert('Selecione o DDD')
    }
    if (num1 == undefined || num1 == null || num1 == '') {
        alert('Adione o Numero telefonico sem o DDD')
    }
    if (DDD != 'null' && num1 != '') {
        window.open(`https://web.whatsapp.com/send?phone=+55${DDD}${num1}`, '_blank')
    }

}