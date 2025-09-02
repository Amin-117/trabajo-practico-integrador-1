import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token; // <-- buscamos el token en las cookies
    
    if (!token) {
      return res.status(401).json({ message: "No autorizado, token faltante" });
    }

    const decoded = verifyToken(token); // verificamos el token con nuestro helper
    req.user = decoded; // guardamos la info del usuario en la request

    next(); // pasamos al siguiente middleware/controlador
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};