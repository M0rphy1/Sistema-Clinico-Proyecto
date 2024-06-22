document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
  
    try {
      const response = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
  
      const data = await response.json();
      console.log('Usuario autenticado:', data);
  
      // Aquí podrías redirigir al usuario a otra página o realizar alguna acción adicional
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      // Aquí podrías mostrar un mensaje de error al usuario en tu página HTML
    }
  });
  