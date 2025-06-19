const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  senderName: String,
  message: String,
  time: String,
  type: {
    type: String, // "sent", "received", "system" 등
    default: "received"
  }
});

module.exports = mongoose.model("Message", messageSchema);
