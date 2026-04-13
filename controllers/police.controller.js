const PoliceRecord = require("../models/PoliceRecord.model");

// ✅ CREATE RECORD
const addPoliceRecord = async (req, res) => {
  try {
    console.log("Incoming payload:", req.body); // 🔹 log
    const record = await PoliceRecord.create(req.body);
    res.status(201).json({
      message: "Police record created successfully",
      record,
    });
  } catch (error) {
    console.error("MongoDB Error:", error); // 🔹 log the error
    if (error.code === 11000) {
      return res.status(400).json({ error: "CNIC already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};


// ✅ GET ALL RECORDS
const getAllRecords = async (req, res) => {
  try {
    // We select("-imageUrl") because some old records contain massive base64 strings.
    // Fetching hundreds of 5MB strings causes V8 to crash or NGINX to drop the connection
    // resulting in net::ERR_CONNECTION_RESET.
    const records = await PoliceRecord.find()
      .select("-imageUrl")
      .sort({ createdAt: -1 })
      .lean();
    res.json(records);
  } catch (error) {
    console.error("Get All Records Error:", error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// ✅ GET RECORD BY CNIC
const getRecordByCNIC = async (req, res) => {
  try {
    const record = await PoliceRecord.findOne({ cnic: req.params.cnic });
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json(record);
  } catch (error) {
    console.error("Get Record Error:", error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// ✅ UPDATE RECORD
const updateRecord = async (req, res) => {
  try {
    const record = await PoliceRecord.findOneAndUpdate(
      { cnic: req.params.cnic },
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ message: "Record updated successfully", record });
  } catch (error) {
    console.error("Update Record Error:", error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

// ✅ DELETE RECORD
const deleteRecord = async (req, res) => {
  try {
    const record = await PoliceRecord.findOneAndDelete({
      cnic: req.params.cnic,
    });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Delete Record Error:", error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};

module.exports = {
  addPoliceRecord,
  getAllRecords,
  getRecordByCNIC,
  updateRecord,
  deleteRecord,
};
