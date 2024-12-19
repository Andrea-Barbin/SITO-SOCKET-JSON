var immIsoOsi = document.getElementById("immIsoOsi");
var parIsoOSI = document.getElementById("parIsoOsi");

var immSocket = document.getElementById("immSocket");
var parSocket = document.getElementById("parSocket");

var immClientServer = document.getElementById("immClientServer");
var parClientServer = document.getElementById("parClientServer");

immIsoOsi.addEventListener("mouseenter", function(){
    parIsoOSI.style.display = "block";
});

immSocket.addEventListener("mouseenter", function(){
    parSocket.style.display = "block";
});

immClientServer.addEventListener("mouseenter", function(){
    parClientServer.style.display = "block";
});

immIsoOsi.addEventListener("mouseleave", function(){
    parIsoOSI.style.display = "none";
});

immSocket.addEventListener("mouseleave", function(){
    parSocket.style.display = "none";
});

immClientServer.addEventListener("mouseleave", function(){
    parClientServer.style.display = "none";
});

// Seleziona il carosello e i pulsanti
const carousel = document.querySelector('#carouselExample');
const btnPrev = document.querySelector('#btnCaroselloSx');
const btnNext = document.querySelector('#btnCaroselloDx');

// Nascondi i pulsanti inizialmente
btnPrev.style.opacity = '0';
btnNext.style.opacity = '0';

// Funzione per mostrare i pulsanti
function showButtons() {
    btnPrev.style.opacity = '1';
    btnNext.style.opacity = '1';
    btnPrev.style.transition = 'opacity 0.3s ease-in-out';
    btnNext.style.transition = 'opacity 0.3s ease-in-out';
}

// Funzione per nascondere i pulsanti
function hideButtons() {
    btnPrev.style.opacity = '0';
    btnNext.style.opacity = '0';
    btnPrev.style.transition = 'opacity 0.3s ease-in-out';
    btnNext.style.transition = 'opacity 0.3s ease-in-out';
}

// Aggiungi gli event listener per il carosello
carousel.addEventListener('mouseenter', showButtons);
carousel.addEventListener('mouseleave', hideButtons);


