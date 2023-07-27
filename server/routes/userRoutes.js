// user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Rutas para la gestión de usuarios
router.post('/register', userController.registerUser);
router.put('/verify/:userId', userController.verifyUser);

// Resto de las rutas para editar, eliminar y listar usuarios

module.exports = router;
