const Payment = require("../models/payment.model");

// Crear un nuevo pago
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment({
      ...req.body,
      user: req.user._id,
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    console.log("Usuario autenticado:", req.user);

    const payments = await Payment.find({ user: req.user._id });
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Actualizar un pago
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    Object.assign(payment, req.body);
    await payment.save();
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un pago
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    await Payment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Pago eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
