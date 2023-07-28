// user.routes.js
import { Router } from 'express';
const router = Router();
import { registerUser, verifyUser } from '../controllers/userControllers.js';

// Rutas para la gestión de usuarios
router.post('/register', registerUser);
router.put('/verify/:userId', verifyUser);

// Resto de las rutas para editar, eliminar y listar usuarios

export default router;
