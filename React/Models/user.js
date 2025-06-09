import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must type name"],
    unique: true,
  },
  token: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;