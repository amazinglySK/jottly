const express = require("express");
const router = express.Router();
const mongoConn = require("../lib/mongoConn");
const Log = require("../models/Log");

router.get("/", (res, res) => {
  mongoConn();
  try {
    const { user_id } = res.locals;
    const existingUser = user.findOne({ _id: user_id });
    if (!existingUser) {
      res.redirect("/login");
      return;
    }
    const logs = existingUser.logs;
    const log_links = [];
    for (const log of logs) {
      const LogDet = await Log.findOne({ _id: log });
      const log_link = `/logs/${LogDet.uid}`;
      const log_desc = `${LogDet.content.substring(0, 20)}...`;
      log_links.push({ link: log_link, desc: log_desc });
    }
    res.json({ logs: log_links });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong" });
  }
});
router.get("/:id", (res, res) => {
  const uid = res.params.id;
  try {
    const log = await Log.findOne({ uid });
    if (!log) {
      res.json({ message: "no post found" });
      return;
    }
    const { title, content, date } = log;
    res.json({ title, content, date });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong" });
  }
});
router.get("/new", (res, res) => {});

module.exports = router;
