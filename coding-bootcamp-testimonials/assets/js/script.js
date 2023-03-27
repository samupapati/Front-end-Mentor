let tanya = document.getElementById('tanya')
let john = document.getElementById('john');
let div1 = document.getElementById('div1');
let div2 = document.getElementById('div2');
let button1 = document.getElementById('botao1')
let button2 = document.getElementById('botao2')

button1.addEventListener('click', mudaConteudo)
button2.addEventListener('click', mudaConteudo)

function mudaConteudo(){
    tanya.classList.toggle('desaparece')
    john.classList.toggle('desaparece')
    div1.classList.toggle('desaparece')
    div2.classList.toggle('desaparece')
}
