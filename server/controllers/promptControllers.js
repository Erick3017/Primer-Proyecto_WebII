// prompt.controller.js
import Prompt from '../models/promptModel.js';
import { Types } from 'mongoose';

// Utilidad para manejar errores
const handleResponse = (res, data) => {
  res.status(200).json({ success: true, data });
};

const handleError = (res, message) => {
  res.status(500).json({ success: false, error: message });
};

// Crear un nuevo prompt
export async function createPrompt(req, res) {
  try {
    const prompt = new Prompt(req.body);
    await prompt.save();
    handleResponse(res, { message: 'Prompt creado correctamente' });
  } catch (error) {
    handleError(res, 'Error al crear el prompt');
  }
}

// Actualizar un prompt
export async function updatePrompt(req, res) {
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
}

// Eliminar un prompt
export async function deletePrompt(req, res) {
  try {
    await Prompt.findByIdAndDelete(req.params.id);
    handleResponse(res, { message: 'El prompt se ha eliminado correctamente' });
  } catch (error) {
    handleError(res, 'Error al eliminar el prompt');
  }
}

// Obtener un solo prompt por su ID o todos los prompts
export async function getPrompt(req, res) {
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
}

// Obtener prompts por ID de usuario
export async function getPromptsByUser(req, res) {
  try {
    const { iduser } = req.query;
    if (!Types.ObjectId.isValid(iduser)) {
      return res.status(400).json({ success: false, error: 'Usuario inválido' });
    }
    const prompts = await Prompt.find({ userId: iduser });
    handleResponse(res, prompts);
  } catch (error) {
    handleError(res, 'Error al obtener los prompts por usuario');
  }
}
