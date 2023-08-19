import { Router } from "express";
import {
  createPublication,
  updatePublication,
  deletePublication,
  getPublication,
  getPublications
} from "../controllers/product.controllers.js";

import authenticateToken from "../middlewares/auth.token.js";
import { createProductSchema } from "../schemas/product.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/",authenticateToken, getPublications);
//router.get("/",getStudents);

router.post("/",authenticateToken,validateSchema(createProductSchema), createPublication);

router.get("/:id", authenticateToken, getPublication);

router.put("/:id", authenticateToken, updatePublication);

router.delete("/:id", authenticateToken, deletePublication);

export default router;
