/*Cursos - Carrito */

const shopCursos = document.getElementById("shop-cursos");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container")     

const cursos = [
    { id: 1, nombre: "Finanzas Personales", precio: 20000 },
    { id: 2, nombre: "Blockchain y Criptomonedas", precio: 20000 },
    { id: 3, nombre: "Invertir en Bolsa", precio: 20000 },
    { id: 4, nombre: "Analisis Tecnico", precio: 20000 },
];


let carrito = [];


const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
if (carritoStorage) {
    carrito = carritoStorage;
}



cursos.forEach((curso) =>{
    let contenido = document.createElement("div");
    contenido.className = "card";

    contenido.innerHTML = `
    <h3>  ${curso.nombre}</h3>
    <p> <span class = "signo">$</span> ${curso.precio}</p>
    `;

    shopCursos.appendChild(contenido);

    let comprar = document.createElement("button")
    comprar.innerText = "Comprar";

    contenido.appendChild(comprar)

    comprar.addEventListener("click", () =>{
        carrito.push({
            id : curso.id,
            nombre : curso.nombre,
            precio : curso.precio,
        });

        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log(carrito);

    }) 
});


verCarrito.addEventListener("click", () => {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const headerModal = document.createElement("div");
    headerModal.className = "header-modal"
    headerModal.innerHTML = `
    <h1 class= "modal-header-title">Compras </h1>
    `;

        modalContainer.append(headerModal);
    

    const modalBtn = document.createElement("h1");
    modalBtn.innerText = "X";
    modalBtn.className = "modal-btn"

    modalBtn.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

        headerModal.append(modalBtn);



    carrito.forEach((curso) => {
        let carritoContenido = document.createElement("div");
        carritoContenido.className = "contenido-modal";
        carritoContenido.innerHTML = `
        <h3>${curso.nombre}</h3>
        <p> ${curso.precio}</p>    
        `;  

        modalContainer.append(carritoContenido);
    })


    const total = carrito.reduce((acc, e) => acc + e.precio, 0);

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-compra"
    totalCompra.innerHTML = `<h2> Total de la compra: $ ${total}</h2>`;
    

        modalContainer.append(totalCompra);

});










//section test inversor//
const btnTest = document.getElementById("btn-abrir-test");
const sectionDelTest = document.getElementById("section-test");

btnTest.addEventListener("click", () => {
    sectionDelTest.classList.toggle("hidden");
});




// function determinarPerfilInversor (respuestas) {
//     let puntaje = 0;

//     if (respuestas[`instrumentos`] === `Acciones` || `Criptomonedas`){
//         puntaje = puntaje + 2;
//     }else if(respuestas [`instrumentos`] === `Bonos` || `Fondos de Inversión`){
//         puntaje = puntaje + 1;
//     }

//     if (respuestas [`conocimiento`] === `Medio` || `Alto`){
//         puntaje = puntaje +2;
//     }else if (respuestas [`conocimiento`] === `Bajo`){
//         puntaje = puntaje + 1 ;
//     }
    
//     if (respuestas [`Plazo`] === `3-5 años` || `Mas de 5 años`){
//         puntaje = puntaje + 3;
//     }else if (respuestas [`Plazo`] === ` 1-3 años`){
//         puntaje = puntaje + 2;
//     }else if (respuestas [`Plazo`] === ` Menos de 1 año`){
//         puntaje = puntaje + 1; 
//     }

//    if (respuestas [`Edad`] < `30`) {
//     puntaje = puntaje + 3;
//    }else if (respuestas [`Edad`] < `50`){
//     puntaje = puntaje + 2;
//    }else if ( respuestas [`Edad`] > `50`){
//     puntaje = puntaje +1;
//    }

//    if (respuestas [`objetivos`] === `Crecimiento de Capital` || `Diversificación`) {
//     puntaje = puntaje + 2;
//    }else if(respuestas[`objetivos`] === ` Ingreso Pasivo`){
//     puntaje = puntaje + 1;
//    }

//    if (respuestas [`seguro`] === `No contrataría ninguna póliza si pudiera`){
//     puntaje = puntaje + 3;
//    }else if (respuestas [`seguro`] === `La póliza más barata, aunque su cobertura sea muy pobre`){
//     puntaje = puntaje + 2;
//    }else if (respuestas [`seguro`] === `A todo riesgo`){
//     puntaje = puntaje + 1;
//    }

