import ArticleModel from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id);

    if (req.user.role !== "admin" && req.user.id !== article.user_id)
      return res.status(403).json({
        message: "No eres el autor",
      });
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};