const pool = require('../../db');
const bcrypt = require('bcrypt'); // Dependencia para el cifrado de contraseñas
const dateHelper = require('../helpers/dateHelper'); // Helper para agregar la fecha en la Base de Datos

//Funciones para la tabla Usuarios: CREATE, LOGIN.

//REVISAR BIEN CUALES SERÁN TODAS LAS COLUMNAS DE LA TABLA
//*CREATE* Función para insertar nuevos registros en la base de datos
exports.create = async ({ nombre, email, contraseña, is_admin }) => {
    const contraseña_encriptada = await bcrypt.hash(contraseña, 10); // Encriptamos la contraseña
    const adminStatus = is_admin ? 1 : 0;
    const fecha_creacion = dateHelper.getCurrentDateTime();
    const query = 'INSERT INTO usuarios (nombre, email, contraseña, is_admin, fecha_creacion) VALUES (?, ?, ?, ?, ?)';
    await pool.query(query, [nombre, email, contraseña_encriptada, adminStatus, fecha_creacion]);
};

//*LOGIN* Función para loguearse, comparando usuario y contraseña con la base de datos
exports.login = async (email, contraseña_ingresada) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await pool.query(query, [email]);
    
    if (rows.length === 0) return null; // Si no existe el email devolvemos 'null
    const usuario = rows[0];
    
    // Hay que comparar la contraseña ingresada con la de la BD (que ya está hasheada)
    const is_contraseña_valida = await bcrypt.compare(contraseña_ingresada, usuario.contraseña);

    if (is_contraseña_valida) {
        return usuario;
    } else {
        return null;
    }
};