const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String, // 필요시
  // 기타 필요한 사용자 필드들
});

module.exports = mongoose.model("User", userSchema);
