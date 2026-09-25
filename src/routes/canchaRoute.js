const express = require('express');
const router = express.Router();
const canchaController = require('../controllers/canchaController');

// Acá se agregan las rutas de cada método creado en el Controller.
router.get("/canchas", canchaController.index);
router.post("/canchas", canchaController.store);
router.put("/canchas/:id", canchaController.update);
router.delete("/canchas/:id", canchaController.destroy);
router.get("/canchas/:id", canchaController.show);

module.exports=router;