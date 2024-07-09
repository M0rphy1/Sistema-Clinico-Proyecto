document.addEventListener('DOMContentLoaded', function () {
      // Función para cargar la lista de clientes al cargar la página
      cargarClientes();

      // Evento para enviar el formulario de registro de cliente
      document.getElementById('registroClienteForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = {
          nombreCliente: document.getElementById('nombreCliente').value,
          apellido: document.getElementById('apellidoCliente').value,
          telefono: document.getElementById('telefonoCliente').value,
          direccion: document.getElementById('direccionCliente').value,
          correo: document.getElementById('correoCliente').value
        };
        try {
          let url = '/api/clientes';
          let method = 'POST';
          const idCliente = document.getElementById('idCliente').value;
          if (idCliente) {
            url += `/${idCliente}`;
            method = 'PUT';
          }
          const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          const data = await response.json();
          if (response.ok) {
            alert(`Cliente ${idCliente ? 'actualizado' : 'registrado'} correctamente`);
            $('#registroModal').modal('hide'); // Cerrar modal después de registro exitoso
            cargarClientes(); // Recargar la lista de clientes
            document.getElementById('registroClienteForm').reset(); // Limpiar formulario
          } else {
            throw new Error(data.error || 'Error al procesar la solicitud');
          }
        } catch (error) {
          console.error('Error:', error);
          alert(`Error al ${idCliente ? 'actualizar' : 'registrar'} el cliente`);
        }
      });
    });

    async function verificarCorreoCliente() {
    const correoCliente = document.getElementById('correoCliente').value;

    try {
      const response = await fetch(`/api/clientes/verificar-correo?correo=${correoCliente}`);
      if (response.ok) {
        document.getElementById('errorCorreoCliente').style.display = 'none';
        alert('El correo electrónico está disponible.');
      } else {
        document.getElementById('errorCorreoCliente').style.display = 'block';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

    // Función para cargar la lista de clientes desde la API
    async function cargarClientes() {
      try {
        const response = await fetch('/api/clientes');
        const data = await response.json();
        const clientesList = document.getElementById('clientesList');
        clientesList.innerHTML = ''; // Limpiar lista actual
        data.forEach(cliente => {
          const row = document.createElement('tr');
          row.id = `cliente-${cliente.idCliente}`; // Agregar id único a cada fila
          row.innerHTML = `

            <td>${cliente.nombreCliente}</td>
            <td>${cliente.apellido || ''}</td>
            <td>${cliente.telefono || ''}</td>
            <td>${cliente.direccion || ''}</td>
            <td>${cliente.correo || ''}</td>
            <td>
              <button class="btn btn-sm btn-info" onclick="editarCliente(${cliente.idCliente})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${cliente.idCliente})">Eliminar</button>
            </td>
          `;
          clientesList.appendChild(row);
        });
      } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar la lista de clientes');
      }
    }

    // Función para eliminar un cliente
    async function eliminarCliente(idCliente) {
      if (confirm('¿Estás seguro de eliminar este cliente?')) {
        try {
          const response = await fetch(`/api/clientes/${idCliente}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Cliente no encontrado');
          }
          alert('Cliente eliminado correctamente');
          console.log('Cliente eliminado');
          document.getElementById(`cliente-${idCliente}`).remove(); // Eliminar fila del cliente eliminado
        } catch (error) {
          console.error('Error:', error);
          alert('Error al eliminar el cliente');
        }
      }
    }

    // Función para editar un cliente
    async function editarCliente(idCliente) {
      try {
        const response = await fetch(`/api/clientes/${idCliente}`);
        const cliente = await response.json();

        document.getElementById('nombreCliente').value = cliente.nombreCliente;
        document.getElementById('apellidoCliente').value = cliente.apellido || '';
        document.getElementById('direccionCliente').value = cliente.direccion || '';
        document.getElementById('telefonoCliente').value = cliente.telefono || '';
        document.getElementById('correoCliente').value = cliente.correo || '';
        $('#registroModal').modal('show');
      } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los datos del cliente');
      }
    }

    // Función para actualizar fila de cliente
    function actualizarFilaCliente(cliente) {
      const row = document.getElementById(`cliente-${cliente.idCliente}`);
      row.innerHTML = `

        <td>${cliente.nombreCliente}</td>
        <td>${cliente.apellido || ''}</td>
        <td>${cliente.telefono || ''}</td>
        <td>${cliente.direccion || ''}</td>
        <td>${cliente.correo || ''}</td>
        <td>
          <button class="btn btn-sm btn-info" onclick="editarCliente(${cliente.idCliente})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${cliente.idCliente})">Eliminar</button>
        </td>
      `;
    }

    // Función para buscar cliente por nombre
    async function buscarCliente() {
      const nombre = document.getElementById('buscarNombre').value;
      try {
        const response = await fetch(`/api/clientes/buscar?nombre=${nombre}`);
        const data = await response.json();
        const clientesList = document.getElementById('clientesList');
        clientesList.innerHTML = ''; // Limpiar lista actual
        if (data.length > 0) {
          data.forEach(cliente => {
            const row = document.createElement('tr');
            row.id = `cliente-${cliente.idCliente}`;
            row.innerHTML = `

            <td>${cliente.nombreCliente}</td>
            <td>${cliente.apellido || ''}</td>
            <td>${cliente.telefono || ''}</td>
            <td>${cliente.direccion || ''}</td>
            <td>${cliente.correo || ''}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editarCliente(${cliente.idCliente})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${cliente.idCliente})">Eliminar</button>
            </td>
            `;
            clientesList.appendChild(row);
          });
        } else {
          clientesList.innerHTML = '<tr><td colspan="7" class="text-center">No se encontraron clientes con ese nombre</td></tr>';
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al buscar el cliente');
      }
    }