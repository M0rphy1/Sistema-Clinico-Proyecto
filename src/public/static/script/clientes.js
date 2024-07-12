function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

document.getElementById('logoutButton').addEventListener('click', function() {
  fetch('/auth/logout', { method: 'POST' })
      .then(response => {
          if (response.ok) {
              window.location.href = '/index.html';
          } else {
              alert('Error al cerrar sesión.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Error al cerrar sesión.');
      });
});

document.addEventListener('DOMContentLoaded', function () {
  cargarClientes();

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
              method = 'PUT'; // Cambia a PUT si idCliente existe
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
              alert(`Cliente ${idCliente ? 'actualizado' : 'registrado'} correctamente. Por favor, recargue la página.`);
              $('#registroModal').modal('hide'); // Cierra el modal
              cargarClientes(); // Recarga la lista de clientes
              document.getElementById('registroClienteForm').reset(); // Resetea el formulario
          } else {
              throw new Error(data.error || 'Error al procesar la solicitud');
          }
      } catch (error) {
          console.error('Error:', error);
          alert(`Error al ${idCliente ? 'actualizar' : 'registrar'} el cliente`);
      }
  });
});

async function cargarClientes() {
  const response = await fetch('/api/clientes');
  const clientes = await response.json();

  // Ordena los clientes por nombreCliente
  clientes.sort((a, b) => {
      const nombreA = a.nombreCliente.toLowerCase();
      const nombreB = b.nombreCliente.toLowerCase();
      return nombreA.localeCompare(nombreB);
  });

  const clientesList = document.getElementById('clientesList');
  clientesList.innerHTML = '';
  clientes.forEach(cliente => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${cliente.nombreCliente}</td>
          <td>${cliente.apellido}</td>
          <td>${cliente.direccion}</td>
          <td>${cliente.telefono}</td>
          <td>${cliente.correo}</td>
          <td>
              <button class="btn btn-warning" onclick="editarCliente('${cliente.idCliente}')">Editar</button>
              <button class="btn btn-danger" onclick="eliminarCliente('${cliente.idCliente}')">Eliminar</button>
          </td>
      `;
      clientesList.appendChild(row);
  });
}

async function editarCliente(idCliente) {
  try {
      const response = await fetch(`/api/clientes/${idCliente}`);
      const cliente = await response.json();
      document.getElementById('nombreCliente').value = cliente.nombreCliente;
      document.getElementById('apellidoCliente').value = cliente.apellido || '';
      document.getElementById('direccionCliente').value = cliente.direccion || '';
      document.getElementById('telefonoCliente').value = cliente.telefono || '';
      document.getElementById('correoCliente').value = cliente.correo || '';
      document.getElementById('idCliente').value = cliente.idCliente; // Establece el idCliente en el campo oculto
      $('#registroModal').modal('show'); // Muestra el modal
  } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los datos del cliente');
  }
}

async function eliminarCliente(idCliente) {
  if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      try {
          const response = await fetch(`/api/clientes/${idCliente}`, {
              method: 'DELETE'
          });
          if (response.ok) {
              alert('Cliente eliminado correctamente. Por favor, recargue la página.');
              cargarClientes(); // Recarga la lista de clientes
          } else {
              throw new Error('Error al eliminar el cliente');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Error al eliminar el cliente');
      }
  }
}

function buscarCliente() {
  const input = document.getElementById('buscarNombre').value.toLowerCase();
  const rows = document.querySelectorAll('#clientesList tr');
  rows.forEach(row => {
      const nombre = row.cells[0].textContent.toLowerCase();
      if (nombre.includes(input)) {
          row.style.display = '';
      } else {
          row.style.display = 'none';
      }
  });
}

