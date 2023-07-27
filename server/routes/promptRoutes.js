// prompt.routes.js
const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptControllers');

// Rutas para la gestión de prompts
router.post('/', promptController.createPrompt);
// Resto de las rutas para editar, eliminar y listar prompts

module.exports = router;
