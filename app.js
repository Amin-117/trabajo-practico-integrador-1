import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initDB } from "./src/config/database.js";

// Importar modelos para que Sequelize registre todas las relaciones
import "./src/models/user.model.js";
import "./src/models/profile.model.js";
import "./src/models/article.model.js";
import "./src/models/tag.model.js";
import "./src/models/articleTag.model.js";

// Importar rutas
import userRoutes from "./src/routes/user.route.js";
import tagRoutes from "./src/routes/tag.route.js";
import articleRoutes from "./src/routes/article.route.js";
import articleTagRoutes from "./src/routes/articleTag.route.js";
import authRoutes from "./src/routes/auth.route.js";

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/articles-tags", articleTagRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo iniciar la base de datos:", err);
  });