import { body, param } from "express-validator";
import articleModel from "../../models/article.model.js";
import userModel from "../../models/user.model.js";
//escape() para evitar inyecciones de código

// Crear artículo
export const createArticleValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 }).withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .trim()
    .notEmpty().withMessage("El contenido es obligatorio")
    .isLength({ min: 50 }).withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 }).withMessage("El resumen no debe superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"]).withMessage("El estado debe ser 'published' o 'archived'"),

  body("user_id")
    .notEmpty().withMessage("El campo user_id es obligatorio")
    .isInt().withMessage("El user_id debe ser un número entero")
    .custom(async (value) => {
      const user = await userModel.findByPk(value);
      if (!user) {
        throw new Error("No existe ningún usuario con ese id");
      }
      return true;
    }),
];

// Actualizar artículo
export const updateArticleValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const article = await articleModel.findByPk(value);
      if (!article) {
        throw new Error("No existe ningún artículo con ese id");
      }
      return true;
    }),

  body("title")
    .optional()
    .isLength({ min: 3, max: 200 }).withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .isLength({ min: 50 }).withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 }).withMessage("El resumen no debe superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"]).withMessage("El estado debe ser 'published' o 'archived'"),

  body("user_id")
    .optional()
    .isInt().withMessage("El user_id debe ser un número entero")
    .custom(async (value) => {
      const user = await userModel.findByPk(value);
      if (!user) {
        throw new Error("No existe ningún usuario con ese id");
      }
      return true;
    }),
];

// Obtener artículo
export const getArticleValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const article = await articleModel.findByPk(value);
      if (!article) {
        throw new Error("No existe ningún artículo con ese id");
      }
      return true;
    }),
];

// Eliminar artículo
export const deleteArticleValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const article = await articleModel.findByPk(value);
      if (!article) {
        throw new Error("No existe ningún artículo con ese id");
      }
      return true;
    }),
];
