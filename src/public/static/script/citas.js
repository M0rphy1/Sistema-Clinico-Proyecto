    // Función para mostrar mensajes
    function mostrarMensaje(mensaje, tipo) {
        const mensajeResultado = document.getElementById('mensajeResultado');
        mensajeResultado.textContent = mensaje;
        mensajeResultado.className = `alert alert-${tipo}`;
        mensajeResultado.style.display = 'block';
        setTimeout(() => {
            mensajeResultado.style.display = 'none';
        }, 5000); // Mantener la notificación visible por 5 segundos
    }
    // Función para manejar el envío del formulario de registro de cita
document.getElementById('registroCitaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreCliente = document.getElementById('nombreCliente').value;
    const nombreMascota = document.getElementById('nombreMascota').value;
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const fechaCita = document.getElementById('fechaCita').value;
    const horaCita = document.getElementById('horaCita').value;
    const motivo = document.getElementById('motivo').value;

    // Validar fecha y hora
    const currentDate = new Date();
    const selectedDate = new Date(`${fechaCita}T${horaCita}`);

    // Verificar si la fecha y hora seleccionadas son válidas
    if (isNaN(selectedDate.getTime())) {
        mostrarMensaje('Fecha u hora inválida. Verifica los campos de fecha y hora.', 'danger');
        return;
    }

    // Verificar si la fecha y hora seleccionadas son futuras
    if (selectedDate <= currentDate) {
        mostrarMensaje('La fecha y hora de la cita no pueden ser en el pasado.', 'danger');
        return;
    }

    // Consultar todas las citas existentes
    fetch('/api/citas')
    .then(response => response.json())
    .then(data => {
        // Verificar si ya existe una cita para la misma fecha y hora
        const citaExistente = data.find(cita => {
            const existingDate = new Date(cita.fechaCita + 'T' + cita.horaCita);
            return existingDate.getTime() === selectedDate.getTime();
        });

        if (citaExistente) {
            mostrarMensaje('Ya existe una cita registrada para la misma fecha y hora.', 'danger');
        } else {
            // Si no hay coincidencia, proceder con el registro de la cita
            fetch('/api/citas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombreCliente,
                    nombreMascota,
                    nombreUsuario,
                    fechaCita,
                    horaCita,
                    motivo
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al registrar la cita');
                }
                return response.json();
            })
            .then(data => {
                console.log('Cita registrada:', data);
                mostrarMensaje('Cita registrada correctamente.', 'success');
                // Limpiar el formulario
                document.getElementById('registroCitaForm').reset();
            })
            .catch((error) => {
                console.error('Error al registrar la cita:', error);
                mostrarMensaje('Error al registrar la cita. Ha ingresado un dato incorrecto en el campo.', 'danger');
            });
        }
    })
    .catch((error) => {
        console.error('Error al obtener las citas:', error);
        mostrarMensaje('Error al obtener las citas. No se encontró la cita.', 'danger');
    });
});


// Función para actualizar una cita
document.getElementById('actualizarCitaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const idCita = document.getElementById('updateIdCita').value;
    const nombreMascota = document.getElementById('updateNombreMascota').value;
    const nombreUsuario = document.getElementById('updateNombreUsuario').value;
    const nombreCliente = document.getElementById('updateNombreCliente').value;
    // const nombreMedicamento = document.getElementById('updateNombreMedicamento').value;
    // const nombreSuministro = document.getElementById('updateNombreSuministro').value;
    const fechaCita = document.getElementById('updateFechaCita').value;
    const motivo = document.getElementById('updateMotivo').value;
    const horaCita = document.getElementById('updateHoraCita').value;

    fetch(`/api/citas/${idCita}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idCita: idCita,
            nombreMascota: nombreMascota,
            nombreUsuario: nombreUsuario,
            nombreCliente: nombreCliente,
            // nombreMedicamento: nombreMedicamento,
            // nombreSuministro: nombreSuministro,
            fechaCita: fechaCita,
            motivo: motivo,
            horaCita: horaCita
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            mostrarMensaje(data.error, 'danger');
        } else {
            mostrarMensaje('Cita actualizada correctamente.', 'success');
        }
    })
    .catch((error) => {
        console.error('Error al actualizar la cita:', error);
        mostrarMensaje('Error al actualizar la cita. Verifica la consola para más detalles.', 'danger');
    });
});

// Función para buscar una cita por ID
document.getElementById('buscarCitaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const buscarIdCita = document.getElementById('buscarIdCita').value;

    fetch(`/api/citas/${buscarIdCita}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            mostrarMensaje(data.error, 'danger');
        } else {
            const resultado = document.getElementById('buscarCitaResultado');
            resultado.innerHTML = `
                <h5>ID Cita: ${data.idCita}</h5>
                <p>Nombre Mascota: ${data.Mascotum ? data.Mascotum.nombreMascota : 'No especificado'}</p>
                <p>Nombre Usuario: ${data.Usuario.nombreUsuario}</p>
                <p>Nombre Cliente: ${data.Cliente ? data.Cliente.nombreCliente : 'No especificado'}</p>
                <p>Fecha Cita: ${data.fechaCita}</p>
                <p>Motivo: ${data.motivo}</p>
                <p>Hora Cita: ${data.horaCita}</p>
            `;
            mostrarMensaje('Cita encontrada.', 'success');
        }
    })
    .catch((error) => {
        console.error('Error al buscar la cita:', error);
        mostrarMensaje('Error al buscar la cita. Verifica la consola para más detalles.', 'danger');
    });
});

// Función para eliminar una cita por ID
document.getElementById('eliminarCitaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const idCita = document.getElementById('eliminarIdCita').value;

    if (confirm(`¿Estás seguro de eliminar la cita con ID ${idCita}?`)) {
        try {
            const response = await fetch(`/api/citas/${idCita}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                mostrarMensaje('Cita eliminada exitosamente.', 'success');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error('Error al eliminar la cita:', error);
            mostrarMensaje('Error al eliminar la cita. Verifica la consola para más detalles.', 'danger');
        }
    }
});

document.getElementById('buscarCitaForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const buscarIdCita = document.getElementById('buscarIdCita').value;

    try {
        const response = await fetch(`/api/citas/${buscarIdCita}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        const resultado = document.getElementById('buscarCitaResultado');
        resultado.innerHTML = `
            <h5>ID Cita: ${data.idCita}</h5>
            <p>Nombre Mascota: ${data.Mascotum ? data.Mascotum.nombreMascota : 'No especificado'}</p>
            <p>Nombre Usuario: ${data.Usuario ? data.Usuario.nombreUsuario : 'No especificado'}</p>
            <p>Nombre Cliente: ${data.Cliente ? data.Cliente.nombreCliente : 'No especificado'}</p>
            <p>Fecha Cita: ${data.fechaCita}</p>
            <p>Motivo: ${data.motivo}</p>
            <p>Hora Cita: ${data.horaCita}</p>
        `;
        mostrarMensaje('Cita encontrada.', 'success');
    } catch (error) {
        console.error('Error al buscar la cita:', error);
        mostrarMensaje('Error al buscar la cita. Verifica la consola para más detalles.', 'danger');
    }
});

function mostrarMensaje(mensaje, tipo) {
    const mensajeResultado = document.getElementById('mensajeResultado');
    mensajeResultado.textContent = mensaje;
    mensajeResultado.className = `alert alert-${tipo}`;
    mensajeResultado.style.display = 'block';
    setTimeout(() => {
        mensajeResultado.style.display = 'none';
    }, 3000);
}
