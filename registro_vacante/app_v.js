const formulario = document.getElementById("formulario");


formulario.addEventListener("submit", async (event) => {

    event.preventDefault();


    const webhookURL = "https://unpiloted-scarce-elastic.ngrok-free.dev/webhook-test/fa240e9d-2775-4014-b66f-8311fa654324";


    const formData = new FormData(formulario);


    try {

        const respuesta = await fetch(webhookURL, {

            method: "POST",

            body: formData

        });


        if (!respuesta.ok) {

            throw new Error("Error al enviar los datos");

        }


        const resultado = await respuesta.text();


        console.log("Respuesta de n8n:", resultado);


        alert("Vacante registrada correctamente");


        formulario.reset();


    } catch (error) {

        console.error("Error:", error);

        alert("No se pudo registrar la vacante");

    }

});