import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chat: String,
    user: {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;