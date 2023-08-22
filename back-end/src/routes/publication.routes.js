import { Router } from "express";
import multer from 'multer'; // Importa multer
import authenticateToken from "../middlewares/auth.token.js";
import { createProductSchema } from "../schemas/publication.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  createPublication,
  updatePublication,
  deletePublication,
  getPublication,
  getPublications,
  saveImage
} from "../controllers/publication.controllers.js";

const router = Router();
const upload = multer(); // Usa multer sin configuración para form-data

router.get("/", authenticateToken, getPublications);

// Ruta para crear una publicación (form-data o JSON)
router.post("/", authenticateToken, upload.single('imageFile'), validateSchema(createProductSchema), createPublication);

router.post("/saveimage", authenticateToken, upload.single('imageFile'), saveImage);

router.get("/:id", authenticateToken, getPublication);

router.put("/:id", authenticateToken, updatePublication);

router.delete("/:id", authenticateToken, deletePublication);

export default router;
