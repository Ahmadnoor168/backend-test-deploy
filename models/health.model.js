const { getDB } = require("../config/db");

const getHealthData = async () => {
  const db = getDB();
  return await db.collection("health_logs").findOne({});
};

const createHealthLog = async (data) => {
  const db = getDB();
  return await db.collection("health_logs").insertOne(data);
};

module.exports = {
  getHealthData,
  createHealthLog
};
