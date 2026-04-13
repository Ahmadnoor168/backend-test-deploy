const PoliceRecord = require("../models/PoliceRecord.model");

// Login by CNIC - check in PoliceRecord
const login = async (req, res) => {
  try {
    const { cnic } = req.body;
    if (!cnic) return res.status(400).json({ error: "CNIC is required" });

    // Check if CNIC exists in police records (excluding massive imageUrl payload)
    const user = await PoliceRecord.findOne({ cnic }).select("-imageUrl").lean();
    if (!user) return res.status(404).json({ error: "CNIC not found in police records" });

    // Successful login (we don't need to return the whole user, just an acknowledgment)
    res.status(200).json({ message: "Login successful", cnic: user.cnic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { login };
