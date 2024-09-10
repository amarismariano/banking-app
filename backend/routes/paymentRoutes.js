// routes/paymentRoutes.js
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/", protect, createPayment); // Ruta protegida
router.get("/", protect, getPayments); // Ruta protegida
router.put("/:id", protect, updatePayment); // Ruta protegida
router.delete("/:id", protect, deletePayment); // Ruta protegida

module.exports = router;
