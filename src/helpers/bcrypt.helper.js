import bcrypt from "bcryptjs";

// Hashear contraseña
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // factor de complejidad
  return await bcrypt.hash(password, salt);
};

// Comparar contraseña con hash guardado
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};