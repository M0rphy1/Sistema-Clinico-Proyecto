document.addEventListener('DOMContentLoaded', function () {
    cargarMedicamentos();

    document.getElementById('registroMedicamentoForm').addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = {
        nombreMedicamento: document.getElementById('nombreMedicamento').value,
        descripcion: document.getElementById('descripcionMedicamento').value,
        precio: parseFloat(document.getElementById('precioMedicamento').value),
        stock: parseInt(document.getElementById('stockMedicamento').value),
        fecha_vencimiento: document.getElementById('fechaVencimientoMedicamento').value,
        fabricante: document.getElementById('fabricanteMedicamento').value,
        idProveedor: parseInt(document.getElementById('idProveedorMedicamento').value)
      };
      try {
        let url = '/api/medicamentos';
        let method = 'POST';
        const idMedicamento = document.getElementById('idMedicamento').value;
        if (idMedicamento) {
          url += `/${idMedicamento}`;
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
          cargarMedicamentos();
        } else {
          console.error('Error al guardar el medicamento');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });

  async function cargarMedicamentos() {
    try {
      const response = await fetch('/api/medicamentos');
      const data = await response.json();
      const medicamentosList = document.getElementById('medicamentosList');
      medicamentosList.innerHTML = '';
      data.forEach(medicamento => {
        const row = document.createElement('tr');
        row.id = `medicamento-${medicamento.idMedicamento}`;
        row.innerHTML = `
          <td>${medicamento.idMedicamento}</td>
          <td>${medicamento.nombreMedicamento}</td>
          <td>${medicamento.descripcion || ''}</td>
          <td>${medicamento.precio}</td>
          <td>${medicamento.stock}</td>
          <td>${medicamento.fecha_vencimiento || ''}</td>
          <td>${medicamento.fabricante || ''}</td>
          <td>${medicamento.idProveedor}</td>
          <td>
            <button class="btn btn-sm btn-info" onclick="editarMedicamento(${medicamento.idMedicamento})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarMedicamento(${medicamento.idMedicamento})">Eliminar</button>
            <button class="btn btn-sm btn-warning" onclick="reponerStock(${medicamento.idMedicamento})">Reponer</button>
          </td>
        `;
        medicamentosList.appendChild(row);

        // Verificar el stock y mostrar alerta si es 5 o menos
        if (medicamento.stock <= 5) {
          alert(`El stock del medicamento ${medicamento.nombreMedicamento} es bajo (${medicamento.stock}). Por favor, reponer.`);
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
///
async function reponerStock(idMedicamento) {
try {
  const response = await fetch(`/api/medicamentos/${idMedicamento}/reponer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cantidad: 10 }) // Reponer 10 unidades
  });

  if (response.ok) {
    alert(`Se ha reponido el stock del medicamento.`);
    cargarMedicamentos(); // Actualizar la lista de medicamentos después de reponer
  } else {
    console.error('Error al reponer el stock del medicamento:', response.status, response.statusText);
  }
} catch (error) {
  console.error('Error:', error);
}
}

///
  //
  async function verificarNombreMedicamento() {
  const nombreMedicamento = document.getElementById('nombreMedicamento').value;

  try {
    const response = await fetch(`/api/medicamentos/verificar-nombre?nombre=${nombreMedicamento}`);
    if (response.ok) {
      document.getElementById('errorNombreMedicamento').style.display = 'none';
      alert('El nombre de medicamento está disponible.');
    } else {
      document.getElementById('errorNombreMedicamento').style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

  async function buscarMedicamento() {
    const nombreMedicamento = document.getElementById('buscarNombre').value;
    try {
      const response = await fetch(`/api/medicamentos/buscar?nombre=${nombreMedicamento}`);
      const data = await response.json();
      const medicamentosList = document.getElementById('medicamentosList');
      medicamentosList.innerHTML = '';
      if (data.length > 0) {
        data.forEach(medicamento => {
          const row = document.createElement('tr');
          row.id = `medicamento-${medicamento.idMedicamento}`;
          row.innerHTML = `
            <td>${medicamento.idMedicamento}</td>
            <td>${medicamento.nombreMedicamento}</td>
            <td>${medicamento.descripcion || ''}</td>
            <td>${medicamento.precio}</td>
            <td>${medicamento.stock}</td>
            <td>${medicamento.fecha_vencimiento || ''}</td>
            <td>${medicamento.fabricante || ''}</td>
            <td>${medicamento.idProveedor}</td>
            <td>
              <button class="btn btn-sm btn-info" onclick="editarMedicamento(${medicamento.idMedicamento})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarMedicamento(${medicamento.idMedicamento})">Eliminar</button>
              <button class="btn btn-sm btn-warning" onclick="reponerStock(${medicamento.idMedicamento})">Reponer</button>
            </td>
          `;
          medicamentosList.appendChild(row);
        });
      } else {
        medicamentosList.innerHTML = '<tr><td colspan="9" class="text-center">No se encontraron medicamentos con ese nombre</td></tr>';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function eliminarMedicamento(idMedicamento) {
    if (confirm('¿Estás seguro de eliminar este medicamento?')) {
      try {
        const response = await fetch(`/api/medicamentos/${idMedicamento}`, { method: 'DELETE' });
        if (response.ok) {
          document.getElementById(`medicamento-${idMedicamento}`).remove();
        } else {
          console.error('Error al eliminar el medicamento');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  async function editarMedicamento(idMedicamento) {
    try {
      const response = await fetch(`/api/medicamentos/${idMedicamento}`);
      const medicamento = await response.json();
      document.getElementById('idMedicamento').value = medicamento.idMedicamento;
      document.getElementById('nombreMedicamento').value = medicamento.nombreMedicamento;
      document.getElementById('descripcionMedicamento').value = medicamento.descripcion || '';
      document.getElementById('precioMedicamento').value = medicamento.precio;
      document.getElementById('stockMedicamento').value = medicamento.stock;
      document.getElementById('fechaVencimientoMedicamento').value = medicamento.fecha_vencimiento || '';
      document.getElementById('fabricanteMedicamento').value = medicamento.fabricante || '';
      document.getElementById('idProveedorMedicamento').value = medicamento.idProveedor;
      $('#registroModal').modal('show');
    } catch (error) {
      console.error('Error:', error);
    }
  }