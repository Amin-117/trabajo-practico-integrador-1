import dotenv from "dotenv";
import express from "express";
import userModel from "./src/models/user.model.js";
import profileModel from "./src/models/profile.model.js";
import articleModel from "./src/models/article.model.js";
import tagModel from "./src/models/tag.model.js";
import articleTagModel from "./src/models/articleTag.model.js";
import { initDB } from "./src/config/database.js";


dotenv.config();

const app = express();
app.use(express.json());

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