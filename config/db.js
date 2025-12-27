const { MongoClient } = require("mongodb");

let db;

const connectDB = async (uri) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    db = client.db(); // uses DB name from URI
    console.log("MongoDB Atlas Connected");

  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};

module.exports = { connectDB, getDB };
