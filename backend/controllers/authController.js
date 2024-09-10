const User = require("../models/user.model");
const Payment = require("../models/payment.model");
const jwt = require("jsonwebtoken");

// Registro
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.create({
      username,
      password,
      role,
    });

    const existingPayments = await Payment.find({ user: user._id });
    if (existingPayments.length === 0) {
      const defaultPayments = [
        {
          cardNumber: "1111222233334444",
          cardHolder: user.username,
          amount: 1000,
          paymentType: "debit",
          user: user._id,
        },
        {
          cardNumber: "5555666677778888",
          cardHolder: user.username,
          amount: 5000,
          paymentType: "credit",
          user: user._id,
        },
        {
          cardNumber: "9999000011112222",
          cardHolder: user.username,
          amount: 10000,
          paymentType: "loan",
          user: user._id,
        },
      ];

      await Payment.insertMany(defaultPayments);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const existingPayments = await Payment.find({ user: user._id });
    if (existingPayments.length === 0) {
      const defaultPayments = [
        {
          cardNumber: "1111222233334444",
          cardHolder: user.username,
          amount: 1000,
          paymentType: "debit",
          user: user._id,
        },
        {
          cardNumber: "5555666677778888",
          cardHolder: user.username,
          amount: 5000,
          paymentType: "credit",
          user: user._id,
        },
        {
          cardNumber: "9999000011112222",
          cardHolder: user.username,
          amount: 10000,
          paymentType: "loan",
          user: user._id,
        },
      ];

      await Payment.insertMany(defaultPayments);
    }

    res.status(200).json({
      token,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};
