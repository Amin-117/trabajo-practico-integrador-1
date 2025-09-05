export const adminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res
        .status(403)
        .json({
          message: "Sólo un user con role de admin puede usar este metodo",
        });
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};