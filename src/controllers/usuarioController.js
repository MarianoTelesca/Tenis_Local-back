const usuarioModel = require('../models/usuarioModel');

// Funciones para la tabla Usuarios que ya están en Model: Store (create), Login (login).

// *STORE* llama a la función "Create" que inserta un registro nuevo en la base de datos
exports.store = async (req, res) => {
    try {
        const { nombre, email, contraseña, is_admin } = req.body;
        await usuarioModel.create({ nombre, email, contraseña, is_admin });
        res.json({ success: true, message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error("Error en usuarioController.register:", error);
        res.status(500).json({ success: false, message: `Error al registrar: ${error.message}` });
    }
};

// *LOGIN* llama a la función "Login" que compara usuario y contraseña ingresado con la base de datos e inicia sesión
exports.login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const usuario = await usuarioModel.login(email, contraseña);

        if (!usuario) {
            // Si es null, el método login del modelo devolvión eso porque o el email o la clave están mal
            return res.status(401).json({ success: false, message: 'Usuario/Contraseña invalido' });
        }

        res.json({ 
            success: true, 
            message: 'Usuario logueado',
            data: {
                id: usuario.id,
                nombre: usuario.nombre
            }
        });
    } catch (error) {
        console.error("Error en usuarioController.login:", error);
        res.status(500).json({ success: false, message: `Error en login: ${error.message}` });
    }
};