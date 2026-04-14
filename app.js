const express = require("express");
const cors = require("cors");

const policeRoutes = require("./routes/police.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// FORCE DISABLE QUIC/HTTP3
// Hostinger/LiteSpeed struggles with POST payloads over QUIC.
// This header tells browsers (like Chrome) to stop using HTTP/3 and fallback to HTTP/2
app.use((req, res, next) => {
  res.setHeader("Alt-Svc", "clear");
  next();
});

app.use(express.json());

// Routes
app.use("/api", policeRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running 🟢",
    timestamp: new Date(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Police Verification API Running 🚔");
});

module.exports = app;
