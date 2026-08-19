let expedientes = JSON.parse(
    localStorage.getItem("expedientesJuridicos")
) || [];

const formulario = document.getElementById("formularioExpediente");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const expediente = {

        id: Date.now(),

        nombre: document.getElementById("nombre").value,

        numero: document.getElementById("numero").value,

        tipo: document.getElementById("tipo").value,

        cliente: document.getElementById("cliente").value,

        estado: document.getElementById("estado").value,

        descripcion: document.getElementById("descripcion").value

    };

    expedientes.push(expediente);

    guardarExpedientes();

    formulario.reset();

    mostrarExpedientes();

    document.getElementById("expedientes").scrollIntoView({
        behavior: "smooth"
    });

});


function guardarExpedientes() {

    localStorage.setItem(
        "expedientesJuridicos",
        JSON.stringify(expedientes)
    );

}


function mostrarExpedientes() {

    const contenedor =
        document.getElementById("listaExpedientes");

    if (expedientes.length === 0) {

        contenedor.innerHTML = `

            <div class="vacio">

                <div class="vacio-icono">📂</div>

                <h3>No hay expedientes registrados</h3>

                <p>
                    Comienza agregando tu primer expediente jurídico.
                </p>

                <button
                    class="boton-principal"
                    onclick="mostrarFormulario()"
                >
                    Crear expediente
                </button>

            </div>

        `;

        actualizarEstadisticas();

        return;
    }


    contenedor.innerHTML = "";


    expedientes.forEach(function(expediente) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "expediente";

        tarjeta.innerHTML = `

            <span class="expediente-numero">
                ${expediente.numero}
            </span>

            <h3>
                ${expediente.nombre}
            </h3>

            <p>
                <strong>Tipo:</strong>
                ${expediente.tipo}
            </p>

            <p>
                <strong>Interesado:</strong>
                ${expediente.cliente}
            </p>

            <p>
                ${expediente.descripcion || "Sin descripción"}
            </p>

            <span class="estado ${expediente.estado}">
                ${expediente.estado}
            </span>

            <br><br>

            <button
                class="boton-cancelar"
                onclick="eliminarExpediente(${expediente.id})"
            >
                Eliminar
            </button>

        `;

        contenedor.appendChild(tarjeta);

    });


    actualizarEstadisticas();

}


function eliminarExpediente(id) {

    const confirmar = confirm(
        "¿Deseas eliminar este expediente?"
    );

    if (!confirmar) {
        return;
    }

    expedientes = expedientes.filter(
        expediente => expediente.id !== id
    );

    guardarExpedientes();

    mostrarExpedientes();

}


function buscarExpedientes() {

    const texto =
        document.getElementById("busqueda").value.toLowerCase();

    const filtro =
        document.getElementById("filtro").value;


    const resultados = expedientes.filter(function(expediente) {

        const coincideTexto =

            expediente.nombre.toLowerCase().includes(texto) ||

            expediente.numero.toLowerCase().includes(texto) ||

            expediente.cliente.toLowerCase().includes(texto) ||

            expediente.tipo.toLowerCase().includes(texto);


        const coincideEstado =

            filtro === "todos" ||

            expediente.estado === filtro;


        return coincideTexto && coincideEstado;

    });


    mostrarResultados(resultados);

}


function mostrarResultados(resultados) {

    const contenedor =
        document.getElementById("listaExpedientes");

    contenedor.innerHTML = "";


    if (resultados.length === 0) {

        contenedor.innerHTML = `

            <div class="vacio">

                <div class="vacio-icono">🔎</div>

                <h3>No se encontraron expedientes</h3>

                <p>
                    Intenta realizar otra búsqueda.
                </p>

            </div>

        `;

        return;

    }


    resultados.forEach(function(expediente) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "expediente";

        tarjeta.innerHTML = `

            <span class="expediente-numero">
                ${expediente.numero}
            </span>

            <h3>
                ${expediente.nombre}
            </h3>

            <p>
                <strong>Tipo:</strong>
                ${expediente.tipo}
            </p>

            <p>
                <strong>Interesado:</strong>
                ${expediente.cliente}
            </p>

            <p>
                ${expediente.descripcion || "Sin descripción"}
            </p>

            <span class="estado ${expediente.estado}">
                ${expediente.estado}
            </span>

            <br><br>

            <button
                class="boton-cancelar"
                onclick="eliminarExpediente(${expediente.id})"
            >
                Eliminar
            </button>

        `;

        contenedor.appendChild(tarjeta);

    });

}


function actualizarEstadisticas() {

    document.getElementById("totalExpedientes").textContent =
        expedientes.length;


    document.getElementById("expedientesActivos").textContent =

        expedientes.filter(
            expediente => expediente.estado === "activo"
        ).length;


    document.getElementById("expedientesConcluidos").textContent =

        expedientes.filter(
            expediente => expediente.estado === "concluido"
        ).length;

}


function mostrarFormulario() {

    document.getElementById("nuevo").scrollIntoView({
        behavior: "smooth"
    });

}


function limpiarFormulario() {

    formulario.reset();

}


mostrarExpedientes();
