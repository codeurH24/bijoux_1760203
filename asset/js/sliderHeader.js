
let indexVisible = null;
let pauseLoop = false;
function loopSliderHeader() {

    if (pauseLoop) return;
    
    const image = document.querySelector('#header-slider .show img.visible');
    const images = document.querySelectorAll('#header-slider .show img');
    const points = document.querySelectorAll('#header-slider .tools .point');
    let index = Array.from(images).indexOf(image);
    
    indexVisible = index;
    images.forEach( item => {
        item.classList.remove('visible');
    })
    points.forEach( item => {
        item.classList.remove('active');
    })

    const indexExist = (index < images.length-1);
    index = indexExist ? index += 1 : 0;
    
    setVisibleImage(index);
}

function changeImage(element, leave) {
    
    // permet de prendre le controle sur le choix dans le slider
    pauseLoop = !leave;

    const points = document.querySelectorAll('#header-slider .tools .point');
    let index = Array.from(points).indexOf(element);
    setVisibleImage(index);
}

function setVisibleImage(index) {
    const images = document.querySelectorAll('#header-slider .show img');
    const points = document.querySelectorAll('#header-slider .tools .point');

    images.forEach( item => {
        item.classList.remove('visible');
    })
    points.forEach( item => {
        item.classList.remove('active');
    })

    const image = images.item(index);
    image.classList.add('visible');

    const point = points.item(index);
    point.classList.add('active');
}

setInterval(loopSliderHeader, 3000);