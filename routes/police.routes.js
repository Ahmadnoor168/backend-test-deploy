const express = require("express");
const controller = require("../controllers/police.controller");

const router = express.Router();

router.post("/police-record", controller.addPoliceRecord);
router.get("/police-records", controller.getAllRecords);
router.get("/police-record/:cnic", controller.getRecordByCNIC);
router.put("/police-record/:cnic", controller.updateRecord);
router.delete("/police-record/:cnic", controller.deleteRecord);

module.exports = router;
