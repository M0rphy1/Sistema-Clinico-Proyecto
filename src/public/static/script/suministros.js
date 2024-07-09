document.addEventListener('DOMContentLoaded', function () {
    cargarSuministros();

    document.getElementById('registroSuministroForm').addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = {
        idProveedor: document.getElementById('idProveedor').value,
        nombreSuministro: document.getElementById('nombreSuministro').value,
        descripcion: document.getElementById('descripcionSuministro').value,
        precio: document.getElementById('precioSuministro').value,
        stock: document.getElementById('stockSuministro').value,
        fabricante: document.getElementById('fabricanteSuministro').value
      };
      try {
        let url = '/api/suministros';
        let method = 'POST';
        const idSuministro = document.getElementById('idSuministro').value;
        if (idSuministro) {
          url += `/${idSuministro}`;
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
          cargarSuministros();
        } else {
          console.error('Error al guardar el suministro');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });

  //
  async function verificarNombreSuministro() {
  const nombreMedicamento = document.getElementById('nombreSuministro').value;

  try {
    const response = await fetch(`/api/suministros/verificar-nombre?nombre=${nombreSuministro}`);
    if (response.ok) {
      document.getElementById('errorNombreSuministro').style.display = 'none';
      alert('El nombre del suministro está disponible.');
    } else {
      document.getElementById('errorNombreSuministro').style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

  async function cargarSuministros() {
    try {
      const response = await fetch('/api/suministros');
      const data = await response.json();
      const suministrosList = document.getElementById('suministrosList');
      suministrosList.innerHTML = '';
      data.forEach(suministro => {
        const row = document.createElement('tr');
        row.id = `suministro-${suministro.idSuministro}`;
        row.innerHTML = `
          <td>${suministro.idProveedor}</td>
          <td>${suministro.nombreSuministro}</td>
          <td>${suministro.descripcion || ''}</td>
          <td>${suministro.precio}</td>
          <td>${suministro.stock}</td>
          <td>${suministro.fabricante || ''}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editarSuministro(${suministro.idSuministro})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarSuministro(${suministro.idSuministro})">Eliminar</button>
          </td>
        `;
        suministrosList.appendChild(row);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function buscarSuministro() {
    const nombreSuministro = document.getElementById('buscarNombre').value;
    try {
      const response = await fetch(`/api/suministros/buscar?nombre=${nombreSuministro}`);
      const data = await response.json();
      const suministrosList = document.getElementById('suministrosList');
      suministrosList.innerHTML = '';
      if (data.length > 0) {
        data.forEach(suministro => {
          const row = document.createElement('tr');
          row.id = `suministro-${suministro.idSuministro}`;
          row.innerHTML = `
            <td>${suministro.idProveedor}</td>
            <td>${suministro.nombreSuministro}</td>
            <td>${suministro.descripcion || ''}</td>
            <td>${suministro.precio}</td>
            <td>${suministro.stock}</td>
            <td>${suministro.fabricante || ''}</td>
            <td>
              <button class="btn btn-sm btn-info" onclick="editarSuministro(${suministro.idSuministro})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarSuministro(${suministro.idSuministro})">Eliminar</button>
            </td>
          `;
          suministrosList.appendChild(row);
        });
      } else {
        suministrosList.innerHTML = '<tr><td colspan="8" class="text-center">No se encontraron suministros con ese nombre</td></tr>';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function eliminarSuministro(idSuministro) {
    if (confirm('¿Estás seguro de eliminar este suministro?')) {
      try {
        const response = await fetch(`/api/suministros/${idSuministro}`, { method: 'DELETE' });
        if (response.ok) {
          document.getElementById(`suministro-${idSuministro}`).remove();
        } else {
          console.error('Error al eliminar el suministro');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  async function editarSuministro(idSuministro) {
    try {
      const response = await fetch(`/api/suministros/${idSuministro}`);
      const suministro = await response.json();
      document.getElementById('idProveedor').value = suministro.idProveedor;
      document.getElementById('nombreSuministro').value = suministro.nombreSuministro;
      document.getElementById('descripcionSuministro').value = suministro.descripcion || '';
      document.getElementById('precioSuministro').value = suministro.precio;
      document.getElementById('stockSuministro').value = suministro.stock;
      document.getElementById('fabricanteSuministro').value = suministro.fabricante || '';
      $('#registroModal').modal('show');
    } catch (error) {
      console.error('Error:', error);
    }
  }