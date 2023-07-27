// prompt.controller.js
const Prompt = require('../models/promptModel');
const mongoose = require('mongoose');

// Utilidad para manejar errores
const handleResponse = (res, data) => {
  res.status(200).json({ success: true, data });
};

const handleError = (res, message) => {
  res.status(500).json({ success: false, error: message });
};

// Crear un nuevo prompt
exports.createPrompt = async (req, res) => {
  try {
    const prompt = new Prompt(req.body);
    await prompt.save();
    handleResponse(res, { message: 'Prompt creado correctamente' });
  } catch (error) {
    handleError(res, 'Error al crear el prompt');
  }
};

// Actualizar un prompt
exports.updatePrompt = async (req, res) => {
  try {
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    handleResponse(res, updatedPrompt);
  } catch (error) {
    handleError(res, 'Error al actualizar el prompt');
  }
};

// Eliminar un prompt
exports.deletePrompt = async (req, res) => {
  try {
    await Prompt.findByIdAndDelete(req.params.id);
    handleResponse(res, { message: 'El prompt se ha eliminado correctamente' });
  } catch (error) {
    handleError(res, 'Error al eliminar el prompt');
  }
};

// Obtener un solo prompt por su ID o todos los prompts
exports.getPrompt = async (req, res) => {
  try {
    const { id, name } = req.query;
    if (id) {
      const prompt = await Prompt.findById(id);
      handleResponse(res, prompt);
    } else if (name) {
      const prompts = await Prompt.find({
        name: { $regex: name, $options: 'i' },
      });
      handleResponse(res, prompts);
    } else {
      const prompts = await Prompt.find();
      handleResponse(res, prompts);
    }
  } catch (error) {
    handleError(res, 'Error al obtener los prompts');
  }
};

// Obtener prompts por ID de usuario
exports.getPromptsByUser = async (req, res) => {
  try {
    const { iduser } = req.query;
    if (!mongoose.Types.ObjectId.isValid(iduser)) {
      return res.status(400).json({ success: false, error: 'Usuario inválido' });
    }
    const prompts = await Prompt.find({ userId: iduser });
    handleResponse(res, prompts);
  } catch (error) {
    handleError(res, 'Error al obtener los prompts por usuario');
  }
};
