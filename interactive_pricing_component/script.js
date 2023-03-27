import 'https://cdn.interactjs.io/v1.9.20/auto-start/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/drag/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/resize/index.js'
import 'https://cdn.interactjs.io/v1.9.20/modifiers/index.js'
import 'https://cdn.interactjs.io/v1.9.20/dev-tools/index.js'
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js'

let spanNumPageviews = document.getElementById('numero-pageviews');
let spanPreco = document.getElementById('preco');
let barraProgress = document.getElementById('barra');
let divValorProgress = document.getElementById('valor');
let slider = document.getElementById('slider');
let toggle = document.getElementById('botao-toggle');
let valorSemDesconto = 16;
let toggleActive = false;

const valores = {
    valor1: {
        pageviews: 10,
        value: 8,
    },
    valor2: {
        pageviews: 50,
        value: 12,
    },
    valor3: {
        pageviews: 100,
        value: 16,
    },
    valor4: {
        pageviews: 500,
        value: 24,
    },
    valor5: {
        pageviews: 1000,
        value: 36,
    },
}

const valoresComDesconto = {
    valor1: valores.valor1.value - (valores.valor1.value * (25/100)),
    valor2: valores.valor2.value - (valores.valor2.value * (25/100)),
    valor3: valores.valor3.value - (valores.valor3.value * (25/100)),
    valor4: valores.valor4.value - (valores.valor4.value * (25/100)),
    valor5: valores.valor5.value - (valores.valor5.value * (25/100)),
}

window.onload = function (){
    setarValores(valores.valor3.pageviews, valores.valor3.value);
    slider.style.transform = 'translateX(0px)';
}

function setarValores(numPageview, valor){
    if(numPageview === 1000){
        spanNumPageviews.innerHTML = numPageview + '<span>M</span>';
    } else{
        spanNumPageviews.innerHTML = numPageview + '<span>K</span>';
    }
    spanPreco.innerHTML = valor + '.00';
}

let posXcursor = 0
interact('#slider').draggable({ //Capturando o movimento do slider
    listeners: {
        move(event){ //Observa o movimento do slider
            let larguraBarra = barraProgress.clientWidth / 2;
            let larguraBarraNegativo = -larguraBarra;

            posXcursor += event.dx //Pega a posição do cursor
            
            const posicoes = {
                posicao1: [larguraBarraNegativo, larguraBarraNegativo/2],
                posicao2: [larguraBarraNegativo/2, larguraBarra - larguraBarra],
                posicao3: [larguraBarra - larguraBarra, larguraBarra/2],
                posicao4: [larguraBarra/2, larguraBarra],
            }
        
            if(posXcursor > larguraBarraNegativo && posXcursor < larguraBarra){
                slider.style.transform = `translateX(${posXcursor}px)`
                divValorProgress.style.width = (posXcursor + larguraBarra) + 'px';
                
                
                if(posXcursor > posicoes.posicao1[0] && posXcursor < posicoes.posicao1[1]){
                    
                    toggleActive === true ? 
                        setarValores(valores.valor1.pageviews, valoresComDesconto.valor1)
                        :
                        setarValores(valores.valor1.pageviews, valores.valor1.value);
        
                    valorSemDesconto = valores.valor1.value;
        
                } else if(posXcursor > posicoes.posicao2[0] && posXcursor < posicoes.posicao2[1]-60){
                                
                    toggleActive === true ? 
                        setarValores(valores.valor2.pageviews, valoresComDesconto.valor2)
                        :
                        setarValores(valores.valor2.pageviews, valores.valor2.value);
        
                    valorSemDesconto = valores.valor2.value;
                    
                } else if(posXcursor > posicoes.posicao2[0]/2 && posXcursor < posicoes.posicao3[1]/2){
                                
                    toggleActive === true ? 
                        setarValores(valores.valor3.pageviews, valoresComDesconto.valor3)
                        :
                        setarValores(valores.valor3.pageviews, valores.valor3.value);
        
                    valorSemDesconto = valores.valor3.value;
                    
                } else if(posXcursor > posicoes.posicao3[0] && posXcursor < posicoes.posicao3[1]){
                    
                    toggleActive === true ? 
                        setarValores(valores.valor4.pageviews, valoresComDesconto.valor4)
                        :
                        setarValores(valores.valor4.pageviews, valores.valor4.value);
        
                    valorSemDesconto = valores.valor4.value;
                    
                } else if(posXcursor > posicoes.posicao4[0] && posXcursor < posicoes.posicao4[1]){
                    
                    toggleActive === true ? 
                        setarValores(valores.valor5.pageviews, valoresComDesconto.valor5)
                        :
                        setarValores(valores.valor5.pageviews, valores.valor5.value);
        
                    valorSemDesconto = valores.valor5.value;
                    
                }
            }
        },
    }
})

toggle.addEventListener('click', () => {
    let pageviewNotK = spanNumPageviews.innerText.substring(0, spanNumPageviews.innerText.length - 1);

    if(toggle.classList.contains('toggle-active')){
        toggle.classList.toggle('toggle-active');
        setarValores(pageviewNotK, valorSemDesconto);
        toggleActive = false;
    } else{
        let porcent = 25/100;
        let valor = spanPreco.innerText.slice(0, 2) ;
        let multValor = valor * porcent;
        let valorComDesconto = valor - multValor;

        toggle.classList.toggle('toggle-active');
        setarValores(pageviewNotK, valorComDesconto);
        toggleActive = true;
    }
})