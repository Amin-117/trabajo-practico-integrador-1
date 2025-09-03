import { Router } from "express";
import {
  addTagToArticle,
  removeTagFromArticle
} from "../controllers/articleTag.controller.js";

const router = Router();

router.post("/", addTagToArticle);
router.delete("/:articleTagId", removeTagFromArticle);

export default router;