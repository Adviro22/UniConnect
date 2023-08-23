import express from 'express';
import { register, login, logout, verifyToken, getUserById } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

const router = express.Router();

// Rutas para registrarse e iniciar sesión
router.post('/register',validateSchema(registerSchema), register);
router.post('/login',validateSchema(loginSchema),login);
router.post('/logout',logout);
router.get('/verify',verifyToken);
// Ruta para obtener un usuario por su ID
router.get('/user/:id', getUserById);

export default router;