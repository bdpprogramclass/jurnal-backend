const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "siswa", "user"], required: true },
});
module.exports = mongoose.model("User", UserSchema);
