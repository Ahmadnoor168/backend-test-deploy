const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const healthRoutes = require("./routes/health.routes");

const app = express();

// ======================
// Middleware
// ======================
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ======================
// Routes
// ======================
app.use("/", healthRoutes);

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB(process.env.MONGO_URI);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
