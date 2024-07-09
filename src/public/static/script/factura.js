        // Función para mostrar mensajes
        function mostrarMensaje(mensaje, tipo) {
            const mensajeResultado = document.getElementById('mensajeResultado');
            mensajeResultado.textContent = mensaje;
            mensajeResultado.className = `alert alert-${tipo}`;
            mensajeResultado.style.display = 'block';
            setTimeout(() => {
                mensajeResultado.style.display = 'none';
            }, 3000);
        }
        
        // Función para buscar una factura por ID y mostrar en la tabla
        document.getElementById('buscarFacturaForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const buscarIdFactura = document.getElementById('buscarIdFactura').value;

            fetch(`/api/facturas/${buscarIdFactura}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    mostrarMensaje(data.error, 'danger');
                } else {
                    const tablaResultadosBody = document.getElementById('tablaResultadosBody');
                    tablaResultadosBody.innerHTML = ''; // Limpiar tabla antes de agregar resultados

                    const newRow = tablaResultadosBody.insertRow();
                    newRow.innerHTML = `
                        <td>${data.idFactura}</td>
                        <td>${data.Cliente ? data.Cliente.nombreCliente : 'No especificado'}</td>
                        <td>${data.Mascotum ? data.Mascotum.nombreMascota : 'No especificado'}</td>
                        <td>${data.descripcionFactura ? data.descripcionFactura : 'No especificado'}</td>
                        <td>${data.fechaFactura ? new Date(data.fechaFactura).toLocaleDateString() : 'No especificado'}</td>
                        <td>${data.Medicamento ? data.Medicamento.nombreMedicamento : 'No especificado'}</td>
                        <td>${data.Suministro ? data.Suministro.nombreSuministro : 'No especificado'}</td>
                        <td><a href="#" onclick="descargarFactura(${data.idFactura})">Descargar PDF</a></td>
                    `;
                    mostrarMensaje('Factura encontrada.', 'success');
                }
            })
            .catch((error) => {
                console.error('Error al buscar la factura:', error);
                mostrarMensaje('Error al buscar la factura. Verifica la consola para más detalles.', 'danger');
            });
        });

        // Función para descargar la factura como PDF
        function descargarFactura(idFactura) {
            fetch(`/api/facturas/pdf/${idFactura}`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `Factura_${idFactura}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error al descargar la factura en PDF:', error);
                mostrarMensaje('Error al descargar la factura en PDF. Verifica la consola para más detalles.', 'danger');
            });
        }

        // Función para buscar una factura por ID
        document.getElementById('buscarFacturaForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const buscarIdFactura = document.getElementById('buscarIdFactura').value;

            fetch(`/api/facturas/${buscarIdFactura}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    mostrarMensaje(data.error, 'danger');
                } else {
                    const tablaResultado = document.getElementById('tablaResultado');
                    tablaResultado.innerHTML = `
                        <tr>
                            <th scope="row">ID Factura</th>
                            <td>${data.idFactura}</td>
                        </tr>
                        <tr>
                            <th scope="row">Nombre Cliente</th>
                            <td>${data.Cliente ? data.Cliente.nombreCliente : 'No especificado'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Nombre Mascota</th>
                            <td>${data.Mascotum ? data.Mascotum.nombreMascota : 'No especificado'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Descripción Factura</th>
                            <td>${data.descripcionFactura ? data.descripcionFactura : 'No especificado'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Fecha Factura</th>
                            <td>${data.fechaFactura ? new Date(data.fechaFactura).toLocaleDateString() : 'No especificado'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Nombre Medicamento</th>
                            <td>${data.Medicamento ? data.Medicamento.nombreMedicamento : 'No especificado'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Nombre Suministro</th>
                            <td>${data.Suministro ? data.Suministro.nombreSuministro : 'No especificado'}</td>
                        </tr>
                    `;
                    mostrarMensaje('Factura encontrada.', 'success');
                }
            })
            .catch((error) => {
                console.error('Error al buscar la factura:', error);
                mostrarMensaje('Error al buscar la factura. Verifica la consola para más detalles.', 'danger');
            });
        });

// Función para registrar una factura
document.getElementById('registroFacturaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombreCliente = document.getElementById('nombreCliente').value;
    const nombreMascota = document.getElementById('nombreMascota').value;
    const descripcionFactura = document.getElementById('descripcionFactura').value;
    const fechaFactura = document.getElementById('fechaFactura').value;
    const nombreMedicamento = document.getElementById('nombreMedicamento').value;
    const nombreSuministro = document.getElementById('nombreSuministro').value;

    try {
        const response = await fetch('/api/facturas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCliente,
                nombreMascota,
                descripcionFactura,
                fechaFactura,
                nombreMedicamento,
                nombreSuministro
            })
        });

        if (response.ok) {
            mostrarMensaje('Factura registrada con éxito', 'success');
        } else {
            mostrarMensaje('Error al registrar la factura', 'danger');
        }
    } catch (error) {
        mostrarMensaje('Error de red', 'danger');
    }
});

// Función para actualizar una factura
document.getElementById('actualizarFacturaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const idFactura = document.getElementById('updateIdFactura').value;
    const nombreCliente = document.getElementById('updateNombreCliente').value;
    const nombreMascota = document.getElementById('updateNombreMascota').value;
    const descripcionFactura = document.getElementById('updateDescripcionFactura').value;
    const fechaFactura = document.getElementById('updateFechaFactura').value;
    const nombreMedicamento = document.getElementById('updateNombreMedicamento').value;
    const nombreSuministro = document.getElementById('updateNombreSuministro').value;

    try {
        const response = await fetch(`/api/facturas/${idFactura}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCliente,
                nombreMascota,
                descripcionFactura,
                fechaFactura,
                nombreMedicamento,
                nombreSuministro
            })
        });

        if (response.ok) {
            mostrarMensaje('Factura actualizada con éxito', 'success');
        } else {
            mostrarMensaje('Error al actualizar la factura', 'danger');
        }
    } catch (error) {
        mostrarMensaje('Error de red', 'danger');
    }
});

// Función para eliminar una factura
document.getElementById('eliminarFacturaForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const idFactura = document.getElementById('eliminarIdFactura').value;

    try {
        const response = await fetch(`/api/facturas/${idFactura}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarMensaje('Factura eliminada con éxito', 'success');
        } else {
            mostrarMensaje('Error al eliminar la factura', 'danger');
        }
    } catch (error) {
        mostrarMensaje('Error de red', 'danger');
    }
});