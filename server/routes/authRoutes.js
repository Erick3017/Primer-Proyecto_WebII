// auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Ruta para la autenticación de usuarios
router.post('/login', authController.login);

module.exports = router;
