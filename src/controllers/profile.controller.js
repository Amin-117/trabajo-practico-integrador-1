import profileModel from "../models/profile.model.js";
import userModel from "../models/user.model.js"; 

export const createProfile = async (req, res) => {
    const { user_id, first_name, last_name, biography, avatar_url, birth_date } = req.body;
  try {

    // Verificar si el usuario ya tiene profile
    const existingProfile = await profileModel.findOne({ where: { user_id } });
    if (existingProfile) return res.status(400).json({ message: "El usuario ya tiene un perfil" });

    const newProfile = await profileModel.create({
      user_id,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date
    });

    res.status(201).json({ message: "Perfil creado", profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: "Error al crear perfil", error: error.message });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.findAll({
      include: [{ model: userModel, as: "user", attributes: ["id", "username", "email"] }]
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfiles", error: error.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await profileModel.findByPk(req.params.id, {
      include: [{ model: userModel, as: "user", attributes: ["id", "username", "email"] }]
    });
    if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
    const { first_name, last_name, biography, avatar_url, birth_date } = req.body;
  try {

    const profile = await profileModel.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });

    // Actualizar campos
    await profile.update({
      first_name: first_name || profile.first_name,
      last_name: last_name || profile.last_name,
      biography: biography !== undefined ? biography : profile.biography,
      avatar_url: avatar_url || profile.avatar_url,
      birth_date: birth_date || profile.birth_date,
      updated_at: new Date()
    });

    res.json({ message: "Perfil actualizado", profile });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar perfil", error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await profileModel.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ message: "Perfil no encontrado" });

    await profile.destroy(); 
    res.json({ message: "Perfil eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar perfil", error: error.message });
  }
};
