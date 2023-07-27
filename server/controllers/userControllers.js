// user.controller.js
const User = require('../models/userModel');

// Registro de usuarios
exports.registerUser = async (req, res) => {
  try {
    // Crear un nuevo usuario a partir de los datos enviados en el formulario
    const user = new User(req.body);
    // Guardar el usuario en la base de datos
    await user.save();
    res.status(200).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Verificar usuario por parte del administrador
exports.verifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    // Buscar el usuario por su ID y actualizar el campo "verified" a true
    await User.findByIdAndUpdate(userId, { verified: true });
    res.status(200).json({ message: 'Usuario verificado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el usuario' });
  }
};

// Resto de los controladores para editar, eliminar y listar usuarios

exports.updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el usuario' });
  }

};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(
      req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el usuario' });
  }

};

exports.getUsers = async (req,res,next) =>{
      
  try{
      const users = await User.find();
      res.status(200).json(users);
  }catch(error){
    res.status(500).json({ error: 'Error al verificar el usuario' });
  }
};
