document.getElementById('registroForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nombreUsuario = document.getElementById('nombreUsuario').value;
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;

  try {
    const response = await fetch('/api/usuarios/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombreUsuario, correo, contrasena }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }

    const data = await response.json();
    console.log('Usuario registrado:', data);

    // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    // Aquí podrías mostrar un mensaje de error al usuario en tu página HTML
  }
});

  