let nombreUsuario;
let capitalDisponible;
let plazoInversion;

const portafolios = [
    { nombre: "Conservador", descripcion: "Inversiones en Bonos de bajo riesgo.", riesgo: "Bajo" },
    { nombre: "Moderado", descripcion: "Inversiones en Acciones y bonos", riesgo: "Medio"},
    { nombre: "Agresivo", descripcion: "Inversiones en Acciones y Criptomonedas", riesgo:"Alto"},
]

function saludarUsuario() {
    do {
        nombreUsuario = prompt("Bienvenido a Inversión Pro, ¿cuál es tu nombre?");
        if (nombreUsuario == null || nombreUsuario == "" || !isNaN(nombreUsuario)) {
            alert("Por favor, ingrese un nombre válido.");
        }
    } while (nombreUsuario == null || nombreUsuario == "" || !isNaN(nombreUsuario));
    
    alert("Hola " + nombreUsuario.toUpperCase() + "." + "\nA continuación vamos a planificar tu Inversión");
}

saludarUsuario();

function obtenerInfoUsuario () {
    const invertisteAlgunaVez = confirm("¿Alguna vez a has hecho inversiones?");

    if (invertisteAlgunaVez) {
        alert ("Genial, vamos a personalizar tu próxima inversion!")
    }else {
        alert("No te preocupes, te ayudaremos a comenzar")
    }

    do{
        capitalDisponible = parseFloat(prompt("¿Cuánto capital estas dispuesto a invertir? , recuerda indicar el monto en USD."));
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

obtenerInfoUsuario ()