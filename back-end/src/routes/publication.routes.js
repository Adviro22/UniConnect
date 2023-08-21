import { Router } from "express";
import {
  createPublication,
  updatePublication,
  deletePublication,
  getPublication,
  getPublications,
  saveImage
} from "../controllers/publication.controllers.js";
import multer from 'multer';
import authenticateToken from "../middlewares/auth.token.js";
import { createProductSchema } from "../schemas/publication.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();
const upload = multer();

router.get("/",authenticateToken, getPublications);
//router.get("/",getStudents);

router.post("/",authenticateToken,validateSchema(createProductSchema), createPublication);

router.post("/saveimage", authenticateToken, upload.single('imagen'), saveImage);

router.get("/:id", authenticateToken, getPublication);

router.put("/:id", authenticateToken, updatePublication);

router.delete("/:id", authenticateToken, deletePublication);

export default router;
