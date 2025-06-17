// Server/models/message.model.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  senderName: String,
  message: String,
  time: String,
});

module.exports = mongoose.model("Message", messageSchema);
