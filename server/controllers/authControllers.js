// auth.controller.js
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Utilidad para generar hash de contraseña
const generatePasswordHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Registro de usuario
export async function register(req, res, next) {
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
}

// Inicio de sesión
export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isPasswordCorrect = bcrypt.compare(
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

    // Comenté esta parte ya que la variable "user" no estaba definida, puede que necesites ajustarla según tu modelo de datos.
    /*
    const { password, ...otherDetails } = user._doc;
    res.status(200).json({
      token,
      user: otherDetails, // Renombramos el objeto a "user" para mayor claridad
    });
    */

    res.status(200).json({ token }); // Responde solo con el token por ahora
  } catch (err) {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
}
