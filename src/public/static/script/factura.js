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