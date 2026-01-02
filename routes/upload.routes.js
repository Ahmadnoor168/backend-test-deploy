const express = require("express");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.get("/signature", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUD_API_SECRET
  );
  res.json({ signature, timestamp, cloud_name: process.env.CLOUD_NAME, api_key: process.env.CLOUD_API_KEY });
});

module.exports = router;
