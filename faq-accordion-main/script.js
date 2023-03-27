let summary = document.getElementsByTagName('summary');
let cubo = document.getElementById('cubo');

Array.from(summary).forEach(summary => {
    summary.addEventListener('pointerover', moverCubo)
    summary.addEventListener('pointerleave', resetPositionCubo)
})

function moverCubo(){
    cubo.style.transform = 'translateX(-40px)'
}

function resetPositionCubo(){
    cubo.style.transform = 'translateX(0px)'
}