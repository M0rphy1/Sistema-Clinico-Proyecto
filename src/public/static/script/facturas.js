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
                    const resultado = document.getElementById('buscarFacturaResultado');
                    resultado.innerHTML = `
                        <h5>ID Factura: ${data.idFactura}</h5>
                        <p>Nombre Cliente: ${data.Cliente ? data.Cliente.nombreCliente : 'No especificado'}</p>
                        <p>Nombre Mascota: ${data.Mascotum ? data.Mascotum.nombreMascota : 'No especificado'}</p>
                        <p>Descripcion Factura: ${data.descripcionFactura ? data.descripcionFactura : 'No especificado'}</p>
                        <p>Fecha Factura: ${data.fechaFactura ? new Date(data.fechaFactura).toLocaleDateString() : 'No especificado'}</p>
                        <p>Nombre Medicamento: ${data.Medicamento ? data.Medicamento.nombreMedicamento : 'No especificado'}</p>
                        <p>Nombre Suministro: ${data.Suministro ? data.Suministro.nombreSuministro : 'No especificado'}</p>
                    `;
                    mostrarMensaje('Factura encontrada.', 'success');
                }
            })
            .catch((error) => {
                console.error('Error al buscar la factura:', error);
                mostrarMensaje('Error al buscar la factura. Verifica la consola para más detalles.', 'danger');
            });
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