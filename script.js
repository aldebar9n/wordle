let intentos = 6;
let palabra;

const API = 'https://random-word-api.herokuapp.com/word?number=1&length=5&lang=es'

// FUNCION ASINCRONA
fetch(API)
    .then( response => response.json())
    .then(response => {
        palabra = response[0].toUpperCase()
        console.log(palabra)
    })
    .catch( err => console.log(err) )
   

function leerIntento(){
    const input = document.getElementById("guess-input");
    const intento = input.value.toUpperCase();
    input.value = "";  
    return intento;
 }

 function intentar(){
    const INTENTO = leerIntento();
    
    if (INTENTO === palabra ) {
        const mensaje = ("<h1>GANASTE!😀</h1>")
        terminar(mensaje);
        return
    }
    const GRID = document.getElementById("grid")
    const ROW = document.createElement ('div');
    ROW.className = 'row';

    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter'
        SPAN.innerHTML = INTENTO [i];

        if (INTENTO [i] ===palabra [i]){
            // GREEN;
            SPAN.style.backgroundColor = 'green' 
        } else if( palabra.includes(INTENTO[i]) ) {
            // ORANGE
            SPAN.style.backgroundColor = 'orange'
        } else {
           // GREY
           SPAN.style.backgroundColor = 'grey'
        }
        ROW.appendChild(SPAN);
    }


    GRID.appendChild (ROW)
		intentos--;

    // Actualizar intentos restantes
    const intentosRestantes = document.getElementById("guesses-left");
     intentosRestantes.innerHTML = `Intentos restantes: ${intentos}`;

    if (intentos==0){
        const mensaje = ("<h1>PERDISTE!😖</h1>")
        terminar(mensaje);
    }

}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");

    INPUT.disabled = true;
    BOTON.disabled = true;

    const contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

const boton = document.getElementById("guess-button");
boton.addEventListener("click", intentar);

