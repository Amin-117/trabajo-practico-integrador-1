import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile
} from "../controllers/auth.controller.js";
import { createRegisterValidation, updateProfileValidation } from "../middlewares/validations/auth.validator.js";
import { validator } from "../middlewares/validator.js";
import { dataValidada } from "../middlewares/matchedData.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

// Registro de usuario
authRoutes.post(
  "/register",
  createRegisterValidation,
  dataValidada,
  validator,
  register,
);

// Login de usuario
authRoutes.post("/login", login);

// Logout de usuario
authRoutes.post("/logout", authMiddleware, logout);

// Obtener perfil del usuario autenticado
authRoutes.get("/profile", authMiddleware, getProfile);

// Actualizar perfil del usuario autenticado
authRoutes.put(
  "/profile",
  authMiddleware,
  updateProfileValidation,
  validator,
  dataValidada,
  updateProfile
);

export default authRoutes;