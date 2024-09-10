const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Error al autenticar el token:", error);
      res.status(401).json({ error: "No autorizado, token fallido" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "No autorizado, no hay token" });
  }
};
