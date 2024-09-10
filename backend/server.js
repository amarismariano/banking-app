const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}
