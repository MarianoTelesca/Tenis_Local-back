const canchaModel = require('../models/canchaModel');

// Por convención, hay algunos nombres establecidos para las funciones del controller
// Funciones para la tabla Canchas que ya están en Model: Index (all), Store (create), Update, Destroy (delete), Show (FindById).

// *INDEX* llama a la función "All" que trae todos los resultados de la tabla de la BD
exports.index = async(req, res) => {
    try{
        results = await canchaModel.all();
        res.json({success: true, results})
    }catch(error){
        console.error("Error en canchaController.index:", error); 
        res.status(500).json({ 
            success: false, 
            message: `Error en el controller: ${error.message}` 
        });
    }
}

// *STORE* llama a la función "Create" que inserta un registro nuevo en la base de datos
exports.store = async (req, res) => {
    try {
        const { nombre, direccion, descripcion, cantidad_canchas } = req.body;
        await canchaModel.create({ nombre, direccion, descripcion, cantidad_canchas });
        res.json({ success: true, message: 'Registro creado con éxito' });
    } catch (error) {
        console.error("Error en canchaController.store:", error); 
        res.status(500).json({ 
            success: false, 
            message: `Error en el controller: ${error.message}` 
        });
    }
};

// *UPDATE* llama a la función "Update" para actualizar un registro en la base de datos
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, descripcion, cantidad_canchas } = req.body;

        const cancha = await canchaModel.findById(id);
        if (!cancha) {
        return res.status(404).json({ success: false, message: 'Registro no encontrado' });
        }

        await canchaModel.update(id, { nombre, direccion, descripcion, cantidad_canchas });
        res.json({ success: true, message: 'Registro actualizado con éxito' });
    } catch (error) {
        console.error("Error en canchaController.update:", error); 
        res.status(500).json({ 
            success: false, 
            message: `Error en el controller: ${error.message}` 
        });
    }
};

// *DESTROY* llama a la función "Delete" para eliminar un registro de la base de datos
exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;

        const cancha = await canchaModel.findById(id);
        if (!cancha) {
        return res.status(404).json({ success: false, message: 'Registro no encontrado' });
        }

        await canchaModel.delete(id);
        res.json({ success: true, message: 'Registro eliminado con éxito' });
    } catch (error) {
        console.error("Error en canchaController.destroy:", error); 
        res.status(500).json({ 
            success: false, 
            message: `Error en el controller: ${error.message}` 
        });
    }
};

// *SHOW* llama a la función "FindById" que busca un registro especifico de la base de datos según el ID
exports.show = async (req, res) => {
    try {
        const { id } = req.params;
        const cancha = await canchaModel.findById(id);

        if (!cancha) {
        return res.status(404).json({ success: false, message: 'Registro no encontrado' });
        }

        res.json({ success: true, data: cancha });
    } catch (error) {
        console.error("Error en canchaController.show:", error); 
        res.status(500).json({ 
            success: false, 
            message: `Error en el controller: ${error.message}` 
        });
    }
};