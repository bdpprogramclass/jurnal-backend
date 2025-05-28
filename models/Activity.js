// models/Activity.js
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  username: { type: String, required: true },
  activity: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
