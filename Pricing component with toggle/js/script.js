
var toggleOnDiv = document.getElementById('toggle-on-div')
var toggleOn = document.getElementById('toggleOn')
var toggleOffDiv = document.getElementById('toggle-off-div')
var toggleOff = document.getElementById('toggleOff')
var preco1 = document.getElementsByClassName('preco1')
var preco2 = document.getElementsByClassName('preco2')

var verifDisplayOn = true
var verifDisplayOff = false


toggleOnDiv.style.display = "block"
toggleOffDiv.style.display = "none"
Array.from(preco2).forEach((item) => {
    item.style.display = "none"
    verifDisplayOff = false
})

toggleOn.addEventListener('click', trocaBotao)
toggleOff.addEventListener('click', trocaBotao)

function trocaBotao(){
    if(toggleOffDiv.style.display === 'none'){
        toggleOffDiv.style.display = 'block';
    } else{
        toggleOffDiv.style.display = 'none';
    }
    if(toggleOnDiv.style.display === 'block'){
        toggleOnDiv.style.display = 'none';
    } else{
        toggleOnDiv.style.display = 'block';
    }
    if(verifDisplayOff === false){
        Array.from(preco1).forEach((item) => {
            item.style.display = "none"
            verifDisplayOn = false
        })
        Array.from(preco2).forEach((item) => {
            item.style.display = "block"
            verifDisplayOff = true
        })
    } else{
        Array.from(preco1).forEach((item) => {
            item.style.display = "block"
            verifDisplayOn = true
        })
        Array.from(preco2).forEach((item) => {
            item.style.display = "none"
            verifDisplayOff = false
        })
    }
}

