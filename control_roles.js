// Importamos el módulo pg para la conexión a PostgreSQL
const { Client } = require('pg');

// Configuración de la conexión a PostgreSQL
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Veterinaria', 
    password: 'admin',
    port: 5432
});

// Función para conectar a la base de datos
async function conectarDB() {
    try {
        await client.connect();
        console.log('Conectado a la base de datos PostgreSQL');
    } catch (err) {
        console.error('Error de conexión a la base de datos:', err.stack);
        throw new Error('No se pudo conectar a la base de datos');
    }
}

// Función para verificar si el usuario es Administrador
async function esAdmin(usuarioId) {
    const res = await client.query('SELECT rol FROM usuarios WHERE id = $1', [usuarioId]);
    return res.rows[0]?.rol === 'Administrador';
}

// Función para obtener los detalles de un usuario por ID
async function encontrarUsuarioPorId(id) {
    const res = await client.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return res.rows[0];
}

// Función principal para la asignación de roles
async function controlRoles(adminId, usuarioId, nuevoRol) {
    // Conectar a la base de datos
    await conectarDB();

    try {
        // Verificación de que el usuario que realiza la asignación es un administrador
        if (!await esAdmin(adminId)) {
            throw new Error('Permiso denegado: Solo los administradores pueden asignar roles.');
        }

        // Validación de que el rol nuevo es un rol válido del sistema
        const rolesValidos = ['Administrador', 'Gerente', 'Encargado de Área'];
        if (!rolesValidos.includes(nuevoRol)) {
            throw new Error(`Rol inválido: El rol '${nuevoRol}' no es un rol válido en el sistema.`);
        }

        // Búsqueda del usuario al que se le va a asignar el nuevo rol
        const usuario = await encontrarUsuarioPorId(usuarioId);
        if (!usuario) {
            throw new Error(`Usuario no encontrado: No existe un usuario con el ID ${usuarioId}.`);
        }

        // Restricciones adicionales basadas en los roles
        // Solo el administrador puede asignar roles de Administrador y Gerente
        if (nuevoRol === 'Administrador' || nuevoRol === 'Gerente') {
            if (!await esAdmin(adminId)) {
                throw new Error('Permiso denegado: Solo los administradores pueden asignar el rol de Administrador o Gerente.');
            }
        }

        // Asignación del nuevo rol al usuario en la base de datos
        await client.query('UPDATE usuarios SET rol = $1 WHERE id = $2', [nuevoRol, usuarioId]);
        console.log(`Rol asignado: El usuario ${usuario.nombre} ahora tiene el rol de '${nuevoRol}'.`);
    } catch (error) {
        console.error('Error en la asignación de roles:', error.message);
        throw error; // Re-lanzamos el error para ser manejado externamente
    } finally {
        // Cerrar la conexión a la base de datos
        await client.end();
        console.log('Conexión a la base de datos cerrada');
    }
}

// Exportamos la función para su uso en otros módulos
module.exports = {
    controlRoles
};
