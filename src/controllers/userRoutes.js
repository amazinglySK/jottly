const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/user/index.html"));
});

router.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/user/settings.html"));
});

module.exports = router;
