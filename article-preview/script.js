let divTexts = document.getElementById('div-texts');
let divAboutShare = document.getElementById('div-about-share');
let foto = document.getElementById('foto');
let shareText = document.getElementById('share-text');
let divIcons = document.getElementById('icons');
let divNameDate = document.getElementById('name-date');
let iconShare = document.getElementById('share');
let shareIconDiv = document.getElementById('float-share');

document.body.onresize = function(){
    if(window.innerWidth > 800 && foto.classList.contains('none')){
        esconderIconsMobile();
        mostrarIconsDesktop();
    } else if(window.innerWidth < 800 && shareIconDiv.hasChildNodes()){
        esconderIconsDesktop();
        mostrarIconsMobile();
    }
}


iconShare.addEventListener('click', () => {
    if(window.innerWidth < 800){
        if(!foto.classList.contains('none')){
            mostrarIconsMobile();
        } else{
            esconderIconsMobile();
        }
    } else{
        if(shareIconDiv.classList.contains('none')){
            mostrarIconsDesktop();
        }else{
            esconderIconsDesktop();
        }
    }
})

function mostrarIconsMobile(){
    foto.classList.toggle('none');
    divNameDate.classList.toggle('none');
    
    shareText.classList.toggle('none');
    divIcons.classList.toggle('none');

    divTexts.style.marginBottom = '80px';
    
    divAboutShare.style.backgroundColor = 'hsl(217, 19%, 35%)';
    divAboutShare.style.position = 'absolute';
    divAboutShare.style.bottom = '0';
    divAboutShare.style.padding ='15px 40px'
    divAboutShare.style.borderBottomLeftRadius ='20px'
    divAboutShare.style.borderBottomRightRadius ='20px'
}

function esconderIconsMobile(){
    foto.classList.toggle('none');
    divNameDate.classList.toggle('none');
    
    shareText.classList.toggle('none');
    divIcons.classList.toggle('none');

    divTexts.style.marginBottom = '0px';
    
    divAboutShare.style.backgroundColor = 'initial';
    divAboutShare.style.position = 'initial';
    divAboutShare.style.bottom = '0';
    divAboutShare.style.padding ='0'
}

function mostrarIconsDesktop(){
    shareIconDiv.classList.toggle('none');
    divAboutShare.appendChild(shareIconDiv);

    shareIconDiv.appendChild(shareText)
    shareIconDiv.appendChild(divIcons)
    shareText.classList.toggle('none');
    divIcons.classList.toggle('none');
}

function esconderIconsDesktop(){
    const shareIconDivAfter = document.styleSheets[0].cssRules[21].cssRules[4];


    shareIconDiv.classList.toggle('none');
    
    divAboutShare.appendChild(shareText)
    divAboutShare.appendChild(divIcons)

    shareText.style.order = '0'
    divIcons.style.order = '1'
    iconShare.style.order = '2'

    shareText.classList.toggle('none');
    divIcons.classList.toggle('none');

}