import User from '../models/userModel.js';

// Registro de usuarios
export async function registerUser(req, res) {
  try {
    // Crear un nuevo usuario a partir de los datos enviados en el formulario
    const user = new User(req.body);
    // Guardar el usuario en la base de datos
    const savedUser = await user.save();
    res.status(200).json({ savedUser, message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
}

// Verificar usuario por parte del administrador
export async function verifyUser(req, res) {
  try {
    const { userId } = req.params;
    // Buscar el usuario por su ID y actualizar el campo "verified" a true
    await User.findByIdAndUpdate(userId, { verified: true });
    res.status(200).json({ message: 'Usuario verificado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el usuario' });
  }
}

// Resto de los controladores para editar, eliminar y listar usuarios

export async function updateUser(req, res) {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
}

export async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar el usuario' });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
}
