import { Router } from "express";
import {
  getAllUser,
  getByPkUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";
import { dataValidada } from "../middlewares/matchedData.middleware.js";
import { validator } from "../middlewares/validator.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createUserValidation,
  updateUserValidation,
  getUserByIdValidation,
  deleteUserValidation
} from "../middlewares/validations/user.validator.js";

const userRoutes = Router();

// Registrar usuario (registro público)
userRoutes.post(
  "/",
  createUserValidation,
  validator,
  dataValidada,
);

// Listar todos los usuarios (solo admin)
userRoutes.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllUser
);

// Obtener usuario por ID (solo admin)
userRoutes.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getUserByIdValidation,
  validator,
  getByPkUser
);

// Actualizar usuario (solo admin)
userRoutes.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidation,
  validator,
  dataValidada,
  updateUser
);

// Eliminar usuario (solo admin)
userRoutes.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserValidation,
  validator,
  deleteUser
);

export default userRoutes;