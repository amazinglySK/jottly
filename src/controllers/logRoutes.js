const express = require("express");
const router = express.Router();
const mongoConn = require("../lib/mongoConn");
const Log = require("../models/Log");
const { requireAuth } = require("../middlewares/authController");
require("dotenv").config();

router.use(requireAuth());

router.get("/", async (req, res) => {
  mongoConn();
  try {
    const { user_id } = res.locals;
    const logs = await Log.find({ author: user_id })
      .sort({ data: -1 })
      .limit(20);
    let log_links = [];
    for (const log of logs) {
      const post_date = new Date(log.date);
      log_links.push({
        link: `/user/log/${log.uid}`,
        title: log.title,
        desc: `${log.content.substring(20)}...`,
        date: post_date.toLocaleDateString("en-GB"),
      });
    }
    res.json({ logs: log_links });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.get("/:id", async (req, res) => {
  mongoConn();
  const uid = req.params.id;
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
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.post("/new", async (req, res) => {
  mongoConn();
  try {
    const { title, content, date } = req.body;
    const author = res.locals.user_id;
    const newLog = new Log({ title, content, author, date });
    const savedLog = await newLog.save();
    res.json({
      message: "Successfully created the log.",
      redirect_url: "/user/",
      post_id: savedLog.uid,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Oops and error occured" });
  }
});

module.exports = router;
