import jwt from "jsonwebtoken";

// Clave secreta
const JWT_SECRET = process.env.JWT_SECRET || "secret_lol";
const JWT_EXPIRES_IN = "1h"; 

// Generar un token
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verificar un token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; 
  }
};