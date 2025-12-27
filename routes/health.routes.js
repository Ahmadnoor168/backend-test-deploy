const express = require("express");
const { healthCheck } = require("../controllers/health.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Health API is Live 🚀");
});

router.get("/health", healthCheck);

module.exports = router;
