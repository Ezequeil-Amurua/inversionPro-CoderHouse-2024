let nombreUsuario;
let capitalDisponible;
let plazoInversion;

const portafolios = [
    { nombre: "Conservador.", descripcion: "Inversiones en Bonos de bajo riesgo.", riesgo: "Bajo." },
    { nombre: "Moderado.", descripcion: "Inversiones en Acciones y bonos.", riesgo: "Medio."},
    { nombre: "Agresivo.", descripcion: "Inversiones en Acciones y Criptomonedas.", riesgo:"Alto."},
]

function saludarUsuario() {
    do {
        nombreUsuario = prompt("Bienvenido a Inversión Pro, ¿cuál es tu nombre?");
        if (nombreUsuario == null || nombreUsuario == "" || !isNaN(nombreUsuario)) {
            alert("Por favor, ingrese un nombre válido.");
        }
    } while (nombreUsuario == null || nombreUsuario == "" || !isNaN(nombreUsuario));
    
    alert("Hola " + nombreUsuario.toUpperCase() + "." + "\nA continuación vamos a planificar tu Inversión.");
}


function obtenerInfoUsuario () {
    const invertisteAlgunaVez = confirm("¿Alguna vez a has hecho inversiones?");

    if (invertisteAlgunaVez) {
        alert ("Genial, vamos a personalizar tu próxima inversion!")
    }else {
        alert("No te preocupes, te ayudaremos a comenzar")
    }

    do{
        capitalDisponible = parseFloat(prompt("¿Cuánto capital estas dispuesto a invertir?. Recuerda indicar el monto en USD."));
        if(isNaN(capitalDisponible) || capitalDisponible <= 0) {
            alert ("Por favor, ingresá una cantidad válida.");
        } 
    }while (isNaN(capitalDisponible) || capitalDisponible <= 0);

    do {
        plazoInversion = parseInt(prompt("¿Cuánto tiempo estimás en meses, que estarías dispuesto a Invertir tus " + capitalDisponible + "USD?")); {
        if (isNaN(plazoInversion) || plazoInversion <= 0) {
            alert("Por favor, ingresá una cantidad de meses válida.")
        }
        }
    }while (isNaN(plazoInversion) || plazoInversion <= 0);
}


function sugerirPortafolio () {
    let portafolioSugerido;

    if (plazoInversion <= 6){
        portafolioSugerido = portafolios[0];
    }else if (plazoInversion <= 18) {
        portafolioSugerido = portafolios [1];
    }else {
        portafolioSugerido = portafolios[2];
    }

alert ("Basandonos en tu plazo de inversión, te sugerimos el siguiente Portafolio de Inversión :\n\n" + portafolioSugerido.nombre + "\n" + portafolioSugerido.descripcion + "\nRiesgo : " + portafolioSugerido.riesgo)
}


function comenzarSimulador() {
    saludarUsuario();
    obtenerInfoUsuario ();
    sugerirPortafolio ();

    const confirmacion = confirm ("¿Quieres confirmar la inversión en el Portafolio sugerido?");

    if (confirmacion) {
        alert("Perfecto, tu inversión ha sido solicitada con éxito!")
    }else {
        alert("No hay problema, puedes volver a comenzar el simulador cuando desees.")
        comenzarSimulador ();
    }
}

comenzarSimulador();