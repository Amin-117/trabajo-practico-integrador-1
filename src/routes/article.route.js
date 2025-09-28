import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  getUserArticles,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { validator } from "../middlewares/validator.js";
import { dataValidada } from "../middlewares/matchedData.middleware.js";
import {
  createArticleValidation,
  updateArticleValidation,
  getArticleValidation,
  deleteArticleValidation,
} from "../middlewares/validations/article.validator.js";

const articleRoutes = Router();

// Crear artículo (usuario autenticado)
articleRoutes.post(
  "/",
  authMiddleware,
  createArticleValidation,
  validator,
  dataValidada,
  createArticle
);

// Listar todos los artículos publicados (público)
articleRoutes.get("/", authMiddleware, getArticles);

// Obtener artículo por ID (público)
articleRoutes.get(
  "/:id",
  authMiddleware,
  getArticleValidation,
  validator,
  getArticleById
);

// Actualizar artículo (solo autor o admin)
articleRoutes.put(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  updateArticleValidation,
  dataValidada,
  validator,
  updateArticle
);

// Eliminar artículo (solo autor o admin)
articleRoutes.delete(
  "/:id",
  authMiddleware,
  ownerMiddleware,
  deleteArticleValidation,
  validator,
  deleteArticle
);

export default articleRoutes;
