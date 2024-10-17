//DOM
const sectionCursos = document.getElementById("section-cursos");
const verCarrito = document.getElementById("ver-carrito");
const modalContainer = document.getElementById("modal-container")

const dolarHoy = document.getElementById("dolar-hoy")
const sectionCotizaciones = document.getElementById("section-cotizaciones")
const sectionCriptos = document.getElementById("section-criptos")


//Array Carrito 
let carrito = [];

//Traer el carrito de LocalStorage
const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
if (carritoStorage) {
    carrito = carritoStorage;
}


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


//Fetch
fetch("./cursos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la Red");
        }
        return response.json();
        console.log(cursos)
    })
    .then(cursos => {
        // Cursos Cards
        cursos.forEach(curso => {
            let contenedor = document.createElement("div");
            contenedor.className = "container-curso";

            contenedor.innerHTML = `<h2 class ="color"> ${curso.nombre}</h2>
                                        <h3> $${curso.precio} <span class="off">${curso.promocion}</span></h3>
                                        <h4 class = "color">⏱${curso.duracion}</h4>`;

            sectionCursos.appendChild(contenedor);

            // Creando Botón Comprar
            let comprarCurso = document.createElement("button");
            comprarCurso.innerText = "Comprar";
            comprarCurso.className = "btn-comprar";

            contenedor.appendChild(comprarCurso);

            // Agregar Curso al carrito 
            comprarCurso.addEventListener("click", () => {

                //Validacion si ya esta agregado un curso al carrito
                const cursoExistente = carrito.some(cursoEnCarrito => cursoEnCarrito.nombre === curso.nombre);
                if (cursoExistente) {
                    Toastify({
                        text: `El curso ${curso.nombre} ya está en el carrito.`,
                        duration: 2000,
                        gravity: "top",
                        position: "left",
                        stopOnFocus: true,
                        style: {
                            background: "red",
                            color: "white",
                        },
                    }).showToast();
                } else {
                    carrito.push({
                        nombre: curso.nombre,
                        precio: curso.precio,
                    });
                    Toastify({
                        text: `Agregaste ${curso.nombre}`,
                        duration: 2000,
                        gravity: "top",
                        position: "left",
                        stopOnFocus: true,
                        style: {
                            background: "linear-gradient(135deg, #efb42c, #e4d8a3, #fdd15b)",
                            color: "black",
                        },
                    }).showToast();
                    guardarCarrito();
                }
            });
        });
    })
    .catch(error => {
        console.error("Hubo un problema con la solicitud fetch:", error);
    });


