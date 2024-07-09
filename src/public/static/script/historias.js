// Registro de Historial Clínico
document.getElementById('registroHistorialForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const idMascota = document.getElementById('idMascota').value;
    const fecha = document.getElementById('fecha').value;
    const descripcion = document.getElementById('descripcion').value;

    try {
        const response = await fetch('/api/historiasClinicas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idMascota, fecha, descripcion })
        });

        if (response.ok) {
            const historialCreado = await response.json();
            alert('Historial clínico registrado correctamente');
            document.getElementById('registroHistorialForm').reset();
        } else {
            const errorMessage = await response.text();
            alert(`Error al registrar historial clínico: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Por favor, revisa la consola para más detalles.');
    }
});

// Actualización de Historial Clínico
document.getElementById('actualizarHistorialForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const idHistorial = document.getElementById('idHistorialActualizar').value;
    const idMascota = document.getElementById('idMascotaActualizar').value;
    const fecha = document.getElementById('fechaActualizar').value;
    const descripcion = document.getElementById('descripcionActualizar').value;

    try {
        const response = await fetch(`/api/historiasClinicas/${idHistorial}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idMascota, fecha, descripcion })
        });

        if (response.ok) {
            const historialActualizado = await response.json();
            alert('Historial clínico actualizado correctamente');
            document.getElementById('actualizarHistorialForm').reset();
        } else {
            const errorMessage = await response.text();
            alert(`Error al actualizar historial clínico: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Por favor, revisa la consola para más detalles.');
    }
});

// Búsqueda de Historial Clínico
document.getElementById('buscarHistorialForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const idHistorial = document.getElementById('idHistorialBuscar').value;

    try {
        const response = await fetch(`/api/historiasClinicas/${idHistorial}`);

        if (response.ok) {
            const historial = await response.json();
            document.getElementById('resultBuscar').innerHTML = `
                <p>ID de Mascota: ${historial.idMascota}</p>
                <p>Fecha: ${historial.fecha}</p>
                <p>Descripción: ${historial.descripcion}</p>
            `;
        } else {
            document.getElementById('resultBuscar').textContent = 'Historial clínico no encontrado';
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Por favor, revisa la consola para más detalles.');
    }
});

// Eliminación de Historial Clínico
document.getElementById('eliminarHistorialForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const idHistorial = document.getElementById('idHistorialEliminar').value;

    try {
        const response = await fetch(`/api/historiasClinicas/${idHistorial}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Historial clínico eliminado correctamente');
            document.getElementById('eliminarHistorialForm').reset();
        } else {
            const errorMessage = await response.text();
            alert(`Error al eliminar historial clínico: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Por favor, revisa la consola para más detalles.');
    }
});