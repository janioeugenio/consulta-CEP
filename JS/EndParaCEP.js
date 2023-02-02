//Recebe os ores do campo
const rua = document.querySelector('[data-logradouro]')
const cidade = document.querySelector('[data-localidade]')
const estado = document.querySelector('[data-uf]')

//Isntacia o label que exibe o resultado
const camporesultado = document.querySelector('[data-resultado]')

//Recebe o select de bairros
const camposelect = document.querySelector('[data-select-bairros]')

//Funcão de criar bairros
async function criaBairro(){

    //seta o URL da conexão
    var url = "https://viacep.com.br/ws/"+estado.value+"/"+cidade.value+"/"+rua.value+"/json/"

    //Parâmetros do POST
    const init = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }


    //recebe os valores do POST
    const resposta = await fetch (url,init)
    const dados = await resposta.json()

    //Percorre o resultado e adiciona os bairros ao options
    dados.forEach(item => {

        addOption(item.bairro)
     
    });

}

//parÂmetros da API para receber as informações
async function consulta(){

    //Recebe o valor do bairro selecionado no Option
    var bairro = camposelect.options[camposelect.selectedIndex].value

    //Seta a URL de conexão com os valores dos campos
    var url = "https://viacep.com.br/ws/"+estado.value+"/"+cidade.value+"/"+rua.value+"/json/"

    //Parâmetros do POST
    const init = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }


    //recebe os valores do POST
    const resposta = await fetch (url,init)
    const dados = await resposta.json()
    
    //resutCEP recebe o valor do CEP selecionado
    let resutCEP = ''

    //Percorre o resultado do post
    dados.forEach(item => {

        //Compara o bairro do resultado com o bairro selecionado do Optin
        if(item.bairro.toLowerCase() == bairro.toLowerCase()){
            //Insere o CEP do item para ser exibido
            resutCEP = item.cep
        }
        
    });

    //Exibe o valor do CEP
    camporesultado.innerHTML = 'CEP '+resutCEP
}

function addOption(valor){
    // Criar a nova option
    var option = document.createElement("Option")

    option.value = valor
    option.innerHTML = valor
    
    camposelect.appendChild(option)
}
//função para limpar os campos de options para proxima pesquisa
function removeOption(){

    while (camposelect.options.length > 0) {
        camposelect.remove(0);
    }

    var option = document.createElement("Option")

    option.value = 'Selecionar Bairro'
    option.innerHTML = 'Selecionar Bairro'
    
    camposelect.appendChild(option)
}

rua.addEventListener('focusout',()=>{
    removeOption()
    criaBairro()
})

//recebe o valor do bairro
camposelect.addEventListener('change', ()=>{
    consulta()
})

rua.addEventListener('focusin', ()=>{
    //Limpa o campo resultado
    camporesultado.innerHTML = ''
})
    