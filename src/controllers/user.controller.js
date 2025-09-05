import userModel from "../models/user.model.js";
import articleModel from "../models/article.model.js";
import profileModel from "../models/profile.model.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.findAll({
      attributes: { exclude: ["password"] },
      include: { model: profileModel, as: "profile" },
    });
    if (users.length === 0)
      return res.status(404).json({ message: "No existen usuarios" });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getByPkUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: profileModel, as: "profile" },
        { model: articleModel, as: "articles" },
      ],
    });
    if (!user) return res.status(404).json({ message: "El usuario no existe" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.data;

    const user = await userModel.findByPk(id);
    if (!user) return res.status(404).json({ message: "El usuario no existe" });

    await user.update(data);

    return res.status(200).json({ message: "usuario actualizado", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await userModel.destroy({ where: { id } });
    if (!deleted)
      return res.status(200).json({ message: "El usuario no existe" });
    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};