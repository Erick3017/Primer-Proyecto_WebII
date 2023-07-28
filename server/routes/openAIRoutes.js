// openai.routes.js
const express = require('express');
const router = express.Router();
const openaiController = require('../controllers/openAIControllers.js');

// Ruta para ejecutar un prompt utilizando el API de OpenAI
router.post('/execute/:promptId', openaiController.executePrompt);

module.exports = router;
