// ======================================================
// CONFIGURACIÓN Y CONEXIÓN A N8N (MÉTODO GET)
// ======================================================

const URL_WEBHOOK = "https://unworldly-unbalance-nautical.ngrok-free.dev/webhook-test/dashboard/candidatos";

let candidatos = [];

// Elementos del DOM
const totalCandidatos = document.getElementById("total-candidatos");
const scorePromedio = document.getElementById("score-promedio");
const analizados = document.getElementById("analizados");
const aceptados = document.getElementById("aceptados");
const rechazados = document.getElementById("rechazados");
const tablaCandidatos = document.getElementById("tabla-candidatos");


// ======================================================
// PETICIÓN GET A N8N
// ======================================================

async function cargarCandidatos() {
    try {
        console.log("Conectando con n8n mediante GET...");

        // Petición GET explícita
        const respuesta = await fetch(URL_WEBHOOK, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        
        // Guardar la lista de candidatos recibida de n8n
        candidatos = datos.candidatos || [];

        console.log("Candidatos recibidos con éxito:", candidatos);

        // Renderizar la información en la página
        actualizarKPIs();
        mostrarCandidatos(candidatos);

    } catch (error) {
        console.error("Error al obtener candidatos desde n8n:", error);
        if (tablaCandidatos) {
            tablaCandidatos.innerHTML = `
                <tr>
                    <td colspan="7">Error de conexión con n8n.</td>
                </tr>
            `;
        }
    }
}


// ======================================================
// MOSTRAR EN PANTALLA (RENDERIZADO)
// ======================================================

function mostrarCandidatos(lista) {
    if (!tablaCandidatos) return;
    tablaCandidatos.innerHTML = "";

    if (lista.length === 0) {
        tablaCandidatos.innerHTML = `
            <tr>
                <td colspan="7">No hay candidatos para mostrar.</td>
            </tr>
        `;
        return;
    }

    lista.forEach(candidato => {
        const fila = document.createElement("tr");

        const id = candidato.ID_Candidato || candidato.ID_candidato || candidato.id || "N/A";
        const nombre = candidato.Nombre || candidato.nombre || "N/A";
        const vacante = candidato.Vacante || candidato.vacante || "N/A";
        const experiencia = candidato.Experiencia || candidato.experiencia || 0;
        const score = candidato.Score_Compatibilidad || candidato.Score_compatibilidad || candidato.score || 0;
        const estado = candidato.Estado || candidato.estado || "N/A";
        const revision = candidato.Revision_RRHH || candidato.revision_rrhh || candidato.Observaciones_IA || "Sin revisar";

        fila.innerHTML = `
            <td>${id}</td>
            <td>${nombre}</td>
            <td>${vacante}</td>
            <td>${experiencia} años</td>
            <td>${score}%</td>
            <td>${estado}</td>
            <td>${revision}</td>
        `;

        tablaCandidatos.appendChild(fila);
    });
}

function actualizarKPIs() {
    if (totalCandidatos) totalCandidatos.textContent = candidatos.length;
    
    if (scorePromedio) {
        if (candidatos.length === 0) {
            scorePromedio.textContent = "0%";
        } else {
            const suma = candidatos.reduce((acc, c) => acc + Number(c.Score_Compatibilidad || c.Score_compatibilidad || c.score || 0), 0);
            scorePromedio.textContent = `${(suma / candidatos.length).toFixed(0)}%`;
        }
    }

    if (analizados) {
        analizados.textContent = candidatos.filter(c => (c.Estado || c.estado || "").toLowerCase() === "analizado").length;
    }
    if (aceptados) {
        aceptados.textContent = candidatos.filter(c => ["aceptado", "preseleccionado"].includes((c.Estado || c.estado || "").toLowerCase())).length;
    }
    if (rechazados) {
        rechazados.textContent = candidatos.filter(c => (c.Estado || c.estado || "").toLowerCase() === "rechazado").length;
    }
}


// ======================================================
// EJECUTAR AL CARGAR
// ======================================================

cargarCandidatos();