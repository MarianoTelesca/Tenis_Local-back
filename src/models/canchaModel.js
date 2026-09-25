const pool = require('../../db');

//Funciones para la tabla Canchas: ALL, CREATE, UPDATE, DELETE, FINDBYID.

//*ALL* Función para traer todos los resultados de la base de datos
exports.all = async() => {
    const query = `SELECT * FROM canchas`

    try{
        [results] = await pool.query(query);
        return results;
    }catch(error){
        throw error;
    }
}

//REVISAR BIEN CUALES SERÁN TODAS LAS COLUMNAS DE LA TABLA
//*CREATE* Función para insertar nuevos registros en la base de datos
exports.create = async ({ nombre, direccion, descripcion, cantidad_canchas }) => {
    
    try{
    const query = 'INSERT INTO canchas (nombre, direccion, descripcion, cantidad_canchas) VALUES (?, ?, ?, ?)';
    await pool.query(query, [nombre, direccion, descripcion, cantidad_canchas]);
    }catch(error){
        throw error;
    }
};

//*UPDATE* Función para actualizar registros en la base de datos
exports.update = async (id, { nombre, direccion, descripcion, cantidad_canchas }) => {
    const query = 'UPDATE canchas SET nombre = ?, direccion = ?, descripcion = ?, cantidad_canchas = ? WHERE id = ?';
    await pool.query(query, [nombre, direccion, descripcion, cantidad_canchas, id]);
};

//*DELETE* Función para eliminar un registro de la base de datos
exports.delete = async (id) => {
    const query = 'DELETE FROM canchas WHERE id = ?';
    await pool.query(query, [id]);
};

//*FIND BY ID* Función para traer un registro especifico de la base de datos según el ID
exports.findById = async (id) => {
    try {
        const query = 'SELECT * FROM canchas WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }catch(error){
        throw error;
    }

};