const express = require("express");
const router = express.Router();
const Log = require("../models/log");

router.post("/api/activity", async (req, res) => {
  const { username, activity } = req.body;
  if (!username || !activity) {
    return res.status(400).json({ message: "Data kurang lengkap" });
  }
  try {
    const newLog = new Log({ username, activity });
    await newLog.save();
    res.json({ message: "Kegiatan berhasil disimpan" });
  } catch (err) {
    res.status(500).json({ message: "Error menyimpan kegiatan" });
  }
});

module.exports = router;
