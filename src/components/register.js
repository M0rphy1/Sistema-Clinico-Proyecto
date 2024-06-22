import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [idRol, setIdRol] = useState(2); // Suponiendo que 2 es el rol para Médico Veterinario

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/register', {
        nombreUsuario,
        correo,
        contrasena,
        idRol
      });
      console.log(response.data);
      alert('Usuario registrado exitosamente.');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Error al registrar el usuario.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
