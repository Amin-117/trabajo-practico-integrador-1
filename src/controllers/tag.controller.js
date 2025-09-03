import tagModel from "../models/tag.model.js"; 

export const createTag = async (req, res) => {
    const { name } = req.body;
  try {

    // Validar que exista el campo
    if (!name) return res.status(400).json({ message: "El nombre de la etiqueta es obligatorio" });

    // Crear tag
    const newTag = await tagModel.create({ name });

    res.status(201).json({ message: "Etiqueta creada", tag: newTag });
  } catch (error) {
    res.status(500).json({ message: "Error al crear etiqueta", error: error.message });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await tagModel.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener etiquetas", error: error.message });
  }
};

export const getTagById = async (req, res) => {
  try {
    const tag = await tagModel.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });

    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener etiqueta", error: error.message });
  }
};

export const updateTag = async (req, res) => {
    const { name } = req.body;
  try {
    const tag = await tagModel.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });

    // Validar unicidad si se quiere cambiar el nombre
    if (name && name !== tag.name) {
      const existingTag = await tagModel.findOne({ where: { name } });
      if (existingTag) return res.status(400).json({ message: "El nombre de la etiqueta ya existe" });
    }

    await tag.update({ name, updated_at: new Date() });

    res.json({ message: "Etiqueta actualizada", tag });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar etiqueta", error: error.message });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const tag = await tagModel.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });

    await tag.destroy(); 
    res.json({ message: "Etiqueta eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar etiqueta", error: error.message });
  }
};
