import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, required: false, default: "" },
  gender: { type: String, required: false, default: "" },
  avatar: { type: String, required: false },
  credits: { type: Number, required: true, default: 300 },
  clerkId: { type: String, required: true }
});

export default mongoose.model('User', userSchema);
