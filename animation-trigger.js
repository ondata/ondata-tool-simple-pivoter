// Porzione di codice per triggerare animazione cavo elettrico
let textbox1 = document.getElementById("input");
let immagine = document.getElementById("cavo");


// Funzione che capise se l'elemento clickato è la textbox e fa partire l'animazione qualora esso lo sia.
// Rimuove l'animazione al click in altro punto del documento
document.addEventListener("click", function(evt) {
    let targetElement = evt.target;

    do  {

        if(targetElement == textbox1) {
                immagine.setAttribute("src", "pics/animation.gif");
            if (window.innerWidth <= 1200 && window.innerWidth > 991) {
                immagine.setAttribute("style", "left: 644px;");
            } else if (window.innerWidth <= 991) {
                immagine.setAttribute("style", "left: 487px; top: 260px;");
            } else {
                immagine.setAttribute("style", "top: 371px;");
            }
            return;
        }

        targetElement = targetElement.parentNode;
    } while (targetElement);
    
    immagine.setAttribute("src", "pics/cavo.png");
    if (window.innerWidth <= 1200 && window.innerWidth > 991) {
        immagine.setAttribute("style", "left: 648px;");
    } else if (window.innerWidth <= 991) {
        immagine.setAttribute("style", "left: 491px; top: 260px;");
    } else {
        immagine.setAttribute("style", "top: 392px;");
    }

})

// Funzione che modifica gli stati assoluti del contenuto grafico al ridimensionamento della finestra

window.onresize = function() {
    if (window.innerWidth <= 1200 && window.innerWidth > 991) {
        immagine.setAttribute("style", "left: 644px;");
    } else if (window.innerWidth <= 991) {
        immagine.setAttribute("style", "left: 487px; top: 260px;");
    } else {
        immagine.setAttribute("style", "top: 371px;");
    }
}
