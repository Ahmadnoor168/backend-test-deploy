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
  const records = await PoliceRecord.find().sort({ createdAt: -1 });
  res.json(records);
};

// ✅ GET RECORD BY CNIC
const getRecordByCNIC = async (req, res) => {
  const record = await PoliceRecord.findOne({ cnic: req.params.cnic });
  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }
  res.json(record);
};

// ✅ UPDATE RECORD
const updateRecord = async (req, res) => {
  const record = await PoliceRecord.findOneAndUpdate(
    { cnic: req.params.cnic },
    req.body,
    { new: true }
  );

  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }

  res.json({ message: "Record updated successfully", record });
};

// ✅ DELETE RECORD
const deleteRecord = async (req, res) => {
  const record = await PoliceRecord.findOneAndDelete({
    cnic: req.params.cnic,
  });

  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }

  res.json({ message: "Record deleted successfully" });
};

module.exports = {
  addPoliceRecord,
  getAllRecords,
  getRecordByCNIC,
  updateRecord,
  deleteRecord,
};
