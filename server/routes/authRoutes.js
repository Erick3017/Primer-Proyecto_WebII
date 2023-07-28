// auth.routes.js
import { Router } from 'express';
const router = Router();
import { login, register } from '../controllers/authControllers.js';

// Ruta para la autenticación de usuarios
router.post('/login', login);
router.post('/register', register);

export default router;
