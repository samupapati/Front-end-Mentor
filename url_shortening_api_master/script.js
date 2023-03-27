let input = document.getElementById('input');
let botaoInput = document.getElementById('botaoInput');
let erro = document.getElementById('erro');
erro.style.visibility = 'hidden';
let header = document.getElementById('header')
let linksContainer = document.getElementById('links-container');
let botoesLista = document.getElementsByClassName('botaoLista');
let botaoMenu = document.getElementById('botao-menu');
botaoMenu.addEventListener('click', menuHamburguer);
let botaoMenuFechar = document.getElementById('botao-menu-fechar');
botaoMenuFechar.style.display = 'none';
botaoMenuFechar.addEventListener('click', fecharMenu);
let nav = document.getElementById('nav');
let headerDireita = document.getElementById('header-direita');
let headerEsquerda = document.getElementsByClassName('header-esquerda')[0];
let menuHamburguerDiv = document.getElementById('menu-hamburguer') 

function carregarLinksCriados(){
    if(localStorage.length > 0){
        for(i = 0; i < localStorage.length; i++){
            let linkAntigo = localStorage.key(i);
            let linkNovo = localStorage.getItem(linkAntigo);
    
            inserirLinkPagina(linkAntigo, linkNovo)
        }
    }
}


if(window.innerWidth < 1000){
    menuHamburguerDiv.appendChild(nav)
    menuHamburguerDiv.appendChild(headerDireita)
    botaoMenu.style.display = 'block'
} else{
    headerEsquerda.append(nav)
    header.appendChild(headerDireita)
    menuHamburguerDiv.style.display = 'none'
    botaoMenu.style.display = 'none'
    botaoMenuFechar.style.display = 'none'
}

document.body.onresize = function(){
    if(window.innerWidth < 1000){
        menuHamburguerDiv.appendChild(nav)
        menuHamburguerDiv.appendChild(headerDireita)
        botaoMenu.style.display = 'block'
    } else{
        headerEsquerda.append(nav)
        header.appendChild(headerDireita)
        menuHamburguerDiv.style.display = 'none'
        botaoMenu.style.display = 'none'
        botaoMenuFechar.style.display = 'none'
    }
}

function menuHamburguer(){
    menuHamburguerDiv.style.display = 'flex'
    botaoMenu.style.display = 'none'
    botaoMenuFechar.style.display = 'block'
}


function fecharMenu(){
    menuHamburguerDiv.style.display = 'none'
    botaoMenu.style.display = 'block'
    botaoMenuFechar.style.display = 'none'
}

input.addEventListener('keyup', (e) => {
    if(e.code === 'Enter'){
        e.preventDefault();
        verificaInput();
    }
})
botaoInput.addEventListener('click', (e) => {
    e.preventDefault();
    verificaInput();
});

function verificaInput(falha){
    let link = input.value;
    if(input.value === '' || falha === true){
        input.value = '';
        erro.style.visibility = 'visible';
        input.style.border = '3px solid red';
        input.className = 'placeholderRed';
    } else{
        if(link.substring(0,8) === 'https://'){
            encurtarLink(link)
        }else if(link.substring(0,4) === 'www.'){
            let linkModificado = 'https://' + link
            encurtarLink(linkModificado)
        }else{
            return verificaInput(falha = true)
        }

        input.value = '';
        erro.style.visibility = 'hidden';
        input.style.border = 'none';
        input.classList.remove('placeholderRed')

    }
}

async function encurtarLink(link){

    let linkApi = 'https://api-ssl.bitly.com/v4/shorten';

    const request = await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 68e29a4512c6ba11bd97813ea8f71eeeaca5d4f2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "long_url": link, "domain": "bit.ly" })
    });
    const data = await request.json();
    console.log(data)

    if(data.link){
        inserirLocalStorage(link, data.link);
        return;
    }

    return verificaInput(falha = true);

}
                     
function inserirLocalStorage(linkOrg, linkEncurtado){
    localStorage.setItem(linkOrg, linkEncurtado);
    inserirLinkPagina(linkOrg, linkEncurtado)
}
    
function inserirLinkPagina(linkOrg, linkEncurtado){
    if(linksContainer.childElementCount > 2){
        linksContainer.style.height = '350px';
    }

    let lista = document.createElement('div');
    lista.className = 'links-lista';
    linksContainer.appendChild(lista);

    let links = document.createElement('div');
    links.className = 'links-div';
    lista.appendChild(links);

    let linkOriginal = document.createElement('a');
    linkOriginal.className = 'linkInserido';
    linkOriginal.setAttribute('href', linkOrg);
    linkOriginal.setAttribute('target', '_blank');
    linkOriginal.innerHTML = linkOrg;
    links.appendChild(linkOriginal);

    let linkNovo = document.createElement('a');
    linkNovo.className = 'linkEncurtado';
    linkNovo.setAttribute('href', linkEncurtado);
    linkNovo.setAttribute('target', '_blank');
    linkNovo.innerHTML = linkEncurtado;
    links.appendChild(linkNovo);

    let botao = document.createElement('a');
    botao.className = 'botao botaoQuadrado botaoLista ' + linkEncurtado;
    botao.innerHTML = 'Copy';
    lista.appendChild(botao);

    Array.from(botoesLista).forEach(botao => {
        botao.addEventListener('click', () => copiarLink(botao));
        botao.addEventListener('click', () => estilizarBotaoLista(botao));
    })
    
}

async function copiarLink(botao){
    let textoCopiado = botao.classList[3];
    await navigator.clipboard.writeText(textoCopiado)
 
}

function estilizarBotaoLista(botao){
    botao.style.backgroundColor = '#3B2F55';
    botao.style.cursor = 'default';
    botao.style.filter = 'opacity(100%)'
    botao.innerHTML = 'Copied!';
}