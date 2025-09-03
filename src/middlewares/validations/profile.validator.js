import { body, param } from "express-validator";
import profileModel from "../../models/profile.model.js";
import userModel from "../../models/user.model.js";

// Crear perfil
export const createProfileValidation = [
  body("user_id")
    .notEmpty().withMessage("El campo user_id es obligatorio")
    .isInt().withMessage("El user_id debe ser un número entero")
    .custom(async (value) => {
      const user = await userModel.findByPk(value);
      if (!user) {
        throw new Error("No existe ningún usuario con ese id");
      }
      const existingProfile = await profileModel.findOne({ where: { user_id: value } });
      if (existingProfile) {
        throw new Error("Este usuario ya tiene un perfil asociado");
      }
      return true;
    }),

  body("first_name")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser texto")
    .isLength({ max: 50 }).withMessage("El nombre no debe superar los 50 caracteres"),

  body("last_name")
    .notEmpty().withMessage("El apellido es obligatorio")
    .isString().withMessage("El apellido debe ser texto")
    .isLength({ max: 50 }).withMessage("El apellido no debe superar los 50 caracteres"),

  body("biography")
    .optional()
    .isString().withMessage("La biografía debe ser texto"),

  body("avatar_url")
    .optional()
    .isURL().withMessage("El avatar_url debe ser una URL válida")
    .isLength({ max: 255 }).withMessage("El avatar_url no debe superar los 255 caracteres"),

  body("birth_date")
    .optional()
    .isISO8601().withMessage("La fecha de nacimiento debe tener un formato válido (YYYY-MM-DD)")
];

// Actualizar perfil
export const updateProfileValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const profile = await profileModel.findByPk(value);
      if (!profile) {
        throw new Error("No existe ningún perfil con ese id");
      }
      return true;
    }),

  body("first_name")
    .optional()
    .isString().withMessage("El nombre debe ser texto")
    .isLength({ max: 50 }).withMessage("El nombre no debe superar los 50 caracteres"),

  body("last_name")
    .optional()
    .isString().withMessage("El apellido debe ser texto")
    .isLength({ max: 50 }).withMessage("El apellido no debe superar los 50 caracteres"),

  body("biography")
    .optional()
    .isString().withMessage("La biografía debe ser texto"),

  body("avatar_url")
    .optional()
    .isURL().withMessage("El avatar_url debe ser una URL válida")
    .isLength({ max: 255 }).withMessage("El avatar_url no debe superar los 255 caracteres"),

  body("birth_date")
    .optional()
    .isISO8601().withMessage("La fecha de nacimiento debe tener un formato válido (YYYY-MM-DD)")
];

// Obtener perfil
export const getProfileValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const profile = await profileModel.findByPk(value);
      if (!profile) {
        throw new Error("No existe ningún perfil con ese id");
      }
      return true;
    }),
];

// Eliminar perfil
export const deleteProfileValidation = [
  param("id")
    .isInt().withMessage("El id debe ser un número entero")
    .custom(async (value) => {
      const profile = await profileModel.findByPk(value);
      if (!profile) {
        throw new Error("No existe ningún perfil con ese id");
      }
      return true;
    }),
];
