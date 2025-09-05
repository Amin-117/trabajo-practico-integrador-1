import { Router } from "express";
import {
  addTagToArticle,
  removeTagFromArticle
} from "../controllers/articleTag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validator } from "../middlewares/validator.js";
import { dataValidada } from "../middlewares/matchedData.middleware.js";
import {
  createArticleTagValidation,
  deleteArticleTagValidation
} from "../middlewares/validations/articletag.validator.js";

const articleTagRoutes = Router();

// Asociar un tag a un artículo (solo admin)
articleTagRoutes.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createArticleTagValidation,
  validator,
  dataValidada,
  addTagToArticle
);

// Remover un tag de un artículo (solo admin)
articleTagRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteArticleTagValidation,
  validator,
  removeTagFromArticle
);

export default articleTagRoutes;