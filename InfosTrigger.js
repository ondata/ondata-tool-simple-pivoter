// Funzione che modifica l'illustrazione del post it nella pagina e mostra o nasconde la modale informativa

let postit = document.getElementById("postit");

postit.onmouseover = function() {
    postit.setAttribute("src", "pics/stickyHover.png")
}

postit.onmouseleave = function() {
    postit.setAttribute("src", "pics/stickyNorm.png")
}

let modale = document.getElementById("modale");
let span = document.getElementById("close");

postit.onclick = function() {
    modale.style.display = "block";
}

span.onclick = function(){
    modale.style.display = "none";
}

window.onclick = function(event){
    if (event.target == modale){
        modale.style.display = "none";
    }
}