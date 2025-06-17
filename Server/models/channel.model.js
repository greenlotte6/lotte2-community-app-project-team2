const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  name: String,         // 채널 이름
  creator: String,      // 만든 사용자 UID
  members: [String],    // 참여한 사용자 UID 배열
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Channel", channelSchema);
