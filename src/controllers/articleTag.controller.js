import articleTagModel from "../models/articleTag.model.js";
import articleModel from "../models/article.model.js";
import tagModel from "../models/tag.model.js";

export const addTagToArticle = async (req, res) => {
  const { article_id, tag_id } = req.data;
  try {
    // Validar existencia de artículo y tag
    const article = await articleModel.findByPk(article_id);
    if (!article) return res.status(404).json({ message: "Artículo no encontrado" });

    const tag = await tagModel.findByPk(tag_id);
    if (!tag) return res.status(404).json({ message: "Tag no encontrado" });

    // Validar propietario o admin
    if (req.user.id !== article.user_id && req.user.role !== "admin") {
      return res.status(403).json({ message: "No autorizado" });
    }

    // Crear asociación (si no existe ya)
    const [association, created] = await articleTagModel.findOrCreate({
      where: { article_id, tag_id },
    });

    if (!created) return res.status(400).json({ message: "El tag ya está asociado al artículo" });

    res.status(201).json({ message: "Tag agregado al artículo", association });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar tag", error: error.message });
  }
};

export const removeTagFromArticle = async (req, res) => {
  const { articleTagId } = req.params;
  try {
    const association = await articleTagModel.findByPk(articleTagId);
    if (!association) return res.status(404).json({ message: "Asociación no encontrada" });

    // Validar propietario del artículo o admin
    const article = await articleModel.findByPk(association.article_id);
    if (req.user.id !== article.user_id && req.user.role !== "admin") {
      return res.status(403).json({ message: "No autorizado" });
    }

    await association.destroy();
    res.json({ message: "Tag removido del artículo" });
  } catch (error) {
    res.status(500).json({ message: "Error al remover tag", error: error.message });
  }
};
