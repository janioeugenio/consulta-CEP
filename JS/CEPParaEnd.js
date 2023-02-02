//Recebe os atributos HTML
const cep = document.querySelector('[data-cep]')
const labelestado = document.querySelector('[data-estado]')
const labelcidade = document.querySelector('[data-cidade]')
const labelbairro = document.querySelector('[data-bairro]')
const labelrua = document.querySelector('[data-rua]')
const labelEndCompleto = document.querySelector('[data-End-completo]')

//parÂmetros da API para receber as informações
async function consultaEnd(){

    //Seta a URL de conexão com os valores dos campos
    var url = "https://viacep.com.br/ws/"+cep.value+"/json/"

    //Parâmetros do POST
    const init = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }


    //recebe os valores do POST
    const resposta = await fetch (url,init)
    const dados = await resposta.json()
    
    //Insere o valor no label

    if(dados.bairro == ""){
        
        labelestado.innerHTML = "Estado: "+dados.uf
        labelcidade.innerHTML = "Cidade: "+dados.localidade
        labelEndCompleto.innerHTML = dados.localidade+", "+dados.uf
    }

    else{

        labelestado.innerHTML = "Estado: "+dados.uf
        labelcidade.innerHTML = "Cidade: "+dados.localidade
        labelbairro.innerHTML = "Bairro: "+dados.bairro
        labelrua.innerHTML = dados.logradouro
        labelEndCompleto.innerHTML = dados.logradouro+  ", "+dados.bairro+ ", "+dados.localidade+ ", " +dados.uf 
    }
}

cep.addEventListener('focusout',()=>{
    consultaEnd();
})

cep.addEventListener('focusin',()=>{
    labelestado.innerHTML = ""
    labelcidade.innerHTML = ""
    labelbairro.innerHTML = ""
    labelrua.innerHTML = ""
    labelEndCompleto.innerHTML = ""
})