const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Acá se agregan las rutas de cada método creado en el Controller.
router.post("/registro", usuarioController.store);
router.post("/login", usuarioController.login);

module.exports=router;