const express = require("express");
const cors = require("cors");

const app = express();

// ======================
// Middleware
// ======================
app.use(cors({
  origin: "*",               // allow all origins (change for production)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ======================
// Routes
// ======================
app.get("/", (req, res) => {
  res.send("Health API is Live 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Health API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ======================
// Server Start (IMPORTANT)
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
