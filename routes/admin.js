const express = require("express");
const router = express.Router();
const Log = require("../models/log");
const User = require("../models/User");
const json2xls = require("json2xls");

// GET semua user (tanpa password)
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/logs?username=
router.get("/api/logs", async (req, res) => {
  try {
    const filter = {};
    if (req.query.username && req.query.username !== "all") {
      filter.username = req.query.username;
    }
    const logs = await Log.find(filter).sort({ date: -1 }); // pakai 'date' bukan 'tanggal'
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Download logs Excel, optional filter username via query param ?username=
router.get("/api/logs/download", async (req, res) => {
  try {
    const username = req.query.username;
    const filter = username && username !== "all" ? { username } : {};
    const logs = await Log.find(filter);

    if (!logs.length) {
      return res.status(404).json({ message: "Data log tidak ditemukan" });
    }

    const xls = json2xls(
      logs.map((log) => ({
        username: log.username,
        kegiatan: log.kegiatan,
        tanggal: log.tanggal ? log.tanggal.toISOString() : "",
      }))
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${username || "all"}_logs.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.end(xls, "binary");
  } catch (err) {
    res.status(500).json({ message: "Error generate file Excel" });
  }
});

module.exports = router;
