const mongoose = require("mongoose");
const LogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  kegiatan: { type: String, required: true },
  tanggal: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Log", LogSchema);
