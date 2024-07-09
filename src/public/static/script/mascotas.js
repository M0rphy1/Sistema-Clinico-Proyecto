document.addEventListener('DOMContentLoaded', function () {
    cargarMascotas();

    document.getElementById('registroMascotaForm').addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = {
        nombreMascota: document.getElementById('nombreMascota').value,
        especie: document.getElementById('especieMascota').value,
        raza: document.getElementById('razaMascota').value,
        fechaNacimiento: document.getElementById('fechaNacimientoMascota').value,
        idCliente: document.getElementById('idClienteMascota').value
      };
      try {
        let url = '/api/mascotas';
        let method = 'POST';
        const idMascota = document.getElementById('idMascota').value;
        if (idMascota) {
          url += `/${idMascota}`;
          method = 'PUT';
        }
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          $('#registroModal').modal('hide');
          cargarMascotas();
        } else {
          console.error('Error al guardar la mascota');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });

  async function verificarNombreMascota() {
    const nombreMascota = document.getElementById('nombreMascota').value;

    try {
      const response = await fetch(`/api/mascotas/verificar-nombre?nombre=${nombreMascota}`);
      if (response.ok) {
        document.getElementById('errorNombreMascota').style.display = 'none';
        alert('El nombre de mascota está disponible.');
      } else {
        document.getElementById('errorNombreMascota').style.display = 'block';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function cargarMascotas() {
    try {
      const response = await fetch('/api/mascotas');
      const data = await response.json();
      const mascotasList = document.getElementById('mascotasList');
      mascotasList.innerHTML = '';
      data.forEach(mascota => {
        const row = document.createElement('tr');
        row.id = `mascota-${mascota.idMascota}`;
        row.innerHTML = `
          <td>${mascota.nombreMascota}</td>
          <td>${mascota.especie}</td>
          <td>${mascota.raza || ''}</td>
          <td>${mascota.fechaNacimiento || ''}</td>
          <td>${mascota.idCliente || ''}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editarMascota(${mascota.idMascota})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarMascota(${mascota.idMascota})">Eliminar</button>
          </td>
        `;
        mascotasList.appendChild(row);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function buscarMascota() {
    const nombreMascota = document.getElementById('buscarNombre').value;
    try {
      const response = await fetch(`/api/mascotas/buscar?nombre=${nombreMascota}`);
      const data = await response.json();
      const mascotasList = document.getElementById('mascotasList');
      mascotasList.innerHTML = '';
      if (data.length > 0) {
        data.forEach(mascota => {
          const row = document.createElement('tr');
          row.id = `mascota-${mascota.idMascota}`;
          row.innerHTML = `
            <td>${mascota.nombreMascota}</td>
            <td>${mascota.especie}</td>
            <td>${mascota.raza || ''}</td>
            <td>${mascota.fechaNacimiento || ''}</td>
            <td>${mascota.idCliente || ''}</td>
            <td>
              <button class="btn btn-sm btn-info" onclick="editarMascota(${mascota.idMascota})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarMascota(${mascota.idMascota})">Eliminar</button>
            </td>
          `;
          mascotasList.appendChild(row);
        });
      } else {
        mascotasList.innerHTML = '<tr><td colspan="7" class="text-center">No se encontraron mascotas con ese nombre</td></tr>';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function eliminarMascota(idMascota) {
    if (confirm('¿Estás seguro de eliminar esta mascota?')) {
      try {
        const response = await fetch(`/api/mascotas/${idMascota}`, { method: 'DELETE' });
        if (response.ok) {
          document.getElementById(`mascota-${idMascota}`).remove();
        } else {
          console.error('Error al eliminar la mascota');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  async function editarMascota(idMascota) {
    try {
      const response = await fetch(`/api/mascotas/${idMascota}`);
      const mascota = await response.json();
      document.getElementById('nombreMascota').value = mascota.nombreMascota;
      document.getElementById('especieMascota').value = mascota.especie;
      document.getElementById('razaMascota').value = mascota.raza || '';
      document.getElementById('fechaNacimientoMascota').value = mascota.fechaNacimiento || '';
      document.getElementById('idClienteMascota').value = mascota.idCliente || '';
      $('#registroModal').modal('show');
    } catch (error) {
      console.error('Error:', error);
    }
  }