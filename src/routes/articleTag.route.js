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
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

const articleTagRoutes = Router();

// Asociar un tag a un artículo 
articleTagRoutes.post(
  "/",
  ownerMiddleware,
  adminMiddleware,
  createArticleTagValidation,
  validator,
  dataValidada,
  addTagToArticle
);

// Remover un tag de un artículo 
articleTagRoutes.delete(
  "/:id",
  ownerMiddleware,
  adminMiddleware,
  deleteArticleTagValidation,
  validator,
  removeTagFromArticle
);

export default articleTagRoutes;