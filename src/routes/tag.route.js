import { Router } from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validator } from "../middlewares/validator.js";
import { dataValidada } from "../middlewares/matchedData.middleware.js";
import {
  createTagValidation,
  updateTagValidation,
  getTagValidation,
  deleteTagValidation
} from "../middlewares/validations/tag.validator.js";

const tagRoutes = Router();

// Crear etiqueta (solo admin)
tagRoutes.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTagValidation,
  validator,
  dataValidada,
  createTag
);

// Listar todas las etiquetas (público)
tagRoutes.get("/", authMiddleware, getTags);

// Obtener etiqueta por ID (público)
tagRoutes.get(
  "/:id",
  authMiddleware,
  getTagValidation,
  validator,
  getTagById
);

// Actualizar etiqueta (solo admin)
tagRoutes.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidation,
  validator,
  dataValidada,
  updateTag
);

// Eliminar etiqueta (solo admin)
tagRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTagValidation,
  validator,
  deleteTag
);

export default tagRoutes;