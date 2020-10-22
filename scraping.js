let resultado = []
let tele 
try {
    function captura(){
        let elemento = document.querySelectorAll('.dbg0pd')
    
    let ctr = 0;
    elemento.forEach((e, i, array) => {
        setTimeout(function () {
            ctr++
            if (ctr === array.length) {
                ctr=0
                proximaPage= document.getElementsByClassName('d6cvqb')[1].getElementsByTagName('a')[0].click()
               setTimeout(()=>{captura()},5000) 
                fetch('http://127.0.0.1:3001/resultados',{
                    method:'POST',
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify(resultado)
                }).then(function(response) {
                    return response.json();
                  }).then(function(data) {
                    console.log('Created Gist:', data.html_url);
                  });

                
             }


            e.click()
            nomeLanchonete = document.querySelector('.qrShPb').getElementsByTagName('span')[0].innerText
            endereco = document.querySelector('.LrzXr').innerText
            telefone = document.querySelectorAll('[jscontroller="cSkPLb"]')[1].getElementsByTagName('span')[0].innerText

            if(!endereco){
                return
            }
            if(!telefone){
                return
            }
            if(!nomeLanchonete){
                return
            }
    
            if (telefone.length == 14) {
                return
            }
            resultado.push({ nomeLanchonete, endereco, telefone: telefone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '') })
    
        }, i * 3000)
    
    })
    }
    captura()
    
} catch (error) {
    proximaPage= document.getElementsByClassName('d6cvqb')[1].getElementsByTagName('a')[0].click()

}


