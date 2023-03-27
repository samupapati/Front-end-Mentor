let advice = document.getElementById('advice')
let contConselho = document.getElementById('contConselho') 
let spanConselho = document.getElementById('spanConselho') 
let buttonGerar = document.getElementById('buttonGerar') 

function main(){
    data = getConselho('https://api.adviceslip.com/advice')
    let conselho = JSON.parse(data)
    return conselho
}

function getConselho(url){
    let request = new XMLHttpRequest()
    request.open('GET', url, false)
    request.send()

    return request.responseText
}

function criarConselho(){
    spanConselho.innerHTML = main().slip.advice
}

function criarId(){
    advice.innerHTML = 'Advice #' + main().slip.id
}

buttonGerar.addEventListener('click', criarConselho)
buttonGerar.addEventListener('click', criarId)