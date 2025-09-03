import { body, param } from "express-validator";
import tagModel from "../../models/tag.model.js";

// Crear etiqueta
export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 30 }).withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .custom(async (name) => {
      const existingTag = await tagModel.findOne({ where: { name } });
      if (existingTag) {
        throw new Error("La etiqueta ya existe");
      }
      return true;
    }),
];

// Actualizar etiqueta
export const updateTagValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const tag = await tagModel.findByPk(value);
      if (!tag) {
        throw new Error("No existe ninguna etiqueta con ese id");
      }
      return true;
    }),

  body("name")
    .optional()
    .isLength({ min: 2, max: 30 }).withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .custom(async (name, { req }) => {
      const existingTag = await tagModel.findOne({ where: { name } });
      if (existingTag && existingTag.id !== parseInt(req.params.id)) {
        throw new Error("El nombre de la etiqueta ya está en uso por otra");
      }
      return true;
    }),
];

// Obtener etiqueta
export const getTagValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const tag = await tagModel.findByPk(value);
      if (!tag) {
        throw new Error("No existe ninguna etiqueta con ese id");
      }
      return true;
    }),
];

// Eliminar etiqueta
export const deleteTagValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const tag = await tagModel.findByPk(value);
      if (!tag) {
        throw new Error("No existe ninguna etiqueta con ese id");
      }
      return true;
    }),
];
