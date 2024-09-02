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