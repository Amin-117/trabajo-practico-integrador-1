import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import userModel from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validar 
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "El email ya existe" });

    // Hashear contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    res.status(201).json({ message: "Usuario registrado", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.findAll({
      attributes: { exclude: ["password"] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};


export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const user = await userModel.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Si viene nueva contraseña, hashearla
    let hashedPassword;
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    // Actualizar campos
    await user.update({
      username: username || user.username,
      email: email || user.email,
      password: hashedPassword || user.password,
      role: role || user.role,
      updated_at: new Date()
    });

    const updatedUser = await userModel.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }
    });

    res.json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy(); 
    res.json({ message: "Usuario eliminado (lógicamente)" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
  }
};
