import { body, param } from "express-validator";
import articleTagModel from "../../models/articleTag.model.js";
import articleModel from "../../models/article.model.js";
import tagModel from "../../models/tag.model.js";

// Crear relación artículo-etiqueta
export const createArticleTagValidation = [
  body("article_id")
    .notEmpty().withMessage("El campo article_id es obligatorio")
    .isInt().withMessage("El article_id debe ser un número entero")
    .custom(async (value) => {
      const article = await articleModel.findByPk(value);
      if (!article) {
        throw new Error("No existe ningún artículo con ese id");
      }
      return true;
    }),

  body("tag_id")
    .notEmpty().withMessage("El campo tag_id es obligatorio")
    .isInt().withMessage("El tag_id debe ser un número entero")
    .custom(async (value, { req }) => {
      const tag = await tagModel.findByPk(value);
      if (!tag) {
        throw new Error("No existe ninguna etiqueta con ese id");
      }

      // Evitar duplicados en la relación N:M
      const existingRelation = await articleTagModel.findOne({
        where: { article_id: req.body.article_id, tag_id: value },
      });
      if (existingRelation) {
        throw new Error("Este artículo ya tiene asociada esa etiqueta");
      }

      return true;
    }),
];

// Actualizar relación (ej: cambiar la etiqueta de un artículo)
export const updateArticleTagValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const relation = await articleTagModel.findByPk(value);
      if (!relation) {
        throw new Error("No existe ninguna relación con ese id");
      }
      return true;
    }),

  body("article_id")
    .optional()
    .isInt().withMessage("El article_id debe ser un número entero")
    .custom(async (value) => {
      const article = await articleModel.findByPk(value);
      if (!article) {
        throw new Error("No existe ningún artículo con ese id");
      }
      return true;
    }),

  body("tag_id")
    .optional()
    .isInt().withMessage("El tag_id debe ser un número entero")
    .custom(async (value, { req }) => {
      const tag = await tagModel.findByPk(value);
      if (!tag) {
        throw new Error("No existe ninguna etiqueta con ese id");
      }

      // Evitar duplicados en update
      if (req.body.article_id) {
        const existingRelation = await articleTagModel.findOne({
          where: { article_id: req.body.article_id, tag_id: value },
        });
        if (existingRelation && existingRelation.id !== parseInt(req.params.id)) {
          throw new Error("Ya existe esa relación artículo-etiqueta");
        }
      }

      return true;
    }),
];

// Obtener relación
export const getArticleTagValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const relation = await articleTagModel.findByPk(value);
      if (!relation) {
        throw new Error("No existe ninguna relación con ese id");
      }
      return true;
    }),
];

// Eliminar relación
export const deleteArticleTagValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const relation = await articleTagModel.findByPk(value);
      if (!relation) {
        throw new Error("No existe ninguna relación con ese id");
      }
      return true;
    }),
];
