import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  getUserArticles,
  updateArticle,
  deleteArticle
} from "../controllers/article.controller.js";

const router = Router();

router.post("/", createArticle);
router.get("/", getArticles);
router.get("/:id", getArticleById);
router.get("/user/articles", getUserArticles);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;