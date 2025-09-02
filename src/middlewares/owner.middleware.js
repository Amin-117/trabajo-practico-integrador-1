export const ownerMiddleware = (req, res, next) => {
  const userIdFromToken = req.user?.id; // id del usuario autenticado
  const userIdFromParams = req.params.id; // id del recurso (ej: /users/:id)

  if (!userIdFromToken) {
    return res.status(401).json({ message: "No autorizado" });
  }

  // Permitimos si es el dueño o si es admin
  if (userIdFromToken !== userIdFromParams && req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado, no eres el propietario" });
  }

  next();
};