//    if (respuestas [`disponible`] === `Entre el 10% y 25% de mi salario`){
//     puntaje = puntaje + 3;
//    }else if (respuestas [`disponible`] === ` Menos del 10% de mi salario`){
//     puntaje = puntaje + 2;
//    }else if (respuestas [`disponible`] === `  Dependiendo cuanto me sobre a fin de mes`){
//     puntaje = puntaje + 1;
//    }

//    if (puntaje <= 11) {
//     return "Conservador";

//    }else if ( puntaje <= 14 ){
//     return "Moderado";

//    }else {
//     return "Agresivo";  
//    }

// }


// investorForm.addEventListener('submit', (event) => {
//     event.preventDefault(); // Prevenir envío del formulario

//     // Obtener respuestas del formulario
//     const respuestas = Object.fromEntries(new FormData(investorForm));
//     console.log('Respuestas:', respuestas); // Para depuración

//     mostrarResultados(respuestas);
//     investorTestSection.classList.add('hidden'); // Ocultar test
//     investorForm.reset(); // Resetear formulario
// });











// function mostrarResultado (respuestas) {
//     const PerfilInversor = determinarPerfilInversor (respuestas);


//     resultDiv.innerHTML = `<h4>Perfil del Inversor: ${perfilInversor}</h4>`;



//     resultContainer.classList.remove('hidden'); // Mostrar resultados

// }







// let nombreUsuario;
// let capitalDisponible;
// let plazoInversion;

// const portafolios = [
//     { nombre: "Conservador.", descripcion: "Inversiones en Bonos de bajo riesgo.", riesgo: "Bajo." },
//     { nombre: "Moderado.", descripcion: "Inversiones en Acciones y bonos.", riesgo: "Medio."},
//     { nombre: "Agresivo.", descripcion: "Inversiones en Acciones y Criptomonedas.", riesgo:"Alto."},
// ]

// function saludarUsuario() {
//     do {
//         nombreUsuario = prompt("Bienvenido a Inversión Pro, ¿cuál es tu nombre?");
//         if (nombreUsuario == null || nombreUsuario == "" || !isNaN(nombreUsuario)) {
//             alert("Por favor, ingrese un nombre válido.");
//         }
//     } while (nombreUsuario == null || nombreUsuario == "" || !isNaN(nombreUsuario));
    
//     alert("Hola " + nombreUsuario.toUpperCase() + "." + "\nA continuación vamos a planificar tu Inversión.");
// } 


// function obtenerInfoUsuario () {
//     const invertisteAlgunaVez = confirm("¿Alguna vez a has hecho inversiones?");

//     if (invertisteAlgunaVez) {
//         alert ("Genial, vamos a personalizar tu próxima inversion!")
//     }else {
//         alert("No te preocupes, te ayudaremos a comenzar")
//     }

//     do{
//         capitalDisponible = parseFloat(prompt("¿Cuánto capital estas dispuesto a invertir?. Recuerda indicar el monto en USD."));
//         if(isNaN(capitalDisponible) || capitalDisponible <= 0) {
//             alert ("Por favor, ingresá una cantidad válida.");
//         } 
//     }while (isNaN(capitalDisponible) || capitalDisponible <= 0);

//     do {
//         plazoInversion = parseInt(prompt("¿Cuánto tiempo estimás en meses, que estarías dispuesto a Invertir tus " + capitalDisponible + "USD?")); {
//         if (isNaN(plazoInversion) || plazoInversion <= 0) {
//             alert("Por favor, ingresá una cantidad de meses válida.")
//         }
//         }
//     }while (isNaN(plazoInversion) || plazoInversion <= 0);
// }


// function sugerirPortafolio () {
//     let portafolioSugerido;

//     if (plazoInversion <= 6){
//         portafolioSugerido = portafolios[0];
//     }else if (plazoInversion <= 18) {
//         portafolioSugerido = portafolios [1];
//     }else {
//         portafolioSugerido = portafolios[2];
//     }

// alert ("Basandonos en tu plazo de inversión, te sugerimos el siguiente Portafolio de Inversión :\n\n" + portafolioSugerido.nombre + "\n" + portafolioSugerido.descripcion + "\nRiesgo : " + portafolioSugerido.riesgo)
// }


// function comenzarSimulador() {
//     saludarUsuario();
//     obtenerInfoUsuario ();
//     sugerirPortafolio ();

//     const confirmacion = confirm ("¿Quieres confirmar la inversión en el Portafolio sugerido?");

//     if (confirmacion) {
//         alert("Perfecto, tu inversión ha sido solicitada con éxito!")
//     }else {
//         alert("No hay problema, puedes volver a comenzar el simulador cuando desees.")
//         comenzarSimulador ();
//     }
// }

// comenzarSimulador();