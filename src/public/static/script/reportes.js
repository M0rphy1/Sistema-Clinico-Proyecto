async function generarReporte() {
    const tipoReporte = document.getElementById('tipoReporte').value;
    try {
        const response = await fetch(`/api/reportes/${tipoReporte}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Crear un elemento iframe para previsualizar el PDF
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '600px'; // Ajustar el alto según sea necesario
            iframe.src = url;

            // Limpiar el contenido actual del elemento resultado
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = '';

            // Agregar el iframe al elemento resultado
            resultadoDiv.appendChild(iframe);

            // Revocar el URL del objeto Blob
            window.URL.revokeObjectURL(url);
        } else {
            const errorData = await response.json();
            mostrarError(errorData.error);
        }
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        mostrarError('Error al generar el reporte. Por favor, intenta nuevamente.');
    }
}

function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p style="color: red;">${mensaje}</p>`;
}
