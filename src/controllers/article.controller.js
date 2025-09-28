import articleModel from "../models/article.model.js";
import userModel from "../models/user.model.js";
import tagModel from "../models/tag.model.js";

export const createArticle = async (req, res) => {
  const { title, content, excerpt, status } = req.data; // 🔥 ahora viene validado
  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Título y contenido son obligatorios" });
    }

    const newArticle = await articleModel.create({
      title,
      content,
      excerpt: excerpt || null,
      status: status || "published",
      user_id: req.user.id, // extraído del authMiddleware
    });

    res.status(201).json({ message: "Artículo creado", article: newArticle });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear artículo", error: error.message });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await articleModel.findAll({
      where: { status: "published" },
      include: [
        {
          model: userModel,
          as: "author",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    res.json(articles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener artículos", error: error.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await articleModel.findByPk(req.params.id, {
      include: [
        {
          model: userModel,
          as: "author",
          attributes: ["id", "username", "email"],
        },
        { model: tagModel, as: "tags", through: { attributes: [] } },
      ],
    });

    if (!article)
      return res.status(404).json({ message: "Artículo no encontrado" });

    res.json(article);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener artículo", error: error.message });
  }
};

export const getUserArticles = async (req, res) => {
  try {
    const articles = await articleModel.findAll({
      where: { user_id: req.user.id },
      include: [{ model: tagModel, as: "tags", through: { attributes: [] } }],
    });

    res.json(articles);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener artículos del usuario",
        error: error.message,
      });
  }
};

export const updateArticle = async (req, res) => {
  const { title, content, excerpt, status } = req.data;
  try {
    const article = await articleModel.findByPk(req.params.id);
    if (!article)
      return res.status(404).json({ message: "Artículo no encontrado" });

    // Solo el autor o admin puede modificar
    if (req.user.id !== article.user_id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No autorizado a modificar este artículo" });
    }

    await article.update({
      title: title || article.title,
      content: content || article.content,
      excerpt: excerpt || article.excerpt,
      status: status || article.status,
      updated_at: new Date(),
    });

    res.json({ message: "Artículo actualizado", article });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar artículo", error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await articleModel.findByPk(req.params.id);
    if (!article)
      return res.status(404).json({ message: "Artículo no encontrado" });

    // Solo autor o admin puede eliminar
    if (req.user.id !== article.user_id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No autorizado a eliminar este artículo" });
    }

    await article.destroy();
    res.json({ message: "Artículo eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar artículo", error: error.message });
  }
};
