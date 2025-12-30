const mongoose = require("mongoose");

const PoliceRecordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    sonOf: { type: String, required: true },
    fatherName: { type: String },

    cnic: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },

    dob: { type: Date, required: true },

    certificateNo: { type: String, required: true },
    issueDate: { type: Date, required: true },

    formSubmitDate: { type: Date, default: Date.now },

    purpose: { type: String, required: true },
    purposeOfCertificate: { type: String },

    criminalRecord: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },

    passportNo: { type: String },
    passportIssuedDetail: { type: String },

    cnicIssuedDetail: { type: String },

    city: { type: String, required: true },
    address: { type: String, required: true },
    courierAddress: { type: String },

    policeStation: { type: String, required: true },

    stayFrom: { type: Date, required: true },
    stayTo: { type: Date, required: true },

    imageUrl: { type: String, required: true },
    
    activeStatus: { type: Boolean, default: true },

  },
  { timestamps: true }
);

module.exports = mongoose.model("PoliceRecord", PoliceRecordSchema);
