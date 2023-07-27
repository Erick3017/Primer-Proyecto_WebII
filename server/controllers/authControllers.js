
// auth.controller.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Utilidad para generar hash de contraseña
const generatePasswordHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Registro de usuario
exports.register = async (req, res, next) => {
  try {
    const hash = await generatePasswordHash(req.body.password);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      verified: false,
    });

    await newUser.save();
    res.status(200).json({ message: 'Usuario ha sido creado' });
  } catch (err) {
    res.status(401).json({ error: 'Campos inválidos' });
  }
};

// Inicio de sesión
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!user.verified)
      return res.status(403).json({ error: 'Usuario no verificado' });
    if (!isPasswordCorrect)
      return res.status(400).json({ error: 'Contraseña o usuario incorrectos' });

    const token = jwt.sign(
      { id: user.id, isAdmin: user.type === 'admin' },
      process.env.JWT_SECRET
    );
    /*const { password, ...otherDetails } = user._doc;
    res.status(200).json({
      token,
      user: otherDetails, // Renombramos el objeto a "user" para mayor claridad
    });*/
  } catch (err) {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
};




