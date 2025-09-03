import { body, param } from "express-validator";
import userModel from "../../models/user.model.js";

//  Validación para crear usuario
export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .isString().withMessage("El nombre de usuario debe ser un texto")
    .custom(async (username) => {
      const existingUser = await userModel.findOne({ where: { username } });
      if (existingUser) {
        throw new Error("El nombre de usuario ya está registrado");
      }
      return true;
    }),

  body("email")
    .trim()
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe ser un email válido")
    .custom(async (email) => {
      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  body("password")
    .trim()
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),

  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("El rol debe ser 'user' o 'admin'"),
];

// Validación para actualizar usuario
export const updateUserValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const user = await userModel.findByPk(id);
      if (!user) {
        throw new Error("No existe un usuario con ese ID");
      }
      return true;
    }),

  body("username")
    .optional()
    .isLength({ min: 3, max: 20 }).withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .custom(async (username, { req }) => {
      const existingUser = await userModel.findOne({ where: { username } });
      if (existingUser && existingUser.id !== parseInt(req.params.id)) {
        throw new Error("El nombre de usuario ya está en uso por otro usuario");
      }
      return true;
    }),

  body("email")
    .optional()
    .isEmail().withMessage("Debe ser un email válido")
    .custom(async (email, { req }) => {
      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser && existingUser.id !== parseInt(req.params.id)) {
        throw new Error("El email ya está en uso por otro usuario");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),

  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("El rol debe ser 'user' o 'admin'"),
];

//  Validación para obtener usuario por ID
export const getUserByIdValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const user = await userModel.findByPk(id);
      if (!user) {
        throw new Error("No existe un usuario con ese ID");
      }
      return true;
    }),
];

// Validación para eliminar usuario (eliminación lógica)
export const deleteUserValidation = [
  param("id")
    .isInt().withMessage("El ID debe ser un número entero")
    .custom(async (id) => {
      const user = await userModel.findByPk(id);
      if (!user) {
        throw new Error("No existe un usuario con ese ID");
      }
      return true;
    }),
];
