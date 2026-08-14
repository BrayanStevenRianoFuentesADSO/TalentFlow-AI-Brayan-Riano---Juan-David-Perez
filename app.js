const formulario = document.getElementById("formulario");
const selectVacantes = document.getElementById("vacante");

// =====================================================
// WEBHOOK PARA OBTENER LAS VACANTES
// =====================================================
const vacantesURL =
    "https://unpiloted-scarce-elastic.ngrok-free.dev/webhook-test/64347581-c5ed-45d6-9151-309c7b04ace6";

// =====================================================
// WEBHOOK PARA ENVIAR LAS POSTULACIONES
// =====================================================
const postulacionURL =
    "https://unpiloted-scarce-elastic.ngrok-free.dev/webhook-test/postulacion";

// =====================================================
// CARGAR VACANTES
// =====================================================
async function cargarVacantes() {
    try {
        const respuesta = await fetch(vacantesURL, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "true" // Omite el aviso de ngrok que bloquea la petición
            }
        });

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las vacantes");
        }

        // n8n devuelve TEXTO
        const texto = await respuesta.text();

        console.log("Vacantes recibidas:", texto);

        // Separar cada título por salto de línea
        const vacantes = texto
            .split("\n")
            .map(titulo => titulo.trim())
            .filter(titulo => titulo !== "");

        // Limpiar el select
        selectVacantes.innerHTML = "";

        // Opción inicial
        const opcionInicial = document.createElement("option");
        opcionInicial.value = "";
        opcionInicial.textContent = "Selecciona una vacante";
        opcionInicial.disabled = true;
        opcionInicial.selected = true;

        selectVacantes.appendChild(opcionInicial);

        // Crear una opción por cada título
        vacantes.forEach(titulo => {
            const option = document.createElement("option");
            option.value = titulo;
            option.textContent = titulo;
            selectVacantes.appendChild(option);
        });

        console.log("Vacantes cargadas:", vacantes);

    } catch (error) {
        console.error("Error al cargar las vacantes:", error);

        selectVacantes.innerHTML = "";

        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No se pudieron cargar las vacantes";
        option.disabled = true;
        option.selected = true;

        selectVacantes.appendChild(option);
    }
}

// =====================================================
// ENVIAR POSTULACIÓN
// =====================================================
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formulario);

    try {
        const respuesta = await fetch(postulacionURL, {
            method: "POST",
            headers: {
                "ngrok-skip-browser-warning": "true" // Omite el aviso de ngrok al enviar
            },
            body: formData
        });

        if (!respuesta.ok) {
            throw new Error("Error al enviar los datos");
        }

        const resultado = await respuesta.text();
        console.log("Respuesta de n8n:", resultado);

        alert("Datos enviados correctamente");
        formulario.reset();

    } catch (error) {
        console.error("Error:", error);
        alert("No se pudieron enviar los datos");
    }
});

// =====================================================
// EJECUTAR AL CARGAR LA PÁGINA
// =====================================================
cargarVacantes();