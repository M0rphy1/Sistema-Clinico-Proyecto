document.addEventListener('DOMContentLoaded', function () {
    cargarProveedores();

    document.getElementById('registroProveedorForm').addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = {
        nombreProveedor: document.getElementById('nombreProveedor').value,
        direccion: document.getElementById('direccionProveedor').value,
        telefono: document.getElementById('telefonoProveedor').value,
        email: document.getElementById('correoProveedor').value, // Aquí debería ser 'email' en lugar de 'correo'
        sitioWeb: document.getElementById('sitioWeb').value // Aquí debería ser 'sitioWeb' en lugar de 'correo'
      };
      try {
        let url = '/api/proveedores';
        let method = 'POST';
        const idProveedor = document.getElementById('idProveedor').value;
        if (idProveedor) {
          url += `/${idProveedor}`;
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
          alert(`Proveedor ${idProveedor ? 'actualizado' : 'registrado'} correctamente`);
          $('#registroModal').modal('hide');
          cargarProveedores();
          document.getElementById('registroProveedorForm').reset();
        } else {
          throw new Error(data.error || 'Error al procesar la solicitud');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(`Error al ${idProveedor ? 'actualizar' : 'registrar'} el proveedor`);
      }
    });
  });

  async function cargarProveedores() {
    try {
      const response = await fetch('/api/proveedores');
      const data = await response.json();
      // Ordenar alfabéticamente por nombreMascota
      data.sort((a, b) => a.nombreProveedor.localeCompare(b.nombreProveedor));

      const proveedoresList = document.getElementById('proveedoresList');
      proveedoresList.innerHTML = '';
      data.forEach(proveedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${proveedor.nombreProveedor}</td>
          <td>${proveedor.direccion || ''}</td>
          <td>${proveedor.telefono || ''}</td>
          <td>${proveedor.email || ''}</td>
          <td>${proveedor.sitioWeb || ''}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editarProveedor(${proveedor.idProveedor})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarProveedor(${proveedor.idProveedor})">Eliminar</button>
          </td>
        `;
        proveedoresList.appendChild(row);
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar la lista de proveedores');
    }
  }

  async function buscarProveedor() {
    const nombreProveedor = document.getElementById('buscarNombre').value;
    try {
      const response = await fetch(`/api/proveedores/buscar?nombre=${nombreProveedor}`);
      const data = await response.json();
      const proveedoresList = document.getElementById('proveedoresList');
      proveedoresList.innerHTML = '';
      if (data.length > 0) {
        data.forEach(proveedor => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${proveedor.nombreProveedor}</td>
            <td>${proveedor.direccion || ''}</td>
            <td>${proveedor.telefono || ''}</td>
            <td>${proveedor.email || ''}</td>
            <td>${proveedor.sitioWeb || ''}</td>
            <td>
              <button class="btn btn-sm btn-info" onclick="editarProveedor(${proveedor.idProveedor})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarProveedor(${proveedor.idProveedor})">Eliminar</button>
            </td>
          `;
          proveedoresList.appendChild(row);
        });
      } else {
        proveedoresList.innerHTML = '<tr><td colspan="6" class="text-center">No se encontraron proveedores con ese nombre</td></tr>';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al buscar el proveedor');
    }
  }

  async function eliminarProveedor(idProveedor) {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      try {
        const response = await fetch(`/api/proveedores/${idProveedor}`, { method: 'DELETE' });
        if (response.ok) {
          document.getElementById(`proveedor-${idProveedor}`).remove();
        } else {
          console.error('Error al eliminar el proveedor');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  async function editarProveedor(idProveedor) {
    try {
      const response = await fetch(`/api/proveedores/${idProveedor}`);
      const proveedor = await response.json();
      document.getElementById('nombreProveedor').value = proveedor.nombreProveedor;
      document.getElementById('direccionProveedor').value = proveedor.direccion || '';
      document.getElementById('telefonoProveedor').value = proveedor.telefono || '';
      document.getElementById('correoProveedor').value = proveedor.email || ''; // Aquí debería ser 'email' en lugar de 'correo'
      document.getElementById('sitioWeb').value = proveedor.sitioWeb || ''; // Aquí debería ser 'sitioWeb' en lugar de 'correo'
      $('#registroModal').modal('show');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los datos del proveedor para editar');
    }
  }