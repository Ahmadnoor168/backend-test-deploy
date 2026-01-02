const mongoose = require("mongoose");

const PoliceRecordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sonOf: { type: String, required: true },

    cnic: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },

    dob: { type: Date, required: true },

    certificateNo: { type: String, required: true },
    issueDate: { type: Date, required: true },

    purpose: { type: String, required: true },

    criminalRecord: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    passportNo: String,
    passportIssuedDetail: String,
    cnicIssuedDetail: String,

    city: { type: String, required: true },
    address: { type: String, required: true },
    courierAddress: String,

    policeStation: { type: String, required: true },

    stayFrom: { type: String, required: true },
    stayTo: { type: String, required: true },

    imageUrl: { type: String, required: true },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("PoliceRecord", PoliceRecordSchema);
