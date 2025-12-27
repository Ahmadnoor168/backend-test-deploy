const {
  getHealthData,
  createHealthLog
} = require("../models/health.model");

const healthCheck = async (req, res) => {
  const payload = {
    status: "OK",
    service: "Health API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };

  await createHealthLog(payload);
  res.status(200).json(payload);
};

module.exports = { healthCheck };