//Carrito
verCarrito.addEventListener("click", () => {

    modalContainer.classList.add("active");

    const cabeceraModal = document.createElement("div");
    cabeceraModal.className = "cabecera-modal"
    cabeceraModal.innerHTML = `<h2 class = "cabecera-title">Tus productos</h2>`;

    modalContainer.appendChild(cabeceraModal);

    //Cerrar Modal
    const cerrarModal = document.createElement("button");
    cerrarModal.innerText = "X";
    cerrarModal.className = "btn-black";

    cerrarModal.addEventListener("click", () => {
        modalContainer.classList.remove("active");
        modalContainer.innerHTML = '';
    });

    cabeceraModal.append(cerrarModal);

    if (carrito.length === 0) {
        const contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "contenido-carrito";
        contenidoCarrito.innerHTML = `<h2 class="color">Tu carrito está vacío</h2>`;
        modalContainer.append(contenidoCarrito);
        return;
    }

    //Cursos en el carrito
    carrito.forEach((curso, index) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "contenido-carrito";
        contenidoCarrito.innerHTML = `<h2 class="color">${curso.nombre}</h2>
                                        <h3>$${curso.precio}</h3>`;

        //X para borrar curso
        const btnEliminar = document.createElement("p");
        btnEliminar.innerText = "X";
        btnEliminar.className = "p-light";


        btnEliminar.addEventListener("click", () => {
            carrito.splice(index, 1);
            modalContainer.innerHTML = "";
            verCarrito.click();
            guardarCarrito();
            Toastify({
                text: `Haz quitado el curso ${curso.nombre}`,
                duration: 2000,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(135deg, #efb42c, #e4d8a3, #fdd15b)",
                    color: "black",
                },
            }).showToast();
        });

        contenidoCarrito.appendChild(btnEliminar);
        modalContainer.append(contenidoCarrito);
    });

    //Total Compra
    const total = carrito.reduce((acc, e) => acc + e.precio, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-compra"
    totalCompra.innerHTML = `<h2> Total : $${total}</h2>`;

    modalContainer.append(totalCompra);

    //BTN para pagar
    const btnPagar = document.createElement("button");
    btnPagar.className = "btn-black"
    btnPagar.innerText = "Pagar"

    totalCompra.append(btnPagar)

    btnPagar.addEventListener("click", () => {
        modalContainer.innerHTML = "";
        //Creando Formulario de Pago
        const formularioPago = document.createElement("div");
        formularioPago.className = "formulario-pago";


        formularioPago.innerHTML = `
            <div class = " cabecera-modal-form">
                <h3 class = "formulario-title">Total a pagar $ ${total}</h3>
                <button  class = "btn-black" id = "cerrarFormulario">    X  </button>
            </div>

            <div class = "contenido-carrito-form">   
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" required value ="Javier Gimenez">

                <label for="email">Email:</label>
                <input type="email" id="email" required value ="elpeladejavasscript@gmail.com">

                <label for="formaPago">Forma de Pago:</label>

                <select id="formaPago" required>
                    <option value="tarjeta">Tarjeta de Crédito o Débito</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                </select>
            </div>
            

            <div class ="formulario-pago">

                <label for="numeroTarjeta">Número de Tarjeta:</label>
                <input type="text" id="numeroTarjeta" required value="4517 5678 9012 3456">
                
                <label for="fechaExpiracion">Fecha de Expiración (MM/AA):</label>
                <input type="text" id="fechaExpiracion" class = "pago" placeholder="MM/AA" required value="12/25">

                <label for="codigoSeguridad">Código de Seguridad:</label>
                <input type="text" id="codigoSeguridad" class = "pago" required value="383">
                
            </div>

            <button type="submit" class="btn-black">Confirmar Pago</button>`;

        modalContainer.appendChild(formularioPago);

        //Cerrar Formulario
        const cerrarFormulario = document.getElementById("cerrarFormulario");
        cerrarFormulario.addEventListener("click", () => {

            modalContainer.classList.remove("active");
            modalContainer.innerHTML = " ";
        })

        // Manejar el envío del formulario
        formularioPago.querySelector("button[type='submit']").addEventListener("click", (event) => {
            event.preventDefault();


            // Manejo de datos del formulario
            const nombre = document.getElementById("nombre").value;

            // Mostrar un mensaje de confirmación
            modalContainer.classList.remove("active");
            modalContainer.innerHTML = "";
            Swal.fire({
                icon: "success",
                width: "490px",
                position: "bottom-end",
                title: "¡Bienvenido a Inversion PRO!",
                text: `Te enviamos el link de acceso a la plataforma al email ingresado`,
                showConfirmButton: true,
                confirmButtonColor: "green",
                timerProgressBar: "true",
                timer: 9500
            });
            ;
        })

        // Limpiamos Carrito
        carrito = [];
        guardarCarrito();

    });

});


//API COTIZACIONES Bluelytics 
fetch("https://api.bluelytics.com.ar/v2/latest")
    .then((respuesta) => respuesta.json())
    .then((data) => {

        const contentDolar = document.createElement("nav");
        contentDolar.innerHTML = `
                                <ul class="navbar-cotizaciones">
                                    <li><a id="dolar-hoy"> Dolar BLUE $${data.blue.value_sell}</a></li>
                                    
                                    <li><a href="#ethereum">Ethereum $ 2.434 (ETH)</a></li>
                                    <li><a href="#oro">ORO $ 2.704</a></li>
                                    <li><a href="#euro">(EURO) $${data.oficial_euro.value_sell} </a></li>
                                </ul>`;

        sectionCotizaciones.appendChild(contentDolar);
    }).catch((error) => {
        const errorCotizaciones = document.getElementById(errorCotizaciones);
        errorCotizaciones.textContent = `Cargando Cotizaciones...`
    });



//API Cotizaciones CoinGecko
const traerCriptos = async () => {
    const errorCriptos = document.getElementById("errorCriptos");
    errorCriptos.innerHTML = "";

    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1");
        const data = await response.json();
        console.log(data)


        const contenidoCoins = document.createElement("nav");
        contenidoCoins.className = "navbar-criptos"
        const lista = document.createElement("ul");

        data.forEach(cripto => {
            const item = document.createElement("li");

            const img = document.createElement("img");
            img.src = cripto.image;
            img.alt = cripto.name;
            img.className = "img-cripto"

            item.appendChild(img)

            const link = document.createElement("a");
            link.textContent = `${cripto.name} $${cripto.current_price}`

            item.appendChild(link)
            lista.appendChild(item);
        });

        contenidoCoins.appendChild(lista);
        sectionCriptos.appendChild(contenidoCoins);

    } catch (error) {
        errorCriptos.textContent = `Cargando Criptomonedas...`;
    }
}

traerCriptos();


//section test inversor//
const btnTest = document.getElementById("btn-abrir-test");
const sectionDelTest = document.getElementById("section-test");

btnTest.addEventListener("click", () => {
    sectionDelTest.classList.toggle("hidden");
});