   
        let shift = 0;
        let targetElmLeft = null;
        let targetElmRight = null;
        const thumbs = document.querySelector('#section4 .slider .thumbs');
        const divs = [...document.querySelectorAll('#section4 .slider .thumbs > div')];
        function sliderShiftThumbNext() {
            
            // ne pas refaire de translation tant que la precedente n'est pas fini
            if (waitClickNext()) {
                    console.log('waiting click');
                    return;
            }
            
            /*
             Toute position dépassant rightMax sera 
             considérée comme élément caché à droite.
             rightMax est la position droite du wrapper des images
             miniatures
            */
            const rightMax = thumbs.getClientRects()[0].right;
            
            // récuperer tout les elements cachés à droite
            const elements = [];
            for (let i = 0; i < divs.length; i++) {

                const div = divs[i]; // création de l'entité div courante
                const rect = div.getClientRects()[0]; // recupération des positions
                const right = rect.right; // récupération de la position de droite
                
                /*
                  si position droite de la div dépasse par la droite
                  la position droite du wrapper alors
                  cet element est considéré caché car il est 
                  partiellement ou totalement caché à droite du wrapper
                */
                if (right > rightMax) elements.push(div);
            }

            // si il reste des elements cachés alors continuer l'algorithme
            if (elements.length) {

                // 3eme élement ciblé
                const nElms = 2;
                /*
                idx détermine l'element cible actuellement caché qui deviendra visible
                à droite du wrapper. Si le énième élément ne peut pas exister c'est qu'il ne reste 
                plus accez déléments cachés. Dans ce cas on récupére le dernier element caché.
                */
                const idx = (elements.length-1) >= nElms ? nElms : elements.length-1;
                /*
                  L'élement caché à donc une distance entre le bord droit du wrapper 
                  et le bord droit de l'élément caché. Cette distance détermine le décalage recherché.
                */
                targetElmRight = elements[idx];
                const right = targetElmRight.getClientRects()[0].right
                const distance = (right - rightMax);
                shift = shift + distance;
                
                /*
                    Toute les miniatures seront décallées de la distance déterminée.
                */
                divs.forEach(function(div) {
                    div.style.transform = `translateX(-${shift}px)`;
                });
            }
            
        }

        function sliderShiftThumbBack() {
            
            
            if (waitClickBack()) {
                    console.log('waiting click');
                    return;
            }

            /*
             Toute position dépassant leftMax sera 
             considérée comme élément caché à gauche.
             leftMax est la position gauche du wrapper des images
             miniatures
            */
            const leftMax = thumbs.getClientRects()[0].left;
            
            // récuperer tout les elements cachés à droite
            const elements = [];
            for (let i = 0; i < divs.length; i++) {

                const div = divs[i]; // création de l'entité div courante
                const rect = div.getClientRects()[0]; // recupération des positions
                const left = rect.left; // récupération de la position de droite
                
                /*
                  si position gauche de la div dépasse par la gauche 
                  la position gauche du wrapper alors
                  cet element est considéré caché car il est 
                  partiellement ou totalement caché à droite du wrapper
                */
                if (left < leftMax) {
                    elements.push(div); 
                }
            }

            // si il reste des elements cachés alors continuer l'algorithme
            if (elements.length) {

                // 3eme élement ciblé
                const nElms = 2;
                /*
                idx détermine l'element cible actuellement caché qui deviendra visible
                à gauche du wrapper. Si le énième élément ne peut pas exister c'est qu'il ne reste 
                plus accez déléments cachés. Dans ce cas on récupére le dernier element caché.
                */
                const idx = (elements.length-1) >= nElms ? nElms : elements.length-1;
                /*
                  L'élement caché à donc une distance entre le bord droit du wrapper 
                  et le bord droit de l'élément caché. Cette distance détermine le décalage recherché.
                */
                targetElmLeft = elements.reverse()[idx];
                const left = targetElmLeft.getClientRects()[0].left;
                const distance = (left - leftMax);
                
                shift = shift + distance ;

                if (parseInt(shift,10) === 0 ) shift = 0;
                
                /*
                    Toute les miniatures seront décallées de la distance déterminée.
                */
                divs.forEach(function(div) {
                    div.style.transform = `translateX(-${shift}px)`;
                });
            }
        }

        function waitClickBack() {

            targetElmRight = null;

            if (targetElmLeft !== null) {
                const leftTargetElm = targetElmLeft.getClientRects()[0].left;
                const leftThumbs = thumbs.getClientRects()[0].left;
                
                return parseInt(leftTargetElm,10) <  parseInt(leftThumbs,10);
            }
        }

        function waitClickNext() {

            /*
              l'utilisation du bouton next, 'clear' la fonction waitClickBack() et inversement.
              Cela évite que les deux fonctions se bloque entre elles par logique.
            */
            targetElmLeft = null;

            /*
              targetElmRight est le derniere element cible qui à permis 
              de faire la translation de la miniature.
              Si la translation n'est pas fini lors du dernier clique alors, il n'est pas
              permis de ré-évaluer une nouvelle translation pour éviter des bugs.
            */
            if (targetElmRight !== null) {
                const rightTargetElm = targetElmRight.getClientRects()[0].right;
                const rightThumbs = thumbs.getClientRects()[0].right;
                /*
                  Lorsque le coté droit de la miniature à fini de dépasser 
                  le coté droit du wrapper d'images miniature alors c'est 
                  que la translation est fini.
                */
                return parseInt(rightTargetElm,10) > parseInt(rightThumbs,10);
            }
        }

        

        function initSlider() {
            const slider = document.querySelector('#section4 .slider');
            const thumbs = slider.querySelectorAll('.thumbs .item img');
            // console.log('initSlider() thumbs', thumbs);

            /* 
             recheche de l'element actif parmis les miniatures.
             si aucune miniature n'est trouver choisir la premiere des miniatures
            */
            let elementActive=null
            for (const thumb of thumbs) {
                if (thumb.classList.contains('active')) {
                    elementActive = thumb
                }
            }

            /*
             Si aucun element actif alors choisir le premier et le mettre actif
            */
            if (elementActive === null) {
                elementActive = thumbs[0];
                elementActive.classList.add('active');
            }
                
            const pathThumbs = getPathImages(elementActive);

            const basenameThumb = basename(elementActive.src);
            const basenameFull = basenameThumb.replace('thumb','full');

            /*
             initialiser les images full en prenant 
             en compte l'image miniature active
            */
            const imgFull = slider.querySelectorAll('.show img');
            for (const img of imgFull) {
                
                if (basename(img.src) === basenameFull) {
                    img.classList.add('visible');
                    img.style.zIndex = 2;
                    continue;
                }
                img.style.zIndex = 1;
            }
        }
        initSlider();

        function basename(str) {
            return str.split('/').reverse()[0];
        }

        function getPathImages(img) {
            const arrPath = img.src.split('/').reverse();
            arrPath.shift();
            const path = arrPath.reverse().join('/');
            return path;
        }

        function choiceClick(e)
        {
            const src = e.querySelector('img').src;
            const basename = src.split('/').reverse()[0];
            const basenameFull = basename.replace("thumb", 'full');
            console.log('choiceClick basenameFull', basenameFull );

            const images = document.querySelectorAll('#section4 .slider .show img');
            
            for (const image of images) {
                
                image.style.zIndex = 1;
                image.classList.remove('visible')
                const src = image.src;
                const basename = src.split('/').reverse()[0];
                
                if (basename === basenameFull) {
                    console.log('image', image);
                    image.style.zIndex = 2;
                    image.classList.add('visible');
                }
            }

        }